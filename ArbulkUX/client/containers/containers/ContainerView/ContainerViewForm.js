import React from 'react';
import SweetAlert from 'sweetalert-react';
import '../../../public/stylesheets/sweetalert.css';
import '../../../public/stylesheets/style.css';
import '../../../public/stylesheets/bootstrap.min.css';
import FilterComponent from '../../../components/ContainerFilterComponent';
import ContainerViewDataComponent from '../../../components/ContainerViewDataComponent/ContainerViewDataComponent';
import FilterButton from '../../../components/ContainerFilterComponent/FilterButton';
import ShowHideColumn from '../../../components/ShowColumns/showColumn'
import { hashHistory } from 'react-router'
import { createDataLoader } from 'react-loopback';
import axios from 'axios'
import {Base_Url} from '../../../constants';
class ContainerViewForm extends React.Component {
    constructor(props) {
        super(props);
        this.status
        this.state = {
            showARB: "",
            showCustomer: "",
            showRelease: "",
            showBooking: "",
            showContainer: "",
            showTrucker: "",
            showArrived: "",
            showSteamShip: "",
            showType: "",
            showStatus:"",
            showShipmentType:"",
            key: 0,
            selectedOption: 'lbs',
            index: 0,
            selectedOption1: 'kg',
            SelcetedOptionForGroupBy: "",
            OptionToGroupby: ["ARB", "Customer", "Release#", "Booking#", "Container#", "Trucker", "Steamship Line", "Type", "Status", "Shipment Type"],
            open:false,
            locationSelected:[],
            customerSelected:[],
            statusSelected:[],
            selectedRelease:'',
            selectedArrd:'',
            selectedSteamShip:[],
            selectedContainerType:[],
            viewId:''
        }
        this.containerId = ''
        this.isDomestic = false
        this.buttonDisplay = []
        this.checkedCustomer = []
        this.checkedStatus = []
        this.checkedCompany = []
        this.checkedContainer = []
        this.editId = ''
        this.Query = {}
        this.Where = {}
        this.qArray = []
        this.selected = null
        this.onContainerFilter = this.onContainerFilter.bind(this)
        this.SteamLine = this.SteamLine.bind(this)
        this.Arrival = this.Arrival.bind(this)
        this.lotSearch = this.lotSearch.bind(this)
        this.onTextChange = this.onTextChange.bind(this)
        this.onSearch = this.onSearch.bind(this)
        this.onCompanyFilter = this.onCompanyFilter.bind(this)
        this.onCustomerFilter = this.onCustomerFilter.bind(this)
        this.onStatusFilter = this.onStatusFilter.bind(this)
        this.onRemove = this.onRemove.bind(this)
        this.saveView = this.saveView.bind(this)
        this.onEdit = this.onEdit.bind(this)
        this.onCheckboxChange = this.onCheckboxChange.bind(this)
        this.handleTextChange = this.handleTextChange.bind(this)
        this.viewChange = this.viewChange.bind(this)
        this.addToqueue = this.addToqueue.bind(this)
        this.PrintElem = this.PrintElem.bind(this)
        this.onSteamShipFilter = this.onSteamShipFilter.bind(this)
        this.SteamLineArray = []
        this.OnGroupBy = this.OnGroupBy.bind(this)
        this.toggleColumn = this.toggleColumn.bind(this)
        this.handleOpen = this.handleOpen.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.removeSates = this.removeSates.bind(this)
        this.saveNewCustomView = this.saveNewCustomView.bind(this)
        this.updateExistingView = this.updateExistingView.bind(this)
    }


    componentWillMount() {
        var userId = Number(localStorage.getItem("userId"));
        axios.get(Base_Url + "TCustomViews").then(response=> {
            this.setState({
                savedViews: response.data
            })
        });
        axios.get(Base_Url + "TContainerInternationals/getMaxQueue").then(response=> {
            this.sequense = response.data

            this.setState({
                max_seq: this.sequense[0].max_mark
            })
        });
        axios.get(Base_Url+`TColumnShowHides?filter={"where":{"tableName":"Container","userId":${userId}}}`).then(response=>{
            this.setState({
                columns:response.data
            })

            for(var i=0;i<response.data.length;i++){
                this.toggleColumn(response.data[i].columnName,response.data[i].show);
            }
        })
    }

    print(e) {
        if (this.containerId != '' && this.isDomestic == false) {

            hashHistory.push('/Container/containerPrint/' + this.contId)
            //hashHistory.push('/Packaging/inventorycard/'+this.piID+'/'+this.selected)
        }
        else if (this.containerId != '' && this.isDomestic == true) {
            hashHistory.push('/Container/BOLDomestic/' + this.contId)
        }
        else if (this.containerId == '' && this.isDomestic == false) {

            swal("Selection Missing", "Please select a container to print.", "error")
        }
        else {
            swal('', 'Domestic container report is not available.');
        }
    }

    OnGroupBy(e) {
        this.setState({
            SelcetedOptionForGroupBy: e.target.value
        })
        this.forceUpdate()
    }

    printLoadOrder(e) {

        if (this.editId != undefined || this.contId != undefined) {
            //console.log('print view', this.editId + '/' + this.contId)
            hashHistory.push('/Shipment/shipmentPrint/' + this.editId + '/' + this.contId)
            //hashHistory.push('/Packaging/inventorycard/'+this.piID+'/'+this.selected)
        }
        else {
            //console.log('mmmmmmmmmmmmmmmmmmmmm');
            //hashHistory.push('/Shipment/shipmentPrint/')
            swal("Selection Missing", "Please select a lot to view.", "error")
        }
    }

    Arrival(e) {

        //console.log("valueShipment type", e.target.value)
        this.arrivalType = e.target.value

        Object.defineProperty(this.Where, "Arrival", {
            enumerable: true,
            writable: true,
            configurable: true,
            value: this.arrivalType
        })
        this.setState({
            selectedArrd:e.target.value
        })
        this.onSearch(e)
    }
    PrintElem(elem)
    {
        var mywindow = window.open('', 'PrintWindow', '');
        mywindow.document.write('<html><head><title>' + document.title  + '</title>');
        // mywindow.document.write('<link rel="stylesheet" href={../../../public/stylesheets/style.css} type="text/css" />');
        mywindow.document.write('</head><body ><table border="0">');
        mywindow.document.write(document.getElementById('Packaging_Instruction_View').innerHTML);
        mywindow.document.write('</table></body></html>');
         
        mywindow.document.close(); // necessary for IE >= 10
        mywindow.focus(); // necessary for IE >= 10*/
        mywindow.print();
        mywindow.close();
        return true

        //window.location.reload()
    }

