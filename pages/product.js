import React from 'react';
import {Form,TextField,Heading, Card, Page, Layout,Thumbnail,Button,Stack} from '@shopify/polaris';
import Presentation from '../components/product/presentation';
import Tache1 from '../components/product/tache1';
import LDesc from '../components/product/Ldesc';
import { Redirect } from '@shopify/app-bridge/actions';
import { Context } from '@shopify/app-bridge-react';


class Product extends React.Component{
  constructor(){
    super();
    this.state = {
      isLoading:true,
      complete :false,
      succes:true,
      product:[],
      inputList: [],

    }
  }
  static contextType = Context;


  componentDidMount(){
    if(localStorage.getItem("product")){
      this.setState({
        complete:true,
        product: JSON.parse(localStorage.getItem("product"))
      })
    }
    else{
      this.setState({succes:false})
    }
  }





  render(){

    const app = this.context;
    const retour = () => {
      const redirect = Redirect.create(app);
      redirect.dispatch(
        Redirect.Action.APP,
        '/',
      );
    };


    const succes = this.state.succes;
    const product = this.state.product;
    const list = this.state.inputList;
    
    
    
    
    
    return(
      <>
      {succes ?(
        <Page
        breadcrumbs={[{content: 'Retour',onAction:retour}]}
        title={product.title}
        subtitle={"id: "+product.id+"    "+product.collectionDB}
        thumbnail={
          <Thumbnail
            source={product.urlImage} 
            alt={product.id}
          />
        }
        separator
      >
        <Presentation product={product}/>

        <Card sectioned>
          <Layout>
            <Layout.Section oneThird>
                <Tache1 collection={product.collectionDB}/>
            </Layout.Section>
            <Layout.Section oneThird>
                <Card.Section>
                  <LDesc collection={product.collectionDB}/>
                </Card.Section>
            </Layout.Section>
          </Layout>
        </Card>
        </Page>
      ) :(
        <Card>
          <p>Error</p>
        </Card>
      )}

      </>
    )
  }
} 
export default Product;