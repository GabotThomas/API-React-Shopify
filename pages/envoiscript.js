import React, {useState,useCallback, useEffect} from 'react';
import gql from 'graphql-tag';
import {useMutation } from 'react-apollo';
import {Layout, TextField,Page,Button} from '@shopify/polaris';


const POST_SCRIPT_TAG= gql`
    mutation scriptTagCreate($input: ScriptTagInput!) {
        scriptTagCreate(input: $input) {
            scriptTag {
                id
            }
            userErrors {
                field
                message
            }
        }
    }
`;
const UPDATE_SCRIPT_TAG= gql`
    mutation scriptTagUpdate($id: ID!, $input: ScriptTagInput!) {
        scriptTagUpdate(id: $id, input: $input) {
        scriptTag {
            id
        }
        userErrors {
            field
            message
        }
        }
    }
`;
const DELETE_SCRIPT_TAG= gql`
    mutation scriptTagDelete($id: ID!) {
        scriptTagDelete(id: $id) {
        deletedScriptTagId
        userErrors {
            field
            message
        }
        }
    }
  
`;


function ScriptTagSend() {

    const [add, { data }] = useMutation(POST_SCRIPT_TAG);
    const [upd, { data2 }] = useMutation(UPDATE_SCRIPT_TAG);
    const [del, { data3 }] = useMutation(DELETE_SCRIPT_TAG);
    const [field1, setfield1] = useState('');
    const [field2, setfield2] = useState('');
    const [id, setId] = useState('');


    //add({ variables: { displayScope: "ONLINE_STORE",src:"https://firebasestorage.googleapis.com/v0/b/lets-6daa3.appspot.com/o/tache.js?alt=media&token=c221326a-e2db-4c36-a3e6-e4c964882f89" } });

    const send = ()=> {
        const input = {displayScope:field1,src:field2}
        
        add({variables: { input: input},});
    }

    const update = ()=> {
        const input = {displayScope:field1,src:field2}
        console.log(input)
        upd({variables: {id:id , input: input}});
    }

    const delet = ()=> {
        del({variables: {id:id}});
    }

    


    return (
        <Page
        title="Script"
        >
        <Layout>
            <Layout.Section>
                <FieldHolder name="Scope"value={setfield1}/>
                <FieldHolder name="src"value={setfield2}/>
                <FieldHolder name="Id"value={setId}/>
                <Button  onClick={send}>
                    CREER
                </Button>
                <Button  onClick={update}>
                    UPDATE
                </Button>
                <Button destructive  onClick={delet}>
                    DELETE
                </Button>
            </Layout.Section>
        </Layout>
        </Page> 
    );
}
  
export default ScriptTagSend;

function FieldHolder(props) {
    const [textFieldValue, setTextFieldValue] = useState('ONLINE_STORE');


  
    const handleTextFieldChange = useCallback(
        
      (value) => {
        setTextFieldValue(value)
        props.value(value);

      }
      ,
      [],
    );
    
    
    return (
      <>
      <TextField
        label={props.name}
        value={textFieldValue}
        onChange={handleTextFieldChange}
        placeholder="test"
        
      />
      </>
    );
  }
