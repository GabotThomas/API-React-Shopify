import React from 'react';
import firebase from "../server/firebase";
import ResourceListProducts from './ResourceListProduct';




class GetCollectionDB extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      create:true,
      inputList:[]
    };
  }
  componentDidMount(){

    const db = firebase.firestore();
    const ref = db.collection('product');
    const deploy = this.props.products.edges.map((item)=>{
      
      var tr = true;
      const documents = ref.get()
      .then(snapshot => { 
        snapshot.forEach(doc => { 
          const data = doc.data();
          
          if(data.id == item.node.legacyResourceId){
            
            const inputList = this.state.inputList;
            this.setState({inputList: inputList.concat(doc.id)})
            tr = false;
          }
        })
        
      })
      .then(test =>{
        
        if(tr){
          ref.add({
            id: item.node.legacyResourceId,
          })
          .then(receive => {
            const inputList = this.state.inputList;
            this.setState({inputList: inputList.concat(receive.id)})
          })
        }
        
      }
      )

    });
  }
  


  
  render() {
    
    return (
        <ul class="Polaris-ResourceList">
            <ResourceListProducts
            products={this.props.products}
            collection={this.state.inputList}
            />
        </ul>
        );
    }
   }
export default GetCollectionDB;
