import React from 'react';
import { createDataLoader } from 'react-loopback';
import axios from 'axios';
export default class LotInformation extends React.Component {
  constructor(props){
    super(props);
    this.state = { }
    this.inInventoryBags = 0
    this.lotNumber
    this.GetTotalbags = this.GetTotalbags.bind(this)
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
  }
  componentWillMount() {
     var lastSelectedPo = this.props.lastSelectedPo.po_number
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
      })
  }
  GetTotalbags(event,next)
  {
    var bags;
    var totalAllocatedbags=0;
    var MIView = createDataLoader(LotInformation, {
                queries: [{
                    endpoint: 'TShipmentLots'
                }]
            });
  var base = 'TShipmentLots';
    var pLotUrl = MIView._buildUrl(base, {

        "where": {"piLotsId":  event.target.value }
     } );
     console.log(pLotUrl)
    axios.get(pLotUrl).then(function(response){
      bags=response.data;
        for(var i =0;i<bags.length;i++)
        {
          totalAllocatedbags += bags[i].noOfBags;
        }
          return next({totalBags:totalAllocatedbags});

    })
  }
  lotChange(e){
    let selectedValue1 = e.target.selectedIndex - 1
    let value = e.target.value
    var obj = this;
    this.GetTotalbags(e,function(values){
      var bags=values;
      let selectedValue = selectedValue1
      obj.inInventoryBags = obj.state.propLotNum[selectedValue].inInventory
      obj.props.comPo.lot_id = value
      obj.props.comPo.inInventorybags = obj.state.propLotNum[selectedValue].inInventory - bags['totalBags']
      obj.inInventoryBags = obj.state.propLotNum[selectedValue].inInventory - bags['totalBags']
      obj.forceUpdate()

  });

  }
    render(){
       return(
            <div>
                <div className="form-group">
                    <label for="Lot_Number" className="col-lg-5  col-md-5 col-sm-11  col-xs-11 control-label">Lot Number</label>
                    <div className="col-lg-6    col-sm-11 col-xs-11 ">
                        <select
                            className="form-control"
                            id=""
                            name="lotnumberr"
                            onChange={this.lotChange.bind(this)}
                          defaultValue = ""
                        >
                         <option value="" disabled >Lot Number</option>
                          {this.lotNumber}
                        </select>
                        <div className="error"><span></span></div>
                    </div>
                </div>

                <div className="form-group ">
                    <label htmlFor="Bags_To_Ship"
                           className="col-lg-5  col-md-5 col-sm-11  col-xs-11 control-label">Bags To Ship</label>

                    <div className="col-lg-6  col-sm-11  col-xs-11">
                        <input type = "number" className="form-control"
                               id="bags_to_ship"
                               name="bags_to_ship"
                               placeholder = "Bags To Ship"
                               onChange={this.props.handlebagsToShip}
                               defaultValue = ""
                            />



                        <div className="error"><span></span></div>
                    </div>
                </div>




                <div className="form-group">
                                         <label htmlFor="Lot_Number"
                                                className="col-lg-5  col-md-5 col-sm-11  col-xs-11 control-label" >No. of Bags
                                             for Lot</label>

                                         <div className="col-lg-6    col-sm-11 col-xs-11 ">
                                          <span style = {{color: "red"}}>{this.inInventoryBags ? this.inInventoryBags : '0'}</span>


                                             <div className="error"><span></span></div>
                                         </div>
                </div>



            </div>


        )
    }
}
