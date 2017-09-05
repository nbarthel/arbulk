import React from 'react';
import { createDataLoader } from 'react-loopback';
import axios from 'axios';
export default class LotInformation extends React.Component {
  constructor(props){
    super(props);
    this.state = { }
    this.inInventoryBags = 0
    this.lotNumber
  }
 /* componentWillReceiveProps(nextProps) {
    console.log(nextProps)
  }*/
  componentWillMount() {
   /* var lastSelectedPo = this.props.lastSelectedPo.po_number
     var LIView = createDataLoader(LotInformation, {
                        queries: [{
                            endpoint: 'TPackagingInstructions',
                            filter: {
                                include : ['TPackagingInstructionLots']
                            }
                        }]
                    });
                    var base = 'TPackagingInstructionLots';

                    var pLotUrl = LIView._buildUrl(base, {
                           
                        "where": {"pi_id":  lastSelectedPo }
                     } );
                 
                 //debugger
                 axios.get(pLotUrl).then((response)=>{
               this.setState({
                propLotNum:response.data
               })
            
        this.lotNumber = _.map(this.state.propLotNum,(lotNum,index) => {
            return <option key = {index} id = {lotNum.id} value = {lotNum.id}>{lotNum.lot_number}</option>
       })
           this.inInventoryBags = 0
           this.forceUpdate() 
      })*/
  }
  lotChange(e){
    let selectedValue = e.target.selectedIndex - 1 
    this.inInventoryBags = this.state.propLotNum[selectedValue].inInventory
    this.forceUpdate()
    this.props.comPo.lot_id = e.target.value
  }
    render(){
       return(
            <div>
                <div className="form-group">
                    <label for="Lot_Number" className="col-lg-4  col-md-4 col-sm-4  col-xs-4 control-label">Lot Number</label>
                    <div className="col-lg-7 col-sm-7 col-xs-7 ">
                        <select
                            className="form-control"
                            id=""
                            name="lotnumberr"
                            onChange={this.lotChange.bind(this)}
                          defaultValue = ""
                          value = {this.props.data.TPackagingInstructionLots.id}
                        >
                         <option value="" disabled >Lot Number</option>
                          {this.props.lotNumber}
                        </select>
                        <div className="error"><span></span></div>
                    </div>
                </div>
                  <div className="form-group ">
                                        <label htmlFor="Bags_To_Ship"
                                               className="col-lg-4  col-md-4 col-sm-4  col-xs-4 control-label">Bags To Ship</label>

                                        <div className="col-lg-7  col-sm-7  col-xs-7">
                                            <input type = "number" className="form-control"
                                                   id="bags_to_ship"
                                                   name="bags_to_ship"
                                                   placeholder = "Bags To Ship"
                                                   value = {this.props.data.noOfBags ? this.props.data.noOfBags : ''}
                                                   onChange = {this.props.handleLotBagsToShip}
                                                   defaultValue = ""/>



                                            <div className="error"><span></span></div>
                                        </div>
                                    </div>
                                      <div className="form-group">
                                         <label htmlFor="Lot_Number"
                                                className="col-lg-4  col-md-4 col-sm-4  col-xs-4 control-label" >No. of Bags
                                             for Lot</label>

                                         <div className="col-lg-7  col-sm-7 col-xs-7 ">
                                          <span style = {{color: "red"}}>{this.props.data.TPackagingInstructionLots.inInventory != null ? this.props.data.TPackagingInstructionLots.inInventory : 0 }</span>
                                             <div className="error"><span></span></div>
                                         </div>
                              </div>



            </div>


        )
    }
}

