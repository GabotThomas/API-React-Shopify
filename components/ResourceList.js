import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Card,Layout} from '@shopify/polaris';
import GetCollectionDB from './GetCollectionDB';


const GET_PRODUCTS_BY_ID = gql`
  query getproduct {
    collections(first: 10) {
      edges {
        node {
          id
          title
          products(first: 15) {
            edges {
              node {
                legacyResourceId
                description
                title
                images(first: 1) {
                  edges {
                    node {
                      src
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

class ResourceListCollection extends React.Component {
    render() {

      return (
        <Query query={GET_PRODUCTS_BY_ID}>
          {({ data, loading, error }) => {
            if (loading) return <div>Loading…</div>;
            if (error) return <div>{error.message}</div>;

            let array = data.collections.edges;
            const listItems = array.map((elem) =>{
            var split = elem.node.id.split('/');  
            
            return(               
              <Layout.Section key={elem.node.id}  oneHalf>
                <Card title={elem.node.title}>
                  <Card.Section title="Items">
                    <GetCollectionDB products={elem.node.products}/>
                  </Card.Section>
                </Card>
              </Layout.Section>
            )
            });
            
            return (
              listItems
            );
          }}
        </Query>
      );
    }
  }
  
   export default ResourceListCollection;