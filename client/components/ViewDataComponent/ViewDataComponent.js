'use strict';

import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import  { PropTypes } from 'react';
import { createDataLoader } from 'react-loopback';

import request from '../../utils/request';
import { Base_Url } from '../../constants';
var moment = require('moment');
import './js/tableHeadFixer.js'
import './js/jquery.dataTables.min.js';
import './js/jquery.dragtable.js';
import './stylesheet/dragtable.css';
import './js/jquery-sortable-min.js'
import './js/colResizable-1.6.min.js';
import './stylesheet/main.css';
var Loader = require('react-loader');
var sortedDataflag = false
var sortedData = []
var flagSorting = false
const MUL_FACTOR = 2.204625
var grouping = false;

class ViewDataComponent extends React.Component {

    constructor(props) {
        super(props);
        this.isAsc = false
        this.state = {
            loaded: false,
            headerArray : ["ARB","Customer", "PO#","Railcar#","Lot#","Material","Confirmed?","Arrived?","Shipment Received?",    "Cutoff","Weight","Qty Allocated",    "Qty Packaged","Status","Railcar Arrival","Railcar Arrival Date","Railcar Departure","Railcar Departure Date","Railcar Days Present", "Railcar Status"],
        };
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

        var that = this;
        $(function () {
            setTimeout(function () {
               // $("table").colResizable();
                //$("#Packaging_Instruction_View").tableHeadFixer({'head': true});
                var oldIndex;
                $('.sorted_head tr').sortable({
                    containerSelector: 'tr',
                    itemSelector: 'th',
                    vertical: false,
                    exclude: ".exclude-drag",
                    placeholder: '<th class="placeholder"/>',
                    onDragStart: function ($item, container, _super) {

                        oldIndex = $item.index();
                        //  console.log("Drag",oldIndex);
                        $item.appendTo($item.parent());
                        _super($item, container);
                    },
                    onDrop: function  ($item, container, _super) {
                        var headerArray = that.state.headerArray;
                        var field,tmp,
                            newIndex = $item.index();
                        if(newIndex != oldIndex) {

                            console.log(oldIndex, newIndex);
                            console.log("before:", headerArray);
                            let dragHeaderValue = headerArray.splice(oldIndex-1,1);
                            headerArray.splice(newIndex-1,0,dragHeaderValue[0]);
                            console.log("after:", headerArray);

                            //     $item.closest('table').find('tbody tr').each(function (i, row) {
                            //         row = $(row);
                            //         if(newIndex < oldIndex) {
                            //             row.children().eq(newIndex).before(row.children()[oldIndex]);
                            //         } else if (newIndex > oldIndex) {
                            //             row.children().eq(newIndex).after(row.children()[oldIndex]);
                            //         }
                            //     });
                        }

                        _super($item, container);
                        that.setState({
                            headerArray: headerArray
                        });
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
        var that = this;


        var listData = _.map(this.state.viewData, (view, index)=> {
                if (view.TPackagingInstructionLots.length > 0) {
                    var count = index;
                    var subheaderObj={};
                    subheaderObj["ARB"] = (
                        <td style={{display : this.props.showARB}}>
                            <i className="fa fa-chevron-down"
                               aria-hidden="false" data-target={count}
                               onClick={(e) => {this.onClickRow(e)}}></i> {view.TLocation ? view.TLocation.locationName : ''}
                        </td>
                    );
                    subheaderObj["Customer"] = (
                        <td style={{display : this.props.showCustomer}}> {view.TCompany ? view.TCompany.name : ''}</td>
                    );

                    subheaderObj["PO#"] = (
                        <td style={{display : this.props.showPO}}>{view.po_number} </td>
                    );
                    subheaderObj["Railcar#"] = (
                        <td style={{display : this.props.Railcar}}></td>
                    );

                    subheaderObj["Lot#"] = (
                        <td style={{display : this.props.showLot}}></td>
                    );

                    subheaderObj["Material"] = (
                        <td style={{display : this.props.showMaterial}}></td>
                    );
                    subheaderObj["Confirmed?"] = (
                        <td style={{display : this.props.showConfmd}}></td>
                    );
                    subheaderObj["Arrived?"] = (
                        <td style={{display : this.props.showArrvd}}></td>
                    );
                    subheaderObj["Shipment Received?"] = (
                        <td style={{display : this.props.showRecd}}></td>
                    );
                    subheaderObj["Cutoff"] = (
                        <td style={{display : this.props.showCutoff}}></td>
                    );
                    subheaderObj["Weight"] = (
                        <td style={{display : this.props.showWeight}}></td>
                    );
                    subheaderObj["Qty Allocated"] = (
                        <td style={{display : this.props.showBag}}></td>
                    );
                    subheaderObj["Qty Packaged"] = (
                        <td style={{display : this.props.showInInvt}}></td>
                    );
                    subheaderObj["Status"] = (
                        <td style={{display : this.props.showStatus}}></td>
                    );
                    subheaderObj["Railcar Arrival"] = (
                        <td style={{display : this.props.showRailcarArr}}></td>
                    );
                    subheaderObj["Railcar Arrival Date"] = (
                        <td style={{display : this.props.showRailcarArrD}}></td>
                    );
                    subheaderObj["Railcar Departure"] = (
                        <td style={{display : this.props.showRailcarDep}}></td>
                    );
                    subheaderObj["Railcar Departure Date"] = (
                        <td style={{display : this.props.showRailcarDepDate}}></td>
                    );

                    subheaderObj["Railcar Days Present"] = (
                        <td style={{display : this.props.showDaysPresent}}></td>
                    );

                    subheaderObj["Railcar Status"] = (
                        <td style={{display : this.props.showRailcarStatus}}></td>
                    );

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
                            {that.state.headerArray.map(obj => {
                                return subheaderObj[obj];
                            })}
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

                                            var cellObj = {};
                                            cellObj["ARB"] = (
                                                <td style={{display : this.props.showARB}}></td>
                                            );
                                            cellObj["Customer"] = (
                                                <td style={{display : this.props.showCustomer}}></td>
                                            );

                                            cellObj["PO#"] = (
                                                <td style={{display : this.props.showPO}}></td>
                                            );
                                            cellObj["Railcar#"] = (
                                                <td style={{display : this.props.Railcar}}>{data.railcar_number ? data.railcar_number : ''}</td>
                                            );

                                            cellObj["Lot#"] = (
                                                <td style={{display : this.props.showLot}}>{data.lot_number ? data.lot_number : ''}</td>
                                            );

                                            cellObj["Material"] = (
                                                <td style={{display : this.props.showMaterial}}>{view.material}</td>
                                            );
                                            cellObj["Confirmed?"] = (
                                                <td style={{display : this.props.showConfmd}}>{data.status == "UNCONFIRMED" ? 'NO' : 'YES'}</td>
                                            );
                                            cellObj["Arrived?"] = (
                                                <td style={{display : this.props.showArrvd}}>{data.railcar_arrived_on != null ? 'YES' : 'NO'}</td>
                                            );
                                            cellObj["Shipment Received?"] = (
                                                <td style={{display : this.props.showRecd}}>{(data.TShipmentLots && data.TShipmentLots.length > 0 && data.status != "SHIPPED") ? "YES" : "NO"}</td>
                                            );
                                            cellObj["Cutoff"] = (
                                                <td style={{display : this.props.showCutoff}}>{(data.TShipmentLots && data.TShipmentLots.length > 0 && data.TShipmentLots[0].TShipmentent && data.TShipmentLots[0].TShipmentent.TShipmentInternational && data.TShipmentLots[0].TShipmentent.TShipmentInternational.length > 0 ) ? moment(data.TShipmentLots[0].TShipmentent.TShipmentInternational[0].cargoCutoffDate).format("MM-DD-YYYY") : 'NA'}</td>
                                            );
                                            cellObj["Weight"] = (
                                                <td style={{display : this.props.showWeight}}>{selectedWeight == 'lbs' ? data.weight : (data.weight / MUL_FACTOR).toFixed(2)}</td>
                                            );
                                            cellObj["Qty Allocated"] = (
                                                <td style={{display : this.props.showBag}}>{bagsallocated > 0 ? bagsallocated : 0}</td>
                                            );
                                            cellObj["Qty Packaged"] = (
                                                <td style={{display : this.props.showInInvt}}>{(data.inInventory && bagsallocated > 0) ? (data.inInventory - bagsallocated ) : parseInt(data.inInventory) > 0 ? parseInt(data.inInventory) : 0 }</td>
                                            );
                                            cellObj["Status"] = (
                                                <td style={{display : this.props.showStatus}}>{data.status ? data.status : '' }</td>
                                            );
                                            cellObj["Railcar Arrival"] = (
                                                <td style={{display : this.props.showRailcarArr}}>{data.arrived != null && data.arrived == 1 ? "Yes" : "No"}</td>
                                            );
                                            cellObj["Railcar Arrival Date"] = (
                                                <td style={{display : this.props.showRailcarArrD}}>{data.railcar_arrived_on != null ? moment(data.railcar_arrived_on).format("MM-DD-YYYY") : "N/A"}</td>
                                            );
                                            cellObj["Railcar Departure"] = (
                                                <td style={{display : this.props.showRailcarDep}}>{data.railcar_departed_on != null ? "YES" : "NO"}</td>
                                            );
                                            cellObj["Railcar Departure Date"] = (
                                                <td style={{display : this.props.showRailcarDepDate}}>{data.railcar_departed_on != null ? moment(data.railcar_departed_on).format("MM-DD-YYYY") : "N/A"}</td>
                                            );

                                            cellObj["Railcar Days Present"] = (
                                                <td style={{display : this.props.showDaysPresent}}>{diff ? diff + 1 : 'N/A'}</td>
                                            );

                                            cellObj["Railcar Status"] = (
                                                <td style={{display : this.props.showRailcarStatus}}>{data.railcar_status ? data.railcar_status : ''}</td>
                                            );


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
                                                    {that.state.headerArray.map(obj => {
                                                        return cellObj[obj];
                                                    })}
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

        var headerObj = {};
        headerObj["ARB"] = (
            <th key="arb" style={{display : this.props.showARB }} onKeyDown={(e)=>this.press(e)}
                onClick={(e)=> this.onAscending(e,'location')} className="exclude-drag">
                ARB
                                <span className="fa-stack ">
                               <i className="fa fa-sort-asc fa-stack-1x"></i>
                               <i className="fa fa-sort-desc fa-stack-1x"></i>
                           </span>
            </th>
        );
        headerObj["Customer"] = (
            <th key="customer" style={{display : this.props.showCustomer}}
                onClick={(e)=> this.onAscending(e,'company')}>Customer
                                <span className="fa-stack ">
                               <i className="fa fa-sort-asc fa-stack-1x"></i>
                               <i className="fa fa-sort-desc fa-stack-1x"></i>
                       </span>

            </th>
        );

        headerObj["PO#"] = (
            <th key="po" style={{display : this.props.showPO}} onClick={(e)=> this.onAscending(e,'po_number')}>PO#
                                <span className="fa-stack ">
                               <i className="fa fa-sort-asc fa-stack-1x"></i>
                               <i className="fa fa-sort-desc fa-stack-1x"></i>
                       </span>
            </th>
        );
        headerObj["Railcar#"] = (
            <th key="railecar" style={{display : this.props.Railcar}}
                onClick={(e)=> this.onAscending(e,'railcar_number')}>Railcar#
                                <span className="fa-stack ">
                               <i className="fa fa-sort-asc fa-stack-1x"></i>
                               <i className="fa fa-sort-desc fa-stack-1x"></i>
                       </span>
            </th>
        );

        headerObj["Lot#"] = (
            <th key="lot" style={{display : this.props.showLot}} onClick={(e)=> this.onAscending(e,'lot_number')}>
                Lot#
                                <span className="fa-stack ">
                               <i className="fa fa-sort-asc fa-stack-1x"></i>
                               <i className="fa fa-sort-desc fa-stack-1x"></i>
                       </span>

            </th>
        );

        headerObj["Material"] = (
            <th key="material" style={{display : this.props.showMaterial}}
                onClick={(e)=> this.onAscending(e,'Material')}>Material
                                <span className="fa-stack ">
                               <i className="fa fa-sort-asc fa-stack-1x"></i>
                               <i className="fa fa-sort-desc fa-stack-1x"></i>
                       </span>

            </th>
        );
        headerObj["Confirmed?"] = (
            <th key="confirmed" style={{display : this.props.showConfmd}} onClick={(e)=> this.onAscending(e,'Confmd')}>
                Confirmed?
                                <span className="fa-stack ">
                               <i className="fa fa-sort-asc fa-stack-1x"></i>
                               <i className="fa fa-sort-desc fa-stack-1x"></i>
                       </span>
            </th>
        );
        headerObj["Arrived?"] = (
            <th key="arrived" style={{display : this.props.showArrvd}} onClick={(e)=> this.onAscending(e,'Arrvd')}>
                Arrived?
                                <span className="fa-stack ">
                               <i className="fa fa-sort-asc fa-stack-1x"></i>
                               <i className="fa fa-sort-desc fa-stack-1x"></i>
                       </span>

            </th>
        );
        headerObj["Shipment Received?"] = (
            <th key="shipmentreceived" style={{display : this.props.showRecd}} onClick={(e)=> this.onAscending(e,'Recd')}>Shipment Received?
                                <span className="fa-stack ">
                               <i className="fa fa-sort-asc fa-stack-1x"></i>
                               <i className="fa fa-sort-desc fa-stack-1x"></i>
                       </span>

            </th>
        );
        headerObj["Cutoff"] = (
            <th key="cutoff" style={{display : this.props.showCutoff}} onClick={(e)=> this.onAscending(e,'Cutoff')}>
                Cutoff
                                <span className="fa-stack ">
                               <i className="fa fa-sort-asc fa-stack-1x"></i>
                               <i className="fa fa-sort-desc fa-stack-1x"></i>
                       </span>

            </th>
        );
        headerObj["Weight"] = (
            <th key="weight" style={{display : this.props.showWeight}} onClick={(e)=> this.onAscending(e,'weight')}>
                Weight
                                <span className="fa-stack ">
                               <i className="fa fa-sort-asc fa-stack-1x"></i>
                               <i className="fa fa-sort-desc fa-stack-1x"></i>
                       </span>


            </th>
        );
        headerObj["Qty Allocated"] = (
            <th key="qtyallocated" style={{display : this.props.showBag}} onClick={(e)=> this.onAscending(e,'Bags')}>Qty
                Allocated
                                <span className="fa-stack ">
                               <i className="fa fa-sort-asc fa-stack-1x"></i>
                               <i className="fa fa-sort-desc fa-stack-1x"></i>
                       </span>

            </th>
        );
        headerObj["Qty Packaged"] = (
            <th key="qtypackaged" style={{display : this.props.showInInvt}} onClick={(e)=> this.onAscending(e,'InInvt')}>
                Qty Packaged
                                <span className="fa-stack ">
                               <i className="fa fa-sort-asc fa-stack-1x"></i>
                               <i className="fa fa-sort-desc fa-stack-1x"></i>
                       </span>

            </th>
        );
        headerObj["Status"] = (
            <th key="status" style={{display : this.props.showStatus}} onClick={(e)=> this.onAscending(e,'Status')}>
                Status
                                <span className="fa-stack ">
                               <i className="fa fa-sort-asc fa-stack-1x"></i>
                               <i className="fa fa-sort-desc fa-stack-1x"></i>
                       </span>
            </th>
        );
        headerObj["Railcar Arrival"] = (
            <th key="railcararrival" style={{display : this.props.showRailcarArr}}
                onClick={(e)=> this.onAscending(e,'RailcarArrival')}>Railcar Arrival
                                <span className="fa-stack ">
                               <i className="fa fa-sort-asc fa-stack-1x"></i>
                               <i className="fa fa-sort-desc fa-stack-1x"></i>
                       </span>
            </th>
        );
        headerObj["Railcar Arrival Date"] = (
            <th key="railcalarrivaldate" style={{display : this.props.showRailcarArrD}}
                onClick={(e)=> this.onAscending(e,'RailcarArrivalDate')}>Railcar Arrival Date
                                <span className="fa-stack ">
                               <i className="fa fa-sort-asc fa-stack-1x"></i>
                               <i className="fa fa-sort-desc fa-stack-1x"></i>
                       </span>
            </th>
        );
        headerObj["Railcar Departure"] = (
            <th key="railcardeparture" style={{display : this.props.showRailcarDep}}
                onClick={(e)=> this.onAscending(e,'RailcarDeparture')}>Railcar Departure
                                <span className="fa-stack ">
                               <i className="fa fa-sort-asc fa-stack-1x"></i>
                               <i className="fa fa-sort-desc fa-stack-1x"></i>
                       </span>
            </th>
        );
        headerObj["Railcar Departure Date"] = (
            <th key="railcardeparturedate" style={{display : this.props.showRailcarDepDate}}
                onClick={(e)=> this.onAscending(e,'RailcarDepartureDate')}>Railcar Departure Date
                                <span className="fa-stack ">
                               <i className="fa fa-sort-asc fa-stack-1x"></i>
                               <i className="fa fa-sort-desc fa-stack-1x"></i>
                       </span>
            </th>

        );

        headerObj["Railcar Days Present"] = (
            <th key="railcardayspresent" style={{display : this.props.showDaysPresent}}
                onClick={(e)=> this.onAscending(e,'RailcarDaysPresent')}>Railcar Days Present
                                <span className="fa-stack ">
                               <i className="fa fa-sort-asc fa-stack-1x"></i>
                               <i className="fa fa-sort-desc fa-stack-1x"></i>
                       </span>
            </th>

        );

        headerObj["Railcar Status"] = (
            <th key="railcarstatus" style={{display : this.props.showRailcarStatus}}
                onClick={(e)=> this.onAscending(e,'RailcarStatus')}>Railcar Status
                                <span className="fa-stack ">
                               <i className="fa fa-sort-asc fa-stack-1x"></i>
                               <i className="fa fa-sort-desc fa-stack-1x"></i>
                       </span>
            </th>

        );

        return (

            <Loader loaded={this.state.loaded} id="loaded">
                <div className="loadedContentNew">

                    <table id="Packaging_Instruction_View" className="table table-expandable sort" cellSpacing="0">
                        <thead id="table_head1" className="table_head header-fixed header red sorted_head">
                        <tr className="sorting_head header-fixed" style={{"backgroundColor" : "#2e6da4"}}>
                            <th className="exclude-drag"></th>
                            {this.state.headerArray.map(obj => {
                                return headerObj[obj];
                            })}
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

                </div>
            </Loader>)
    }
}
export default ViewDataComponent;