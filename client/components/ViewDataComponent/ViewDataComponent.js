'use strict';

import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import  { PropTypes } from 'react';
import { createDataLoader } from 'react-loopback';

import request from '../../utils/request';
import { Base_Url } from '../../constants'
var moment = require('moment');
import './js/tableHeadFixer.js'
import './js/jquery.dataTables.min.js';
import './js/jquery.dragtable.js';
import './stylesheet/dragtable.css';
import './js/jquery-sortable-min.js'
var Loader = require('react-loader');
var sortedDataflag = false
var sortedData = []
var flagSorting = false
const MUL_FACTOR = 2.204625
var grouping = false;
var headerArr=  [{col_Name:"ARB",index:1},{col_Name:"Customer",index:2}, {col_Name:"PO#",index:3},{col_Name:"Railcar#",index:4},{col_Name:"Lot#",index:5},
    ,{col_Name:"Material",index:6},{col_Name:"Confirmed?",index:7},{col_Name:"Arrived?",index:8},{col_Name:"Shipment Received?",index:9},
    {col_Name:"Cutoff",index:10},{col_Name:"Weight",index:11},{col_Name:"Qty Allocated",index:12},
    {col_Name:"Qty Packaged",index:13},{col_Name:"Status",index:14},{col_Name:"Railcar Arrival",index:15},{col_Name:"Railcar Arrival Date",index:16},{col_Name:"Railcar Departure",index:17},{col_Name:"Railcar Departure Date",index:18},
    {col_Name:"Railcar Days Present",index:19}, {col_Name:"Railcar Status",index:20}]
class ViewDataComponent extends React.Component {

    constructor(props) {
        super(props);
        this.isAsc = false
        this.state = {
        loaded: false,

    }
        this.PIData = {}
        this.myObj = {}
        this.qArray = []
        this.checkclick = this.checkclick.bind(this);
        //this.onAscending = this.onAscending.bind(this)
        this.onToggel = this.onToggel.bind(this)
        this.onClickRow = this.onClickRow.bind(this)
        this.press = this.press.bind(this)
        this.onGroupBy = this.onGroupBy.bind(this);
    }


    press(e) {

    }

    componentWillMount() {

        let id = this.props.id
        if (this.props.id != undefined) {
            var PIview = createDataLoader(ViewDataComponent, {
                queries: [{
                    endpoint: 'TPackagingInstructions',
                    filter: {
                        include: ['TPackagingInstructionLots', {
                            "relation": "TPackagingInstructions",
                            "scope": {"include": ["TLocation"]},
                            "where": {"active": "1"}
                        }
                        ]
                    }
                }]
            })

            var base = 'TPackagingInstructions' + '/' + id;
            this.url = PIview._buildUrl(base, {
                include: ['TPackagingInstructionLots', "TLocation", "TCompany"]
            })

            $.ajax({
                url: this.url,
                success: function (data) {
                    console.log('ajax ', data);
                    this.setState({
                        viewData: [data],
                        loaded: true
                    })
                    var tableData = JSON.parse(localStorage.getItem('piViewData'))
                    if (tableData && tableData.length > 0) {
                        this.setState({
                            viewData: tableData
                        })
                    }
                }.bind(this)

            })

            axios.get(Base_Url + "TPackagingInstructionLots/getMaxQueue").then(response=> {
                this.setState({
                    queue_Sequence: response.data
                })
            })


        }
        else {

            var PIview = createDataLoader(ViewDataComponent, {
                queries: [{
                    endpoint: 'TPackagingInstructions',
                    filter: {
                        include: ['TPackagingInstructionLots',
                            {
                                "relation": "TPackagingInstructions",
                                "scope": {"include": ["TLocation"]},
                                "where": {"active": "1"}
                            }]
                    }
                }]
            })
            var base = 'TPackagingInstructions';

            this.url = PIview._buildUrl(base, {

                include: [
                    {
                        "relation": "TPackagingInstructionLots",
                        "scope": {
                            "include": {
                                "relation": "TShipmentLots",
                                "scope": {
                                    "include": {
                                        "relation": "TShipmentent",
                                        "scope": {"include": "TShipmentInternational"}
                                    }
                                }
                            },
                            "where": {active: 1}
                        }
                    },
                    "TLocation",
                    "TCompany"]


            });

            $.ajax({
                url: this.url,
                success: function (data) {
                    this.setState(
                        {
                            viewData: data,
                            loaded: true
                        }
                    )
                    var tableData = JSON.parse(localStorage.getItem('piViewData'))
                    if (tableData && tableData.length > 0) {
                        this.setState({
                            viewData: tableData
                        })
                    }
                }.bind(this)
            })

            axios.get(Base_Url + "TPackagingInstructionLots/getMaxQueue").then(response=> {

                this.setState({
                    queue_Sequence: response.data
                })
            })


        }
    }

