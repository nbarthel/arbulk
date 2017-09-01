import React from 'react';
import '../../../public/stylesheets/style.css';
import '../../../public/stylesheets/bootstrap.min.css';
import './arrayclean.js';
import { Base_Url} from '../../../constants';
import ReactDOM from 'react-dom'
import axios from 'axios'
import SweetAlert from 'sweetalert-react';
import '../../../public/stylesheets/sweetalert.css';
import { hashHistory } from 'react-router'
var Scroll  = require('react-scroll');
var scroll     = Scroll.animateScroll;
var i =0;
var clickOnEdit = false
var initialY = 0;
var goTop = true;
var goDown = false;

class  ContainerQueueViewForm extends React.Component {
    constructor(props){
        super(props)

        this.handleSortableUpdate  = this.handleSortableUpdate.bind(this)
        this.callonEdit = this.callonEdit.bind(this)
        this._throttledMouseMove = _.throttle(this._throttledMouseMove.bind(this));
        this.selectedcontainer =[];
        this.onCheckboxChange = this.onCheckboxChange.bind(this)
        this.onViewClick = this.onViewClick.bind(this)
    }
    componentDidMount(){

    }

    onCheckboxChange(e, data) {
        this.contId = data.id
        console.log("data",data)
        this.type = data.TShipmentent.isDomestic
        console.log(">>>>>>"+ data.id );
        this.selectedcontainer.push(data.id);
    }

    callonEdit(){
        clickOnEdit = true;
        $(ReactDOM.findDOMNode(this)).sortable({
            items: 'tr',
            update: this.handleSortableUpdate
        } );
    }
    onViewClick(e) {
        if (this.contId == undefined) {
            swal("Info", "Selection missing.", "info")
            return
        }
        hashHistory.push('/Conatainer/containerDetails/' + this.contId + '/' + this.type)
    }

    handleSortableUpdate(e , selected , swapped) {
        debugger;
        initialY = 0;
        var newItems = _.clone(this.props.queueData, true);
        var $node = $(ReactDOM.findDOMNode(this));
        var ids = $node.sortable('toArray', { attribute: 'data-id' });
        var keys = $node.sortable('toArray', { attribute: 'id' });
        ids = ids.clean("");
        keys = keys.clean("")
        var newSequence = []
        ids.forEach((id, index) => {
            newSequence.push(index +1 )
            // this.props.data.queue_sequence = index;
        });
        console.log('>>>>>>>' , newSequence)
        for(var j in ids)
        {
            axios.put(Base_Url+"TContainerInternationals/" + ids[j] , {sequence : newSequence[j] }).then((response)=>{
            });
        }


    }
    _throttledMouseMove(e){

        if(clickOnEdit&&e.buttons){

            if(initialY==0)
            {
                initialY = e.clientY
            }
            if(i>4){
                if(initialY - e.clientY > 300){

                    this.ScrollUp(e.clientY-initialY-150)
                    initialY = e.clientY
                    i =0;
                    goTop = true;
                    goDown = false;
                }
                else if(e.clientY-initialY > 300){

                    this.ScrollUp(initialY-e.clientY+250)
                    initialY = e.clientY
                    i =0;
                    goTop = false;
                    goDown = true;
                }
                else if(i>4){
                    i++;
                    if(i>12){
                        if(goTop){
                            this.ScrollUp(-200)
                        }
                        else{
                            this.ScrollUp(200)
                        }
                    }
                }

            }
            else {
                i++;
            }
        }
    }
    ScrollUp(a)
    {
        scroll.scrollMore(a);

    }
    loadedOrder(){
        if (this.contId == undefined) {
            swal("Info", "Selection missing.", "info")
            return
        }
        axios.put(Base_Url+"TContainerInternationals/" + this.contId ,
            {containerLoaded : 1 }).then((response)=>{
            swal("Success","Container mark as loaded.","success")
        });
    }


    containerView() {
        hashHistory.push('/Container/containerview/')
    }
    printLoadOrder(e) {

        if (this.editId != undefined || this.contId != undefined) {
            hashHistory.push('/Shipment/shipmentPrint/' + this.editId + '/' + this.contId)
            //hashHistory.push('/Packaging/inventorycard/'+this.piID+'/'+this.selected)
        }
        else {
            swal("Selection Missing", "Please select a lot to view.", "error")
        }
    }




