import React, { useState, useEffect } from 'react';
import {TextStyle,Heading, Card, Stack, Badge, Button} from '@shopify/polaris';
import Placeholder from '../Fields/PlaceHolder';
import * as firebase from "../../server/firebase";


function Tache1(props){

    const [error, setError] = useState(false)
    const [ingredients, setIngredients] = useState([])
    useEffect(() => {
        const unsubscribe = firebase.TacheLoad(props.collection, {
            next: querySnapshot => {
                const updatedGroceryItems = 
                    querySnapshot.docs.map(docSnapshot => ({data:docSnapshot.data(),id:docSnapshot.id}));
                setIngredients(updatedGroceryItems);
            },
            error: () => setError('List-Fail')
        });
        return unsubscribe;
                
    },[props.collection,setIngredients]);


    const test = ingredients.map((item)=>{
        return(
            <>
            <Card.Subsection>
                <Stack key={item.id}>
                    <Stack.Item fill wrap={false} alignment="center">
                        <Heading>{item.data.Tache}</Heading>
                    </Stack.Item>
                    <Stack.Item>
                        <Button plain destructive onClick={()=>deleteTache(props.collection,item.id)}>Supprimer</Button>
                    </Stack.Item>
                </Stack>
            </Card.Subsection>
            </>
        )
        }) ;
    return(
        <Card.Section title='Inclus dans le programme'>
            <Card.Subsection/>
                {test}
            <Card.Subsection/>
                <Placeholder 
                    holder="Include"
                    doc={props.collection}
                />
                <Card.Subsection/>
        </Card.Section>
    );

}
function deleteTache(collection,id){
    firebase.DeleteTache(collection,id);
}


export default Tache1;


function OneTimeButton(props) {

    return (
      <Button plain destructive onClick={()=>props.onClick(props.value)} value={props.value}>
        Supprimer
      </Button>
    );
  }