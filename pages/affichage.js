import gql from 'graphql-tag';
import { Query,useQuery } from 'react-apollo';
import { Card,Layout, TextStyle,Page} from '@shopify/polaris';


const GET_SCRIPT_TAG= gql`
  query ScriptTag {
    scriptTags(first:5) {
      edges {
        node {
          id
        }
      }
    }
  }
`;

function ScriptTagRead() {
  const { loading, error, data } = useQuery(GET_SCRIPT_TAG);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  console.log(data)
  return (
    <Page
    title="Scriptt"
     >
      <Layout>
        <Layout.Section>
        {data.scriptTags.edges.map(tag => (
          <Card key={tag.node.id}>
            <TextStyle>
              {tag.node.id}
            </TextStyle>
          </Card>

        ))}
        </Layout.Section>
      </Layout>
    </Page> 
  );
}
  
export default ScriptTagRead;