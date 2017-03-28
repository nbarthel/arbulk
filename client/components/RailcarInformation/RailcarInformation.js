import React from 'react';
export default class RailcarInformation extends React.Component {
	constructor(props){
		super(props);
    	this.state = { }
			this.add = this.add.bind(this)
			this.minus = this.minus.bind(this)

	}
	add(){
		this.props.AddRailCarForProps()
	}
	minus(e){
		this.props.MinusRailCarFromProps(e)
	}

componentDidMount(){
	var i =1
	document.getElementById('minus'+0).style.display = 'none'
	while(true){
		if(document.getElementById('add'+i)){
			document.getElementById('add'+i).style.display = 'none'
			if(this.props.lotInfo[i].id!=0){
				document.getElementById('minus'+i).style.display = 'none'
			}
			i++
		}
		else{
			i=0
			break
		}
	}
}

	  render() {
	   return (
    	<div>
       		<div className="form-group ">
					<label htmlFor="Rail_Car_Number" className="col-lg-3 col-md-3 col-sm-11  col-xs-11 control-label">Railcar #</label>
					<div className="col-lg-8    col-sm-11 col-xs-11 ">
					 {
					 this.props.data != undefined ?
					  <input
					  type="text"
					  name="railcar_number"
					  className="form-control"
						id={this.props.idd!==undefined?"Rail_Car_Number"+this.props.idd:"Rail_Car_Number"}
					  ref={this.props.id}
					  placeholder="Railcar #"
					  onChange={this.props.handleRailCarNumberEdit}
					  value={this.props.data.railcar_number}
					   />
					   :
					  <input
					  type="text"
					  name="railcar_number"
					  className="form-control"
					  id={this.props.idd!==undefined?"Rail_Car_Number"+this.props.idd:"Rail_Car_Number"}
					  placeholder="Railcar #"
					  onChange={this.props.onChange}
					  value={this.state.railcarnumber}
					   />
					}

					  <div className="error"><span></span></div>
					  	</div>
						 {this.props.haveProps=="1"?
							<div id={this.props.idForadd} className="col-lg-1 col-md-1 col-sm-1 col-xs-1 add_btn text_left">
						 <i className="fa-2x fa fa-plus base_color" onClick={this.add} aria-hidden="true"></i>
						</div>:<div>
						</div>}
						{
							this.props.haveProps=="1"?
							<div className="col-lg-1 col-md-1 col-sm-1 col-xs-1 add_btn text_left" id={this.props.idForminus}>
								<i className="fa-2x fa fa-minus base_color" id={"click"+this.props.idForminus} onClick={this.minus} aria-hidden="true"></i>
							</div>:<div></div>
						}

            </div>

				<div className="form-group">
					<label htmlFor="Lot_Number" className="col-lg-3 col-md-3 col-sm-11  col-xs-11 control-label">Lot #</label>
					<div className="col-lg-8   col-sm-11 col-xs-11 ">
					    {this.props.data != undefined ?
					     <input
					     type="text"
					     className="form-control"
					     id={this.props.idd!==undefined?"Lot_Number"+this.props.idd:"Lot_Number"}
					     ref={this.props.id}
					     placeholder="Lot #"
					     name="lot_number"
					     onChange={this.props.handleLotNumberEdit}
					     value={this.props.data.lot_number}/>
					     :
					     <input
					     type="text"
					     className="form-control"
					     id={this.props.idd!==undefined?"Lot_Number"+this.props.idd:"Lot_Number"}
					     placeholder="Lot #"
					     name="lot_number"
					     onChange={this.props.onChange}
					     value={this.state.lotnumber}/>
					 }
					  <div className="error"><span></span></div>
					</div>
                </div>

				<div className="form-group">
					<label htmlFor="Weight" className="col-lg-3 col-md-3 col-sm-11  col-xs-11 control-label">Weight</label>
					<div className="col-lg-8   col-sm-11 col-xs-11 ">
					    {this.props.data != undefined ?
					    <input
					    type="number"
					    className="form-control"
					    id={this.props.idd!==undefined?"Weight"+this.props.idd:"Weight"}
					    ref={this.props.id}
					    placeholder="Enter Weight"
					    name="weight"
					    onChange={this.props.handleWeightEdit}
					    value={this.props.data.weight} />
					    :
					    <input
					    type="number"
					    className="form-control"
					    id={this.props.idd!==undefined?"Weight"+this.props.idd:"Weight"}
					    placeholder="Enter Weight"
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
