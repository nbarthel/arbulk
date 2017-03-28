import React from 'react';
import { createDataLoader } from 'react-loopback';
import axios from 'axios'
export default class MaterialInformation extends React.Component {
  constructor(props){
    super(props);
    //console.log("PROPS",this.props)
    this.lotNumber
    this.inInventoryBags = 0
    this.state = {

    }
  }
   onPOChange(e){
      this.lotNumber = null
      debugger
      this.props.lastSelectedPo.po_number = e.target.value
      var MIView = createDataLoader(MaterialInformation, {
                        queries: [{
                            endpoint: 'TPackagingInstructions',
                            filter: {
                                include : ['TPackagingInstructionLots']
                            }
                        }]
                    });
                    var base = 'TPackagingInstructions';

                    var pLotUrl = MIView._buildUrl(base, {
                           include : ['TPackagingInstructionLots'],
                        "where": {"po_number":  e.target.value }
                     } );

                 //debugger
                 axios.get(pLotUrl).then((response)=>{
               this.setState({
                propLotNum:response.data
               })

        this.lotNumber = _.map(this.state.propLotNum[0].TPackagingInstructionLots,(lotNum,index) => {
            return <option key = {index} id = {lotNum.id} value = {lotNum.id}>{lotNum.lot_number}</option>
        })
      this.inInventoryBags = 0
           this.forceUpdate()
                 })
   }
   onLotChange(e){
        this.props.comPo.lot_id = e.target.value
        console.log("COMPPO",this.props.comPo)
        let selectedValue = e.target.selectedIndex - 1
        this.inInventoryBags = this.state.propLotNum[0].TPackagingInstructionLots[selectedValue].inInventory
        this.forceUpdate()
   }
    render(){
        var poNumber = _.map(this.props.poNumber,(poNum,index)=>{
            return <option key={index} id={poNum} value={poNum.poNumber}>{poNum.poNumber}</option>
        })

       return (
            <div>


                <div className="form-group ">
                    <label htmlFor="Rail_Car_Number" className="col-lg-4  col-md-4 col-sm-11  col-xs-11 control-label">Purchase Order Number</label>
                    <div className="col-lg-7  col-sm-11  col-xs-11">
                        <select className="form-control"
                                id="po_number"
                                name="po_number"
                                defaultValue = ""
                                onChange = {(e) => {this.onPOChange(e)}}>
                                <option value = "" disabled>Purchase Order Number</option>

                           {this.props.poNumber}
                        </select>
                        <div className="error"><span></span></div>
                    </div>
                </div>


                <div className="form-group">
                    <label htmlFor="Lot_Number" className="col-lg-4  col-md-4 col-sm-11  col-xs-11 control-label">Lot Number</label>
                    <div className="col-lg-7    col-sm-11 col-xs-11 ">
                        <select
                            className="form-control"
                            id="lotNumber"
                            name="lotNumber"
                            onChange={this.onLotChange.bind(this)}
                            defaultValue = ""
                            >
                            <option value = "" disabled>Lot Number</option>
                            {this.lotNumber}
                        </select>
                        <div className="error"><span></span></div>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="Lot_Number" className="col-lg-4  col-md-4 col-sm-11  col-xs-11 control-label">No. of Bags  for Lot</label>
                    <div className="col-lg-7    col-sm-11 col-xs-11 ">
                        <input type="text"
                               className="form-control"
                               id="Lot_Number"
                               placeholder="No. of Bags  for Lot"
                               name="noofbagsperlot"
                               disabled
                               value = {this.inInventoryBags}/>

                        <div className="error"><span></span></div>
                    </div>
                </div>



            </div>


        )
    }
}
