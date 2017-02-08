/**
 * Created by azmat on 25/10/16.
 */

import React from 'react';
//import EnterPackagingInstructionForm from './EnterPackagingInstructionForm';
import _ from 'lodash';
import { createDataLoader } from 'react-loopback';
import '../../../containers/Shipment/ShipmentPrint/shipmentPrint.css';

var Loader = require('react-loader');
var dummyobject = false
export default class ShipmentPrint extends React.Component {
    constructor(props){
        super(props);
        this.id = this.props.params.id;

        this.state = {
          loaded: true,
          piData:[],
          totalBags:0,
          myArray : [{name:"Ar"},{name:"Ar"},{name:"Ar"},{name:"Ar"},{name:"Ar"},{name:"Ar"},{name:"Ar"},{name:"Ar"},{name:"Ar"},{name:"Ar"}]
     };
        this.state.viewData={lot:{},packaging_status:'',custom_label:'',TCompany:{},TLocation:{},TPackagingType:{},TShipmentInternational:[{TSteamshipLine:{},TContainerType:{}}],TShipmentDomestic:[{TSteamshipLine:{},TContainerType:{}}]}
        this.createPDF = this.createPDF.bind(this);
        this.onPrint = this.onPrint.bind(this)
        this.createPdfClick = this.createPdfClick.bind(this)
        this.reportArray = []
       /* this.state.viewData={
            "customer": "abc",
            "trucker": "xyz",
            "container": 123,
            "chasis": "97879",
            "steamshipline": "234234",
            "release": 123,
            "booking": "97879",
            "origin": "USA",
            "lotpallet":[{"id":1,"lot":"12312","pallet":"234234"},
                {"id":2,"lot":"12312","pallet":"234234"},
                {"id":3,"lot":"234324","pallet":"234234"}],
            "locations":[{"location":"asdf","material":"dfsd","po":"12312","lot":"24323","bags":"12","breakdown":"20x23"},
                {"location":"asdf","material":"dfsd","po":"12312","lot":"24323","bags":"12","breakdown":"20x23"},
                {"location":"asdf","material":"dfsd","po":"12312","lot":"24323","bags":"12","breakdown":"20x23"}]
        }*/
    }
    componentWillMount(){
        var ShipmentView = createDataLoader(ShipmentPrint,{
            queries:[{
                endpoint: 'TShipmentents',
                filter: {
                    include: ['TShipmentLots',{"relation":"TShipmentents","scope":{"include":["TLocation"]}}]
                }
            }]
        })
        //var base = 'TPackagingInstructions'+'/'+this.props.params.id;
        var base = 'TShipmentents/'+this.id;
        this.url = ShipmentView._buildUrl(base, {
            "include" : ["TLocation" , "TCompany" ,{"relation" :"TContainerDomestic" , "scope":{"include" : ["TCompany",{"relation" : "TContainerLoad" ,"scope":{"include":["TPiInventory","TInventoryLocation"]}}] ,"where":{"id":this.props.params.contId}}}, {"relation" :"TContainerInternational" , "scope":{"include" : ["TCompany",{"relation" : "TContainerLoad" ,"scope":{"include":["TPiInventory","TInventoryLocation"]}}] ,"where":{"id":this.props.params.contId}}} ,{"relation" :"TShipmentDomestic","scope":{"include":["TShipmentType","TPaymentType"]}},{"relation" :"TShipmentInternational","scope":{"include":["TSteamshipLine","TContainerType"]}},{"relation" : "TShipmentLots" ,"scope":{"include":["TPackagingInstructionLots"]}}]
        })

        var lot='';var railcar='';var weight='';var label='';
        $.ajax({
            url: this.url,
            success:function(data){

            console.log("dataaa" , data)
                if(data.TShipmentInternational.length==0){
                    data.TShipmentInternational= [{TSteamshipLine:{},TContainerType:{}}];
                    data.TShipmentDomestic= [{TSteamshipLine:{},TContainerType:{}}];
                }

                else if(data.TShipmentDomestic.length>0){

                    data.TShipmentDomestic= [{TSteamshipLine:{},TContainerType:{}}];

                }

                this.setState({
                    viewData : data,
                    lot : data.TShipmentLots[0].TPackagingInstructionLots,
                    railcar:railcar,
                    weight:weight,
                    chasis : (data.TContainerInternational && data.TContainerInternational.length > 0 ? data.TContainerInternational : data.TContainerDomestic),
                    trucker :  (data.TContainerInternational && data.TContainerInternational.length > 0  && data.TContainerInternational[0].TCompany  ? data.TContainerInternational: data.TContainerDomestic)

                })

                this.getPackagingInfo(data.TShipmentLots[0].piLotsId);

  }.bind(this)

        })

    }