    render() {
        //console.log(">>>>>>>>>??<<<<<<<<<<<<<"+ JSON.stringify(this.props.queueData));
        var propsdata = (this.props.queueData && this.props.queueData.length > 0 )?this.props.queueData.reverse() : []
        var arrPropsdata = _.sortBy(propsdata, 'sequence', function(n) {
            return Math.sin(n);
        });

        arrPropsdata = arrPropsdata.reverse()
        var arrPropsdataSorted = arrPropsdata.sort(function(a, b) {
            return parseFloat(a.sequence) - parseFloat(b.sequence);
        });
        this.queueViewList = _.map(arrPropsdataSorted , (data , index) =>{
            debugger
            if(data.sequence != null){
                return(
                    <tr onDoubleClick={this.containerView.bind(this)} key={data.sequence} id = {data.sequence} data-id={data.id} className="item">
                        <td>{(data.TShipmentent && data.TShipmentent.TLocation) ? data.TShipmentent.TLocation.locationName : 'NA'} </td>
                        <td>{(data.TShipmentent && data.TShipmentent.TCompany) ? data.TShipmentent.TCompany.name : 'NA'}</td>
                        <td>{(data.TShipmentent && data.TShipmentent.TShipmentLots && data.TShipmentent.TShipmentLots.length > 0 && data.TShipmentent.TShipmentLots[0].TPackagingInstructionLots) ? data.TShipmentent.TShipmentLots[0].TPackagingInstructionLots.railcar_number  : 'NA'}</td>
                        <td>{(data.TShipmentent && data.TShipmentent.TShipmentInternational && data.TShipmentent.TShipmentInternational.length > 0) ? data.TShipmentent.TShipmentInternational[0].bookingNumber : 'NA'}</td>
                        <td>{data.containerNumber}</td>
                        <td>{data.TCompany.name}</td>
                        <td>{data.containerArrived == 1? "YES" : "NO"}</td>
                        <td>{(data.TShipmentent && data.TShipmentent.TShipmentInternational && data.TShipmentent.TShipmentInternational.length > 0 && data.TShipmentent.TShipmentInternational[0].TSteamshipLine) ? data.TShipmentent.TShipmentInternational[0].TSteamshipLine.name : 'NA'}</td>
                        <td>{(data.TShipmentent && data.TShipmentent.TShipmentInternational && data.TShipmentent.TShipmentInternational.length > 0 && data.TShipmentent.TShipmentInternational[0].TContainerType) ? data.TShipmentent.TShipmentInternational[0].TContainerType.name : 'NA'}</td>
                        <td>3 of 20</td>
                        <td>
                            <label className="control control--checkbox">
                                <input onChange={(e)=>{this.onCheckboxChange(e, data)}} type="checkbox" id="row1" /><div className="control__indicator"></div>
                            </label>
                        </td>
                    </tr>
                )
            }

        })

        return (
            <section className="view_table-queue">
                <div className="container-fluid" onMouseMove={this._throttledMouseMove}>
                    <div className="row-fluid">

                        <div className="table-responsive ">
                            <table className="table table-striped">
                                <thead className="base_bg">
                                <tr >
                                    <th>ARB </th>
                                    <th>Customer</th>
                                    <th>Railcar# </th>
                                    <th>Booking # </th>
                                    <th>Container #</th>
                                    <th>Trucker </th>
                                    <th>Arrived? </th>
                                    <th>Steamship Line </th>
                                    <th>Type </th>
                                    <th>Count </th>
                                    <th >
                                        <label className="control control--checkbox">
                                            <input type="checkbox"  id="row1"/><div className="control__indicator"></div>
                                        </label>
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.queueViewList}



                                </tbody>
                            </table>
                        </div>



                        <div className="row-fluid pddn-50-btm">

                            <div className="padding-top-btm-xs">
                                <div className="padding-20-last-l pull-left"><button type="button"    className="btn  btn-gray text-uppercase" onClick={hashHistory.goBack}>Back</button></div>
                                <div className="pull-left margin-10-all">
                                    <button type="button" onClick={(e) => this.printLoadOrder(e)}
                                            className="btn  btn-primary">Print Load Order
                                    </button>
                                </div>
                                <div className="pull-left margin-10-all">
                                    <button type="button" onClick={(e) => this.loadedOrder(e)}
                                            className="btn  btn-primary">Loaded
                                    </button>
                                </div>
                                <div className="padding-20-all pull-right"><button type="button"   id="edit_btn"  className="btn  btn-orange text-uppercase" onClick={this.callonEdit}>Edit</button></div>
                                <div className="pull-right margin-10-last-r"><button type="button" onClick={this.onViewClick} className="btn  btn-success">View</button></div>


                            </div>
                        </div>



                    </div>

                </div>

            </section>
        )
    }
}
export default ContainerQueueViewForm;