    PrintScreen() {
        var scrollLeft = document.getElementsByClassName("loadedContentNew")[0].scrollLeft
        document.getElementsByClassName('pos-relative-b')[0].style.display = 'none'
        document.getElementsByClassName('filter-btn')[0].style.display = 'none'
        document.getElementById("nonPrintable").style.display = "none"
        document.getElementById("row").style.display = "none"
        document.getElementById("hide1").style.display = "none"
        // document.getElementById("hide2").style.display = "none"
        // document.getElementById("hide3").style.display = "none"
        document.getElementById("hide4").style.display = "none"
        document.getElementById("hide5").style.display = "none"
        document.getElementById("customer_name").style.display = "none"
        document.getElementsByClassName("loadedContentNew")[0].style.cssText = ""
        document.getElementsByClassName("loadedContentNew")[0].style.height = "100%"
        document.getElementsByClassName("loadedContentNew")[0].style.maxHeight="100%"
        document.getElementsByClassName("loadedContentNew")[0].scrollLeft = scrollLeft
        var printContent = document.getElementById('Packaging_Instruction_View').innerHtml
        document.body.innerHtml = printContent
        window.print()
        window.location.reload()
    }

    onSteamShipFilter(e, steamShip) {
         
        if (e.target.checked) {
            this.SteamLineArray.push(parseInt(e.target.id));
            Object.defineProperty(this.Where, "SteamLine", {
                enumerable: true,
                writable: true,
                configurable: true,
                value: this.SteamLineArray
            })
            this.setState({
                selectedSteamShip : this.SteamLineArray
            })
            // this.buttonDisplay.push(e.target.value)

        }
        else {
            if (this.SteamLineArray.indexOf(parseInt(e.target.id)) != -1) {
                this.SteamLineArray.splice(this.SteamLineArray.indexOf(parseInt(e.target.id)), 1)
            }
            this.setState({
                selectedSteamShip : this.SteamLineArray
            })
            this.buttonDisplay = _.without(this.buttonDisplay, e.target.value)
        }
        this.onSearch(e)
        this.forceUpdate()
    }

    onContainerFilter(e, location) {
         
        if (e.target.checked) {
            this.checkedContainer.push(e.target.id)
            // this.buttonDisplay.push(e.target.value)
            //   this.forceUpdate()
            //console.log(this.props.checkedCompany)
            //console.log(this.props.buttonDisplay)

        }
        else if (!e.target.checked) {
            let id = e.target.id
            this.checkedContainer = _.without(this.checkedContainer, id)
            this.Where.checkedContainer = this.checkedContainer
            if (Object.keys(this.Where.Container).length === 0) {
                this.Where.Container = undefined
                delete this.Where.Container
            }
            let value = e.target.value
            let index = this.buttonDisplay.indexOf(e.target.value)
            if (index !== -1)
                this.buttonDisplay = _.without(this.buttonDisplay, value)
        }
        Object.defineProperty(this.Where, "Container", {
            enumerable: true,
            writable: true,
            configurable: true,
            value: this.checkedContainer
        })
        this.setState({
            selectedContainerType : this.checkedContainer
        })
        this.onSearch(e)
        this.forceUpdate()
    }


    onCompanyFilter(e, location) {
        if (e.target.checked) {
            this.forceUpdate()
            this.checkedCompany.push(e.target.id)
            Object.defineProperty(this.Where, "Company", {
                enumerable: true,
                writable: true,
                configurable: true,
                value: this.checkedCompany
            })
            this.state.locationSelected.push({"locationId":e.target.id})
        }
        else if (!e.target.checked) {
            let id = e.target.id
            this.checkedCompany = _.without(this.checkedCompany, id)
            this.Where.Company = this.checkedCompany
            if (Object.keys(this.Where.Company).length === 0) {
                this.Where.Company = undefined
                //console.log(this.Where)
                delete this.Where.Company
            }
            Object.defineProperty(this.Where, "Container", {
                enumerable: true,
                writable: true,
                configurable: true,
                value: this.checkedContainer
            });
            let value = e.target.value
            let index = this.buttonDisplay.indexOf(e.target.value)
            if (index !== -1)
                this.buttonDisplay = _.without(this.buttonDisplay, value)
            for(let i =0 ;i<this.state.locationSelected.length;i++){
                if(this.state.locationSelected[i].locationId.toString() == id.toString()){
                    this.state.locationSelected.splice(i,1);
                }
            }
            this.forceUpdate()
        }
        this.onSearch(e)
    }

    onCustomerFilter(e,customer,isOnly) {
        if(isOnly){
            let id = e.target.id.split(':')[1]
            let elements = document.getElementsByClassName('checkboxCustomer inline')
            for(let i=0;i<elements.length;i++){
                let elem = elements[i].firstChild.firstChild;
                elem.checked = false;
                if(elem.id === id)
                    elem.checked = true
            }
            //will not work as 2 child components are having same id
            //document.getElementById(id).checked = true;
            this.checkedCustomer = []
            this.checkedCustomer.push(id)
            Object.defineProperty(this.Where,"Customer",{enumerable: true ,
                writable: true,
                configurable:true,
                value:this.checkedCustomer})
            this.setState({
                customerSelected:[]
            });
            this.state.customerSelected.push(id)
        }
        else{
            if (e.target.checked) {
                this.forceUpdate()
                this.checkedCustomer.push(e.target.id)
                Object.defineProperty(this.Where, "Customer", {
                    enumerable: true,
                    writable: true,
                    configurable: true,
                    value: this.checkedCustomer
                })
                this.state.customerSelected.push(e.target.id)
            }
            else if (!e.target.checked) {
                let id = e.target.id
                this.checkedCustomer = _.without(this.checkedCustomer, id)
                this.Where.Customer = this.checkedCustomer
                if (Object.keys(this.Where.Customer).length === 0) {
                    this.Where.Customer = undefined
                    delete this.Where.Customer
                }
                let value = e.target.value
                let index = this.buttonDisplay.indexOf(e.target.value)
                if (index !== -1)
                    this.buttonDisplay = _.without(this.buttonDisplay, value)
                for(let i in this.state.customerSelected){
                    if(this.state.customerSelected[i] === e.target.id){
                        this.state.customerSelected.splice(i,1);
                    }
                }
                this.forceUpdate()
            }
        }
        this.onSearch(e)
    }

    onStatusFilter(e, status) {
        if (e.target.checked) {
            this.checkedStatus.push(e.target.value);
            Object.defineProperty(this.Where, "status", {
                enumerable: true,
                writable: true,
                configurable: true,
                value: this.checkedStatus
            })
            this.state.statusSelected.push(e.target.value)
            this.forceUpdate()
        }
        else if (!e.target.checked) {
            let value = e.target.value
            let pos = this.checkedStatus.indexOf(e.target.value)
            this.checkedStatus = _.without(this.checkedStatus, value)
            this.Where.status = this.checkedStatus
            if (Object.keys(this.Where.status).length === 0) {
                this.Where.status = undefined
                delete this.Where.status
            }
            let index = this.buttonDisplay.indexOf(e.target.value)
            if (index !== -1)
                this.buttonDisplay = _.without(this.buttonDisplay, value)
            let data = this.state.statusSelected
            let currntIndex = data.indexOf(e.target.value)
            data.splice(currntIndex,1)
            this.setState({
                statusSelected:data
            })
            this.forceUpdate()
        }
        this.onSearch(e)
    }

