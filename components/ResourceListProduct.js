import React from 'react';
import { ResourceList,TextStyle,Thumbnail } from '@shopify/polaris';
import { Redirect } from '@shopify/app-bridge/actions';
import { Context } from '@shopify/app-bridge-react';


class ResourceListProducts extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({collection:''})

      }

    static contextType = Context;



    render() {
      const app = this.context;
      const redirectToProduct = () => {
        const redirect = Redirect.create(app);
        redirect.dispatch(
          Redirect.Action.APP,
          '/product',
        );
      };



        const listItems = this.props.products.edges.map((number,index) =>{
            var urlImage = number.node.images.edges[0].node.src;
            var collectionDB = this.props.collection[index];
            return(
              <>
                    <ResourceList.Item 
                      key={collectionDB+index} 
                      id={number.node.legacyResourceId} 
                      media={        
                        <Thumbnail
                          source={urlImage}
                          alt={number.node.title}
                        />  
                      }
                      onClick={() => {
                        redirectToProduct();
                        localStorage.setItem("product",JSON.stringify({id:number.node.legacyResourceId,title:number.node.title,urlImage:urlImage,desc:number.node.description,collectionDB:collectionDB}))
                      } 
                    }
                     >
                    <h3>
                        <TextStyle variation="strong">{number.node.title}</TextStyle>
                        
                    </h3>
                    <h2>
                        <TextStyle variation="strong">{this.props.collection[index]}</TextStyle>
                    </h2>
                    </ResourceList.Item>
              </>
            );
        }

         
      );

      return (
        <>
            {listItems}
        </>
      );
    }
  }
  
   export default ResourceListProducts;