

import React from 'react';
//import EnterPackagingInstructionForm from './EnterPackagingInstructionForm';
import _ from 'lodash';
import { createDataLoader } from 'react-loopback';
import '../../../containers/containers/ContainerPrint/containerPrint.css';


var NumberFormat = require('react-number-format');
var Loader = require('react-loader');
export default class BillOfLadingForDomestic extends React.Component {
    constructor(props){
        super(props);
        this.id = this.props.params.containerId;
        this.state = {loaded: true,lot:'',railCar:'',weight:'',noBox:'',no_of_bags:0};
        this.state.viewData={TShipmentent:{TShipmentDomestic:[{}],TCompany:{},TLocation:{}}};
        this.state.PIData={TPackagingInstructions:{TPackagingMaterial:{}}};
        this.createPDF = this.createPDF.bind(this);

    }
    componentWillMount(){
       var InventView = createDataLoader(BillOfLadingForDomestic,{
            queries:[{
                endpoint: 'TShipmentents',
                filter: {
                    include: ['TShipmentLots',{"relation":"TShipmentents","scope":{"include":["TLocation"]}}]
                }
            }]
        })

        //debugger

        //var base = 'TPackagingInstructions'+'/'+this.props.params.id;
        var base = 'TContainerDomestics/'+this.id;
        this.url = InventView._buildUrl(base, {
            "include" : ["TCompany","TContainerLoad",{"relation": "TShipmentent","scope":{"include":["TShipmentAddress",{"relation":"TShipmentDomestic","scope":{"include":["TShipmentType","TPaymentType"]}} ,"TShipmentLots","TCompany","TLocation"]}}]
        })
        $.ajax({
            url: this.url,
            success:function(data){
                console.log('<<<<<<<<<>>>>>>>>>',data)
                this.setState({
                    viewData : data
                })
                this.getPackagingInfo(data.TShipmentent.TShipmentLots[0].piLotsId);


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
        var ShipmentView = createDataLoader(BillOfLadingForDomestic,{
            queries:[{
                endpoint: 'TShipmentents',
                filter: {
                    include: ['TShipmentLots',{"relation":"TShipmentents","scope":{"include":["TLocation"]}}]
                }
            }]
        })
        this.url1 = ShipmentView._buildUrl('TPackagingInstructionLots/'+PiLotId, {
            "include" : {"relation" :"TPackagingInstructions" ,"scope":{"include":[{"relation":"TPackagingMaterial","scope":{"include":"TPackagingType"}},"TPalletType"]}}
        })
        $.ajax({
            url: this.url1,
            success:function(data){
                console.log('lot ,po, location array>>>>>>>>>>>>>>>',data);
                this.setState({
                    PIData:data
                })

            }.bind(this)

        })
        return
    }


    componentDidMount() {
        (function(){
            var
                form = $('.bill-of-completed'),
                cache_width = form.width(),
                a4  =[ 595.28,  841.89]; // for a4 size paper width and height

            $('#create_pdf').on('click',function(){
                console.log('call create pdf');
                $('html,body').scrollTop(0);
                // $(window).scrollTop();
                createPDF();
            });
//create pdf
            function createPDF(){
                getCanvas().then(function(canvas){
                    var
                        img = canvas.toDataURL("image/png"),
                        doc = new jsPDF({
                            unit:'px',
                            format:'a4'
                        });
                    doc.addImage(img, 'JPEG', 20, 20);
                    doc.save('Bill_Of_Lading.pdf');
                    form.width(cache_width);
                });
            }

// create canvas object
            function getCanvas(){
                form.width((a4[0]*1.33333) -80).css('max-width','none');
                return html2canvas(form,{
                    imageTimeout:2000,
                    removeContainer:true
                });
            }

        }());
    }
    createPDF(e){
        console.log('print view')
        //hashHistory.push('/Shipment/shipmentPrint/')
    }
    render(){
      if(this.state.viewData && this.state.viewData.TContainerLoad && this.state.viewData.TContainerLoad.length > 0){
        debugger
        var typeOfShipment = this.state.viewData.TShipmentent.TShipmentDomestic[0].TShipmentType.shipmentType
        var paymentType = this.state.viewData.TShipmentent.TShipmentDomestic[0].TPaymentType.type
        var paidBy = this.state.viewData.TShipmentent.TShipmentDomestic[0].paidBy
        var notes = ""
        var po = ""
        var lotNumber = ""
        var shipDate = moment(this.state.viewData.TShipmentent.TShipmentDomestic[0].requestedShipDate).format("YYYY-MM-DD")
        var deliveryDate = moment(this.state.viewData.TShipmentent.TShipmentDomestic[0].requestedDeliveryDate).format("YYYY-MM-DD")
        var receipient = this.state.viewData.TShipmentent.TShipmentDomestic[0].recipent
        var receipientContact = this.state.viewData.TShipmentent.TShipmentDomestic[0].recipentContact
        var address = this.state.viewData.TShipmentent.TShipmentAddress[0].shipToAddress
        var city = this.state.viewData.TShipmentent.TShipmentAddress[0].shipToCity
        var state = this.state.viewData.TShipmentent.TShipmentAddress[0].shipToState
        var zipCode = this.state.viewData.TShipmentent.TShipmentAddress[0].shipToZip
        var telephone = this.state.viewData.TShipmentent.TShipmentDomestic[0].recipentTelNumber
        var totalBags = this.getSum(this.state.viewData.TContainerLoad)
        var multiplyingFactor = 1
        var weight =0
        var unit=""
        var unitType=""
        var carrierAccountNumber = this.state.viewData.TShipmentent.TShipmentDomestic[0].carrierAcNumber
        var trucker = this.state.viewData.TCompany.name
        var id = 0
        if(this.state.PIData.TPackagingInstructions.TPackagingMaterial.TPackagingType!=undefined){
          weight =   this.state.PIData.TPackagingInstructions.TPackagingMaterial.avarageMaterialWeight
          unit =     "lbs"
          multiplyingFactor = 2.204625
          unitType = this.state.PIData.TPackagingInstructions.TPackagingMaterial.TPackagingType.packagingType
          po = this.state.PIData.TPackagingInstructions.po_number
          id = this.state.PIData.TPackagingInstructions.TPackagingMaterial.TPackagingType.id
        }
        var totalPallets = Math.ceil(totalBags / this.state.PIData.TPackagingInstructions.bags_per_pallet)
        if(id==1){
          var gW = Math.round(totalBags*(this.state.PIData.TPackagingInstructions.TPackagingMaterial.avarageMaterialWeight)*multiplyingFactor + totalBags *(this.state.PIData.TPackagingInstructions.TPackagingMaterial.emptyWeight)*multiplyingFactor + totalPallets *(this.state.PIData && this.state.PIData.TPackagingInstructions && this.state.PIData.TPackagingInstructions.TPalletType ? this.state.PIData.TPackagingInstructions.TPalletType.weight : 1)*multiplyingFactor)
          var tw = Math.round(totalBags *(this.state.PIData.TPackagingInstructions.TPackagingMaterial.emptyWeight)*multiplyingFactor + totalPallets *(this.state.PIData && this.state.PIData.TPackagingInstructions && this.state.PIData.TPackagingInstructions.TPalletType ? this.state.PIData.TPackagingInstructions.TPalletType.weight : 1)*multiplyingFactor)

        }
        else{
          var gW = Math.round(totalBags*(this.state.PIData.TPackagingInstructions.TPackagingMaterial.avarageMaterialWeight) + totalBags *(this.state.PIData.TPackagingInstructions.TPackagingMaterial.emptyWeight) + totalPallets *(this.state.PIData && this.state.PIData.TPackagingInstructions && this.state.PIData.TPackagingInstructions.TPalletType ? this.state.PIData.TPackagingInstructions.TPalletType.weight : 1)*multiplyingFactor)
          var tw = Math.round(totalBags *(this.state.PIData.TPackagingInstructions.TPackagingMaterial.emptyWeight)+ totalPallets *(this.state.PIData && this.state.PIData.TPackagingInstructions && this.state.PIData.TPackagingInstructions.TPalletType ? this.state.PIData.TPackagingInstructions.TPalletType.weight : 1)*multiplyingFactor)
        }
        var displaygW = gW + ""
      }
        return (
            <div style={{margin:'0 auto',textAlign :'center'}}>
                <div className="bill-of-completed">
                    <div className="content-inside">

                        <table className="table border" style={{width:'100%'}}  cellSpacing="0" cellPadding="0">
                            <tbody>
                            <tr>
                                <td className="border_right" >
                                    <p className="font-11"><strong >STRAIGHT BILL OF LADING-SHORT FORM-ORIGINAL-NOT NEGOTIABLE  </strong>, RECEIVED subject to the classNameifications and lawfully filed tariffs in effort on the date of issue of this Bill of Lading.</p>
                                </td>
                                <td className="designate" colSpan="2" style={{textAlign: 'center'}}>
                                    <strong>DESIGNATE WITH AN (X)</strong>
                                    <label><input type="checkbox" />BY TRUCK </label>
                                    <label><input type="checkbox" />BY FREIGHT  </label>
                                </td>
                            </tr>


                            <tr>
                                <td colSpan="3" className="text font-10">
                                    The property described below, in apparent good order, except as noted (contents and condition of contents of packages unknown), marked, consigned and destined as indicated below, which said carrier (the word carrier being understood throughout this contract as meaning any person or corporation in possession of the property under the contract) agrees to carry to its usual place of delivery at said destination, if on its route, otherwise to deliver to another carrier on the route to said destination.  It is mutually agreed, as to each carrier of all or any of said property over all or any portion of said route to destination, and as to each party at any time interested in all or any of said property, that any service to be performed hereunder shall be subject to all the terms and conditions of the Uniform Domestic Straight Bill of Lading set forth (1) in Uniform Freight Classification in effect on the date hereof, if this is a rail or a rail-water shipment, or (2) in the applicable motor carrier classification or tariff if this is a motor carrier shipment. <strong> Shipper hereby certifies that he is familiar with all of the terms and conditions of the said bill of lading, set forth in the classification or tariff which governs the transportation of this shipment, and the said terms and conditions are hereby agreed to by the shipper and accepted for himself and his assigns.</strong>
                                </td>
                            </tr>



                            <tr>
                                <td className="customer_details border_right" >
                                    <table className="table_inner ">
                                    <tbody>
                                        <tr className="from" >
                                            <td colSpan="2"> FROM: <strong className="font-11">{this.state.viewData.TShipmentent.TCompany.name}</strong></td>
                                        </tr>
                                        <tr className="at" >
                                            <td colSpan="2"> AT: <strong className="font-11"> A&R BULKPAK LLC, {this.state.viewData.TShipmentent.TLocation.locationName} </strong></td>
                                        </tr>
                                        <tr className="details ">
                                            <td className="border_right" width="50%">
                                                <strong className="font-10">CONSIGNEE AND  DESTINATION</strong>
                                            </td>
                                            <td width="50%">
                                                <strong className="font-11">
                                                    {receipient} &nbsp;<br/>
                                                    ATTN: {receipientContact}&nbsp;<br/>{address}&nbsp;<br/>
                                                    {" "+city+","}{" "+state+","}{" "+zipCode}&nbsp;<br/>
                                                    {telephone}


                                                </strong>
                                            </td>
                                        </tr>
                                    </tbody>
                                    </table>
                                </td>
                                <td className="booking_details " colSpan="2">
                                    <table className="table_inner ">
                                    <tbody>
                                        <tr className="" >
                                            <td className="border_right"> DATE: <strong className="font-11">{moment(new Date()).format("YYYY-MM-DD")}</strong></td>
                                            <td> RELEASE #: <strong className="">{this.state.viewData.TShipmentent.releaseNumber}</strong></td>
                                        </tr>
                                        <tr className="">
                                            <td className="border_right">TYPE OF SHIPMENT:<strong className="font-11">{"  "+typeOfShipment}</strong></td>
                                            <td>CARRIER ACCT No.<strong className="font-11">{carrierAccountNumber}</strong></td>
                                        </tr>
                                        <tr className="po" >
                                            <td colSpan="2">
                                                <span>PO# <strong className="font-11"> {this.state.PIData.TPackagingInstructions.po_number}</strong></span>
                                                <span>BOOKING #  <strong className="font-11">{this.state.viewData.TShipmentent.TShipmentDomestic[0].bookingNumber}</strong></span>
                                            </td>
                                        </tr>
                                        <tr className="seal">
                                            <td className="border_right" width="50%">
                                                SEAL <strong className="font-11"># {this.state.viewData.sealNumber}</strong>
                                            </td>
                                            <td width="50%">
                                                TRUCKER: <strong className="font-11">{trucker}</strong>
                                            </td>
                                        </tr>

                                        <tr className="container" style={{"border-bottom":"0px" }} >
                                            <td>
                                                CONTAINER #
                                            </td>
                                            <td>
                                                <strong className="font-11"> {this.state.viewData.containerNumber}</strong>
                                            </td>
                                        </tr>
                                        {/*<tr className="chassis" >
                                            <td>
                                                CHASSIS #
                                            </td>
                                            <td>
                                                <strong className="font-11"> {this.state.viewData.chasisNumber}</strong>
                                            </td>
                                        </tr>*/}
                                    </tbody>
                                    </table>
                                </td>
                            </tr>



                            <tr >
                                <td className="border_right bill_details" width="76%" colSpan="2" >
                                    <table className="table_inner ">
                                    <tbody>
                                        <tr className="bill_details_header">
                                            <td className="border_right">NO. OF PACKAGES</td>
                                            <td className="border_right">DESCRIPTION OF ARTICLES SPECIAL MARKS AND EXCEPTIONS </td>
                                            <td>WEIGHT (SUBJECT TO CORR.) </td>
                                        </tr>
                                        <tr className="bill_details_body " style={{borderBottom: '0px'}}>
                                            <td className="border_right font-11"><p>{totalBags}</p></td>
                                            <td className="border_right font-11">
                                                <p style={{"lineHeight": "10px"}}>AVERAGE WEIGHT OF MATERIAL IN {unitType} {Math.round(weight*multiplyingFactor)} {unit} <br/>{unitType} OF {this.state.PIData.TPackagingInstructions.material}</p>
                                                <p style={{"margin-top": "-39px"}}><span>NW:</span></p>
                                                <p style={{"margin-top": "51px"}}>LOT#&nbsp;{this.state.PIData.lot_number} <span>TW:{}</span></p>
                                                <p><span>GW:</span></p>
                                                {/*<p>***{unitType} ARE {Math.round(weight*multiplyingFactor)} {unit} NET WT***</p>*/}
                                                <p>SHIPMENT PAID BY: {paidBy}</p>
                                                <p>SHIPMENT TYPE: DOMESTIC</p>
                                                <p>REQUESTED SHIP DATE: {shipDate}</p>
                                                <p>REQUESTED DELIVERY DATE: {deliveryDate}</p>
                                                <p>NOTES: {notes}</p>
                                                <p>RECEIPIENT PO# {po}</p>
                                            </td>
                                            <td className="font-11 value" >
                                                <span></span>
                                                <span>{Math.round(totalBags * this.state.PIData.TPackagingInstructions.TPackagingMaterial.avarageMaterialWeight * multiplyingFactor)}{unit}</span>
                                                <span>{tw}{unit}</span>
                                                <span>{gW}{unit}</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                    </table>
                                </td>
                                <td className="bill_decription" width="24%" >
                                    <table className="table_inner ">
                                    <tbody>
                                        <tr className="pl">
                                            <td className="font-10 ">
                                                Subject to Section 7 of Conditions of applicable bill of lading, if this shipment to be delivered to the consignee without recourse on the consignor, the consignor shall sign the following statement.The carrier shall not make delivery of this shipment without payment of freight and all other lawful charges.<br/>Per <strong className="font-22">PL </strong><br/>(Signature of Consignor)
                                            </td>
                                        </tr>
                                        <tr className="font-10 ppd">
                                            <td className="">
                                                If charges are to be prepaid, write or stamp here,”To be Prepaid."<strong className="font-22"> PPD </strong>
                                            </td>
                                        </tr>
                                        <tr className="font-10 plPpdApply" style={{borderBottom: '0px'}}>
                                            <td className="" style={{textAlign:'left'}}>
                                                Received $     to apply in prepayment of the charges on the property described hereon.Agent or Cashier (The signature here acknowledges only the amount prepaid.)
                                            </td>
                                        </tr>
                                    </tbody>
                                    </table>
                                </td>
                            </tr>



                            <tr className="" style={{borderBottom: '0px'}}>
                                <td className="signature" colSpan="3">
                                    <table className="table_inner">
                                    <tbody>
                                        <tr className="">
                                            <td className="border_right placards" style={{textAlign: 'center'}}>
                                                <strong>PLACARDS SUPPLIED</strong>
                                                <label><input type="checkbox" />YES</label>
                                                <label><input type="checkbox" />NO</label>
                                            </td>
                                            <td className="border_right driverSignature">DRIVER’S SIGNATURE</td>
                                            <td className="emergencyResponse">EMERGENCY RESPONSE PHONE NO.</td>
                                        </tr>
                                    </tbody>
                                    </table>
                                </td>
                            </tr>

                            <tr className="shipment_certification">
                                <td className="discription text border_right" >
                                    <strong>SHIPPERS CERTIFICATION:</strong><i>This is to certify that the above-named materials are properly classified, described, packaged, marked and labeled, and are in proper condition for transportation according to the applicable regulations of the Department of Transportation.</i>
                                </td>
                                <td className="border_right signature" >
                                    <p className="border_bottom">SIGNATURE</p>
                                    <p>TITLE</p>
                                </td>
                                <td className=" " width="30%">Charges Advanced:</td>
                            </tr>

                            <tr className="">
                                <td className="shipment_details" colSpan="3">
                                    <table className="table_inner">
                                    <tbody>
                                        <tr className="">
                                            <td className="border_right border_bottom font-10" colSpan="4" width="74%">
                                                * If the shipment moves between two ports by a carrier by water, the law requires that the bill of lading shall state whether it is "carrier's or shipper's weight."<br/>
                                                +<strong> Shipper's imprints in lieu of stamp; not a part of Bill of Lading approved by the Interstate Commerce Commission.</strong>
                                                Note - Where the rate is dependent on value; shippers are required to state specifically n writing the agreed or declared value of the property. <br/>
                                                <strong>The agreed or declared value of the property is hereby specifically stated by the shipper to be not exceeding 	</strong>
                                            </td>
                                            <td className="cod" rowSpan="3" width="26%">
                                                <table className="cod_table">
                                                    <tr><td>C.O.D. SHIPMENT {" "+paymentType}
                                                    </td></tr>
                                                    <tr><td>C.O.D. Amt </td></tr>
                                                    <tr><td>Collection Fee</td></tr>
                                                    <tr><td>Total Charges </td></tr>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr className="" >
                                            <td className="border_right border_bottom" colSpan="2">
                                                THIS SHIPMENT IS CORRECTLY DESCRIBED. CORRECT WEIGHT IS       LBS.
                                            </td>
                                            <td className="border_right border_bottom" colSpan="2">
                                                +The fibre boxes used for this shipment conform to the specifications set forth in the box maker’s certificate thereon, and all other requirements of The Consolidate Freight classification.
                                            </td>
                                        </tr>
                                        <tr className="" style={{borderBottom: '0px'}} >
                                            <td className="border_right" colSpan="2" style={{textAlign: 'center'}}>
                                                <strong className=" font-11"> A&R Bulkpak SC LLC 169 Spring Grove Drive Moncks Corner, SC 29461 </strong>
                                            </td>
                                            <td className="border_right ">SHIPPER, PER</td>
                                            <td className="border_right ">AGENT PER</td>
                                        </tr>
                                    </tbody>
                                    </table>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                </div>

                <button type="button" id="create_pdf" className="create_btn_container">CREATE PDF </button>
            </div>
        );

    }
}