    componentDidMount() {

        $(function () {
            setTimeout(function () {
                $("#Packaging_Instruction_View").tableHeadFixer({'head': true});
                var oldIndex;
                $('.sorted_head tr').sortable({
                    containerSelector: 'tr',
                    itemSelector: 'th',
                    vertical: false,
                    onDragStart: function ($item, container, _super) {

                        oldIndex = $item.index();
                      //  console.log("Drag",oldIndex);
                        $item.appendTo($item.parent());
                        _super($item, container);
                    },
                    onDrop: function  ($item, container, _super) {

                        var field,tmp,
                            newIndex = $item.index();
                        if(newIndex != oldIndex) {
                           // console.log("drop",newIndex);
                                $item.closest('table').find('tbody tr').each(function (i, row) {
                                    row = $(row);
                                    if(newIndex < oldIndex) {
                                        row.children().eq(newIndex).before(row.children()[oldIndex]);
                                    } else if (newIndex > oldIndex) {
                                        row.children().eq(newIndex).after(row.children()[oldIndex]);
                                    }
                                });
                        }

                        _super($item, container);
                    }




            });

                //jQuery('#Packaging_Instruction_View').dragtable({maxMovingRows:1,dragHandle:'.some-handle'});
            }, 5000);

        });



    }

    checkclick(data, value) {
        var queueArray = []
        this.qArray.push(value.id)
        localStorage.setItem('qArray', this.qArray)
        localStorage.setItem('queue_Sequence', this.state.queue_Sequence[0].max_mark)
        console.log("clicked>>>>>>>>", value)
    }
    onGroupBy(e,head){
        debugger
        var groupData = _.groupBy(this.state.viewData, function (item){
            return (item.TPackagingInstructionLots != undefined ? (item.TPackagingInstructionLots[0] ? item.TPackagingInstructionLots[0].lot_number.toLowerCase() : '') : '');
        })
        this.setState({
            viewData: groupData
        })
        localStorage.setItem('piViewData', JSON.stringify(groupData));
        grouping = true
    }
    onAscending(e, head) {
        console.log(e);
        console.log(head);
        sortedDataflag = true;
        flagSorting = true;
        var switchvalue = head;
        var tempThis = this
        switch (switchvalue) {
            case 'location':
                sortedData = _.sortBy(this.state.viewData, function (item) {
                    return item.TLocation.locationName.toLowerCase();
                });
                break;
            case 'company':
                sortedData = _.sortBy(this.state.viewData, function (item) {
                    return item.TCompany.name.toLowerCase();
                });
                break;
            case 'po_number':
                sortedData = _.sortBy(this.state.viewData, function (item) {
                    if (item.po_number != "") {
                        return item.po_number.toLowerCase();
                        ;
                    }
                });
                break;
            case 'railcar_number':
                sortedData = _.sortBy(this.state.viewData, function (item) {
                    return (item.TPackagingInstructionLots != undefined ? (item.TPackagingInstructionLots[0] ? item.TPackagingInstructionLots[0].railcar_number.toLowerCase() : '') : '');
                });
                break;
            case 'lot_number':
                sortedData = _.sortBy(this.state.viewData, function (item) {
                    return (item.TPackagingInstructionLots != undefined ? (item.TPackagingInstructionLots[0] ? item.TPackagingInstructionLots[0].lot_number.toLowerCase() : '') : '');
                });
                break;
            case 'Material':
                sortedData = _.sortBy(this.state.viewData, function (item) {
                    return item.material.toLowerCase();
                });
                break;
            case 'Confmd':
                sortedData = _.sortBy(this.state.viewData, function (item) {
                    if (item.TPackagingInstructionLots.length > 0) {
                        if (item.TPackagingInstructionLots[0].status != "UNCONFIRMED") {
                            return item.TPackagingInstructionLots[0].status.toLowerCase();
                        }
                    }
                });
                break;
            case 'Arrvd':
                sortedData = _.sortBy(this.state.viewData, function (item) {

                    if (item.TPackagingInstructionLots.length > 0) {
                        if (item.TPackagingInstructionLots[0].railcar_arrived_on != null)
                            return item.TPackagingInstructionLots[0]
                    }
                });
                break;
            case 'Recd':
                sortedData = _.sortBy(this.state.viewData, function (item) {
                    if (item.TPackagingInstructionLots.length > 0) {
                        if (item.TPackagingInstructionLots[0].status == "SHIPPED") {
                            return item.TPackagingInstructionLots[0].toLowerCase();
                        }
                    }
                });
                break;
            case 'cuttoff':
                sortedData = _.sortBy(this.state.viewData, function (item) {
                    TShipmentLots[0].TShipmentent.TShipmentInternational[0].cargoCutoffDate
                    if (item.TPackagingInstructionLots.length > 0 && item.TPackagingInstructionLots[0].TShipmentLots.length > 0) {
                        if (item.TPackagingInstructionLots[0].TShipmentLots.TShipmentent != undefined && item.TPackagingInstructionLots[0].TShipmentLots.TShipmentent.TShipmentInternational.length > 0) {
                            return item.TPackagingInstructionLots[0].TShipmentLots[0].TShipmentent.TShipmentInternational[0].cargoCutoffDate
                        }
                    }
                });
                break;
            case 'weight':
                sortedData = _.sortBy(this.state.viewData, function (item) {
                    return (item.TPackagingInstructionLots != undefined ? (item.TPackagingInstructionLots[0] ? item.TPackagingInstructionLots[0].weight : '') : '');
                });
                break;
            case 'Bags':
                sortedData = _.sortBy(this.state.viewData, function (item) {

                    var len, sum = 0;

                    if (item.TPackagingInstructionLots.length > 0 && item.TPackagingInstructionLots[0].TShipmentLots.length > 0) {
                        for (var i = 0; i < tempThis.props.contanerLoad.length; i++) {
                            if (tempThis.props.contanerLoad[i].lotId == item.TPackagingInstructionLots[0].id) {
                                sum = sum + tempThis.props.contanerLoad[i].noOfBags
                            }
                        }
                    }
                    else {
                        return 0;
                    }
                    return sum
                });
                break;
            case 'InInvt':
                sortedData = _.sortBy(this.state.viewData, 'Number', function (item) {
                    var len, sum = 0;
                    if (item.TPackagingInstructionLots.length > 0 && item.TPackagingInstructionLots[0].TShipmentLots.length > 0) {
                        for (var i = 0; i < tempThis.props.contanerLoad.length; i++) {
                            if (tempThis.props.contanerLoad[i].lotId == item.TPackagingInstructionLots[0].id) {
                                sum = parseInt(sum) + parseInt(tempThis.props.contanerLoad[i].noOfBags)
                            }
                        }
                    }
                    else {

                        return 0
                    }
                    return parseInt(item.TPackagingInstructionLots[0].inInventory) - parseInt(sum)
                });
                break;
            case 'Status':
                sortedData = _.sortBy(this.state.viewData, function (item) {
                    if (item.TPackagingInstructionLots.length > 0) {
                        return item.TPackagingInstructionLots[0].status.toLowerCase();
                    }
                    return 'A'
                });
                break;
            case 'RailcarArrival':
                sortedData = _.sortBy(this.state.viewData, function (item) {
                    if (item.TPackagingInstructionLots.length > 0 && item.TPackagingInstructionLots[0].TShipmentLots.length > 0) {
                        if (item.TPackagingInstructionLots[0].arrived != 1) {
                            return 0
                        }
                    }
                    return 1
                });
                break;
            case 'RailcarArrivalDate':
                sortedData = _.sortBy(this.state.viewData, function (item) {
                    if (item.TPackagingInstructionLots.length > 0 && item.TPackagingInstructionLots[0].railcar_arrived_on != null) {

                        return item.TPackagingInstructionLots[0].railcar_arrived_on
                    }
                    return "01-01-0001";
                });
                break;
            case 'RailcarDeparture':
                sortedData = _.sortBy(this.state.viewData, function (item) {
                    if (item.TPackagingInstructionLots.length > 0 && item.TPackagingInstructionLots[0].railcar_departed_on != null) {

                        return "Yes"
                    }
                    return "No"
                });
                break;
            case 'RailcarDepartureDate':
                sortedData = _.sortBy(this.state.viewData, function (item) {
                    if (item.TPackagingInstructionLots.length > 0 && item.TPackagingInstructionLots[0].railcar_departed_on != null) {
                        return item.TPackagingInstructionLots[0].railcar_departed_on
                    }
                    return "01-01-0001";
                });
                break;
            case 'RailcarDaysPresent':
                sortedData = _.sortBy(this.state.viewData, function (item) {
                    if (item.TPackagingInstructionLots.length > 0) {
                        if (item.TPackagingInstructionLots[0].railcar_arrived_on != null && item.TPackagingInstructionLots[0].railcar_departed_on != null) {
                            let start = new Date(moment(item.TPackagingInstructionLots[0].railcar_arrived_on).format("MM-DD-YYYY"))
                            let end = new Date(moment(item.TPackagingInstructionLots[0].railcar_departed_on).format("MM-DD-YYYY"))
                            var diff = parseInt((end - start ) / (1000 * 60 * 60 * 24))
                            return diff
                        }
                        return 0
                    }
                });
                break;
            case 'RailcarStatus':
                sortedData = _.sortBy(this.state.viewData, function (item) {
                    if (item.TPackagingInstructionLots.length > 0) {
                        return item.TPackagingInstructionLots[0].railcar_status.toLowerCase();
                    }
                });
                break;
            default:
                sortedData = _.sortBy(this.state.viewData, function (item) {
                    return item.id
                });
        }

        if (this.isAsc == false) {
            this.isAsc = true;
        }
        else {
            sortedData = sortedData.reverse()
            this.isAsc = false;
        }
        this.setState({
            viewData: sortedData
        })
        localStorage.setItem('piViewData', JSON.stringify(sortedData));
        //this.onGroupBy(e,head)
    }

