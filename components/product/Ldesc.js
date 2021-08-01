import React, { useState, useEffect,useCallback } from 'react';
import {TextStyle, Card, TextField, Button,Banner} from '@shopify/polaris';
import * as firebase from "../../server/firebase";
import ImageUploader from 'react-images-upload';

function LDesc(props){

    const [error, setError] = useState(false)
    const [text, setText] = useState('')
    const [active, setActive] = useState(false);

    useEffect(()=>{
      const timer = setTimeout(() => {
        setActive(false)
      }, 2000);
      return () => clearTimeout(timer);
    },[active])
    



    const send = () =>{

        firebase.LDesc(props.collection,text);
        setActive(true);
    }
    const Notify = active ? (
      <Banner status="info">
        <p>Envoyer</p>
      </Banner>
    ) : null;
  
    return(

        <>
            <MultilineField value={setText} collection={props.collection}/>
            <div style={{display:"flex",margin:"20px 0",justifyContent:"center"}}> 
            <Button onClick={send}>Envoyer</Button>
            </div>
            {Notify}
        </>
        
    )
    ;

}


export default LDesc;


function MultilineField(props) {
    const [value, setValue] = useState("...Loading");
    const [cond, setCond] = useState(true)
    
    useEffect(() => {
          firebase.LDescLoad(props.collection)
            .then(list => {
              if (list.exists) {
                if(list.data().LDesc){
                    setValue(list.data().LDesc);
                }
                else{
                    setValue("");
                }
              } 
            })
            .catch(() => console.log("error"));
      }, [props.collection, setValue]);




    const handleChange = useCallback((newValue) => {
        setValue(newValue)
        props.value(newValue)
    }
    
    , []);
  
    return (
      <TextField
        label="Petite description"
        value={value}
        onChange={handleChange}
        multiline={4}
        placeholder="Petite description"

      />
    );
  }

