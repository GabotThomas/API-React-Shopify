import React, {useState,useCallback,useEffect} from 'react';
import {Button, TextField,Banner} from '@shopify/polaris';
import * as firebase from "../../server/firebase";

function Placeholder(props) {
    const [textFieldValue, setTextFieldValue] = useState('');
    const [vide, setvide] = useState(true);
    const [active, setActive] = useState(false);

  
    const handleTextFieldChange = useCallback(

      (value) => {
        setTextFieldValue(value)

      },
      [],
    );

    useEffect(()=>{
      const timer = setTimeout(() => {
        setActive(false)
      }, 2000);
      return () => clearTimeout(timer);
    },[active])
    
    const send = () =>{
    
      if(textFieldValue){
        const send = firebase.addTache(props.doc,textFieldValue);
        setTextFieldValue('');
        setActive(true)
      }
    }
    const Notify = active ? (
      <Banner status="info">
        <p>Envoyer</p>
      </Banner>
    ) : null;
    
    return (
      <>
      <TextField
        label="Shipping zone name"
        value={textFieldValue}
        onChange={handleTextFieldChange}
        placeholder={props.holder}
        labelHidden={true}
        
      />
      <div style={{display:"flex",margin:"20px 0",justifyContent:"center"}}>  
        <Button value={textFieldValue} onClick={send}>Ajouter</Button>
      </div>
      {Notify}
      
      </>
    );
  }

export default Placeholder;