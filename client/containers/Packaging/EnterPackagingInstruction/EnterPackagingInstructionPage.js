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
        loaded: true, weight: 'lbs'}
  }
   componentWillMount(){
     debugger
    if(this.props.params.id != undefined){
      this.setState({
        loaded:false
      })
      this.forceUpdate()
       var PIview = createDataLoader(EnterPackagingInstructionForm,{
           queries:[{
           endpoint: 'TPackagingInstructions',
              filter: {
              include: ['TPackagingInstructionLots']
             }
        }]
      })
      if(this.props.params.lotId){
        var base = 'TPackagingInstructions'+'/'+this.props.params.id;
        this.url = PIview._buildUrl(base, {
          include: {"relation" : "TPackagingInstructionLots" , "scope":{"where" : {id : this.props.params.lotId}}}
        })
      }
      else{
    var base = 'TPackagingInstructions'+'/'+this.props.params.id;
    this.url = PIview._buildUrl(base, {
      include: {"relation":'TPackagingInstructionLots',"scope":{"where":{"active":1}}}
    })
  }

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



    }

    }
     setWeight(value) {
         console.log("set Weight", value);
         this.setState({
             weight: value
         });
     }
       render(){

          return (
      <div>
      <div className="wrapper-inner">
      <div className="content-inside">
      <Header routes = {this.props.routes} setWeight={this.setWeight.bind(this)}/>
      <Loader loaded={this.state.loaded}>
      <EnterPackagingInstructionForm data = {this.state.entryInfo} lotInfo = {this.state.lotInfo} weight={this.state.weight}/>
     	</Loader>
      </div>
        <Footer />
      </div>

      </div>

    );
  }
}
