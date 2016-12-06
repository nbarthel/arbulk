import React from 'react'; 
//import '../../public/stylesheets/style.css';
//import '../../public/stylesheets/bootstrap.min.css';
import { Link } from 'react-router';
import ShipmentDetailsTable from '../../../components/ShipmentViewComponents/ShipmentDetailsTable'
import ShipmentSummaryComponent from '../../../components/ShipmentViewComponents/ShipmentSummaryComponent'
import ContainerSummaryComponent from '../../../components/ShipmentViewComponents/ContainerSummaryComponent'
import CurrentInventoryComponent from '../../../components/ShipmentViewComponents/CurrentInventoryComponent'
import DomesticShipmentSummary from '../../../components/ShipmentViewComponents/DomesticShipmentSummary'
import { createDataLoader } from 'react-loopback'
import { hashHistory } from 'react-router'
import axios from 'axios' 
class  ShipmentDetailsForm extends React.Component {
    constructor(props){
        super(props);
        this.state={
            showEdit : 'block',
            hideEdit : 'none',
            currentIntObject : undefined,
            CI : false

        }
        this.truckers
        this.someId = 1 
        this.shipmentId = null
        this.index  = 0
        this.piLotId
        this.onClick=this.onClick.bind(this);
        this.tableCheckBoxChange = this.tableCheckBoxChange.bind(this)
        this.getCurrentInventry = this.getCurrentInventry.bind(this)
    }
    componentDidMount() {
     var PIview = createDataLoader(ShipmentDetailsForm,{
          queries:[{
              endpoint: 'TPackagingInstructions',
              filter: {
                  include: ['TPackagingInstructionLots',{"relation":"TPackagingInstructions","scope":{"include":["TLocation"]}}]
              }
          }]
      })
     var base = 'TCompanies'
      this.urlTrucker = PIview._buildUrl(base, {
          "where" : {type : "TRUCKER" }
      })
      axios.get(this.urlTrucker).then((response)=>{
        this.setState({
            trucker : response.data
        })
        this.truckers = _.map(this.state.trucker,(truck,index)=>{
           return <option key = {index} value ={truck.id}>{truck.name}</option>
        })
        
        this.forceUpdate()
      })
    }
    tableCheckBoxChange(e,value){
        if(e.target.checked) {
        console.log("value", value)
        this.sID = value.shipmentId
        this.shipmentId = value.shipmentId
        this.piLotId = value.TPackagingInstructionLots.id
        this.getCurrentInventry(this.piLotId)
        this.state.CI = true
        /*this.forceUpdate()*/
        console.log(this.shipmentId, this.piLotId)
    }
    else if(!(e.target.checked)){
        this.setState({
            CI : false
        })

    }
     
    }
    getCurrentInventry(id){
        var PIview = createDataLoader(ShipmentDetailsForm, {
            queries: [{
                endpoint: 'TPackagingInstructionLots',
                filter:
                {"include" : ["TInventoryLocation","TPackagingInstructionLots"]
                }

            }]
        });

        var base1 = 'TPackagingInstructionLots/'+ id;
        this.urlnew = PIview._buildUrl(base1, {
            include: {"relation": "TPiInventory", "scope": {"include": ["TInventoryLocation"]}}

        });

        $.ajax({
            url: this.urlnew,
            success:function(data){
                debugger;
                console.log(">>>>>>>>>>>> ajax" , data)
                this.CIData = data
                this.setState({
                    currentIntObject : this.CIData,
                    index  :  this.index+1
                })
            }.bind(this)

        })



    }
    onClick(){
        if (this.state.hideEdit === 'block'){
            this.setState({
                hideEdit : 'none',
                showEdit : 'block'
            })
            $('.panel-group').removeClass('active');

        }
        else {
            this.setState({
                hideEdit: 'block',
                showEdit: 'none'
            })
            $('.panel-group').addClass('active');
        }

 }
    