    getSum(arr){
       var total = 0
       for ( var i = 0; i<arr.length; i++ ) {
           total += arr[i].noOfBags
       }
       return total

    }


    getPackagingInfo(PiLotId){
        var ShipmentView = createDataLoader(ShipmentPrint,{
            queries:[{
                endpoint: 'TShipmentents',
                filter: {
                    include: ['TShipmentLots',{"relation":"TShipmentents","scope":{"include":["TLocation"]}}]
                }
            }]
        })
        this.url1 = ShipmentView._buildUrl('TPackagingInstructionLots/'+PiLotId, {
            "include" : [{"relation" :"TPackagingInstructions", "scope":{"include" : ["TOrigin","TPackagingType"]}} , {"relation":"TPiInventory" , "scope":{"include":"TInventoryLocation"}}]
        })
        $.ajax({
            url: this.url1,
            success:function(data){
                console.log('lot ,po, location array>>>>>>>>>>>>>>>',data.TPiInventory);
                // var tBags=0;
                //
                // data.TPiInventory.forEach(function(item){
                //     tBags=tBags+item.noOfBags;
                // })
                this.setState({
                    printData : data,
                    piData:data.TPiInventory,
                    piDataPO:data.TPackagingInstructions,
                    bagsPerpallet : data.TPackagingInstructions.bags_per_pallet

                })

            }.bind(this)

        })
        return
    }


  createPdfClick(){
	 (function(){
            var
                form = $('.warpper-inner_shipment'),
                cache_width = form.width(),
                a3  =[ 595.28,  1041.89]; // for a4 size paper width and height

            $('#create_pdf').on('click',function(){
                console.log('call create pdf');
                $('html,body').scrollTop(0);
               // $(window).scrollTop();
                createPDF();
            });
//create pdf
            function createPDF(){
		debugger
                getCanvas().then(function(canvas){
                debugger

                    var
                        img = canvas.toDataURL("image/png"),
                        doc = new jsPDF({
                            unit:'px',
                            format:'a3'
                        });
                   // doc.addImage(img, 'JPEG', 10, 10);
                    doc.addHTML(document.body , {pagesplit : true} ,function(){
                    doc.save('shipment.pdf');
                    })
		   // doc.addPage();
                //doc.addImage(img, 'JPEG', 10, 10);
                  //  doc.save('shipment.pdf');
                    //form.width(cache_width);
                });
            }

// create canvas object
            function getCanvas(){
		     debugger;
                form.width((a3[0]*1.33333) -200).css('max-width','none');
                return html2canvas(document.body,{
                    imageTimeout:2000,
                    removeContainer:true
                });
            }

        }());





      }



