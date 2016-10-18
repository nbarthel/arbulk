import React from 'react';

export default class RailcarInformation extends React.Component {
	constructor(props){
		super(props);
		/*this.obj= {}
    	this.railCarObjects=[]
   		this.state={ railCarInfoList: [],
    	index:0, 
    	tempArray:[]}
    	this.onChange=this.onChange.bind(this);*/
    	this.state = { }
    	//this.handleRailCarNumberChange = this.handleRailCarNumberChange.bind(this)
	}

/*	handleRailCarNumberChange(e){
		this.props.handleRailCarNumberEdit(e,this.props.id)
	} */
   	//this.props.onChange(e.target.value)
   	/*
   	this.obj[e.target.name]=e.target.value;
   	this.state.tempArray[this.state.index]=this.obj
   	var count = this.state.index+1
   	this.setState({
   		index:count,tempArray:this.state.tempArray
   	})
   	console.log(this.state.tempArray)*/
   //}
  /* onAdd(e) {
	this.railCarObjects.push(this.obj)
	console.log(this.railCarObjects)
	const railCarInfoList = this.state.railCarInfoList;
	this.state.tempArray[this.state.index]=this.obj
   	var count = this.state.index+1
	this.setState({
		index:count,
		tempArray:this.state.tempArray,
		railCarInfoList	: railCarInfoList.concat(<RailcarInformation key={railCarInfoList.length}/>)
		})*/



	  render() {
	   return (
    	<div>
       		<div className="form-group ">
					<label htmlFor="Rail_Car_Number" className="col-lg-4 col-md-4 col-sm-11  col-xs-11 control-label">Rail Car Number</label>
					<div className="col-lg-7    col-sm-11 col-xs-11 ">
					 {
					 this.props.data != undefined ? 
					  <input 
					  type="text"
					  name="railcar_number" 
					  className="form-control" 
					  id="Rail_Car_Number"
					  ref={this.props.id}
					  placeholder="Rail Car Number"
					  onChange={this.props.handleRailCarNumberEdit}
					  value={this.props.data.railcar_number}
					   />
					   :
					  <input 
					  type="text"
					  name="railcar_number" 
					  className="form-control" 
					  id="Rail_Car_Number" 
					  placeholder="Rail Car Number"
					  onChange={this.props.onChange}
					  value={this.state.railcarnumber}
					   /> 
					}																																
					  <div className="error"><span></span></div>
					</div>
            </div>
				
				<div className="form-group">
					<label htmlFor="Lot_Number" className="col-lg-4 col-md-4 col-sm-11  col-xs-11 control-label">Lot Number</label>
					<div className="col-lg-7    col-sm-11 col-xs-11 ">
					    {this.props.data != undefined ? 
					     <input 
					     type="text" 
					     className="form-control" 
					     id="Lot_Number"
					     ref={this.props.id}
					     placeholder="Lot Number"
					     name="lot_number" 
					     onChange={this.props.handleLotNumberEdit}
					     value={this.props.data.lot_number}/>
					     :
					     <input 
					     type="text" 
					     className="form-control" 
					     id="Lot_Number" 
					     placeholder="Lot Number"
					     name="lot_number" 
					     onChange={this.props.onChange}
					     value={this.state.lotnumber}/> 
					 }
					  <div className="error"><span></span></div>
					</div>
                </div>
				
				<div className="form-group">
					<label htmlFor="Weight" className="col-lg-4 col-md-4 col-sm-11  col-xs-11 control-label">Weight</label>
					<div className="col-lg-7    col-sm-11 col-xs-11 ">
					    {this.props.data != undefined ? 
					    <input 
					    type="number"
					    className="form-control" 
					    id="Weight"
					    ref={this.props.id} 
					    placeholder="Enter in lbs"
					    name="weight" 
					    onChange={this.props.handleWeightEdit}
					    value={this.props.data.weight} /> 
					    :
					    <input 
					    type="number"
					    className="form-control" 
					    id="Weight" 
					    placeholder="Enter in lbs"
					    name="weight" 
					    onChange={this.props.onChange}
					    value={this.state.weight} /> 
					}
					  <div className="error"><span></span></div>
					</div>
				</div>
		
			</div>
    );
  }
}