    render() {
        return (
            <section className="shipment">
                <div className="container-fluid">

                    <div className="row ">
                        <div className="col-lg-12">

                            <div className="table-responsive border-bottom">
                                <ShipmentDetailsTable tableCheckBoxChange = {this.tableCheckBoxChange} tabledata = {this.props.data}/>

                            </div>

                        </div>
                    </div>

                    <div className="">
                        <div className="row pddn-20-top">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            { this.props.data ? (this.props.data.isDomestic == 0 ? <ShipmentSummaryComponent summaryData = {this.props.data} pSumData = {this.props.pckData} /> : <DomesticShipmentSummary summaryData = {this.props.data} pSumData = {this.props.pckData}/>) : ''}   
                        </div>
                    </div>
                </div>
                 <div className="row">   
        
                    <div className=" col-lg-12 ">   
                        <div className="text_left">
                         <div className="pull-right margin-10-last-r"><button type="button" id="back" className="btn  btn-gray text-uppercase" onClick = {hashHistory.goBack}> BACK</button> </div>
                         
                         <div className="pull-left margin-10-last-l"><button type="button"  className="btn  btn-gray text-uppercase">Allocate Containers</button> </div>                 
                        
                         
                         <div className="pull-left margin-10-all"><Link to="shipmentconfirm"><button type="button" id="confirm" className="btn  btn-success text-uppercase">Confirm</button></Link> </div>                 
                        
                        
                          <div className="pull-left margin-10-all"><Link to="shipmentconfirm"><button type="button" id="edit_shipment"  className="btn  btn-orange text-uppercase">Edit</button></Link> </div>                 
                        </div>  
                    </div>  
                    <div className=" col-lg-12 "><hr/></div>    
            </div>

                <br className="clearfix"/>

                <div className="row ">

                    <div className=" col-lg-7 col-md-7 col-sm-7 col-xs-12">
                        <div className="panel-group" id="ContainerSummaryaccordion">
                            <div className="panel panel-default">
                                <div className="panel-heading" data-toggle="collapse"
                                     data-parent="#ContainerSummaryaccordion" href="#ContainerSummary">
                                    <h4 className="panel-title">
                                        <a className="accordion-toggle">
                                            Container Summary</a>
                                        <i className="indicator glyphicon glyphicon-chevron-down  pull-right"></i>
                                    </h4>
                                </div>
                                <div id="ContainerSummary" className="panel-collapse collapse ">

                                    <div id="edit" className="edit row pddn-10-btm" >
                                            <form action="" method="post">
                                                <div className="form-group">
                                                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                                        <select className="form-control " id="Trucker">
                                                        <option value = "" selected disabled>Select Trucker</option>
                                                        {this.truckers}
                                                        </select>
                                                            <div className="error"><span></span></div>
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <div className=" col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                                            <input type="text" className="form-control" id="" placeholder="# of Containers"/>
                                                                <div className="error"><span></span></div>
                                                            </div>
                                                        </div>

                                                        <div className="form-group ">
                                                            <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6  padding-top-btm-xs ">
                                                                <button type="button"  className="btn btn-success btn_right_no_margin">ADD</button>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                   <div className="table-responsive">
                                        <ContainerSummaryComponent SId = {this.shipmentId} isDomestic = {this.props.isDomestic} />
                                        <div className="more_load">More containers are required to be allocated to this
                                            shipment!
                                        </div>
                                    </div>

                                   <div className="text_left pddn-10-top" >
                         <div className="pull-left margin-10-last-l"><button type="button"  className="btn btn-sm  btn-gray">Print Load Order</button> </div>
                         
                      </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div className=" col-lg-5 col-md-5 col-sm-5 col-xs-12">
                        <div className="panel-group" id="CurrentInventoryaccordion">
                            <div className="panel panel-default">
                                <div className="panel-heading" data-toggle="collapse"
                                     data-parent="#CurrentInventoryaccordion" href="#CurrentInventory">
                                    <h4 className="panel-title">
                                        <a className="accordion-toggle">
                                            Current Inventory
                                            <i className="indicator glyphicon glyphicon-chevron-down  pull-right"></i> </a>
                                    </h4>
                                </div>
                                <div id="CurrentInventory" className="panel-collapse collapse ">
                                    <div className="">


                                        <div className="table-responsive">
                                                  {this.state.CI == true ? <CurrentInventoryComponent key={this.state.index}  currentInventory = {this.state.currentIntObject } /> : ''}

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

               <div className="row"  >    
    <div className=" col-lg-12 "><hr/></div>
    <div className=" col-lg-12 " >
    <div className="pull-left margin-10-last-l"><button type="button"  id="cancel_btn" onClick={this.onClick}  className="btn  btn-gray text-uppercase">CANCEL</button> </div>              
    <div className="pull-left margin-10-all "><button type="button" id="save_changes" onClick={this.onClick} className="btn  btn-orange text-uppercase">Save Changes</button> </div>               
    </div>  
    </div>  
            
    </div>
            </section>
        );
    }
}
export default ShipmentDetailsForm;
   