    onToggel(e, elm) {
        $("button").click(function () {
            $("p").slideToggle("slow");
        });
    }

    onClickRow(e) {
        var rowObj = $(this.refs.clickable)

        var aa = e.target.getAttribute('data-target')

        if ($('#Packaging_Instruction_View').find('.' + aa).length >= 2) {
            $('#Packaging_Instruction_View').find('.' + aa).toggleClass('hide')
        }
        else {
            $('#Packaging_Instruction_View').find('.' + aa).toggleClass('hide')
        }
    }


    render() {

        var filterData
        if (!flagSorting) {
            filterData = this.props.filterData

            if (filterData.constructor === Array) {
                this.state.viewData = filterData
            }
        }
        else {
            filterData = sortedData

            flagSorting = false
        }
        var selectedWeight = this.props.weight;

        var listData = _.map(this.state.viewData, (view, index)=> {
                if (view.TPackagingInstructionLots.length > 0) {
                    var count = index;
                    return (
                        <tbody key={index}>
                        <tr className="base_bg clickable" ref="clickable">
                            <td>
                                <label className="control control--checkbox">
                                    <input type="checkbox" onChange={(e)=>{this.props.headerCheckboxChange(e,view)}}
                                           value={view.id} id={view.id}/>
                                    <div className="control__indicator"></div>
                                </label>
                            </td>
                            <td style={{display : this.props.showARB}}>
                                <i className="fa fa-chevron-down"
                                                                          aria-hidden="false" data-target={count}
                                                                          onClick={(e) => {this.onClickRow(e)}}></i> {view.TLocation ? view.TLocation.locationName : ''}
                            </td>
                            <td style={{display : this.props.showCustomer}}> {view.TCompany ? view.TCompany.name : ''}</td>
                            <td style={{display : this.props.showPO}}>{view.po_number} </td>
                            <td style={{display : this.props.Railcar}}></td>
                            <td style={{display : this.props.showMaterial}}></td>
                            <td style={{display : this.props.showConfmd}}></td>
                            <td style={{display : this.props.showArrvd}}></td>
                            <td style={{display : this.props.showRecd}}></td>
                            <td style={{display : this.props.showCutoff}}></td>
                            <td style={{display : this.props.showWeight}}></td>
                            <td style={{display : this.props.showBag}}></td>
                            <td style={{display : this.props.showInInvt}}></td>
                            <td style={{display : this.props.showStatus}}></td>
                            <td style={{display : this.props.showRailcarArr}}></td>
                            <td style={{display : this.props.showRailcarArrD}}></td>
                            <td style={{display : this.props.showRailcarDep}}></td>
                            <td style={{display : this.props.showRailcarDepDate}}></td>
                            <td style={{display : this.props.showDaysPresent}}></td>
                            <td></td>
                            <td style={{display : this.props.showRailcarStatus}}></td>

                        </tr>
                        {
                            _.map(view.TPackagingInstructionLots, (data, index)=> {
                                    let diff;
                                    var bagsallocated = 0
                                    if (this.props.contanerLoad != undefined) {
                                        for (var i = 0; i < this.props.contanerLoad.length; i++) {
                                            if (this.props.contanerLoad[i].lotId == data.id) {
                                                bagsallocated = bagsallocated + this.props.contanerLoad[i].noOfBags
                                            }
                                        }
                                    }
                                    var sdate = document.getElementById('startDate').value
                                    var edate = document.getElementById('endDate').value
                                    if ((sdate == "" || edate == "") || data.TShipmentLots.length > 0) {
                                        var t = false;
                                        var c = false;
                                        if (sdate != "" || edate != "") {
                                            t = true;
                                            if (
                                                data.TShipmentLots[0].TShipmentent != undefined
                                                &&
                                                data.TShipmentLots[0].TShipmentent.TShipmentInternational != undefined
                                                &&
                                                data.TShipmentLots[0].TShipmentent.TShipmentInternational.length > 0
                                            ) {
                                                if (
                                                    new Date(data.TShipmentLots[0].TShipmentent.TShipmentInternational[0].cargoCutoffDate) >= new Date(sdate)
                                                    &&
                                                    new Date(data.TShipmentLots[0].TShipmentent.TShipmentInternational[0].cargoCutoffDate) <= new Date(edate)
                                                ) {
                                                    c = true
                                                }
                                            }
                                            else if (data.TShipmentLots[0].TShipmentent != undefined && data.TShipmentLots[0].TShipmentent.TShipmentDomestic != undefined &&
                                                data.TShipmentLots[0].TShipmentent.TShipmentDomestic.length > 0) {
                                                if (new Date(data.TShipmentLots[0].TShipmentent.TShipmentDomestic[0].cargoCutoffDate) >= new Date(sdate) && new Date(data.TShipmentLots[0].TShipmentent.TShipmentDomestic[0].cargoCutoffDate) <= new Date(edate)) {
                                                    c = true;
                                                }
                                            }
                                        }
                                        if ((t && c) || (!t)) {
                                            if (data.railcar_arrived_on != null && data.railcar_departed_on != null) {
                                                let start = new Date(moment(data.railcar_arrived_on).format("MM-DD-YYYY"))
                                                let end = new Date(moment(data.railcar_departed_on).format("MM-DD-YYYY"))
                                                diff = parseInt((end - start ) / (1000 * 60 * 60 * 24))
                                            }

                                            var bagShipped = 0;
                                            if (data.TShipmentLots && data.TShipmentLots.length > 0) {
                                                for (var tempi in data.TShipmentLots) {
                                                    bagShipped += data.TShipmentLots[tempi].noOfBags
                                                }
                                            }

                                            return (
                                                <tr key={index} className={count}>
                                                    <td>
                                                        <label className="control control--checkbox">
                                                            <input type="checkbox"
                                                                   onClick={(e) => this.checkclick(e,data)}
                                                                   onChange={(e)=>{this.props.checkboxChange(e,data)}}
                                                                   value={view.id}
                                                                   id={view.TPackagingInstructionLots[index].id}/>

                                                            <div className="control__indicator"></div>
                                                        </label>
                                                    </td>
                                                    <td style={{display : this.props.showARB}}></td>
                                                    <td style={{display : this.props.showCustomer}}></td>
                                                    <td style={{display : this.props.showPO}}></td>
                                                    <td style={{display : this.props.Railcar}}>{data.railcar_number ? data.railcar_number : ''}</td>
                                                    <td style={{display : this.props.showLot}}>{data.lot_number ? data.lot_number : ''}</td>
                                                    <td style={{display : this.props.showMaterial}}>{view.material}</td>
                                                    <td style={{display : this.props.showConfmd}}>{data.status == "UNCONFIRMED" ? 'NO' : 'YES'}</td>
                                                    <td style={{display : this.props.showArrvd}}>{data.railcar_arrived_on != null ? 'YES' : 'NO'}</td>
                                                    <td style={{display : this.props.showRecd}}>{(data.TShipmentLots && data.TShipmentLots.length > 0 && data.status != "SHIPPED") ? "YES" : "NO"}</td>
                                                    <td style={{display : this.props.showCutoff}}>{(data.TShipmentLots && data.TShipmentLots.length > 0 && data.TShipmentLots[0].TShipmentent && data.TShipmentLots[0].TShipmentent.TShipmentInternational && data.TShipmentLots[0].TShipmentent.TShipmentInternational.length > 0 ) ? moment(data.TShipmentLots[0].TShipmentent.TShipmentInternational[0].cargoCutoffDate).format("MM-DD-YYYY") : 'NA'}</td>
                                                    <td style={{display : this.props.showWeight}}>{selectedWeight == 'lbs' ? data.weight : (data.weight / MUL_FACTOR).toFixed(2)}</td>
                                                    <td style={{display : this.props.showBag}}>{bagsallocated > 0 ? bagsallocated : 0}</td>
                                                    <td style={{display : this.props.showInInvt}}>{(data.inInventory && bagsallocated > 0) ? (data.inInventory - bagsallocated ) : parseInt(data.inInventory) > 0 ? parseInt(data.inInventory) : 0 }</td>
                                                    <td style={{display : this.props.showStatus}}>{data.status ? data.status : '' }</td>
                                                    <td style={{display : this.props.showRailcarArr}}>{data.arrived != null && data.arrived == 1 ? "Yes" : "No"}</td>
                                                    <td style={{display : this.props.showRailcarArrD}}>{data.railcar_arrived_on != null ? moment(data.railcar_arrived_on).format("MM-DD-YYYY") : "N/A"}</td>
                                                    <td style={{display : this.props.showRailcarDep}}>{data.railcar_departed_on != null ? "YES" : "NO"}</td>
                                                    <td style={{display : this.props.showRailcarDepDate}}>{data.railcar_departed_on != null ? moment(data.railcar_departed_on).format("MM-DD-YYYY") : "N/A"}</td>
                                                    <td style={{display : this.props.showDaysPresent}}>{diff ? diff + 1 : 'N/A'}</td>
                                                    <td style={{display : this.props.showRailcarStatus}}>{data.railcar_status ? data.railcar_status : ''}</td>

                                                </tr>
                                            )
                                        }
                                    }
                                }
                            )
                        }
                        </tbody>
                    )
                }
            }
        );

        listData = _.filter(listData, function (param) {
            return param !== undefined;
        });

        return (

            <Loader loaded={this.state.loaded} id="loaded">
                <div className="loadedContentNew">

                    <table id="Packaging_Instruction_View" className="table table-expandable sort" cellSpacing="0">
                        <thead id="table_head1" className="table_head header-fixed header red sorted_head">
                        <tr className="sorting_head header-fixed" style={{"backgroundColor" : "#2e6da4"}}>
                            <th>

                            </th>
                            <th style={{display : this.props.showARB }} onKeyDown={(e)=>this.press(e)}
                                onClick={(e)=> this.onAscending(e,'location')}>
                              ARB
                                <span className="fa-stack ">
                               <i className="fa fa-sort-asc fa-stack-1x"></i>
                               <i className="fa fa-sort-desc fa-stack-1x"></i>
                           </span>
                            </th>
                            <th style={{display : this.props.showCustomer}}
                                onClick={(e)=> this.onAscending(e,'company')}>Customer

                                <span className="fa-stack ">
                               <i className="fa fa-sort-asc fa-stack-1x"></i>
                               <i className="fa fa-sort-desc fa-stack-1x"></i>
                       </span>

                            </th>
                            <th style={{display : this.props.showPO}} onClick={(e)=> this.onAscending(e,'po_number')}>PO#
                                <span className="fa-stack ">
                               <i className="fa fa-sort-asc fa-stack-1x"></i>
                               <i className="fa fa-sort-desc fa-stack-1x"></i>
                       </span>
                            </th>
                            <th style={{display : this.props.Railcar}}
                                onClick={(e)=> this.onAscending(e,'railcar_number')}>Railcar#
                                <span className="fa-stack ">
                               <i className="fa fa-sort-asc fa-stack-1x"></i>
                               <i className="fa fa-sort-desc fa-stack-1x"></i>
                       </span>
                            </th>
                            <th style={{display : this.props.showLot}} onClick={(e)=> this.onAscending(e,'lot_number')}>
                                Lot#
                                <span className="fa-stack ">
                               <i className="fa fa-sort-asc fa-stack-1x"></i>
                               <i className="fa fa-sort-desc fa-stack-1x"></i>
                       </span>

                            </th>
                            <th style={{display : this.props.showMaterial}}
                                onClick={(e)=> this.onAscending(e,'Material')}>Material
                                <span className="fa-stack ">
                               <i className="fa fa-sort-asc fa-stack-1x"></i>
                               <i className="fa fa-sort-desc fa-stack-1x"></i>
                       </span>

                            </th>
                            <th style={{display : this.props.showConfmd}} onClick={(e)=> this.onAscending(e,'Confmd')}>
                                Confirmed?
                                <span className="fa-stack ">
                               <i className="fa fa-sort-asc fa-stack-1x"></i>
                               <i className="fa fa-sort-desc fa-stack-1x"></i>
                       </span>
                            </th>
                            <th style={{display : this.props.showArrvd}} onClick={(e)=> this.onAscending(e,'Arrvd')}>
                                Arrived?
                                <span className="fa-stack ">
                               <i className="fa fa-sort-asc fa-stack-1x"></i>
                               <i className="fa fa-sort-desc fa-stack-1x"></i>
                       </span>

                            </th>
                            <th style={{display : this.props.showRecd}} onClick={(e)=> this.onAscending(e,'Recd')}>Shipment Received?
                                <span className="fa-stack ">
                               <i className="fa fa-sort-asc fa-stack-1x"></i>
                               <i className="fa fa-sort-desc fa-stack-1x"></i>
                       </span>

                            </th>
                            <th style={{display : this.props.showCutoff}} onClick={(e)=> this.onAscending(e,'Cutoff')}>
                                Cutoff
                                <span className="fa-stack ">
                               <i className="fa fa-sort-asc fa-stack-1x"></i>
                               <i className="fa fa-sort-desc fa-stack-1x"></i>
                       </span>

                            </th>
                            <th style={{display : this.props.showWeight}} onClick={(e)=> this.onAscending(e,'weight')}>
                                Weight
                                <span className="fa-stack ">
                               <i className="fa fa-sort-asc fa-stack-1x"></i>
                               <i className="fa fa-sort-desc fa-stack-1x"></i>
                       </span>


                            </th>
                            <th style={{display : this.props.showBag}} onClick={(e)=> this.onAscending(e,'Bags')}>Qty
                                Allocated
                                <span className="fa-stack ">
                               <i className="fa fa-sort-asc fa-stack-1x"></i>
                               <i className="fa fa-sort-desc fa-stack-1x"></i>
                       </span>

                            </th>
                            <th style={{display : this.props.showInInvt}} onClick={(e)=> this.onAscending(e,'InInvt')}>
                                Qty Packaged
                                <span className="fa-stack ">
                               <i className="fa fa-sort-asc fa-stack-1x"></i>
                               <i className="fa fa-sort-desc fa-stack-1x"></i>
                       </span>

                            </th>
                            <th style={{display : this.props.showStatus}} onClick={(e)=> this.onAscending(e,'Status')}>
                                Status
                                <span className="fa-stack ">
                               <i className="fa fa-sort-asc fa-stack-1x"></i>
                               <i className="fa fa-sort-desc fa-stack-1x"></i>
                       </span>
                            </th>

                            <th style={{display : this.props.showRailcarArr}}
                                onClick={(e)=> this.onAscending(e,'RailcarArrival')}>Railcar Arrival
                                <span className="fa-stack ">
                               <i className="fa fa-sort-asc fa-stack-1x"></i>
                               <i className="fa fa-sort-desc fa-stack-1x"></i>
                       </span>
                            </th>
                            <th style={{display : this.props.showRailcarArrD}}
                                onClick={(e)=> this.onAscending(e,'RailcarArrivalDate')}>Railcar Arrival Date
                                <span className="fa-stack ">
                               <i className="fa fa-sort-asc fa-stack-1x"></i>
                               <i className="fa fa-sort-desc fa-stack-1x"></i>
                       </span>
                            </th>
                            <th style={{display : this.props.showRailcarDep}}
                                onClick={(e)=> this.onAscending(e,'RailcarDeparture')}>Railcar Departure
                                <span className="fa-stack ">
                               <i className="fa fa-sort-asc fa-stack-1x"></i>
                               <i className="fa fa-sort-desc fa-stack-1x"></i>
                       </span>
                            </th>
                            <th style={{display : this.props.showRailcarDepDate}}
                                onClick={(e)=> this.onAscending(e,'RailcarDepartureDate')}>Railcar Departure Date
                                <span className="fa-stack ">
                               <i className="fa fa-sort-asc fa-stack-1x"></i>
                               <i className="fa fa-sort-desc fa-stack-1x"></i>
                       </span>
                            </th>
                            <th style={{display : this.props.showDaysPresent}}
                                onClick={(e)=> this.onAscending(e,'RailcarDaysPresent')}>Railcar Days Present
                                <span className="fa-stack ">
                               <i className="fa fa-sort-asc fa-stack-1x"></i>
                               <i className="fa fa-sort-desc fa-stack-1x"></i>
                       </span>
                            </th>
                            <th style={{display : this.props.showRailcarStatus}}
                                onClick={(e)=> this.onAscending(e,'RailcarStatus')}>Railcar Status
                                <span className="fa-stack ">
                               <i className="fa fa-sort-asc fa-stack-1x"></i>
                               <i className="fa fa-sort-desc fa-stack-1x"></i>
                       </span>
                            </th>

                        </tr>
                        </thead>
                        { ( listData == undefined || listData.length == 0)
                            ?
                            <tbody>
                            <tr>
                                <td colSpan="15" className="noresult">No results match your entered criteria.</td>
                                <td colSpan="6" className="noresult"></td>
                            </tr>
                            </tbody> : listData
                        }
                    </table>

                    {}

                </div>
            </Loader>)
    }
}
export default ViewDataComponent;