    onButtonRemove(index, button) {
        this.buttonDisplay.splice(index, 1)
        this.forceUpdate()

    }
    removeSates(){
        this.buttonDisplay = [];
        this.checkedCustomer = []
        this.checkedStatus = []
        this.checkedCompany = []
        this.Query = []
        this.SteamLineArray = []
        this.arrivalType = ''
        this.SteamLineArray = []
        delete this.Where.Company
        delete this.Where.Customer
        delete this.Where.status
        delete this.state.viewData
        delete this.state.Container
        delete this.state.Arrival
        delete this.state.SteamLine
        delete this.state.SelcetedOptionForGroupBy
        this.setState({
            key: this.state.key + 1,
            index: this.state.index + 1,
            SelcetedOptionForGroupBy: "",
            locationSelected:[],
            customerSelected:[],
            statusSelected:[],
            selectedRelease:'',
            selectedArrd : -1,
            selectedSteamShip : [],
            selectedContainerType : [],
            viewId:''
        })
    }
    onRemove(e) {
        this.removeSates();
        document.getElementById('groupBy').selectedIndex = 0
        document.getElementById('customer_name').selectedIndex = 0
        localStorage.removeItem('conViewData')
        this.forceUpdate();
    }

    onCheckboxChange(e, data, contData) {
        this.containerData = contData
        //console.log(">>>>>>>>>>>>>Contaimner Data", this.containerData)
        this.contId = contData.id
        this.type = data.isDomestic
        this.editId = data.id
        //console.log("DATA", data)
        this.parentShipId = (data.TContainerInternational && data.TContainerInternational.length > 0 ) ? data.TContainerInternational[0].id : ''
        this.shipmentid = (data.TShipmentInternational && data.TShipmentInternational.length > 0) ? data.TShipmentInternational[0].id : ''
        if (data.isDomestic == 1) {
            this.isDomestic = true;
            this.containerId = data.TContainerDomestic[0].id;
        }
        else {
            this.isDomestic = false;
            this.containerId = data.TContainerInternational[0].id;
        }

    }

    onEdit(e) {
        hashHistory.push('Container/containeredit/' + this.editId + '/' + this.contId)
    }

    addToqueue() {

        if (!this.containerData.containerSteamshipLineConfirmed) {
            swal("", "Domestic container can not be in queue.", 'info')
            return;
        }
        if (!this.containerData.containerArrived) {
            swal("", "Container must be arrived before queued.", 'info');
            return
        }

        if (this.containerData && (this.containerData.status == "LOADED" || this.containerData.status == "INTRANSIT" || this.containerData.status == "DELIVERED")) {
            swal("", "The container is already" + " " + this.containerData.status+".", 'info');
            return
        }

        var id = this.contId
        var shipId = this.shipmentid
        axios.put(Base_Url + "TContainerInternationals/" + id, {
            sequence: parseInt(this.state.max_seq) + 1,
            status: 'QUEUED',
            isqueued: 1
        }).then((response)=> {

            axios.put(Base_Url + "TShipmentInternationals/" + shipId, {status: "QUEUED"}).then((response)=> {
                swal({
                        title: "Success",
                        text: "Successfully added to the queue.",
                        type: "success",
                        showCancelButton: true,
                    },

                    function (isConfirm) {
                        hashHistory.push('/Conatainer/containerqueueview')

                    }
                );
            })


        }).catch((err)=> {

        })
    }

