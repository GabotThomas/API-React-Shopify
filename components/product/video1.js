import React, { useState, useEffect, useCallback } from 'react';
import {Stack,Heading,Layout, Card, Thumbnail, Button,Caption,DropZone,VideoThumbnail} from '@shopify/polaris';
import * as firebase from "../../server/firebase";

function VideoUpload(props){

    const [url, setUrl] = useState("");
    const [title, setTitle] = useState("Ce produit contient déja une vidéo");
    useEffect(() => {
        firebase.DataUrl(props.collection)
          .then(list => {
            if (list.exists) {
              if(list.data().urlvideo){
                  setUrl(list.data().urlvideo);
              }
              else{
                  setUrl("");
              }
            } else {
              setUrl("");
            }
          })
          .catch(() => setTitle("error"));
    }, [title,props.collection, setUrl]);


    const Del = ()=>{
        firebase.DeleteVideo("Video/"+props.id+".mp4")
        .then(function(){
            firebase.PushUrl(props.collection,"")
            setUrl("")
            setTitle("Vidéo Supprimé")
        })
    }
    const change = useCallback(()=>{
        setTitle("Vidéo Ajouté")
    })

    if(url){
       return (
        <>
            <Stack>
                <Stack.Item fill wrap={false} alignment="center">
                    <Heading>{title}</Heading>
                </Stack.Item>
                <Stack.Item>
                    <Button external={true} url={url} plain>Voir la vidéo</Button>
                </Stack.Item>
                <Stack.Item>
                    <Button plain destructive onClick={Del}>Supprimer</Button>
                </Stack.Item>
            </Stack>
            <DropZoneExample disabled={true}  id={props.id} collection={props.collection} title={setTitle}/>
            
        </>
        )
    }
    else{
       return <DropZoneExample disabled={false} id={props.id} collection={props.collection} title={()=>change()}/>
    }

}

export default VideoUpload;

function DropZoneExample(props) {
    const [file, setFile] = useState();
  


    const send =()=>{
        firebase.SendVideo(file,"Video/"+props.id+".mp4")

        .then(function(snapshot) {
            const get = firebase.GetUrl("Video/"+props.id+".mp4")
            .then(function(downloadURL) {
                firebase.PushUrl(props.collection,downloadURL)
                props.title()
              });
        });
    }





    const handleDropZoneDrop = useCallback(
      (_dropFiles, acceptedFiles, _rejectedFiles) =>
        setFile((file) => acceptedFiles[0]),
      [],
    );
  
    const validVideoTypes = ['video/mp4'];
  
    const fileUpload = !file && <DropZone.FileUpload />;
    const uploadedFile = file && (
      <Stack>
        <Thumbnail
          size="small"
          alt={file.name}
          source={
            validVideoTypes.indexOf(file.type) > 0
              ? window.URL.createObjectURL(file)
              : (
                  console.log('Ajouté')
              )
          }
        />
        <div>
          {file.name} <Caption>{file.size} bytes</Caption>
        </div>
      </Stack>
    );
  
    return (
        <>
            <DropZone disabled={props.disabled} allowMultiple={false} onDrop={handleDropZoneDrop}>
                {uploadedFile}
                {fileUpload}
            </DropZone>
            <Button onClick={send}>Envoyer</Button>
        </>
    );
  }