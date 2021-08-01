import React from 'react';
import {TextContainer,Heading, Card, Layout} from '@shopify/polaris';



function Presentation(props){

    return(
        <Card sectioned>
        <Layout>
        <Layout.Section oneThird>
            <Card.Section >
            <img src={props.product.urlImage} alt={props.product.id}></img>
            </Card.Section>
        </Layout.Section>
        <Layout.Section oneThird>
            <Card.Section>
            <TextContainer>
                <Heading>Description</Heading>
                <p>
                    {props.product.desc}
                </p>
            </TextContainer>
            </Card.Section>
        </Layout.Section>
        </Layout>
        </Card>

    );
}

export default Presentation;



