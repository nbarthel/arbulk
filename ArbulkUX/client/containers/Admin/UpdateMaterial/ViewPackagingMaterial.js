import React from 'react'
import axios from 'axios';
import _ from 'lodash';
import  { PropTypes } from 'react';
import { createDataLoader } from 'react-loopback';
import { hashHistory } from 'react-router';
import '../../../public/stylesheets/sweetalert.css';
import '../../../public/stylesheets/bootstrap.min.css';
var moment = require('moment');
import AdminHeader from '../../../components/AdminHeader/AdminHeader';
import Footer from '../../../components/Footer';



class ViewPackagingMaterial extends React.Component{
    constructor(props){
      super(props)
      this.state = {
      loaded : false
      }
      this.update = this.update.bind(this)
      this.OnClick = this.OnClick.bind(this)
      this.pid= ''
      this.id = ''
    }
    update(){

        hashHistory.push('/Admin/UpdateMaterial/'+this.id)
    }
    OnClick(e){

      this.pid = (this.id?this.id:e.target.id)
      this.id = e.target.id;
      document.getElementById(this.pid).checked = false;
      document.getElementById(this.id).checked = true;
    }
  componentWillMount(){
    var view = createDataLoader(ViewPackagingMaterial,{
      queries:[{
        endpoint:'TPackagingMaterials'
      }]
    })
    var base = 'TPackagingMaterials'
    this.url = view._buildUrl(base, {
      include: ["TLocation","TCompany","TPackagingType"]
    })
    var tempThis = this
    $.ajax({
          url: this.url,
          success:function(data){
            data = _.sortBy(data,function(item){
              return item.TPackagingType.packagingType.toLowerCase()
            })
            tempThis.setState({
                viewData : data,
              })
        }

      })
  }
  render(){
    var listData = _.map(this.state.viewData,(view,index)=>{
      debugger
      return (
        <tbody key={index}>
        <tr key={index}>
        <td><input type="checkbox" onClick={(e) => this.OnClick(e)} id={view.id}/></td>
        <td>{view.TPackagingType.packagingType}</td>
        <td>{view.TCompany.name}</td>
        <td>{view.TLocation.locationName}</td>
        <td>{view.packagingName}</td>
        <td>{view.emptyWeight}</td>
        <td>{view.avarageMaterialWeight}</td>
        <td>{view.reorderThreshold}</td>
        <td>{view.quantity}</td>
        <td>{view.fullWrapLength}</td>
        <td>{view.halfWrapLength}</td>
        <td>{view.ActiveBags}</td>
        <td >{view.notes}</td>
        </tr>
      </tbody>
    )
    })
    return (
        <div className="wrapper-inner">
            <div className="content-inside">

              <AdminHeader routes = {this.props.routes}/>
              <div className="container-fluid">
                <div className="row-fluid">
                <div className="adminViewTableMaterialpage" >
                  <table id="PackagingData" className="table table-expandable" cellSpacing="0">
                    <thead id="PackagingDataHead" className="table_head header-fixed header red">
                      <tr>
                        <th></th>
                        <th>Packaging Type</th>
                        <th>Cutomer</th>
                        <th>Location</th>
                        <th>Packaging Name</th>
                        <th>Empty Weight</th>
                        <th>Average Material Weight</th>
                        <th>Threshold</th>
                        <th>Quanity</th>
                        <th>FullWrap</th>
                        <th>HalfWrap</th>
                        <th>ActiveBags</th>
                        <th >Notes</th>
                      </tr>
                    </thead>
                      {listData}
                  </table>
                </div>
            </div>
            </div>

<div className="row-fluid pddn-50-btm padding-top-btm-xs">
<div className="pull-right margin-10-all"><button type="button" className="btn  btn-orange" onClick={this.update} >Edit</button></div>
</div>
      </div>
        <Footer />
    </div>
    )
  }
}

export default ViewPackagingMaterial
