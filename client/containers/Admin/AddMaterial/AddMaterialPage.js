import React, { Component } from 'react';
import AddMaterialForm from './AddMaterialForm'
import AdminHeader from '../../../components/AdminHeader/AdminHeader';
import Footer from '../../../components/Footer';
import axios from 'axios'
import {Base_Url} from '../../../constants'
import AddMaterialBags from './AddMaterialBags'
import AddMaterialPallet from './AddMaterialPallet'
import AddMaterialSeal from './AddMaterialSeal'
import AddMaterialShrinkWrap from './AddMaterialShrinkWrap'
import { createDataLoader } from  'react-loopback'
class AddMaterialPage extends Component {
	componentWillMount() {

      var AddView = createDataLoader(AddMaterialPage,{
          queries:[{
              endpoint: 'TPackagingInstructions',
              filter: {
                  include: ['TPackagingInstructionLots',{"relation":"TPackagingInstructions","scope":{"include":["TLocation"]}}]
              }
          }]
      })
      
      

      var base = 'TCompanies'
      this.url = AddView._buildUrl(base, {
          "where" : {type : "CUSTOMER" }
      })
		axios.get(Base_Url+"TPackagingTypes").then((response)=>{
			this.setState({
				packagingType: response.data
			})
			console.log("STATE",this.state.packagingType)
		})
		axios.get(this.url).then((response)=>{
			this.setState({
				companyData: response.data
			})
		})
		axios.get(Base_Url + "TLocations").then((response)=>{
			this.setState({
				location: response.data
			})
		})

	}
	constructor(props){
		super(props);
		this.state = {
			showBags: false,
			showSeal: false,
			showPallet:false,
			showWrap:false 
				
		}
		this.onPackagingTypeSelect = this.onPackagingTypeSelect.bind(this)
	}
	onPackagingTypeSelect(e){
			this.selectedPackType = e.target.value
			if(e.target.value == 1 || e.target.value == 2 || e.target.value == 3 ){
				const packagingForm = this.state.packagingForm
				this.setState({
					showBags : true,
					showSeal: false,
					showPallet:false,
					showWrap:false
				})
			}
			else if(e.target.value == 5){
				const packagingForm = this.state.packagingForm
				debugger
				this.setState({
					showSeal:true,
					showPallet:false,
					showWrap:false,
					showBags:false
				})
			}
			else if(e.target.value == 4){
				this.setState({
					showPallet:true,
					showSeal:false,
					showBags:false,
					showWrap:false
				})
			}
			else if(e.target.value == 6){
				this.setState({
					showWrap:true,
					showPallet:false,
					showSeal:false,
					showBags:false,
				})
			}
	}
	render() {
		if(this.state.packagingType){
				this.packagingType = _.map(this.state.packagingType,(pck,index)=>{
					return(<option key = {index} value = { pck.id }>{pck.packagingType}</option>)
				})
			}
		return (
			
			<div className="wrapper-inner">
      			<div className="content-inside">
            	<AdminHeader routes = {this.props.routes}/>
            	  <section className="admin"> 
            	  <div className="container-fluid"> 
			    	<div className=" col-lg-6 col-md-6 col-sm-6 col-xs-12">
            	  <form className="form-horizontal">
            	  <fieldset className="scheduler-border no-right-border">
                  <legend className="scheduler-border">Add Packaging Material</legend>
						<div className=" col-lg-12 col-md-12 col-sm-12 col-xs-12">
						
							<div className="form-group">
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12"><label htmlFor="usr" >Packaging Type</label></div>	
									<div className=" col-lg-6 col-md-6 col-sm-6 col-xs-12">
								<select onChange = {this.onPackagingTypeSelect} className="form-control" id="" name="">
										<option value="">Select Packaging Type</option>
										{this.packagingType}									
									</select>
									 <div className="error"><span></span></div>
									</div>	
							</div>
							{this.state.showBags ? <AddMaterialBags packagingTypeId = {this.selectedPackType} location = {this.state.location} companyData = {this.state.companyData}/> : null}
							{this.state.showPallet ? <AddMaterialPallet packagingTypeId = {this.selectedPackType} location = {this.state.location} companyData = {this.state.companyData}/> : null}
							{this.state.showSeal ? <AddMaterialSeal packagingTypeId = {this.selectedPackType} location = {this.state.location} companyData = {this.state.companyData}/> : null}
							{this.state.showWrap ? <AddMaterialShrinkWrap packagingTypeId = {this.selectedPackType} location = {this.state.location} companyData = {this.state.companyData}/> : null}
                </div>
                </fieldset>
                </form>
                </div>
                </div>
                </section>
                </div>
                <Footer />
            </div>
		);
	}
}
export default AddMaterialPage