    onSearch(e) {
         
        Object.defineProperty(this.Where, "Query", {
            enumerable: true,
            writable: true,
            configurable: true,
            value: this.Query
        })


        var serachObj = []
        var serachObjLots = []
        var shipType = []
        var containerSearch = []
        var isDomestic
        var intl = []
        var arrival = []
        var arrivedtemp, steamtemp
        if (this.shipMentType) {
            Object.defineProperty(this.Where, "shipMentType", {
                enumerable: true,
                writable: true,
                configurable: true,
                value: this.shipMentType
            })
        }

        if (this.Where.shipMentType && this.Where.shipMentType == "Domestic") {
            isDomestic = true
            var objShip = {"isDomestic": 1}
            serachObj.push(objShip)
        }
        else if (this.Where.shipMentType && this.Where.shipMentType == "International") {
            isDomestic = false
            var objShip = {"isDomestic": 0}
            serachObj.push(objShip)
        }

        var searchContainerFlag = false

        if (this.Where.Container && this.Where.Container.length > 0) {
            var container = []
            var obj2 = {}
            for (var i in this.Where.Container) {
                obj2 = {"containerTypeId": this.Where.Container[i]}
                container.push(obj2);
            }
            containerSearch.push(container)
            searchContainerFlag = true
        }

        //console.log("Search object", serachObj)

        if (this.Where != undefined && this.Where != null) {
            if (this.Where.Customer && this.Where.Customer.length > 0) {
                var customer = []
                var obj = {}
                for (var i in this.Where.Customer) {
                    obj = {"customerId": this.Where.Customer[i]}
                    customer.push(obj);
                }
                serachObj.push(customer)
            }

            if (this.Where.Company && this.Where.Company.length > 0) {
                var company = [];
                var objCompany = {}
                for (var j in this.Where.Company) {
                    objCompany = {"locationId": this.Where.Company[j]}
                    company.push(objCompany);
                }
                serachObj.push(company)
            }

            if (this.Where.status && this.Where.status.length) {

                var Railstatus = [];
                var objStatus = {};
                for (var z in this.Where.status) {
                    objStatus = {"status": this.Where.status[z]}
                    Railstatus.push(objStatus)
                }
                serachObjLots.push(Railstatus)

            }

            if (this.Where.Query && this.Where.Query != null && this.Where.Query != undefined && this.Where.Query.POSearch && this.Where.Query.POSearch != undefined) {
                var poSearch = [{'po_number': {"like": "%" + this.Where.Query.POSearch + "%"}}]
                serachObj.push(poSearch)
            }

            if (this.Where.Query && this.Where.Query != null && this.Where.Query != undefined && this.Where.Query.LotSearch && this.Where.Query.LotSearch != undefined) {
                var lotSearch = [{'releaseNumber': {"like": "%" + this.Where.Query.LotSearch + "%"}}]
                serachObj.push(lotSearch)
            }
            var arrivalData = {"containerArrived": -1}
            if (this.Where.Arrival == "1" || this.Where.Arrival == "0") {

                arrivalData = {"containerArrived": parseInt(this.Where.Arrival)}
                arrival.push(arrivalData)
                intl.push(arrivalData)
            }
            var tempsteamp = this.SteamLineArray.length > 0 ? 1 : -1
            var steam = []
            var steamflag = false
            if (this.SteamLineArray.length > 0) {
                steam = []
                steamflag = true
                for (var steamTemp in this.SteamLineArray) {
                    steam.push(this.SteamLineArray[steamTemp])
                }
                var steamdata = {"containerSteamshipLineConfirmed": this.Where.SteamLine}
                intl.push(steamdata)
            }

            serachObj = [].concat.apply([], serachObj);
            serachObjLots = [].concat.apply([], serachObjLots);
            containerSearch = [].concat.apply([], containerSearch);

            var PIview = createDataLoader(ContainerViewForm, {
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

            var base = 'TShipmentents';
            //TPackagingInstructionLots TContainerInternational

            if ((containerSearch && containerSearch.length > 0  )) {


                this.url = PIview._buildUrl(base, {
                    "include": ["TContainerInternational", "TCompany", "TLocation", "TShipmentDomestic",
                        {
                            "relation": "TShipmentInternational",
                            "include": ["TContainerType", "TSteamshipLine"],
                            "scope": {"include": "TContainerType", "where": {"or": containerSearch}}
                        }]
                    //where: {"and": serachObj}

                });
            }

            if (serachObjLots && serachObjLots.length > 0 ) {

                this.url = PIview._buildUrl(base, {
                    "include": [{
                        "relation": "TContainerDomestic",
                        "scope": {"where": {"or": serachObjLots}}
                    }, {
                        "relation": "TContainerInternational",
                        "scope": {"include": "TCompany", "where": {"or": serachObjLots}}
                    }, "TCompany", "TLocation", "TShipmentDomestic",
                        {
                            "relation": "TShipmentInternational",
                            "scope": {"include": ["TContainerType", "TSteamshipLine"]}
                        }],
                    where: {
                        "and": [
                            {"or": customer},
                            {"or": company},
                            {"or": lotSearch},

                        ]
                    }

                });
            }
            else {

                this.url = PIview._buildUrl(base, {
                    "include":
                    [{
                        "relation": "TContainerDomestic",
                        "scope": {"include": "TCompany"}
                    }, {
                        "relation": "TContainerInternational",
                        "scope": {"include": "TCompany"}
                    }, "TCompany", "TLocation", "TShipmentDomestic", {
                        "relation": "TShipmentInternational",
                        "scope": {"include": ["TContainerType", "TSteamshipLine"]}
                    }]
                });

            }
            //console.log("a",tempsteamp);
            //console.log("b",serachObj.length);
            //console.log("c",arrival.length);

            if (tempsteamp != -1 && serachObj.length > 0 && arrival.length > 0 && serachObjLots.length == 0) {
                this.url = PIview._buildUrl(base, {
                    "include": [{
                        "relation": "TShipmentDomestic",
                        "scope": {"where": {"containerArrived": arrivalData.containerArrived}}
                    }, {
                        "relation": "TContainerInternational",
                        "scope": {
                            "include": "TCompany", "where": {
                                "and": [{"containerArrived": arrivalData.containerArrived},
                                    {"containerSteamshipLineConfirmed": tempsteamp}
                                ]
                            }
                        }
                    }, "TCompany", "TLocation", "TShipmentDomestic", {
                        "relation": "TShipmentInternational",
                        "scope": {"include": ["TContainerType", "TSteamshipLine"]}
                    }],
                    where: {
                        "and": [
                            {"or": customer},
                            {"or": company},
                            {"or": lotSearch}

                        ]
                    }

                });
            }

            else if (tempsteamp != -1 && serachObj.length >= 0 && arrival.length >= 0 && serachObjLots.length == 0) {

                this.url = PIview._buildUrl(base, {
                    "include": [{
                        "relation": "TContainerInternational",
                        "scope": {"include": "TCompany", "where": {"containerSteamshipLineConfirmed": tempsteamp}}
                    }, "TCompany", "TLocation", "TShipmentDomestic", {
                        "relation": "TShipmentInternational",
                        "scope": {"include": ["TContainerType", "TSteamshipLine"]}
                    }],
                    where: {
                        "and": [
                            {"or": customer},
                            {"or": company},
                            {"or": lotSearch}
                        ]
                    }

                });
            }

            else if (tempsteamp != -1 && arrival.length >= 0 && serachObj.length == 0 && serachObjLots.length == 0) {

                this.url = PIview._buildUrl(base, {
                    "include": [{
                        "relation": "TContainerInternational",
                        "scope": {
                            "include": "TCompany", "where": {
                                "and": [{"containerArrived": arrivalData.containerArrived},
                                    {"containerSteamshipLineConfirmed": tempsteamp}
                                ]
                            }
                        }
                    }, "TCompany", "TLocation", "TShipmentDomestic", {
                        "relation": "TShipmentInternational",
                        "scope": {"include": ["TContainerType", "TSteamshipLine"]}
                    }]
                    //where: {"and": serachObj}

                });
            }

            else if (arrival.length > 0 && tempsteamp == -1 && serachObj.length == 0 && serachObjLots.length == 0) {
                this.url = PIview._buildUrl(base, {
                    "include": [{
                        "relation": "TContainerDomestic",
                        "scope": {"where": {"containerArrived": arrivalData.containerArrived}}
                    }, {
                        "relation": "TContainerInternational",
                        "scope": {"include": "TCompany", "where": {"containerArrived": arrivalData.containerArrived}}
                    },
                        "TCompany", "TLocation", "TShipmentDomestic", {
                            "relation": "TShipmentInternational",
                            "scope": {"include": ["TContainerType", "TSteamshipLine"]}
                        }]
                    //where: {"and": serachObj}

                });
            }
            else if (tempsteamp == -1 && serachObj.length > 0 && arrival.length == 0 && serachObjLots.length == 0) {
                this.url = PIview._buildUrl(base, {
                    "include": [{
                        "relation": "TContainerDomestic",
                        "scope": {"include": "TCompany"}
                    }, {
                        "relation": "TContainerInternational",
                        "scope": {"include": "TCompany"}
                    }, "TCompany", "TLocation", "TShipmentDomestic",
                        {
                            "relation": "TShipmentInternational",
                            "scope": {"include": ["TContainerType", "TSteamshipLine"]}
                        }],
                    where: {
                        "and": [
                            {"or": customer},
                            {"or": company},
                            {"or": lotSearch}
                        ]
                    }


                });
            }
            else if (tempsteamp == -1 && serachObj.length > 0 && arrival.length >= 0 && serachObjLots.length == 0) {
                this.url = PIview._buildUrl(base, {
                    "include": [{
                        "relation": "TContainerDomestic",
                        "scope": {"where": {"containerArrived": arrivalData.containerArrived}}
                    }, {
                        "relation": "TContainerInternational",
                        "scope": {"include": "TCompany", "where": {"containerArrived": arrivalData.containerArrived}}
                    },
                        "TCompany", "TLocation", "TShipmentDomestic",
                        {
                            "relation": "TShipmentInternational",
                            "scope": {"include": ["TContainerType", "TSteamshipLine"]}
                        }],
                    where: {
                        "and": [
                            {"or": customer},
                            {"or": company},
                            {"or": lotSearch}
                        ]
                    }
                    //where: {"and": serachObj}

                });
            }

            $.ajax({
                url: this.url,
                success: function (data) {

                    if (searchContainerFlag) {
                        var temp = []
                        for (var i in containerSearch) {
                            temp.push(parseInt(containerSearch[i].containerTypeId))
                        }
                        var i = 0
                        while (i < data.length) {
                            if (i < data.length && data[i].TShipmentInternational.length > 0) {
                                if (temp.indexOf(parseInt(data[i].TShipmentInternational[0].TContainerType.id)) == -1) {
                                    data.splice(i, 1)
                                    i = 0
                                }
                                else {
                                    i++
                                }
                            }
                            else if (i < data.length) {
                                data.splice(i, 1)
                                i = 0
                            }
                            else {
                                i++
                            }
                        }
                    }
                    i = 0
                    if (steamflag) {
                        while (i < data.length) {
                            if (i < data.length && data[i].TShipmentInternational.length > 0) {
                                if (steam.indexOf(parseInt(data[i].TShipmentInternational[0].steamshipLineId)) == -1) {
                                    data.splice(i, 1)
                                    i = 0
                                }
                                else {
                                    i++
                                }
                            }
                            else if (i < data.length) {
                                data.splice(i, 1)
                                i = 0
                            }
                            else {
                                i++
                            }
                        }
                    }
                    searchContainerFlag = false
                    steamflag = false

                    localStorage.setItem('conViewData', JSON.stringify(data))
                    this.setState({
                        viewData: data,
                        loaded: true
                    })

                    this.forceUpdate()

                }.bind(this)

            })
        }
    }

    viewChange(e) {
        this.removeSates();
        this.setState({
            viewId:e.target.selectedOptions[0].id
        });
        var index = e.target.selectedIndex;
        var blob = e.target.value
        this.Where = JSON.parse(blob)
        Object.defineProperty(this.Where, "Query", {
            enumerable: true,
            writable: true,
            configurable: true,
            value: this.Query
        })
        var serachObj = []
        var serachObjLots = []
        var shipType = []
        var containerSearch = []
        var isDomestic
        var intl = []
        var arrival = []
        var arrivedtemp, steamtemp
        if (this.shipMentType) {
            Object.defineProperty(this.Where, "shipMentType", {
                enumerable: true,
                writable: true,
                configurable: true,
                value: this.shipMentType
            })
        }
        if (this.Where.shipMentType && this.Where.shipMentType == "Domestic") {
            isDomestic = true
            var objShip = {"isDomestic": 1}
            serachObj.push(objShip)
        }
        else if (this.Where.shipMentType && this.Where.shipMentType == "International") {
            isDomestic = false
            var objShip = {"isDomestic": 0}
            serachObj.push(objShip)
        }
        var searchContainerFlag = false
        if (this.Where.Container && this.Where.Container.length > 0) {
            var container = []
            var obj2 = {}
            let selectedContainerObj = [];
            for (var i in this.Where.Container) {
                this.checkedContainer.push(this.Where.Container[i])
                selectedContainerObj.push(this.Where.Container[i])
                obj2 = {"containerTypeId": this.Where.Container[i]}
                container.push(obj2);
            }
            this.setState({
                selectedContainerType : selectedContainerObj
            })
            containerSearch.push(container)
            searchContainerFlag = true
        }
        if (this.Where != undefined && this.Where != null) {
            if (this.Where.Customer && this.Where.Customer.length > 0) {
                var customer = []
                var obj = {}
                let tempObj = [];
                for (var i in this.Where.Customer) {
                    this.checkedCustomer.push(this.Where.Customer[i])
                    tempObj.push(this.Where.Customer[i])
                    this.setState({
                        customerSelected : tempObj
                    })
                    obj = {"customerId": this.Where.Customer[i]}
                    customer.push(obj);
                }
                serachObj.push(customer)
            }
            if (this.Where.Company && this.Where.Company.length > 0) {
                var company = [];
                var objCompany = {}
                for (var j in this.Where.Company) {
                    this.checkedCompany.push(this.Where.Company[j])
                    objCompany = {"locationId": this.Where.Company[j]}
                    company.push(objCompany);
                    this.setState({
                        locationSelected:company
                    });
                }
                serachObj.push(company)
            }
            if (this.Where.status && this.Where.status.length) {
                var Railstatus = [];
                var objStatus = {};
                let statusObj = [];
                for (var z in this.Where.status) {
                    objStatus = {"status": this.Where.status[z]}
                    this.checkedStatus.push(this.Where.status[z]);
                    statusObj.push(this.Where.status[z])
                    this.setState({
                        statusSelected : statusObj
                    });
                    Railstatus.push(objStatus)
                }
                serachObjLots.push(Railstatus)

            }
            if (this.Where.Query && this.Where.Query != null && this.Where.Query != undefined && this.Where.Query.POSearch && this.Where.Query.POSearch != undefined) {
                var poSearch = [{'po_number': {"like": "%" + this.Where.Query.POSearch + "%"}}]
                serachObj.push(poSearch)
                this.setState({
                    selectedPO:{"po_number":this.Where.Query.POSearch}
                })
            }
            if (this.Where.LotSearch && this.Where.LotSearch != undefined) {
                var lotSearch = [{'releaseNumber': {"like": "%" + this.Where.LotSearch + "%"}}]
                serachObj.push(lotSearch)
                this.setState({
                    selectedRelease:{"release":this.Where.LotSearch}
                })
            }
            var arrivalData = {"containerArrived": -1}
            if (this.Where.Arrival == "1" || this.Where.Arrival == "0") {
                arrivalData = {"containerArrived": parseInt(this.Where.Arrival)}
                arrival.push(arrivalData)
                intl.push(arrivalData)
                this.setState({
                    selectedArrd : this.Where.Arrival
                })
                this.arrivalType = this.Where.Arrival
            }
            var tempsteamp = this.SteamLineArray.length > 0 ? 1 : -1
            var steam = []
            var steamflag = false
            if (this.Where.SteamLine && this.Where.SteamLine.length > 0) {
                steam = []
                steamflag = true
                for (var steamTemp in this.Where.SteamLine) {
                    steam.push(this.Where.SteamLine[steamTemp])
                    this.SteamLineArray.push(this.Where.SteamLine[steamTemp])
                }
                this.setState({
                    selectedSteamShip : steam
                })

                var steamdata = {"containerSteamshipLineConfirmed": this.Where.SteamLine}
                intl.push(steamdata)
            }
            serachObj = [].concat.apply([], serachObj);
            serachObjLots = [].concat.apply([], serachObjLots);
            containerSearch = [].concat.apply([], containerSearch);
            var PIview = createDataLoader(ContainerViewForm, {
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
            var base = 'TShipmentents';
            if ((containerSearch && containerSearch.length > 0)) {
                this.url = PIview._buildUrl(base, {
                    "include": ["TContainerInternational", "TCompany", "TLocation", "TShipmentDomestic",
                        {
                            "relation": "TShipmentInternational",
                            "include": ["TContainerType", "TSteamshipLine"],
                            "scope": {"include": "TContainerType", "where": {"or": containerSearch}}
                        }]
                    //where: {"and": serachObj}

                });
            }
            if (serachObjLots && serachObjLots.length > 0) {
                this.url = PIview._buildUrl(base, {
                    "include": [{
                        "relation": "TContainerDomestic",
                        "scope": {"where": {"or": serachObjLots}}
                    }, {
                        "relation": "TContainerInternational",
                        "scope": {"include": "TCompany", "where": {"or": serachObjLots}}
                    }, "TCompany", "TLocation", "TShipmentDomestic",
                        {
                            "relation": "TShipmentInternational",
                            "scope": {"include": ["TContainerType", "TSteamshipLine"]}
                        }],
                    where: {
                        "and": [
                            {"or": customer},
                            {"or": company},
                            {"or": lotSearch}
                        ]
                    }

                });
            }
            if (tempsteamp != -1 && serachObj.length > 0 && arrival.length > 0 && serachObjLots.length == 0) {
                this.url = PIview._buildUrl(base, {
                    "include": [{
                        "relation": "TShipmentDomestic",
                        "scope": {"where": {"containerArrived": arrivalData.containerArrived}}
                    }, {
                        "relation": "TContainerInternational",
                        "scope": {
                            "include": "TCompany", "where": {
                                "and": [{"containerArrived": arrivalData.containerArrived},
                                    {"containerSteamshipLineConfirmed": tempsteamp}
                                ]
                            }
                        }
                    }, "TCompany", "TLocation", "TShipmentDomestic", {
                        "relation": "TShipmentInternational",
                        "scope": {"include": ["TContainerType", "TSteamshipLine"]}
                    }],
                    where: {
                        "and": [
                            {"or": customer},
                            {"or": company},
                            {"or": lotSearch}
                        ]
                    }

                });
            }
            else if (tempsteamp != -1 && serachObj.length >= 0 && arrival.length >= 0 && serachObjLots.length == 0) {
                this.url = PIview._buildUrl(base, {
                    "include": [{
                        "relation": "TContainerInternational",
                        "scope": {"include": "TCompany", "where": {"containerSteamshipLineConfirmed": tempsteamp}}
                    }, "TCompany", "TLocation", "TShipmentDomestic", {
                        "relation": "TShipmentInternational",
                        "scope": {"include": ["TContainerType", "TSteamshipLine"]}
                    }],
                    where: {
                        "and": [
                            {"or": customer},
                            {"or": company},
                            {"or": lotSearch}

                        ]
                    }

                });
            }
            else if (tempsteamp != -1 && arrival.length >= 0 && serachObj.length == 0 && serachObjLots.length == 0) {
                this.url = PIview._buildUrl(base, {
                    "include": [{
                        "relation": "TContainerInternational",
                        "scope": {
                            "include": "TCompany", "where": {
                                "and": [{"containerArrived": arrivalData.containerArrived},
                                    {"containerSteamshipLineConfirmed": tempsteamp}
                                ]
                            }
                        }
                    }, "TCompany", "TLocation", "TShipmentDomestic", {
                        "relation": "TShipmentInternational",
                        "scope": {"include": ["TContainerType", "TSteamshipLine"]}
                    }]
                    //where: {"and": serachObj}

                });
            }
            else if (arrival.length > 0 && tempsteamp == -1 && serachObj.length == 0 && serachObjLots.length == 0) {
                this.url = PIview._buildUrl(base, {
                    "include": [{
                        "relation": "TContainerDomestic",
                        "scope": {"where": {"containerArrived": arrivalData.containerArrived}}
                    }, {
                        "relation": "TContainerInternational",
                        "scope": {"include": "TCompany", "where": {"containerArrived": arrivalData.containerArrived}}
                    },
                        "TCompany", "TLocation", "TShipmentDomestic", {
                            "relation": "TShipmentInternational",
                            "scope": {"include": ["TContainerType", "TSteamshipLine"]}
                        }]
                    //where: {"and": serachObj}

                });
            }
            else if (tempsteamp == -1 && serachObj.length > 0 && arrival.length == 0 && serachObjLots.length == 0) {
                this.url = PIview._buildUrl(base, {
                    "include": [{
                        "relation": "TContainerDomestic",
                        "scope": {"include": "TCompany"}
                    }, {
                        "relation": "TContainerInternational",
                        "scope": {"include": "TCompany"}
                    }, "TCompany", "TLocation", "TShipmentDomestic",
                        {
                            "relation": "TShipmentInternational",
                            "scope": {"include": ["TContainerType", "TSteamshipLine"]}
                        }],
                    where: {
                        "and": [
                            {"or": customer},
                            {"or": company},
                            {"or": lotSearch}
                        ]
                    }


                });
            }
            else if (tempsteamp == -1 && serachObj.length > 0 && arrival.length >= 0 && serachObjLots.length == 0) {
                this.url = PIview._buildUrl(base, {
                    "include": [{
                        "relation": "TContainerDomestic",
                        "scope": {"where": {"containerArrived": arrivalData.containerArrived}}
                    }, {
                        "relation": "TContainerInternational",
                        "scope": {"include": "TCompany", "where": {"containerArrived": arrivalData.containerArrived}}
                    },
                        "TCompany", "TLocation", "TShipmentDomestic",
                        {
                            "relation": "TShipmentInternational",
                            "scope": {"include": ["TContainerType", "TSteamshipLine"]}
                        }],
                    where: {
                        "and": [
                            {"or": customer},
                            {"or": company},
                            {"or": lotSearch}
                        ]
                    }
                    //where: {"and": serachObj}

                });
            }
            $.ajax({
                url: this.url,
                success: function (data) {

                    if (searchContainerFlag) {
                        var temp = []
                        for (var i in containerSearch) {
                            temp.push(parseInt(containerSearch[i].containerTypeId))
                        }
                        var i = 0
                        while (i < data.length) {
                            if (data[i].TShipmentInternational.length > 0) {
                                if (temp.indexOf(parseInt(data[i].TShipmentInternational[0].TContainerType.id)) == -1) {
                                    data.splice(i, 1)
                                    i = 0
                                }
                                else {
                                    i++
                                }
                            }
                            else {
                                i++
                            }
                        }
                    }
                    i = 0
                    if (steamflag) {
                        while (i < data.length) {
                            if (data[i].TShipmentInternational.length > 0) {
                                if (i < data.length && steam.indexOf(parseInt(data[i].TShipmentInternational[0].steamshipLineId)) == -1) {
                                    data.splice(i, 1)
                                    i = 0
                                }
                                else {
                                    i++
                                }
                            }
                            else if (i < data.length) {
                                data.splice(i, 1)
                                i = 0
                            }
                            else {
                                i++
                            }
                        }
                    }
                    searchContainerFlag = false
                    steamflag = false
                    localStorage.setItem('conViewData', JSON.stringify(data))
                    this.setState({
                        viewData: data,
                        loaded: true
                    })
                    this.forceUpdate();

                }.bind(this)

            })
        }
    }
    saveNewCustomView(tempThis){
        for(let props in tempThis.Where.Query){
            tempThis.Where[props] = tempThis.Where.Query[props]
        }
        for(let props in tempThis.Where.Query){
            var obj = {[props]:tempThis.Where.Query[props]}
            tempThis.Where.Query[props] = tempThis.Where.Query[props]
        }
        var saveCustomView = {
            "id": 0,
            "screenName": "CONTAINER",
            "viewName": tempThis.state.Text,
            "viewFilters": JSON.stringify(tempThis.Where),
            "createdBy": 0,
            "createdOn": "2016-09-26",
            "modifiedBy": 0,
            "modifiedOn": "2016-09-26",
            "active": 1
        }
        if (tempThis.state.Text!==undefined && tempThis.state.Text!=="") {
            axios.post(Base_Url + "TCustomViews", saveCustomView).then(response=> {
                swal('Success', "Successfully saved.", 'success');
                axios.get(Base_Url + "TCustomViews").then(response=> {
                    tempThis.setState({
                        savedViews: response.data
                    })
                })
            })

        }
        else {
            swal('Error' , "Please give the name of custom view." , 'error');
        }
    }
    updateExistingView(tempThis){
        for(let props in tempThis.Where.Query){
            tempThis.Where[props] = tempThis.Where.Query[props]
        }
        for(let props in tempThis.Where.Query){
            var obj = {[props]:tempThis.Where.Query[props]}
            tempThis.Where.Query[props] = tempThis.Where.Query[props]
        }
        var saveCustomView = {
            "id": tempThis.state.viewId,
            "viewName": tempThis.state.Text,
            "viewFilters": JSON.stringify(tempThis.Where),
            "modifiedOn": moment(new Date()).format("YYYY-MM-DD"),
            "active": 1
        }
        if(tempThis.state.Text===undefined || tempThis.state.Text===""){
            delete saveCustomView.viewName;
        }
        axios.put(Base_Url+"TCustomViews",saveCustomView).then(response=>{
            swal('Updated' , "Successfully updated." , 'success');
            console.log("response", response)
            axios.get(Base_Url+"TCustomViews").then(response=>{
                tempThis.setState({
                    savedViews : response.data
                })
            })
        })
    }
    saveView(e) {
        if(this.state.viewId===""){
            this.saveNewCustomView(this);
        }
        else{
            var tempThis = this;
            swal({
                    title: "Custom View",
                    text: "Do you want to edit this view or want to save a new one",
                    type: "info",
                    showCancelButton: true,
                    confirmButtonText: "Save as a new custom view",
                    cancelButtonText: "Update the existing one",
                    closeOnConfirm: false,
                    closeOnCancel: false
                },
                function(saveNew){
                    if(saveNew){
                        tempThis.saveNewCustomView(tempThis);
                    }
                    else{
                        tempThis.updateExistingView(tempThis);
                    }
                }
            );
        }
    }
    toggleColumn(name,value){
        switch (name) {
            case "ARB" :
                if (value === 0) {
                    this.setState({
                        showARB: "none",
                        aclass:"ARB"
                    })
                }
                else {
                    this.setState({
                        showARB: "",
                        aclass:""
                    })
                }
                break;
            case "Customer" :
                if (value === 0) {
                    this.setState({
                        showCustomer: "none",
                        aclass:"Customer"
                    })
                }
                else {
                    this.setState({
                        showCustomer: "",
                        aclass:""
                    })
                }
                break;
            case "Container" :
                if (value === 0) {
                    this.setState({
                        showContainer: "none",
                        aclass:"Container"
                    })
                }
                else {
                    this.setState({
                        showContainer: "",
                        aclass:""
                    })
                }
                break;
            case "Release" :
                if (value === 0) {
                    this.setState({
                        showRelease: "none",
                        aclass:"Release"
                    })
                }
                else {
                    this.setState({
                        showRelease: "",
                        aclass:""
                    })
                }
                break;
            case "Booking" :
                if (value === 0) {
                    this.setState({
                        showBooking: "none",
                        aclass:"Booking"
                    })
                }
                else {
                    this.setState({
                        showBooking: "",
                        aclass:""
                    })
                }
                break;
            case "Trucker" :
                if (value === 0) {
                    this.setState({
                        showTrucker: "none",
                        aclass:"Trucker"
                    })
                }
                else {
                    this.setState({
                        showTrucker: "",
                        aclass:""
                    })
                }
                break;
            case "Arrived" :
                if (value === 0) {
                    this.setState({
                        showArrived: "none",
                        aclass:"Arrived"
                    })
                }
                else {
                    this.setState({
                        showArrived: "",
                        aclass:""
                    })
                }
                break;
            case "SteamShip" :
                if (value === 0) {
                    this.setState({
                        showSteamShip: "none",
                        aclass:"SteamShip"
                    })
                }
                else {
                    this.setState({
                        showSteamShip: "",
                        aclass:""
                    })
                }
                break;
            case "Type" :
                if (value === 0) {
                    this.setState({
                        showType: "none",
                        aclass:"Type"
                    })
                }
                else {
                    this.setState({
                        showType: "",
                        aclass:""
                    })
                }
                break;
            case "Status" :
                if (value === 0) {
                    this.setState({
                        showStatus: "none",
                        aclass:"Type"
                    })
                }
                else {
                    this.setState({
                        showStatus: "",
                        aclass:""
                    })
                }
                break;
            case "Shipment Type" :
                if (value === 0) {
                    this.setState({
                        showShipmentType: "none",
                        aclass:"Type"
                    })
                }
                else {
                    this.setState({
                        showShipmentType: "",
                        aclass:""
                    })
                }
                break;

        }
    }
    handleOpen(){
        this.setState({open: true});
    }
    handleClose(submitted){

        this.setState({open: false});
        if(submitted){
            window.location.reload();
        }
    }
    onTextChange(e) {
        var idValue = e.target.id
        this.Query[idValue] = e.target.value
        this.setState({
            selectedRelease : e.target.value
        })
        this.onSearch(e)
    }
    SteamLine(e) {
        this.SteamLine = e.target.value
        Object.defineProperty(this.Where, "SteamLine", {
            enumerable: true,
            writable: true,
            configurable: true,
            value: this.SteamLine
        })
        this.onSearch(e)
    }
    lotSearch(e) {
        this.Query[e.target.id] = e.target.getAttribute('value')
        document.getElementById('LotSearch').value = e.target.getAttribute('value')
        this.onSearch(e)
    }
    handleTextChange(e) {
        this.setState({
            Text: e.target.value
        })
        this.onSearch(e)
    }
    onViewClick(e) {
        if (this.contId == undefined) {
            swal("Info", "Selection missing.", "info")
            return
        }
        hashHistory.push('/Conatainer/containerDetails/' + this.contId + '/' + this.type)
    }
    render() {
        var filterData = ''
        if (this.state.viewData && (this.state.viewData.length == 0 || this.state.viewData.length > 0 )) {

            filterData = this.state.viewData;
        }

        return (
            <section className="side-filter">
                <div className="menu-bg hidden-md hidden-lg hidden-sm  visible-xs-block">
                    <div className="" id="hide1">
                        <h4 className="pull-left">REFINE YOUR RESULT </h4>
                        <button type="button" className="btn collapsed pull-right " data-toggle="collapse"
                                data-target="#filter-menu" aria-expanded="false"><i className="fa fa-caret-down fa-2x"
                                                                                    aria-hidden="true"></i></button>
                    </div>
                </div>
                <div className="container">
                    <div className="row-fluid">
                        <FilterComponent selectedArrd = {this.state.selectedArrd}
                                         selectedContainerType = {this.state.selectedContainerType}
                                         selectedSteamShip = {this.state.selectedSteamShip}
                                         selectedRelease={this.state.selectedRelease}
                                         statusSelected={this.state.statusSelected}
                                         customerSelected = {this.state.customerSelected}
                                         locationSelected = {this.state.locationSelected}
                                         key={this.state.key}
                                         onSteamShipFilter={this.onSteamShipFilter}
                                         onContainerFilter={this.onContainerFilter}
                                         Arrival={this.Arrival}
                                         SteamLine={this.SteamLine}
                                         onCompanyFilter={this.onCompanyFilter}
                                         onCustomerFilter={this.onCustomerFilter}
                                         lotSearch={this.lotSearch}
                                         onTextChange={this.onTextChange}
                                         onStatusFilter={this.onStatusFilter}/>

                        <div id="filter-grid">
                            <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12 pddn-20-top pull-right">
                                <div className="row">
                                    <FilterButton buttonDisplay={this.buttonDisplay}
                                                  onButtonRemove={this.onButtonRemove} onRemove={this.onRemove}
                                                  Query={this.Query} onSearch={this.onSearch}/>
                                    <div className="col-lg-2 col-sm-6 col-xs-12 padding-top-btm-xs pull-right mb-10">
                                        <div className="pull-right ">
                                            <button className="btn btn-primary" onClick={this.handleOpen}> <i className="fa fa-cogs" aria-hidden="true"></i> Columns</button>
                                        </div>

                                    </div>
                                    <div className="col-lg-3 col-sm-6 col-xs-12 padding-top-btm-xs pull-right mb-10">
                                        <div className="pull-right " id="hide5">
                                            <select className="form-control" id="groupBy" name="groupBy"
                                                    onChange={this.OnGroupBy}>
                                                <option value="Please Select An Option To Group by" disabled selected>
                                                    Select An Option To Group by
                                                </option>
                                                {
                                                    _.map(this.state.OptionToGroupby, (views, index)=> {
                                                        return (
                                                            <option key={index} value={views}>{views}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>

                                    </div>
                                    <div className="col-lg-3 col-sm-6 col-xs-12 padding-top-btm-xs pull-right mb-10">
                                        <div className="pull-right " id="hide5">


                                            <select className="form-control" id="customer_name" name="customer_name"
                                                    onChange={this.viewChange}>
                                                <option value="Please Select An Option" disabled selected>Select custom
                                                    view
                                                </option>
                                                {
                                                    _.map(this.state.savedViews, (views, index)=> {

                                                        if (views.screenName == "CONTAINER") {
                                                            return (

                                                                <option key={index}
                                                                        value={views.viewFilters}
                                                                        id = {views.id}>{views.viewName }
                                                                </option>
                                                            )
                                                        }
                                                    })
                                                }
                                            </select>

                                        </div>

                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <div className="">
                                            <ContainerViewDataComponent showARB={this.state.showARB}
                                                                        showCustomer={this.state.showCustomer}
                                                                        SelcetedOptionForGroupBy={this.state.SelcetedOptionForGroupBy}
                                                                        showRelease={this.state.showRelease}
                                                                        showBooking={this.state.showBooking}
                                                                        showContainer={this.state.showContainer}
                                                                        showTrucker={this.state.showTrucker}
                                                                        showArrived={this.state.showArrived}
                                                                        showSteamShip={this.state.showSteamShip}
                                                                        showType={this.state.showType}
                                                                        showStatus = {this.state.showStatus}
                                                                        showShipmentType = {this.state.showShipmentType}
                                                                        onCheckboxChange={this.onCheckboxChange}
                                                                        key={this.state.index}
                                                                        onCheckboxChange={this.onCheckboxChange}
                                                                        filterData={filterData}/>
                                        </div>
                                        <div id="nonPrintable">
                                            <div className="row-fluid pddn-50-btm padding-top-btm-xs">
                                                <div className="pull-left margin-10-last-l">
                                                    <button type="button" onClick={(e) => this.print(e)}
                                                            className="btn  btn-primary">Print BOL
                                                    </button>
                                                </div>
                                                <div className="pull-left margin-10-all">
                                                    <button type="button" onClick={(e) => this.printLoadOrder(e)}
                                                            className="btn  btn-primary">Print Load Order
                                                    </button>
                                                </div>
                                                <div className="pull-left margin-10-all">
                                                    <button type="button" className="btn  btn-gray"
                                                            onClick={this.addToqueue}>Add to Queue
                                                    </button>
                                                </div>
                                                <div className="pull-left margin-10-all">
                                                    <button type="button" onClick={this.PrintElem}
                                                            className="btn  btn-gray">Print
                                                    </button>
                                                </div>
                                                <div className="pull-right margin-10-last-r">
                                                    <button type="button" className="btn  btn-success"
                                                            onClick={this.onViewClick.bind(this)}>View
                                                    </button>
                                                </div>
                                                <div className="pull-right margin-10-all">
                                                    <button type="button" id="edit_btn" className="btn  btn-orange"
                                                            onClick={this.onEdit}>EDIT
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="row pddn-50-btm">
                                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                    <hr/>
                                                </div>
                                                <div className="col-lg-4 col-sm-4 col-md-4 col-xs-12 ">
                                                    <input type="text" className="form-control" id="No_of_Bages_Pallat"
                                                           placeholder="Enter a name for your custom saved view"
                                                           onChange={this.handleTextChange}
                                                           value={this.state.Text}/>
                                                </div>
                                                <div
                                                    className="col-lg-4 col-sm-4 col-md-4 col-xs-12 padding-top-btm-xs">
                                                    <button type="button" className="btn  btn-success margin-left-xs"
                                                            onClick={this.saveView}>SAVE CUSTOM VIEW
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ShowHideColumn
                    Name={"Container"}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                    autoScrollBodyContent={true}
                />
            </section>

        )
    }
}
export default ContainerViewForm;
