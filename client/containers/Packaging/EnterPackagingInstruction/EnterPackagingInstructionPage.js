import React from 'react';
import EnterPackagingInstructionForm from './EnterPackagingInstructionForm';
import { createDataLoader } from 'react-loopback';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
var Loader = require('react-loader');
 export default class EnterPackagingInstructionPage extends React.Component {
  constructor(props){
    super(props);
    this.state = { 
        loaded: true}
  }
   componentWillMount(){
    if(this.props.params.id != undefined){
      this.setState({
        loaded:false
      })
       var PIview = createDataLoader(EnterPackagingInstructionForm,{
           queries:[{
           endpoint: 'TPackagingInstructions',
              filter: {
              include: ['TPackagingInstructionLots']
             }
        }]
      })
    var base = 'TPackagingInstructions'+'/'+this.props.params.id;
    this.url = PIview._buildUrl(base, {
      include: ['TPackagingInstructionLots']
    })
    console.log(this.url,"<<<<<<<<<<<<<<<<<<<<URL")
      $.ajax({
            url: this.url,
            success:function(data){
                console.log('ajax ',data);
                debugger
              this.setState({
                  entryInfo : data,
                  lotInfo : data.TPackagingInstructionLots,
                  loaded : true
                  })
          }.bind(this)

        })
   /* console.log("The recived data is :->>>>>. ",this.state.entryInfo)*/
    
  
    }
   
    }
       render(){
      /*console.log("The recived data is :->>>>>. ",this.state.entryInfo)
        console.log("LOTSSSSSSSS>>>>>>>.<<<<<<<<",this.state.lotInfo)*/
          return (
      <div className="wrapper-inner">
      <div className="content-inside">
      <Header />
      <Loader loaded={this.state.loaded}>
      <EnterPackagingInstructionForm data = {this.state.entryInfo} lotInfo = {this.state.lotInfo}/>
     	</Loader>
      </div>
      <Footer />
      </div>

    );
  }
}
