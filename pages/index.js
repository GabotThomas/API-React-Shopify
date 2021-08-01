import {Page, Layout,Card} from "@shopify/polaris";
import ResourceListCollection from '../components/ResourceList';




class Index extends React.Component{

  render(){
    
    return(
      <Page
        title="Product Description"
      >
        <Layout>
          <Layout.Section>
            <ResourceListCollection/>
          </Layout.Section>
        </Layout>
      </Page> 
    )
  }
} 


export default Index;
