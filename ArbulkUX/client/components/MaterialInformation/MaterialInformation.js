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
        this.onChange = this.onChange.bind(this)
        this.inInventoryBags = 0

    }
    onChange(e){
        debugger
        var index = e.target.id.split(":")[0]
        this.props.lots[index-1].bagsToShip = e.target.value
    }
    onPOChange(e){
        debugger
        this.lotNumber = null
        var tempthis =this
        this.props.lastSelectedPo.po_number = e.target.value
        console.log(this.props.lastSelectedPo)
        var indexId = e.target.id.split(":")[0]
        console.log(indexId);

        this.props.lots[indexId].pi_id = e.target.value
        var MIView = createDataLoader(MaterialInformation, {
            queries: [{
                endpoint: 'TPackagingInstructions',
                filter: {
                    include : ['TPackagingInstructionLots']
                }
            }]
        });
        var totalBagsInPO =0,totalBagsOrderForPO=0
        var base = 'TPackagingInstructionLots';
        var pLotUrl = MIView._buildUrl(base, {
            "where": {and:[{"pi_id":  e.target.value },{active:1}]}
        } );
        axios.get(pLotUrl).then((response)=>{
            console.log(response)
            this.setState({
                propLotNum:response.data
            })
            this.lotNumber = _.map(this.state.propLotNum,(lotNum,index) => {
                debugger
                if(index==0){
                    tempthis.props.lots[indexId].lot_id = lotNum.id
                }
                totalBagsInPO += parseInt(lotNum.inInventory)
                let temp={target:{value:lotNum.id}}
                tempthis.GetTotalbags(temp,function(values){
                    var tempvalue = values;
                    totalBagsOrderForPO += tempvalue['totalBags']
                    tempthis.inInventoryBags = totalBagsInPO - totalBagsOrderForPO
                    tempthis.forceUpdate()
                });
                return <option key = {index} id = {lotNum.id} value = {lotNum.id} data-target={lotNum.inInventory}>{lotNum.lot_number}</option>
            })

        })
    }
    GetTotalbags(event,next)
    {
        var bags;
        var totalAllocatedbags=0;
        var MIView = createDataLoader(MaterialInformation, {
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
    onLotChange(e){
        debugger
        var lot_name=e.target.name;
        var lot_value=e.target.value;
        var selectedIndex=e.target.selectedIndex;
        var index = e.target.id.split(":")[0]
        this.props.lots[index-1].lot_id = e.target.value
        var tempThis=this;
        var totalBagsOrderForPO =0,
            totalBagsInPO = parseInt($('#'+e.target.value).attr("data-target"));
        tempThis.props.lots[index-1].inInventorybags = totalBagsInPO
        this.props.GetTotalbags(e,function(values){
            var tempvalue = values;
            totalBagsOrderForPO = tempvalue['totalBags']
            tempThis.inInventoryBags = totalBagsInPO - totalBagsOrderForPO
            tempThis.forceUpdate()
        });
    }
    render(){
        var poNumber = _.map(this.props.poNumber,(poNum,index)=>{
            return <option key={index} id={poNum} value={poNum.poNumber}>{poNum.poNumber}</option>
        })

        return (
            <div >
                <div className="form-group" id={this.props.count}>
                    <label htmlFor="Rail_Car_Number" className="col-lg-4  col-md-4 col-sm-11  col-xs-11 control-label">Purchase Order Number</label>
                    <div className="col-lg-7  col-sm-11  col-xs-11">
                        <select className="form-control"
                                id={this.props.count+":po_number"}
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
                    <div className="col-lg-7    col-sm-11 col-xs-11 " id={this.props.count+":lot"}>
                        <select
                            className="form-control"
                            id={this.props.count+":lotNumber"}
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
                    <label htmlFor="Lot_Number" className="col-lg-4  col-md-4 col-sm-11  col-xs-11 control-label">Bags To Ship</label>
                    <div className="col-lg-7    col-sm-11 col-xs-11 " >
                        <input type="number"
                               className="form-control"
                               id={this.props.count+":Lot_Number"}
                               placeholder="Bags To Ship"
                               name="noofbagsperlot"
                               onChange = {this.onChange}/>

                        <div className="error"><span></span></div>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="Lot_Number"
                           className="col-lg-4  col-md-4 col-sm-11  col-xs-11 control-label" ># Bags
                        for Lot</label>

                    <div className="col-lg-7    col-sm-11 col-xs-11 ">
                        <span style = {{color: "red"}}>{this.inInventoryBags ? this.inInventoryBags : '0'}</span>


                        <div className="error"><span></span></div>
                    </div>


                </div>



            </div>


        )
    }
}