    componentDidMount() {
    (function(){
      var
                form = $('.warpper-inner_shipment'),
                cache_width = form.width(),
                a3  =[ 595.28,  841.89]; // for a4 size paper width and height

            $('#create_pdf').on('click',function(){
                console.log('call create pdf');
                $('html,body').scrollTop(0);
               // $(window).scrollTop();
                createPDF();
            });
//create pdf
            function createPDF(){
		debugger
                getCanvas().then(function(canvas){
                canvas.fillStyle = "#FFFFFF";
                    var
                        img = canvas.toDataURL("image/png",1.0),
                        doc = new jsPDF({
                            unit:'pt',
                            format:'a3',
							page:1
                        });
					doc.internal.scaleFactor = 1.0;
                   // doc.addImage(img, 'JPEG', 10, 10);
                    doc.addHTML(document.body , {format:'png',pagesplit : true} ,function(){
                    doc.save('shipment.pdf');
                    })

                });
            }

// create canvas object
            function getCanvas(){
		debugger;
                form.width((a3[0]*1.33333) -80).css('max-width','none');
                return html2canvas(document.body,{
                    imageTimeout:2000,
                    removeContainer:false
                });
            }

        }());







    }
    createPDF(e){
        console.log('print view')
        //hashHistory.push('/Shipment/shipmentPrint/')
    }

