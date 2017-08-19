import React, { Component } from 'react';
import axios from 'axios';
import { Base_Url } from '../../../constants'
import SweetAlert from 'sweetalert-react'
import '../../../public/stylesheets/sweetalert.css';
import UpdateMaterial from './UpdateMaterial.js'
import { createDataLoader } from 'react-loopback';
import { hashHistory } from 'react-router'
import AdminHeader from '../../../components/AdminHeader/AdminHeader';
import Footer from '../../../components/Footer';
class UpdateMaterialPage extends Component {
  constructor(props){
    super(props);
    this.id = this.props.routeParams.id
    this.state = {
                  viewData:"",
                  customer:"",
                  packType:"",
                  location:""
                 }
}
componentWillMount() {
  var view = createDataLoader(UpdateMaterialPage,{
    queries:[{
      endpoint:'TPackagingMaterials'
    }]
  })
  var base = 'TPackagingMaterials/' + this.id
  this.url = view._buildUrl(base, {
    include: ["TLocation","TCompany","TPackagingType"]
  })
  var tempThis = this
  $.ajax({
        url: this.url,
        success:function(data){
          tempThis.setState({
              viewData : data,
            })
      }
    })
  base = 'TCompanies'
  this.url = view._buildUrl(base,{
    "where":{"type":"CUSTOMER"}
  })
  $.ajax({
        url: this.url,
        success:function(data){
          tempThis.setState({
              customer : data,
            })
      }
    })
    axios.get(Base_Url+"TLocations").then((response)=>{
      tempThis.setState ({location:response.data})
    })
    axios.get(Base_Url+"TPackagingTypes").then((response)=>{
      tempThis.setState ({
        packType:response.data
      })

    })
}
render(){
  return(
<div className="wrapper-inner ">
<div className="content-inside">
<AdminHeader routes = {this.props.routes}/>
<UpdateMaterial viewData={this.state.viewData} customer={this.state.customer} packType = {this.state.packType} location = {this.state.location}/>
</div>
<Footer />
</div>
)
}
}

export default UpdateMaterialPage
