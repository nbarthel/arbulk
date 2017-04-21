/**
 * Created by Anurag on 15-09-2016.
 */
'use strict';

import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import  { PropTypes } from 'react';
import { createDataLoader } from 'react-loopback';
//import PackagingInstructionViewForm from '../../containers/Packaging/PackagingInstructionView/PackagingInstructionViewForm';
import HeadBody from './HeadBody';
import NestedRows from './NestedRows'
import request from '../../utils/request';
import { Base_Url } from '../../constants'
var moment = require('moment');
//import "./ShpmentViewData.json"
import './js/tableHeadFixer';
//import './js/jquery.dataTables.min.js';
//import './js/jquery.dragtable.js';
//import './stylesheet/dragtable.css';
import './js/jquery-sortable-min.js'
import './js/colResizable-1.6.min.js';
import './stylesheet/main.css';
/*import './stylesheet/jquery.dataTables.min.css'*/
var Loader = require('react-loader');
var sortedDataflag = false
var sortedData = []
var flagSorting = false
var grouping = false
class ShipmentViewDataComponent extends React.Component {

    constructor(props) {
        super(props);
        this.isAsc = false
        this.state = {
            loaded: false,
            headerArray: ["ARB", "Customer", "Release", "Shipment Type", "Booking", "Po#", "Lot#", "Material", "Confirmed?", "Forwarder", "Cntr Size",
                "Qty", "Allocated", "Enough", "# of Bags To Ship", "ERD", "CutOff", "Vessel", "Steamship Line", "PU Location", "Return Location", "Docs Cutoff", "Status"],

            //viewData : shipmentViewData
            GroupedData : ""
        }
        this.PIData = {}
        this.myObj = {}
        this.qArray = []
        this.checkclick = this.checkclick.bind(this);
        //this.onAscending = this.onAscending.bind(this)
        this.onToggel = this.onToggel.bind(this)
        this.onClickRow = this.onClickRow.bind(this)
        this.onGroupBy = this.onGroupBy.bind(this)
        this.SelcetedOptionForGroupBy= ""
    }
    componentWillReceiveProps(next){

        if(next.SelcetedOptionForGroupBy && next.SelcetedOptionForGroupBy!="" && next.SelcetedOptionForGroupBy!=''){
            this.onGroupBy(next.SelcetedOptionForGroupBy)
            this.SelcetedOptionForGroupBy = next.SelcetedOptionForGroupBy
        }
        else{
            grouping = false
        }
        $(function(){
            setTimeout(function () {
                if($('.noresult').hasClass('noresult')){
                    $('.loadedContentNew').addClass('noresultdata');
                }
                else{
                    $('.loadedContentNew').removeClass('noresultdata')
                }
            },200);
        })
    }
    componentWillMount() {
        let id = this.props.id
        if (this.props.id != undefined) {
            var PIview = createDataLoader(ShipmentViewDataComponent, {
                queries: [{
                    endpoint: 'TPackagingInstructions',
                    filter: {
                        include: ['TPackagingInstructionLots', {
                            "relation": "TPackagingInstructions",
                            "scope": {"include": ["TLocation"]}
                        }]
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
                    this.setState({
                        viewData: [data],
                        loaded: true
                    })
                    var tableData = JSON.parse(localStorage.getItem('siViewData'))
                    if (tableData && tableData.length > 0) {
                        this.setState({
                            viewData: tableData
                        })
                    }
                }.bind(this)

            })

            axios.get(Base_Url + "TShipmentLots/getMaxQueue").then(response=> {
                this.setState({
                    queue_Sequence: response.data
                })
            })


        }
        else {

            var PIview = createDataLoader(ShipmentViewDataComponent, {
                queries: [{
                    endpoint: 'TPackagingInstructions',
                    filter: {
                        include: ['TPackagingInstructionLots',
                            {
                                "relation": "TPackagingInstructions",
                                "scope": {
                                    "include": ["TLocation"]
                                }
                            }]
                    }
                }]
            })
            var base = 'TShipmentents';

            this.url = PIview._buildUrl(base, {
                "include": ["TLocation", "TContainerAllocation", "TCompany",

                    {
                        "relation": "TContainerDomestic",
                        "scope": {"include": "TCompany"}
                    },

                    {
                        "relation": "TContainerInternational",
                        "scope": {"include": "TCompany"}
                    },

                    {
                        "relation": "TShipmentDomestic",
                        "scope": {
                            "include": ["TShipmentType"],
                            "where": {"active": "1"}
                        }
                    },

                    {
                        "relation": "TShipmentInternational",
                        "scope": {
                            "include": ["TSteamshipLine", "TContainerType"],
                            "where": {"active": "1"}
                        }
                    },

                    {
                        "relation": "TShipmentLots",
                        "scope": {
                            "include": ["TPackagingInstructionLots", "TPackagingInstructions"],
                            "where": {"active": "1"}
                        }
                    }],
            });

            $.ajax({
                url: this.url,
                success: function (data) {


                    for (var i in data) {
                        if (data[i].TShipmentInternational && data[i].TShipmentInternational.length == 0 && data[i].TShipmentDomestic.length == 0) {
                            data.splice(i, 1)
                        }
                    }
                    this.setState(
                        {
                            viewData: data,
                            loaded: true
                        }
                    )
                    var tableData = JSON.parse(localStorage.getItem('siViewData'))
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
        var shipState = this;
        $(function () {
            setTimeout(function () {

                $("#Packaging_Instruction_View").colResizable({
                    liveDrag:false,
                    gripInnerHtml:"<div class='grip'></div>",
                    draggingClass:"dragging",
                    //resizeMode:'flex',
                    //minWidth:100
                });

                $("#Packaging_Instruction_View").tableHeadFixer({'head': true});
                var oldIndex;
                $('.sorted_head tr').sortable({
                    containerSelector: 'tr',
                    itemSelector: 'th',
                    vertical: false,
                    exclude: ".exclude-drag",
                    placeholder: '<th class="placeholder"/>',
                    onDragStart: function ($item, container, _super) {
                        oldIndex = $item.index();
                        $item.appendTo($item.parent());
                        _super($item, container);
                    },
                    onDrop: function ($item, container, _super) {
                        var headerArray = shipState.state.headerArray;
                        var field, tmp,
                            newIndex = $item.index();
                        if (newIndex != oldIndex) {
                            let dragHeaderValue = headerArray.splice(oldIndex - 1, 1);
                            headerArray.splice(newIndex - 1, 0, dragHeaderValue[0]);
                        }
                        _super($item, container);
                        shipState.setState({
                            headerArray: headerArray
                        });
                        $("#Packaging_Instruction_View").colResizable({
                            disable: true

                        });
                        $("#Packaging_Instruction_View").colResizable({
                            liveDrag:false,
                            gripInnerHtml:"<div class='grip'></div>",
                            draggingClass:"dragging",
                            //resizeMode:'flex',
                            //minWidth:100
                        });
                    }

                });
            }, 3000);

        });


    }

    checkclick(data, value) {
        var queueArray = []
        this.qArray.push(value.id)
        localStorage.setItem('qArray', this.qArray)
        localStorage.setItem('queue_Sequence', this.state.queue_Sequence[0].max_mark)

    }

    onGroupBy(switchvalue){

        grouping = true
        var tempData = [],groupData ={}
        for (var i in this.state.viewData) {
            var tempObj = new Object()
            for (var props in this.state.viewData[i]) {
                if (props != "TShipmentLots") {
                    tempObj[props] = JSON.parse(JSON.stringify(this.state.viewData[i][props]))
                }
            }
            for (var j in this.state.viewData[i].TShipmentLots) {
                var tempLots = JSON.parse(JSON.stringify(this.state.viewData[i].TShipmentLots[j]))
                tempObj.TShipmentLots = []
                tempObj.TShipmentLots.push(JSON.parse(JSON.stringify(tempLots)))
                tempData.push(tempObj)
            }
        }
        switch (switchvalue) {
            case 'PO#':
                groupData = _.groupBy(tempData, function (item) {
                    if (item.TShipmentLots && item.TShipmentLots.length > 0 && item.TShipmentLots[0].TPackagingInstructions) {
                        return item.TShipmentLots[0].TPackagingInstructions.po_number.toLowerCase();
                    }
                    return 'z'

                });
                break;
            case 'Release':
                groupData = _.groupBy(tempData, function (item) {
                    if (item.releaseNumber) {
                        return item.releaseNumber.toLowerCase();
                    }

                });
                break;
            case 'Lot#':

                groupData = _.groupBy(tempData, function (item) {
                    return ( item.TShipmentLots.length > 0 ? (item.TShipmentLots[0].TPackagingInstructionLots ? item.TShipmentLots[0].TPackagingInstructionLots.lot_number.toLowerCase() : 'z') : 'z');
                });
                break;
            case 'railcar_number':
                groupData = _.groupBy(tempData, function (item) {
                    return (item.TShipmentLots.length > 0 ? (item.TShipmentLots[0].TPackagingInstructionLots ? item.TShipmentLots[0].TPackagingInstructionLots.railcar_number.toLowerCase() : 'z') : 'z');
                });
                break;
            case 'weight':
                groupData = _.groupBy(tempData, function (item) {
                    return (item.TShipmentLots.length > 0 ? (item.TShipmentLots[0].TPackagingInstructionLots ? item.TShipmentLots[0].TPackagingInstructionLots.weight : '0') : '0');
                });
                break;
            case 'ARB':
                groupData = _.groupBy(tempData, function (item) {
                    return item.TLocation.locationName.toLowerCase();
                });
                break;
            case 'customer':
                groupData = _.groupBy(tempData, function (item) {
                    return item.TCompany.name.toLowerCase();
                });
                break;
            case 'Booking':
                groupData = _.groupBy(tempData, function (item) {
                    if (item.isDomestic == 0 && item.TShipmentInternational && item.TShipmentInternational.length > 0) {
                        return item.TShipmentInternational[0].bookingNumber.toLowerCase()
                    }
                    else if (item.TShipmentDomestic && item.TShipmentDomestic.length > 0) {
                        return item.TShipmentDomestic[0].bookingNumber.toLowerCase()
                    }
                })
                break;
            case 'Shipment Type':
                groupData = _.groupBy(tempData, function (item) {
                    if (item.isDomestic == 1) {
                        return ({"Domestic":item})
                    }
                });
                var temp = groupData.undefined
                delete groupData.undefined
                groupData.INTERNATIONAL = temp
                temp = groupData[Object.keys(groupData)[0]]
                groupData.DOMESTIC = temp
                delete groupData[Object.keys(groupData)[0]]
                break;
            case 'Material':
                groupData = _.groupBy(tempData, function (item) {
                    if (item.TShipmentLots.length > 0 && item.TShipmentLots[0].TPackagingInstructions != undefined) {
                        return item.TShipmentLots[0].TPackagingInstructions.material.toLowerCase()
                    }
                });
                break;
            case 'Confirmed':
                groupData = _.groupBy(tempData, function (item) {
                    if (item.TShipmentInternational && item.TShipmentInternational.length > 0) {
                        //if(item.TShipmentInternational[0].status == "CONFIRMED"){
                        return item.TShipmentInternational[0].status.toLowerCase()
                        //}
                    }
                    else if (item.TShipmentDomestic && item.TShipmentDomestic.length > 0) {
                        //if(item.TShipmentDomestic[0].status == "CONFIRMED"){
                        return item.TShipmentDomestic[0].status.toLowerCase()
                        //}
                    }
                    return item;
                });
                break;
            case 'Forwarder':
                groupData = _.groupBy(tempData, function (item) {

                    if (item.TShipmentInternational && item.TShipmentInternational.length > 0) {
                        return item.TShipmentInternational[0].freightForwarder.toLowerCase()
                    }
                    return item;
                });
                break;
            case 'Cntr Size':
                groupData = _.groupBy(tempData, function (item) {

                    if (item.TShipmentInternational.length > 0 && item.TShipmentInternational[0].TContainerType) {
                        return item.TShipmentInternational[0].TContainerType.name.toLowerCase()
                    }
                    return item;
                });
                break;
            case 'Qty':
                groupData = _.groupBy(tempData, function (item) {
                    return item.numberOfContainers
                });
                break;
            case 'Allocated':
                groupData = _.groupBy(tempData, function (item) {
                    if (item.TContainerAllocation.length > 0) {
                        return item.TContainerAllocation[0]
                    }
                });
                var temp = groupData.undefined
                delete groupData.undefined
                groupData.No = temp
                temp = groupData[Object.keys(groupData)[0]]
                groupData.Yes = temp
                delete groupData[Object.keys(groupData)[0]]
                break;
            case 'Enough?':
                groupData = _.groupBy(tempData, function (item) {
                    var total = 0
                    for (var i = 0; i < item.TContainerAllocation.length; i++) {
                        total = total + item.TContainerAllocation[i].noOfContainer
                    }
                    if (total == item.numberOfContainers) {
                        return item
                    }
                });
                var temp = groupData.undefined
                delete groupData.undefined
                groupData.No = temp
                temp = groupData[Object.keys(groupData)[0]]
                groupData.Yes = temp
                delete groupData[Object.keys(groupData)[0]]
                break;
            case 'bags':
                groupData = _.groupBy(tempData, function (item) {
                    data.noOfBags
                    if (item.TShipmentLots.length > 0) {
                        return item.TShipmentLots[0].noOfBags
                    }

                });
                break;
            case 'ERD':
                groupData = _.groupBy(tempData, function (item) {
                    if (item.TShipmentInternational.length > 0) {
                        return item.TShipmentInternational[0].earliestReturnDate
                    }
                });
                break;
            case 'cuttOff':
                groupData = _.groupBy(tempData, function (item) {
                    if (item.TShipmentInternational.length > 0) {
                        return item.TShipmentInternational[0].cargoCutoffDate
                    }
                });
                break;
            case 'Vessel':
                groupData = _.groupBy(tempData, function (item) {
                    if (item.TShipmentInternational.length > 0) {
                        return item.TShipmentInternational[0].steamshipVessel.toLowerCase()
                    }
                });
                break;
            case 'Steamship Line':
                groupData = _.groupBy(tempData, function (item) {
                    if (item.TShipmentInternational.length > 0) {
                        return item.TShipmentInternational[0].TSteamshipLine.name
                    }
                    else if (item.TShipmentDomestic.length > 0) {
                        return item
                    }
                    return item
                });
                break;
            case 'PULocation':
                groupData = _.groupBy(tempData, function (item) {
                    if (item.TShipmentInternational.length > 0) {
                        return item.TShipmentInternational[0].containerPickupLocation.toLowerCase()
                    }
                });
                break;
            case 'Return Location':
                groupData = _.groupBy(tempData, function (item) {
                    if (item.TShipmentInternational.length > 0) {
                        return item.TShipmentInternational[0].containerReturnLocation.toLowerCase()
                    }
                });
                break;
            case 'DocsCutoff':
                groupData = _.groupBy(tempData, function (item) {
                    if (item.TShipmentInternational.length > 0) {
                        return item.TShipmentInternational[0].docCutoffDate
                    }
                });
            case 'Status':
                groupData = _.groupBy(tempData, function (item) {
                    if (item.TShipmentInternational.length > 0) {
                        return item.TShipmentInternational[0].status.toLowerCase()
                    }
                    else if (item.TShipmentDomestic.length > 0) {
                        return item.TShipmentDomestic[0].status.toLowerCase()
                    }
                    else {
                        return item
                    }
                });
                break;
            default:
                groupData = _.groupBy(tempData, function (item) {
                    return item.id
                });
        }
        this.setState({
            GroupedData: groupData
        })
        localStorage.setItem('siGrouped', JSON.stringify(grouping));
    }

    onAscending(e, head) {
        sortedDataflag = true;
        flagSorting = true;
        var switchvalue = head;

        switch (switchvalue) {
            case 'po_number':
                sortedData = _.sortBy(this.state.viewData, function (item) {
                    if (item.TShipmentLots && item.TShipmentLots.length > 0 && item.TShipmentLots[0].TPackagingInstructions) {
                        return item.TShipmentLots[0].TPackagingInstructions.po_number.toLowerCase();
                    }
                    return 'z'

                });
                break;
            case 'Release':
                sortedData = _.sortBy(this.state.viewData, function (item) {
                    if (item.releaseNumber) {
                        return item.releaseNumber.toLowerCase();
                    }

                });
                break;
            case 'lot_number':

                sortedData = _.sortBy(this.state.viewData, function (item) {
                    return ( item.TShipmentLots.length > 0 ? (item.TShipmentLots[0].TPackagingInstructionLots ? item.TShipmentLots[0].TPackagingInstructionLots.lot_number.toLowerCase() : 'z') : 'z');
                });
                break;
            case 'railcar_number':
                sortedData = _.sortBy(this.state.viewData, function (item) {
                    return (item.TShipmentLots.length > 0 ? (item.TShipmentLots[0].TPackagingInstructionLots ? item.TShipmentLots[0].TPackagingInstructionLots.railcar_number.toLowerCase() : 'z') : 'z');
                });
                break;
            case 'weight':
                sortedData = _.sortBy(this.state.viewData, function (item) {
                    return (item.TShipmentLots.length > 0 ? (item.TShipmentLots[0].TPackagingInstructionLots ? item.TShipmentLots[0].TPackagingInstructionLots.weight : '0') : '0');
                });
                break;
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
            case 'Booking':
                sortedData = _.sortBy(this.state.viewData, function (item) {
                    if (item.isDomestic == 0 && item.TShipmentInternational && item.TShipmentInternational.length > 0) {
                        return item.TShipmentInternational[0].bookingNumber.toLowerCase()
                    }
                    else if (item.TShipmentDomestic && item.TShipmentDomestic.length > 0) {
                        return item.TShipmentDomestic[0].bookingNumber.toLowerCase()
                    }
                })
                break;
            case 'ShipmentType':
                sortedData = _.sortBy(this.state.viewData, function (item) {
                    if (item.isDomestic == 1) {
                        return item
                    }
                });
                break;
            case 'Material':
                sortedData = _.sortBy(this.state.viewData, function (item) {
                    if (item.TShipmentLots.length > 0 && item.TShipmentLots[0].TPackagingInstructions != undefined) {
                        return item.TShipmentLots[0].TPackagingInstructions.material.toLowerCase()
                    }
                });
                break;
            case 'Confmd':
                sortedData = _.sortBy(this.state.viewData, function (item) {
                    if (item.TShipmentInternational && item.TShipmentInternational.length > 0) {
                        //if(item.TShipmentInternational[0].status == "CONFIRMED"){
                        return item.TShipmentInternational[0].status.toLowerCase()
                        //}
                    }
                    else if (item.TShipmentDomestic && item.TShipmentDomestic.length > 0) {
                        //if(item.TShipmentDomestic[0].status == "CONFIRMED"){
                        return item.TShipmentDomestic[0].status.toLowerCase()
                        //}
                    }
                    return item;
                });
                break;
            case 'Forwarder':
                sortedData = _.sortBy(this.state.viewData, function (item) {

                    if (item.TShipmentInternational && item.TShipmentInternational.length > 0) {
                        return item.TShipmentInternational[0].freightForwarder.toLowerCase()
                    }
                    return item;
                });
                break;
            case 'CntrSize':
                sortedData = _.sortBy(this.state.viewData, function (item) {

                    if (item.TShipmentInternational.length > 0 && item.TShipmentInternational[0].TContainerType) {
                        return item.TShipmentInternational[0].TContainerType.name.toLowerCase()
                    }
                    return item;
                });
                break;
            case 'Qty':
                sortedData = _.sortBy(this.state.viewData, function (item) {
                    return item.numberOfContainers
                });
                break;
            case 'Allocated':
                sortedData = _.sortBy(this.state.viewData, function (item) {
                    if (item.TContainerAllocation.length > 0) {
                        return item.TContainerAllocation[0]
                    }
                });
                break;
            case 'Enough':
                sortedData = _.sortBy(this.state.viewData, function (item) {
                    var total = 0
                    for (var i = 0; i < item.TContainerAllocation.length; i++) {
                        total = total + item.TContainerAllocation[i].noOfContainer
                    }
                    if (total == item.numberOfContainers) {
                        return item
                    }
                });
                break;
            case 'bags':
                sortedData = _.sortBy(this.state.viewData, function (item) {
                    data.noOfBags
                    if (item.TShipmentLots.length > 0) {
                        return item.TShipmentLots[0].noOfBags
                    }

                });
                break;
            case 'ERD':
                sortedData = _.sortBy(this.state.viewData, function (item) {
                    if (item.TShipmentInternational.length > 0) {
                        return item.TShipmentInternational[0].earliestReturnDate
                    }
                });
                break;
            case 'cuttOff':
                sortedData = _.sortBy(this.state.viewData, function (item) {
                    if (item.TShipmentInternational.length > 0) {
                        return item.TShipmentInternational[0].cargoCutoffDate
                    }
                });
                break;
            case 'Vessel':
                sortedData = _.sortBy(this.state.viewData, function (item) {
                    if (item.TShipmentInternational.length > 0) {
                        return item.TShipmentInternational[0].steamshipVessel.toLowerCase()
                    }
                });
                break;
            case 'SteamshipLine':
                sortedData = _.sortBy(this.state.viewData, function (item) {
                    if (item.TShipmentInternational.length > 0) {
                        return item.TShipmentInternational[0].TSteamshipLine.name
                    }
                    else if (item.TShipmentDomestic.length > 0) {
                        return item
                    }
                    return item
                });
                break;
            case 'PULocation':
                sortedData = _.sortBy(this.state.viewData, function (item) {
                    if (item.TShipmentInternational.length > 0) {
                        return item.TShipmentInternational[0].containerPickupLocation.toLowerCase()
                    }
                });
                break;
            case 'ReturnLocation':
                sortedData = _.sortBy(this.state.viewData, function (item) {
                    if (item.TShipmentInternational.length > 0) {
                        return item.TShipmentInternational[0].containerReturnLocation.toLowerCase()
                    }
                });
                break;
            case 'DocsCutoff':
                sortedData = _.sortBy(this.state.viewData, function (item) {
                    if (item.TShipmentInternational.length > 0) {
                        return item.TShipmentInternational[0].docCutoffDate
                    }
                });
            case 'Status':
                sortedData = _.sortBy(this.state.viewData, function (item) {
                    if (item.TShipmentInternational.length > 0) {
                        return item.TShipmentInternational[0].status.toLowerCase()
                    }
                    else if (item.TShipmentDomestic.length > 0) {
                        return item.TShipmentDomestic[0].status.toLowerCase()
                    }
                    else {
                        return item
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
        localStorage.setItem('siViewData', JSON.stringify(sortedData));
    }

    onToggel(e, elm) {


        $("button").click(function () {
            $("p").slideToggle("slow");
        });
    }

    onClickRow(e) {
        var rowObj = $(this.refs.clickable)

        var aa = e.target.getAttribute('data-target')
        var nextTd = e.target.parentNode.closest('tr').nextElementSibling
        for(var i =0;i<=aa;i++){
            $(nextTd).toggleClass('hide')
            nextTd = nextTd.nextElementSibling
        }
    }

    allValuesSame(arr) {

        for (var i = 1; i < arr.length; i++) {
            if (arr[i] !== arr[0])
                return false;
        }

        return true;
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

        var shipmentThis = this;
        var selectedWeight = this.props.weight;
        var shipState = this;
        var listData = ""
        var i=0

        if (grouping && this.props.SelcetedOptionForGroupBy!="") {
            listData = _.map(this.state.GroupedData, (views, index)=> {
                var subheaderObj = {};

              return(
                  <tbody key={i++}>
                  <tr className="base_bg clickable" key = {i++} style={{"backgroundColor": "#e5e5ff"}}>
                      <td><i className="fa fa-chevron-down"
                             aria-hidden="false"
                             data-target={views.length}
                             onClick={(e) => {this.onClickRow(e)}}></i>{index!="undefined" && index!="[object Object]"?index.toUpperCase():"DOMESTIC"}</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                  </tr>
                  {
                      _.map(views,(view,index)=>{
                          var alloc = "No"
                          var count = index

                          if (view.TContainerAllocation && view.TContainerAllocation.length > 0) {
                              alloc = "Yes"
                          }
                          var eno = 'N/A'
                          if (view.TContainerAllocation && view.TContainerAllocation.length > 0) {
                              var containerCount = 0
                              for (var i = 0; i < view.TContainerAllocation.length; i++) {
                                  containerCount = containerCount + view.TContainerAllocation[i].noOfContainer
                              }
                              if (containerCount == view.numberOfContainers) {

                                  eno = "YES"
                              } else {
                                  eno = "NO"
                              }
                          }
                          var count = index
                          return _.map(view.TShipmentLots, (data, index)=> {
                                  if (sortedDataflag || (view.TShipmentInternational != undefined && view.TShipmentInternational.length > 0) || (view.TShipmentInternational != undefined && view.TShipmentDomestic.length > 0)) {
                                      this.statusArray = []
                                      if (view.TContainerDomestic && view.TContainerDomestic.length > 0) {
                                          for (var k in view.TContainerDomestic) {
                                              this.statusArray.push(view.TContainerDomestic.status)
                                          }
                                      }
                                      else if (view.TContainerInternational && view.TContainerInternational.length > 0) {
                                          for (var k in view.TContainerDomestic) {
                                              this.statusArray.push(view.TContainerInternational.status)
                                          }
                                      }

                                      this.sameValue = this.allValuesSame(this.statusArray)

                                      if (view.isDomestic == 0) {
                                          var vessel = (view.TShipmentInternational && view.TShipmentInternational.length > 0) ? view.TShipmentInternational[0].steamshipVessel : ''
                                          var freightForwarder = (view.TShipmentInternational && view.TShipmentInternational.length > 0) ? view.TShipmentInternational[0].freightForwarder : ''
                                          var erd = (view.TShipmentInternational && view.TShipmentInternational.length > 0) ? moment(view.TShipmentInternational[0].earliestReturnDate).format("MM-DD-YYYY") : ''
                                          var cutOff = (view.TShipmentInternational && view.TShipmentInternational.length > 0) ? moment(view.TShipmentInternational[0].cargoCutoffDate).format("MM-DD-YYYY HH:MM") : ''
                                          var puLocation = (view.TShipmentInternational && view.TShipmentInternational.length > 0) ? view.TShipmentInternational[0].containerPickupLocation : ''
                                          var returnLocation = (view.TShipmentInternational && view.TShipmentInternational.length > 0) ? view.TShipmentInternational[0].containerReturnLocation : ''
                                          var docCutoff = (view.TShipmentInternational && view.TShipmentInternational.length > 0) ? moment(view.TShipmentInternational[0].docCutoffDate).format("MM-DD-YYY HH:MM") : ''
                                          var steamShipline = (view.TShipmentInternational && view.TShipmentInternational.length > 0) ? view.TShipmentInternational[0].TSteamshipLine.name : ''
                                          var status = (view.TShipmentInternational && view.TShipmentInternational.length > 0 ) ? view.TShipmentInternational[0].status : 'NA'
                                          var CType = ((view.TShipmentInternational && view.TShipmentInternational.length > 0) ? (view.TShipmentInternational[0].TContainerType ? view.TShipmentInternational[0].TContainerType.name : "N/A") : "N/A")
                                          var confd = (view.TShipmentInternational && view.TShipmentInternational.length > 0) ? (view.TShipmentInternational[0].status == "UNCONFIRMED" ? "NO" : "YES") : "NO"


                                      }
                                      else if (view.isDomestic == 1) {
                                          var status = (view.TShipmentDomestic && view.TShipmentDomestic.length > 0 ) ? view.TShipmentDomestic[0].status : 'NA'
                                          var confd = (view.TShipmentDomestic && view.TShipmentDomestic.length > 0) ? (view.TShipmentDomestic[0].status == "UNCONFIRMED" ? "NO" : "YES") : "NO"

                                      }
                                      return(
                                          <tr key={i++}>
                                              <td></td>
                                          <td  key="ARB" style={{display : this.props.showARB}}>{view.TLocation ? view.TLocation.locationName : ''}</td>
                                          <td  key="Customer" style={{display : this.props.showCustomer}}>{view.TCompany ? view.TCompany.name : ''}</td>
                                          <td  key="Release" style={{display : this.props.showRelease}}>{view.releaseNumber ? view.releaseNumber : ''}</td>
                                          <td  key="Shipment"  style={{display : this.props.showShipmentType}}>{view.isDomestic == 1 ? 'DOMESTIC' : 'INTERNATIONAL'}</td>
                                          <td  key="Booking" style={{display : this.props.showBooking}}>{(view.isDomestic == 1 && view.TShipmentDomestic && view.TShipmentDomestic.length > 0) ? view.TShipmentDomestic[0].bookingNumber : ((view.TShipmentInternational && view.TShipmentInternational.length > 0) ? view.TShipmentInternational[0].bookingNumber : '')}</td>
                                          <td key="Po"  style={{display : this.props.showPO}}>{data.TPackagingInstructions ? data.TPackagingInstructions.po_number : 'N/A'}</td>
                                          <td  key="Lot" style={{display : this.props.showLot}}>{data.TPackagingInstructionLots.length != 0 ? data.TPackagingInstructionLots.lot_number : 'N/A'}</td>
                                          <td key="Material"  style={{display : this.props.showMaterial}}>{data.TPackagingInstructions ? data.TPackagingInstructions.material : ''}</td>
                                          <td  key="Confirmed" style={{display : this.props.showConfmd}}>{confd ? confd : "NO"}</td>
                                          <td  key="Forwarder" style={{display : this.props.showForwarder}}>{view.isDomestic == 1 ? 'N/A' : freightForwarder}</td>
                                          <td  key="Cntr" style={{display : this.props.showCntrSize}}>{CType ? CType : "N/A"}</td>
                                          <td  key="Qty" style={{display : this.props.showQty}}>{view.numberOfContainers ? view.numberOfContainers : ''}</td>
                                          <td  key="Allocated" style={{display : this.props.showAlloc}}>{alloc ? alloc : "N/A"}</td>
                                          <td  key="Enough" style={{display : this.props.showEno}}>{eno}</td>
                                          <td  key="Bags" style={{display : this.props.showBags}}>{data.noOfBags ? data.noOfBags : 0}</td>
                                          <td  key="ERD"  style={{display : this.props.showERD}}>{view.isDomestic == 1 ? 'N/A' : erd}</td>
                                          <td  key="CutOff" style={{display : this.props.showCutoff}}>{view.isDomestic == 1 ? 'N/A' : cutOff}</td>
                                          <td  key="Vessel" style={{display : this.props.showVessel}}>{view.isDomestic == 1 ? 'N/A' : vessel}</td>
                                          <td  key="Steamship" style={{display : this.props.showSteamShip}}>{view.isDomestic == 1 ? 'N/A' : steamShipline}</td>
                                          <td  key="PU" style={{display : this.props.showPU}}>{view.isDomestic == 1 ? 'N/A' : puLocation}</td>
                                          <td key="Return"  style={{display : this.props.showRet}}>{view.isDomestic == 1 ? 'N/A' : returnLocation}</td>
                                          <td  key="Docs" style={{display : this.props.showDoc}}>{view.isDomestic == 1 ? 'N/A' : docCutoff}</td>
                                          <td key="Status"  style={{display : this.props.showStatus}}>{status == null ? "UNCONFIRMED" : status}</td>
                                          </tr>
                                      )
                                  }
                              }
                          )
                      })
                  }
                  </tbody>

              )

            })
        }
        else{
            var i=0;
        listData = _.map(this.state.viewData, (view, index)=> {
                if (sortedDataflag || (view.TShipmentInternational != undefined && view.TShipmentInternational.length > 0) || (view.TShipmentInternational != undefined && view.TShipmentDomestic.length > 0)) {
                    var alloc = "No"
                    var count = index

                    if (view.TContainerAllocation && view.TContainerAllocation.length > 0) {
                        alloc = "Yes"
                    }
                    var eno = 'N/A'
                    if (view.TContainerAllocation && view.TContainerAllocation.length > 0) {
                        var containerCount = 0
                        for (var i = 0; i < view.TContainerAllocation.length; i++) {
                            containerCount = containerCount + view.TContainerAllocation[i].noOfContainer
                        }
                        if (containerCount == view.numberOfContainers) {

                            eno = "YES"
                        } else {
                            eno = "NO"
                        }
                    }
                    var count = index

                    if (view.TShipmentLots.length > 0) {
                        var subheaderObj = {};
                        subheaderObj["ARB"] = (
                            <td key= "" style={{display : this.props.showARB}}><i className="fa fa-chevron-down"
                                                                          aria-hidden="false"
                                                                          data-target={count}
                                                                          onClick={(e) => {this.onClickRow(e)}}></i> {view.TLocation ? view.TLocation.locationName : ''}
                            </td>
                        );
                        subheaderObj["Customer"] = (
                            <td key= "Customer" style={{display : this.props.showCustomer}}> {view.TCompany ? view.TCompany.name : ''}</td>
                        );
                        subheaderObj["Release"] = (
                            <td key="Release" style={{display : this.props.showRelease}}>{view.releaseNumber ? view.releaseNumber : ''}</td>
                        );
                        subheaderObj["Shipment Type"] = (
                            <td key= " Shipment" style={{display : this.props.showShipmentType}}>{view.isDomestic == 1 ? 'DOMESTIC' : 'INTERNATIONAL'}</td>
                        );
                        subheaderObj["Booking"] = (
                            <td key= "Booking" style={{display : this.props.showBooking}}></td>
                        );
                        subheaderObj["Po#"] = (
                            <td key="Po" style={{display : this.props.showPO}}></td>
                        );
                        subheaderObj["Lot#"] = (
                            <td key= "Lot" style={{display : this.props.showLot}}></td>
                        );
                        subheaderObj["Material"] = (
                            <td  key= "Material" style={{display : this.props.showMaterial}}></td>

                        );
                        subheaderObj["Confirmed?"] = (
                            <td key= "Confirmed" style={{display : this.props.showConfmd}}></td>
                        );
                        subheaderObj["Forwarder"] = (
                            <td  key= "Forwarder" style={{display : this.props.showForwarder}}></td>
                        );
                        subheaderObj["Cntr Size"] = (
                            <td key= "Cntr" style={{display : this.props.showCntrSize}}></td>
                        );
                        subheaderObj["Qty"] = (
                            <td key= "Qty" style={{display : this.props.showQty}}></td>
                        );
                        subheaderObj["Allocated"] = (
                            <td  key= "allocated" style={{display :this.props.showAlloc}}></td>
                        );
                        subheaderObj["Enough"] = (
                            <td key= "Enough" style={{display : this.props.showEno}}></td>
                        );
                        subheaderObj["# of Bags To Ship"] = (
                            <td key= "Bags" style={{display : this.props.showBags}}></td>
                        );
                        subheaderObj["ERD"] = (
                            <td key= "ERD" style={{display : this.props.showERD}}></td>
                        );
                        subheaderObj["CutOff"] = (
                            <td key= "CutOff" style={{display : this.props.showCutoff}}></td>
                        );
                        subheaderObj["Vessel"] = (
                            <td key= "Vessel"style={{display : this.props.showVessel}}></td>
                        );
                        subheaderObj["Steamship Line"] = (
                            <td key= "Steamship" style={{display : this.props.showSteamShip}}></td>
                        );
                        subheaderObj["PU Location"] = (
                            <td key= "PU" style={{display : this.props.showPU}}></td>
                        );
                        subheaderObj["Return Location"] = (
                            <td key= "Return" style={{display : this.props.showRet}}></td>
                        );
                        subheaderObj["Docs Cutoff"] = (
                            <td key= "Docs" style={{display : this.props.showDoc}}></td>
                        );
                        subheaderObj["Status"] = (
                            <td key= "Status" style={{display : this.props.showStatus}}></td>
                        );
                        {/* <th style={{display : this.props.showTrucker}}></th>*/}


                        return (
                            <tbody key={index}>
                            <tr className="base_bg clickable" ref="clickable"
                                style={{"backgroundColor": "#e5e5ff"}}>
                                <td>
                                        <input type="checkbox" className="checkBox"
                                               onChange={(e)=>{this.props.headerCheckboxChange(e,view)}}
                                               value={view.id} id={view.id+"SC"}/>
                                    <label htmlFor={view.id+"SC"}></label>

                                </td>
                                {shipState.state.headerArray.map(obj => {
                                    return subheaderObj[obj];
                                })}


                            </tr>


                            {

                                _.map(view.TShipmentLots, (data, index)=> {

                                        if (sortedDataflag || (view.TShipmentInternational != undefined && view.TShipmentInternational.length > 0) || (view.TShipmentInternational != undefined && view.TShipmentDomestic.length > 0)) {
                                            this.statusArray = []
                                            if (view.TContainerDomestic && view.TContainerDomestic.length > 0) {
                                                for (var k in view.TContainerDomestic) {
                                                    this.statusArray.push(view.TContainerDomestic.status)
                                                }
                                            }
                                            else if (view.TContainerInternational && view.TContainerInternational.length > 0) {
                                                for (var k in view.TContainerDomestic) {
                                                    this.statusArray.push(view.TContainerInternational.status)
                                                }
                                            }

                                            this.sameValue = this.allValuesSame(this.statusArray)

                                            if (view.isDomestic == 0) {
                                                var vessel = (view.TShipmentInternational && view.TShipmentInternational.length > 0) ? view.TShipmentInternational[0].steamshipVessel : ''
                                                var freightForwarder = (view.TShipmentInternational && view.TShipmentInternational.length > 0) ? view.TShipmentInternational[0].freightForwarder : ''
                                                var erd = (view.TShipmentInternational && view.TShipmentInternational.length > 0) ? moment(view.TShipmentInternational[0].earliestReturnDate).format("MM-DD-YYYY") : ''
                                                var cutOff = (view.TShipmentInternational && view.TShipmentInternational.length > 0) ? moment(view.TShipmentInternational[0].cargoCutoffDate).format("MM-DD-YYYY HH:MM") : ''
                                                var puLocation = (view.TShipmentInternational && view.TShipmentInternational.length > 0) ? view.TShipmentInternational[0].containerPickupLocation : ''
                                                var returnLocation = (view.TShipmentInternational && view.TShipmentInternational.length > 0) ? view.TShipmentInternational[0].containerReturnLocation : ''
                                                var docCutoff = (view.TShipmentInternational && view.TShipmentInternational.length > 0) ? moment(view.TShipmentInternational[0].docCutoffDate).format("MM-DD-YYYY HH:MM") : ''
                                                var steamShipline = (view.TShipmentInternational && view.TShipmentInternational.length > 0) ? view.TShipmentInternational[0].TSteamshipLine.name : ''
                                                var status = (view.TShipmentInternational && view.TShipmentInternational.length > 0 ) ? view.TShipmentInternational[0].status : 'NA'
                                                var CType = ((view.TShipmentInternational && view.TShipmentInternational.length > 0) ? (view.TShipmentInternational[0].TContainerType ? view.TShipmentInternational[0].TContainerType.name : "N/A") : "N/A")
                                                var confd = (view.TShipmentInternational && view.TShipmentInternational.length > 0) ? (view.TShipmentInternational[0].status == "UNCONFIRMED" ? "NO" : "YES") : "NO"


                                            }
                                            else if (view.isDomestic == 1) {
                                                var status = (view.TShipmentDomestic && view.TShipmentDomestic.length > 0 ) ? view.TShipmentDomestic[0].status : 'NA'
                                                var confd = (view.TShipmentDomestic && view.TShipmentDomestic.length > 0) ? (view.TShipmentDomestic[0].status == "UNCONFIRMED" ? "NO" : "YES") : "NO"

                                            }
                                            var cellObj = {};
                                            var ship=this;
                                            cellObj["ARB"] = (
                                                <td  key="ARB" style={{display : this.props.showARB}}></td>
                                            );
                                            cellObj["Customer"] = (
                                                <td  key="Customer" style={{display : this.props.showCustomer}}></td>
                                            );
                                            cellObj["Release"] = (
                                                <td  key="Release" style={{display : this.props.showRelease}}></td>
                                            );
                                            cellObj["Shipment Type"] = (
                                                <td  key="Shipment"  style={{display : this.props.showShipmentType}}></td>
                                            );
                                            cellObj["Booking"] = (
                                                <td  key="Booking" style={{display : this.props.showBooking}}>{(view.isDomestic == 1 && view.TShipmentDomestic && view.TShipmentDomestic.length > 0) ? view.TShipmentDomestic[0].bookingNumber : ((view.TShipmentInternational && view.TShipmentInternational.length > 0) ? view.TShipmentInternational[0].bookingNumber : '')}</td>
                                            );
                                            cellObj["Po#"] = (
                                                <td key="Po"  style={{display : this.props.showPO}}>{data.TPackagingInstructions ? data.TPackagingInstructions.po_number : 'N/A'}</td>
                                            );
                                            cellObj["Lot#"] = (
                                                <td  key="Lot" style={{display : this.props.showLot}}>{data.TPackagingInstructionLots.length != 0 ? data.TPackagingInstructionLots.lot_number : 'N/A'}</td>
                                            );
                                            cellObj["Material"] = (
                                                <td key="Material"  style={{display : this.props.showMaterial}}>{data.TPackagingInstructions ? data.TPackagingInstructions.material : ''}</td>

                                            );
                                            cellObj["Confirmed?"] = (
                                                <td  key="Confirmed" style={{display : this.props.showConfmd}}>{confd ? confd : "NO"}</td>
                                            );
                                            cellObj["Forwarder"] = (
                                                <td  key="Forwarder" style={{display : this.props.showForwarder}}>{view.isDomestic == 1 ? 'N/A' : freightForwarder}</td>
                                            );
                                            cellObj["Cntr Size"] = (
                                                <td  key="Cntr" style={{display : this.props.showCntrSize}}>{CType ? CType : "N/A"}</td>
                                            );
                                            cellObj["Qty"] = (
                                                <td  key="" style={{display : this.props.showQty}}>{view.numberOfContainers ? view.numberOfContainers : ''}</td>
                                            );
                                            cellObj["Allocated"] = (
                                                <td  key="Allocated" style={{display : this.props.showAlloc}}>{alloc ? alloc : "N/A"}</td>
                                            );
                                            cellObj["Enough"] = (
                                                <td  key="Enough" style={{display : this.props.showEno}}>{eno}</td>
                                            );
                                            cellObj["# of Bags To Ship"] = (
                                                <td  key="Bags" style={{display : this.props.showBags}}>{data.noOfBags ? data.noOfBags : 0}</td>
                                            );
                                            cellObj["ERD"] = (
                                                <td  key="ERD"  style={{display : this.props.showERD}}>{view.isDomestic == 1 ? 'N/A' : erd}</td>
                                            );
                                            cellObj["CutOff"] = (
                                                <td  key="CutOff" style={{display : this.props.showCutoff}}>{view.isDomestic == 1 ? 'N/A' : cutOff}</td>
                                            );
                                            cellObj["Vessel"] = (
                                                <td  key="Vessel" style={{display : this.props.showVessel}}>{view.isDomestic == 1 ? 'N/A' : vessel}</td>
                                            );
                                            cellObj["Steamship Line"] = (
                                                <td  key="Steamship" style={{display : this.props.showSteamShip}}>{view.isDomestic == 1 ? 'N/A' : steamShipline}</td>
                                            );
                                            cellObj["PU Location"] = (
                                                <td  key="PU" style={{display : this.props.showPU}}>{view.isDomestic == 1 ? 'N/A' : puLocation}</td>
                                            );
                                            cellObj["Return Location"] = (
                                                <td key="Return"  style={{display : this.props.showRet}}>{view.isDomestic == 1 ? 'N/A' : returnLocation}</td>
                                            );
                                            cellObj["Docs Cutoff"] = (
                                                <td  key="Docs" style={{display : this.props.showDoc}}>{view.isDomestic == 1 ? 'N/A' : docCutoff}</td>
                                            );
                                            cellObj["Status"] = (
                                                <td key="Status"  style={{display : this.props.showStatus}}>{status == null ? "UNCONFIRMED" : status}</td>
                                            );

                                            return (
                                                <tr key={index} className={count}>
                                                    <td>

                                                            <input className="checkBox" type="checkbox"
                                                                   onClick={(e) => this.checkclick(e,data)}
                                                                   id={data.TPackagingInstructionLots ? data.TPackagingInstructionLots.id + ":" + (++i): ''}
                                                                   value={view.id}
                                                                   onChange={(e)=>{this.props.checkboxChange(e,view,data)}}/>

                                                        <label htmlFor={data.TPackagingInstructionLots ? data.TPackagingInstructionLots.id + ":" + i : ''}></label>
                                                    </td>

                                                    {shipState.state.headerArray.map(obj => {
                                                        return cellObj[obj];
                                                    })}
                                                </tr>
                                            )
                                        }
                                    }
                                )

                            }

                            </tbody>


                        )
                    }
                }
            }
        )}

        listData = _.filter(listData, function (param) {
            return param !== undefined;
        });

        var headerObj = {};
        headerObj["ARB"] = (
            <th key="ARB" style={{display : this.props.showARB}}
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
        headerObj["Release"] = (
            <th key="Release" style={{display : this.props.showRelease}}
                onClick={(e)=> this.onAscending(e,'Release')}>Release
                        <span className="fa-stack ">
                        <i className="fa fa-sort-asc fa-stack-1x"></i>
                        <i className="fa fa-sort-desc fa-stack-1x"></i>
                </span>
            </th>
        );
        headerObj["Shipment Type"] = (
            <th key="Shipment" style={{display : this.props.showShipmentType}}
                onClick={(e)=> this.onAscending(e,'ShipmentType')}>Shipment Type
              <span className="fa-stack ">
                      <i className="fa fa-sort-asc fa-stack-1x"></i>
                      <i className="fa fa-sort-desc fa-stack-1x"></i>
              </span>
            </th>
        );
        headerObj["Booking"] = (
            <th key="Booking" style={{display : this.props.showBooking}}
                onClick={(e)=> this.onAscending(e,'Booking')}>Booking
                        <span className="fa-stack ">
                        <i className="fa fa-sort-asc fa-stack-1x"></i>
                        <i className="fa fa-sort-desc fa-stack-1x"></i>
                </span>
            </th>
        );
        headerObj["Po#"] = (
            <th key="Po" style={{display : this.props.showPO}} onClick={(e)=> this.onAscending(e,'po_number')}>PO#
                 <span className="fa-stack ">
                        <i className="fa fa-sort-asc fa-stack-1x"></i>
                        <i className="fa fa-sort-desc fa-stack-1x"></i>
                </span>
            </th>
        );
        headerObj["Lot#"] = (

            <th key="Lot" style={{display : this.props.showLot}} onClick={(e)=> this.onAscending(e,'lot_number')}>
                Lot#
                <span className="fa-stack ">
                        <i className="fa fa-sort-asc fa-stack-1x"></i>
                        <i className="fa fa-sort-desc fa-stack-1x"></i>
                </span>
            </th>

        );
        headerObj["Material"] = (
            <th key="Material" style={{display : this.props.showMaterial}}
                onClick={(e)=> this.onAscending(e,'Material')}>Material
               <span className="fa-stack ">
                        <i className="fa fa-sort-asc fa-stack-1x"></i>
                        <i className="fa fa-sort-desc fa-stack-1x"></i>
                </span>

            </th>
        );
        headerObj["Confirmed?"] = (
            <th key="Confirmed" style={{display : this.props.showConfmd}} onClick={(e)=> this.onAscending(e,'Confmd')}>
                Confirmed?
               <span className="fa-stack ">
                        <i className="fa fa-sort-asc fa-stack-1x"></i>
                        <i className="fa fa-sort-desc fa-stack-1x"></i>
                </span>
            </th>
        );
        headerObj["Forwarder"] = (
            <th key="Forwarder" style={{display : this.props.showForwarder}}
                onClick={(e)=> this.onAscending(e,'Forwarder')}>Forwarder
                <span className="fa-stack ">
                        <i className="fa fa-sort-asc fa-stack-1x"></i>
                        <i className="fa fa-sort-desc fa-stack-1x"></i>
                </span>
            </th>
        );
        headerObj["Cntr Size"] = (

            <th key="Cntr" style={{display : this.props.showCntrSize}}
                onClick={(e)=> this.onAscending(e,'CntrSize')}>Cntr Size
                <span className="fa-stack ">
                        <i className="fa fa-sort-asc fa-stack-1x"></i>
                        <i className="fa fa-sort-desc fa-stack-1x"></i>
                </span>

            </th>
        );
        headerObj["Qty"] = (
            <th key="Qty" style={{display : this.props.showQty}} onClick={(e)=> this.onAscending(e,'Qty')}>Qty
                <span className="fa-stack ">
                        <i className="fa fa-sort-asc fa-stack-1x"></i>
                        <i className="fa fa-sort-desc fa-stack-1x"></i>
                </span>

            </th>
        );
        headerObj["Allocated"] = (
            <th  key="Allocated" style={{display : this.props.showAlloc}}
                onClick={(e)=> this.onAscending(e,'Allocated')}>Allocated
                <span className="fa-stack ">
                        <i className="fa fa-sort-asc fa-stack-1x"></i>
                        <i className="fa fa-sort-desc fa-stack-1x"></i>
                </span>
            </th>
        );
        headerObj["Enough"] = (
            <th key="Enough" style={{display : this.props.showEno}} onClick={(e)=> this.onAscending(e,'Enough')}>
                Enough?
                <span className="fa-stack ">
                        <i className="fa fa-sort-asc fa-stack-1x"></i>
                        <i className="fa fa-sort-desc fa-stack-1x"></i>
                </span>

            </th>
        );
        headerObj["# of Bags To Ship"] = (
            <th key = "Bags" style={{display : this.props.showBags}} onClick={(e)=> this.onAscending(e,'Bags')}>
                # of Bags To Ship
                <span className="fa-stack ">
                        <i className="fa fa-sort-asc fa-stack-1x"></i>
                        <i className="fa fa-sort-desc fa-stack-1x"></i>
                </span>

            </th>
        );
        headerObj["ERD"] = (
            <th  key = "ERD" style={{display : this.props.showERD}} onClick={(e)=> this.onAscending(e,'ERD')}>ERD
                <span className="fa-stack ">
                        <i className="fa fa-sort-asc fa-stack-1x"></i>
                        <i className="fa fa-sort-desc fa-stack-1x"></i>
                </span>

            </th>
        );
        headerObj["CutOff"] = (
            <th key = "CutOff" style={{display : this.props.showCutoff}} onClick={(e)=> this.onAscending(e,'CutOff')}>
                CutOff
               <span className="fa-stack ">
                        <i className="fa fa-sort-asc fa-stack-1x"></i>
                        <i className="fa fa-sort-desc fa-stack-1x"></i>
                </span>
                            </th>
        );
        headerObj["Vessel"] = (
            <th key = "Vessel" style={{display : this.props.showVessel}} onClick={(e)=> this.onAscending(e,'Vessel')}>
                Vessel
               <span className="fa-stack ">
                        <i className="fa fa-sort-asc fa-stack-1x"></i>
                        <i className="fa fa-sort-desc fa-stack-1x"></i>
                </span>

            </th>
        );
        headerObj["Steamship Line"] = (
            <th key = "Steamship"style={{display : this.props.showSteamShip}}
                onClick={(e)=> this.onAscending(e,'SteamshipLine')}>Steamship Line
               <span className="fa-stack ">
                        <i className="fa fa-sort-asc fa-stack-1x"></i>
                        <i className="fa fa-sort-desc fa-stack-1x"></i>
                </span>
            </th>
        );
        headerObj["PU Location"] = (
            <th key = "PU"style={{display : this.props.showPU}} onClick={(e)=> this.onAscending(e,'PULocation')}>
                PU Location
               <span className="fa-stack ">
                        <i className="fa fa-sort-asc fa-stack-1x"></i>
                        <i className="fa fa-sort-desc fa-stack-1x"></i>
                </span>

            </th>
        );
        headerObj["Return Location"] = (

            <th key = "Return" style={{display : this.props.showRet}}
                onClick={(e)=> this.onAscending(e,'ReturnLocation')}>Return Location
               <span className="fa-stack ">
                        <i className="fa fa-sort-asc fa-stack-1x"></i>
                        <i className="fa fa-sort-desc fa-stack-1x"></i>
                </span>

            </th>
        );
        headerObj["Docs Cutoff"] = (
            <th key = "Docs" style={{display : this.props.showDoc}} onClick={(e)=> this.onAscending(e,'DocsCutoff')}>
                Docs Cutoff
               <span className="fa-stack ">
                        <i className="fa fa-sort-asc fa-stack-1x"></i>
                        <i className="fa fa-sort-desc fa-stack-1x"></i>
                </span>

            </th>
        );
        headerObj["Status"] = (
            <th key = "Status" style={{display : this.props.showStatus}} onClick={(e)=> this.onAscending(e,'Status')}>
                Status
               <span className="fa-stack ">
                        <i className="fa fa-sort-asc fa-stack-1x"></i>
                        <i className="fa fa-sort-desc fa-stack-1x"></i>
                </span>
            </th>

        );

        return (
            <Loader loaded={this.state.loaded}>
                <div className="loadedContentNew">
                    <table id="Packaging_Instruction_View" className="table table-expandable table-striped" cellSpacing="0">
                        <thead className="table_head header-fixed header sorted_head ">
                        <tr className="sorting_head header-fixed" style={{"backgroundColor" : "#2e6da4"}}>
                            <th className="exclude-drag">
                                {grouping && this.props.SelcetedOptionForGroupBy!="" ? this.props.SelcetedOptionForGroupBy:""}
                            </th>

                            {this.state.headerArray.map(obj => {
                                return headerObj[obj];
                            })}

                        </tr>
                        </thead>
                        { ( listData == undefined || listData.length == 0)
                            ?
                            <tbody>
                            <tr>
                                <td colSpan="11" className="noresult"><p>No results match your entered criteria.</p></td>
                                <td colSpan="13" className="noresult"><p></p></td>
                            </tr>
                            </tbody> : listData
                        }
                    </table>
                </div>
            </Loader>)
    }
}
export default ShipmentViewDataComponent;