    onPrint(e){
      window.print()
    }
    render(){

        var tBags=0;
      //  var bagsPerPallet = (this.state.piDataPO && this.state.piDataPO.bags_per_pallet) ? this.state.piDataPO.bags_per_pallet  : 50
        (this.state.viewData && this.state.viewData.TContainerInternational && this.state.viewData.TContainerInternational.length >0 && this.state.viewData.TContainerInternational[0].TContainerLoad)?
       this.state.viewData.TContainerInternational[0].TContainerLoad.forEach(function(item){

           tBags =  tBags+parseInt(item.TPiInventory.noOfBags);
       })

   : ''

 if(this.state.viewData && this.state.viewData.TContainerInternational && this.state.viewData.TContainerInternational.length >0){
   this.reportArray = this.state.viewData.TContainerInternational
   dummyobject = false
 }
 else if (this.state.viewData && this.state.viewData.TContainerDomestic && this.state.viewData.TContainerDomestic.length >0) {
   this.reportArray = this.state.viewData.TContainerDomestic
   dummyobject = false
 }

if(this.reportArray.length ==0){
  this.reportArray[0] = {
active:1,
chasisNumber:"",
containerArrived:0,
containerDelivered:0,
containerInTransit:0,
containerLoaded:0,
containerNumber:"",
containerSteamshipLineConfirmed:"",
containerTypeConfirmed:"",
createdBy:"",
createdOn:"",
id:"",
isqueued:"",
modifiedBy:null,
modifiedOn:"",
pickupTruckerId:"",
sealNumber:"",
sequence:"",
shipmentId:"",
status:"",
tareWeight:"",
truckerId:"",
trucker_id:""}

var tcom = {
      active:0,
      createdBy:0,
      createdOn:"",
      emailAddress:"string",
      id:"0",
      modifiedBy:0,
      modifiedOn:"",
      name:"",
      notes:"",
      phoneNumber:"",
      primaryContactName:"",
      secondaryContactName:"",
      type:"TRUCKER"}
this.reportArray[0].TCompany = tcom
dummyobject = true
}
debugger

   var formData = _.map(this.reportArray , (data , index)=>{

    var tBagsValue = dummyobject?0:this.getSum(data.TContainerLoad)
        return(
          <div className="warpper-inner_shipment">
                         <div className="content-inside_shipment">
                                 <table className="logoShipment">
                                     <tbody>
                                         <tr>
                                             <td className="img-responsive logo_icon_shipment"></td>
                                             <td className="text">LOAD ORDER - {(this.state.piDataPO && this.state.piDataPO.TPackagingType && this.state.piDataPO.TPackagingType.packagingType == "BAGS") ? "BAGS" : "BOXES"}</td>
                                         </tr>
                                     </tbody>
                                 </table>
                                 <span className="door">Door # _______________</span>

                                 <div className="loadOrder ">
                                     <div className="loadOrder_data ">
                                         <table width="100%" className="bg_striped">
                                             <tbody>
                                             <tr><td>DATE</td> <td>{moment(this.state.viewData.createdOn).format("MM-DD-YYYY")}</td></tr>
                                             <tr><td>CUSTOMER</td> <td>{this.state.viewData.TCompany.name}</td></tr>
                                             <tr><td>TRUCKER </td> <td>{dummyobject?"":this.state.trucker[index].TCompany.name}</td></tr>
                                             <tr><td>CONTAINER # </td> <td>{dummyobject?"":this.state.chasis[index].containerNumber}</td></tr>
                                             <tr><td>CHASSIS # </td> <td>{dummyobject?"":this.state.chasis[index].chasisNumber}</td></tr>
                                             <tr><td>STEAMSHIP LINE</td> <td>{dummyobject?"":this.state.viewData.TShipmentInternational[0].TSteamshipLine.name ? this.state.viewData.TShipmentInternational[0].TSteamshipLine.name : this.state.viewData.TShipmentDomestic[0].TSteamshipLine.name}</td></tr>
                                             <tr><td>RELEASE #</td> <td>{dummyobject?"":this.state.viewData.releaseNumber}</td></tr>
                                             <tr><td>BOOKING # </td> <td>{dummyobject?"":this.state.viewData.TShipmentInternational[0].bookingNumber}</td></tr>
                                             <tr><td>ORIGIN </td> <td>{dummyobject?"":(this.state.piDataPO && this.state.piDataPO.TOrigin) ?  this.state.piDataPO.TOrigin.origin : ''}</td></tr>
                                             <tr className="spacel"><td>SPECIAL INSTRUCTIONS </td> <td>None</td></tr>
                                             </tbody>

                                   </table>
                                     </div>
                                     <div className="quantity">

                                         <table>
                                             <tr> <td> </td> <td>Lot#</td> <td>Pallet#</td> </tr>
                                             {
                                                 _.map(this.state.myArray,(item,index)=>{
                                                     return(<tr> <td>{index+1} </td> <td>{ }</td> <td>{}</td> </tr>)
                                                 })
                                             }

                                         </table>

                                         <span>Quantity/Lot Verification: _________________</span>
                                     </div>
                                 </div>
                                 <div className="location">
                                     <h3>LOCATION</h3>
                                     <div className="location_data">
                                         <table className={dummyobject?"bg_striped SetWidhOfTD":"bg_striped"} style={{'display' : ((this.state.viewData && this.state.viewData.TContainerInternational && this.state.viewData.TContainerInternational.length >0)||dummyobject) ? 'table' : 'none'}}>
                                             <tr>
                                                 <td>LOCATION</td>
                                                 { (this.state.viewData && this.state.viewData.TContainerInternational && this.state.viewData.TContainerInternational.length >0 && this.state.viewData.TContainerInternational[0].TContainerLoad)?
                                                     _.map(this.state.viewData.TContainerInternational[index].TContainerLoad,(obj,idx)=>{
                                                             return(<td>{obj.TInventoryLocation.locationName}</td>)

                                                     })

                                                : dummyobject?<td></td>:''  }

                                             </tr>
                                             <tr>
                                                 <td>PO #</td>
                                                 { (this.state.viewData && this.state.viewData.TContainerInternational && this.state.viewData.TContainerInternational.length >0 && this.state.viewData.TContainerInternational[0].TContainerLoad)?
                                                     _.map(this.state.viewData.TContainerInternational[index].TContainerLoad,(obj,index)=>{
                                                             return(<td>{this.state.piDataPO && this.state.piDataPO.po_number ? this.state.piDataPO.po_number : ''}</td>)

                                                     })

                                                : dummyobject?<td></td>:''  }

                                             </tr>
                                             <tr>
                                                 <td>MATERIAL</td>
                                                 { (this.state.viewData && this.state.viewData.TContainerInternational && this.state.viewData.TContainerInternational.length >0 && this.state.viewData.TContainerInternational[0].TContainerLoad)?
                                                     _.map(this.state.viewData.TContainerInternational[index].TContainerLoad,(obj,index)=>{
                                                             return(<td>{this.state.piDataPO && this.state.piDataPO.material ? this.state.piDataPO.material : ''}</td>)

                                                     })

                                                : dummyobject?<td></td>:''  }

                                             </tr>
                                             <tr>
                                                 <td>LOT #</td>

                                                 { (this.state.viewData && this.state.viewData.TContainerInternational && this.state.viewData.TContainerInternational.length >0 && this.state.viewData.TContainerInternational[0].TContainerLoad)?
                                                     _.map(this.state.viewData.TContainerInternational[index].TContainerLoad,(obj,index)=>{
                                                             return(<td>{this.state.lot ? this.state.lot.lot_number : "" }</td>)

                                                     })

                                                : dummyobject?<td></td>:''  }

                                       </tr>
                                             <tr>
                                                 <td># OF BAGS</td>
                                                 { (this.state.viewData && this.state.viewData.TContainerInternational && this.state.viewData.TContainerInternational.length >0 && this.state.viewData.TContainerInternational[0].TContainerLoad)?
                                                     _.map(this.state.viewData.TContainerInternational[index].TContainerLoad,(obj,index)=>{
                                                             return(<td>{obj.TPiInventory.noOfBags}</td>)

                                                     })

                                                : dummyobject?<td></td>:''  }


                                             </tr>
                                             <tr>
                                                 <td>BREAKDOWN</td>
                                                 { (this.state.viewData && this.state.viewData.TContainerInternational && this.state.viewData.TContainerInternational.length >0 && this.state.viewData.TContainerInternational[0].TContainerLoad)?
                                                     _.map(this.state.viewData.TContainerInternational[index].TContainerLoad,(obj,index)=>{
                                                          return(<td><p style={{"display" : (Math.floor(obj.TPiInventory.noOfBags/this.state.bagsPerpallet) >0)? "block" : "none" , "float" : "left" , "width" : "25%"}}>{Math.floor(obj.TPiInventory.noOfBags/this.state.bagsPerpallet)}Pallets X {this.state.bagsPerpallet} Bags</p> <p style={{"display" : (obj.TPiInventory.noOfBags/this.state.bagsPerpallet ==0 || obj.TPiInventory.noOfBags % this.state.bagsPerpallet > 0)? "block" : "none" , "float" : "left" , "width" : "25%" ,"marginLeft" : "30px"}}>,1 Pallets X {obj.TPiInventory.noOfBags % this.state.bagsPerpallet} Bags</p></td>)

                                                     })

                                                : dummyobject?<td></td>:''  }

                            </tr>
                                         </table>

                                         <table className="bg_striped" style={{'display' : (this.state.viewData && this.state.viewData.TContainerDomestic && this.state.viewData.TContainerDomestic.length >0) ? 'table' : 'none'}}>
                                                                                     <tr>
                                                                                         <td>LOCATION</td>
                                                                                         { (this.state.viewData && this.state.viewData.TContainerDomestic && this.state.viewData.TContainerDomestic.length >0 && this.state.viewData.TContainerDomestic[0].TContainerLoad)?
                                                                                             _.map(this.state.viewData.TContainerDomestic[index].TContainerLoad,(obj,idx)=>{
                                                                                                     return(<td>{obj.TInventoryLocation.locationName}</td>)

                                                                                             })

                                                                                        : ''  }
                                                                                     </tr>
                                                                                     <tr>
                                                                                         <td>PO #</td>
                                                                                         { (this.state.viewData && this.state.viewData.TContainerDomestic && this.state.viewData.TContainerDomestic.length >0 && this.state.viewData.TContainerDomestic[0].TContainerLoad)?
                                                                                             _.map(this.state.viewData.TContainerDomestic[index].TContainerLoad,(obj,index)=>{
                                                                                                     return(<td>{this.state.piDataPO && this.state.piDataPO.po_number ? this.state.piDataPO.po_number : ''}</td>)

                                                                                             })

                                                                                        : ''  }

                                                                                     </tr>
                                                                                     <tr>
                                                                                         <td>MATERIAL</td>
                                                                                         { (this.state.viewData && this.state.viewData.TContainerDomestic && this.state.viewData.TContainerDomestic.length >0 && this.state.viewData.TContainerDomestic[0].TContainerLoad)?
                                                                                             _.map(this.state.viewData.TContainerDomestic[index].TContainerLoad,(obj,index)=>{
                                                                                                     return(<td>{this.state.piDataPO && this.state.piDataPO.material ? this.state.piDataPO.material : ''}</td>)

                                                                                             })

                                                                                        : ''  }

                                                                                     </tr>
                                                                                     <tr>
                                                                                         <td>LOT #</td>

                                                                                         { (this.state.viewData && this.state.viewData.TContainerDomestic && this.state.viewData.TContainerDomestic.length >0 && this.state.viewData.TContainerDomestic[0].TContainerLoad)?
                                                                                             _.map(this.state.viewData.TContainerDomestic[index].TContainerLoad,(obj,index)=>{
                                                                                                     return(<td>{this.state.lot ? this.state.lot.lot_number : "" }</td>)

                                                                                             })

                                                                                        : ''  }

                                                                                </tr>
                                                                                     <tr>
                                                                                         <td># OF BAGS</td>
                                                                                         { (this.state.viewData && this.state.viewData.TContainerDomestic && this.state.viewData.TContainerDomestic.length >0 && this.state.viewData.TContainerDomestic[0].TContainerLoad)?
                                                                                             _.map(this.state.viewData.TContainerDomestic[index].TContainerLoad,(obj,index)=>{
                                                                                                     return(<td>{obj.TPiInventory.noOfBags}</td>)

                                                                                             })

                                                                                        : ''  }


                                                                                     </tr>
                                                                                     <tr>
                                                                                         <td>BREAKDOWN</td>
                                                                                         { (this.state.viewData && this.state.viewData.TContainerDomestic && this.state.viewData.TContainerDomestic.length >0 && this.state.viewData.TContainerDomestic[0].TContainerLoad)?
                                                                                             _.map(this.state.viewData.TContainerDomestic[index].TContainerLoad,(obj,index)=>{
                                                                                                     return(<td><p style={{"display" : (Math.floor(obj.TPiInventory.noOfBags/this.state.bagsPerpallet) >0)? "block" : "none" , "float" : "left" , "width" : "25%"}}>{Math.floor(obj.TPiInventory.noOfBags/this.state.bagsPerpallet)}Pallets X {this.state.bagsPerpallet} Bags</p> <p style={{"display" : (obj.TPiInventory.noOfBags/this.state.bagsPerpallet ==0 || obj.TPiInventory.noOfBags % this.state.bagsPerpallet > 0)? "block" : "none" ,"float" : "left" , "width" : "25%"}}>1 Pallets X {obj.TPiInventory.noOfBags % this.state.bagsPerpallet} Bags</p></td>)

                                                                                             })

                                                                                        : ''  }

                                                                                </tr>
                                                                                 </table>








                                         <span> Total number of bags being shipped = <strong>{tBagsValue}</strong></span>
                                     </div>
                                 </div>
                                 <div className="verification">
                                     <h3>VERIFICATION</h3>
                                     <div className="verification_data">
                                         <span>PICKED BY : __________________________</span>
                                         <span>STAGING AREA INSPECTION : __________________________</span>
                                         <span>IN PROCESS INSPECTION :__________________________</span>
                                         <span>FINAL INSPECTION : __________________________</span>
                                     </div>
                                 </div>
                         </div>

                     </div>



     )
   })




        return (
            <div style={{marginLeft: '20%',marginRight: '18%'}}>

 {formData}
  <button id="create_print" type="button" className="create_btn_shipment" onClick = {this.onPrint} style={{"float" : "left"}} data-html2canvas-ignore="true">Print </button>
<button id="create_pdf" type="button" className="create_btn_shipment"  data-html2canvas-ignore="true">CREATE PDF </button>
            </div>
        );

    }
}
