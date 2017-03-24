import React from 'react';
//import EnterPackagingInstructionForm from './EnterPackagingInstructionForm';
import { createDataLoader } from 'react-loopback';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import './formPrint.css';
import { hashHistory } from 'react-router'

var Loader = require('react-loader');
var lot;
var weight;
var tempcustom_label;
export default class PrintPackaging extends React.Component {
    constructor(props){
        super(props);
        this.state = {loaded: true,lot:'',railCar:'',weight:'',noBox:''};
        this.state.viewData={packaging_status:'',custom_label:'',TCompany:{},TLocation:{},TPackagingType:{},TPalletType:{},TWrapType:{},TOrigin:{},TPackagingInstructionLots:[]}
        this.createPDF = this.createPDF.bind(this);
        this.labellemgth = this.state.viewData.custom_label.split("\n")
    }

 componentWillUnmount(){
    document.body.style.width = '100%';

 }


    componentWillMount(){
      document.body.style.width = '800px';
        var InventView = createDataLoader(PrintPackaging,{
            queries:[{
                endpoint: 'TPackagingInstructions',
                filter: {
                    include: ['TPackagingInstructionLots',{"relation":"TPackagingInstructions","scope":{"include":["TLocation"]}}]
                }
            }]
        })

// if(this.props.params.cID == null){
//
// }
        var base = 'TPackagingInstructions'+'/'+this.props.params.id;
        this.url = InventView._buildUrl(base, {
            include: ['TPackagingInstructionLots',"TLocation","TCompany","TPackagingType","TPalletType","TWrapType","TOrigin","TPackagingMaterial"]
        })
        console.log(this.url,"<<<<<<<<<<<<<<<<<<<<URL")

        var lot='';var railcar='';var weight='';var label='';
        $.ajax({
            url: this.url,
            success:function(data){
                console.log('Invent>>>>>>>>>>>>>>>',data);
                debugger;
                /*forEach(data.TPackagingInstructionLots,function(item){
                        lot=item.lot_number;
                }*/
                if(this.props.params.cID == "null"){
                  for(var a=0;a<data.TPackagingInstructionLots.length;a++){
                    //if(this.props.params && this.props.params.cID == null){
                      lot=lot+data.TPackagingInstructionLots[a].lot_number+',';
                      railcar=railcar+data.TPackagingInstructionLots[a].railcar_number+',';
                      weight=data.TPackagingInstructionLots[a].weight+',';
                      tempcustom_label = data.TPackagingInstructionLots[a].custom_label;


                    }
                }


                else if(this.props.params.cID!= "null"){
                  for(var a=0;a<data.TPackagingInstructionLots.length;a++){
                    if(data.TPackagingInstructionLots[a].id == this.props.params.cID){
                      lot=lot+data.TPackagingInstructionLots[a].lot_number+',';
                      railcar=railcar+data.TPackagingInstructionLots[a].railcar_number+',';
                      weight=data.TPackagingInstructionLots[a].weight+',';
                      tempcustom_label = data.TPackagingInstructionLots[a].custom_label;
                    }

                    }
                }


    //data['packaging_type']='box';
                //data['packaging_type']='pallet';


                console.log('<<<<<<<<<<<data>>>>>>>>>',data.TPackagingType);
                if(typeof data.TPackagingType==='undefined'){
                    data['TPackagingType']={packagingType:'NA'}
                    console.log('sldjhflsjdfs')
                    data.TPackagingType.packagingType=data.TPackagingType.packagingType+',';
                    data.TPackagingType.packagingType=data.TPackagingType.packagingType.split(',');

                }
                else{
                    data.TPackagingType.packagingType=data.TPackagingType.packagingType+',';
                    data.TPackagingType.packagingType=data.TPackagingType.packagingType.split(',');
                }





                lot=lot.substr(0, lot.length - 1);
                railcar=railcar.substr(0, railcar.length - 1);
                weight=weight.substr(0, weight.length - 1);
                if(data.packaging_material_id!=2){
                    var noBox='<div><tr><td>BAG TYPE:</td> <td></td></tr><tr><td>BAGS PER PALLET:</td> <td>{this.state.viewData.bags_per_pallet}</td></tr><tr><td>STRETCH WRAP:</td> <td>{this.state.viewData.TWrapType.name}</td></tr></div>'
                }
                else{var noBox=''}
                data.custom_label = tempcustom_label;
                this.setState({
                    viewData : data,
                    packType : data.TPackagingType.packagingType,
                    lots : data.TPackagingInstructionLots,
                    lot:lot,
                    railcar:railcar,
                    weight:weight,
                    noBox:noBox,
                    LocationId : data.TLocation.id,
                    custom_label : tempcustom_label
                })



            }.bind(this)

        })



    }
    componentDidMount() {
        (function(){
            var
                form = $('.warpper-inner'),
                cache_width = form.width(),
                a4  =[ 595.28,  841.89]; // for a4 size paper width and height

            $('#create_pdf').on('click',function(){
                console.log('call create pdf');
                $('body').scrollTop(0);
                createPDF();
            });

            function createPDF(){
                getCanvas().then(function(canvas){
                    var
                        img = canvas.toDataURL("image/png"),
                        doc = new jsPDF({
                            unit:'px',
                            format:'a4'
                        });
                    doc.addImage(img, 'JPEG', 20, 20);
                    doc.save('package.pdf');
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
        hashHistory.push('/Packaging/packagingInstFormPrint/')
    }
    render(){
      debugger
      if(this.state.viewData.custom_label!=null){
    var lengthLabel =  this.state.viewData.custom_label.split("\n").length}
   this.dataList =   _.map(this.state.viewData.TPackagingType.packagingType , (status,index)=>{
		lot = this.state.lot
        weight = this.state.weight
         if(status!=''){
           debugger;
           console.log("boxesssssssssssss" , status)
             if(status=='BOXES'){
                 return(
                     <div className="packaging_data " style={{"text-align":"center"}}>
                         <table width="100%" className="bg_striped">
                             <tbody>
                             <tr><td>DATE:</td> <td></td></tr>
                             <tr><td>CUSTOMER:</td> <td>{this.state.viewData.TCompany.name}</td></tr>
                             <tr><td>PO#: </td> <td>{this.state.viewData.po_number}</td></tr>
                             <tr><td>RAILCAR#: </td> <td>{this.state.railcar}</td></tr>
                             <tr><td>MATERIAL: </td> <td>{this.state.viewData.material}</td></tr>
                             <tr><td>LOT#: </td> <td>{this.state.lot}</td></tr>
                             <tr><td>PACKAGING TYPE:</td> <td>{status}</td></tr>
                             <tr><td>PALLET TYPE:</td> <td>{this.state.viewData.TPalletType.palletType}</td></tr>
                             <tr><td>ORIGIN: </td> <td>{this.state.viewData.TOrigin.origin}</td></tr>
                             </tbody>
                         </table>
                     </div>
                 )
             }
             else if(status!='Boxes'){
                 return(
                     <div className="packaging_data " style={{"text-align":"center"}}>
                         <table width="100%" className="bg_striped">
                             <tbody>
                             <tr><td>DATE:</td> <td></td></tr>
                             <tr><td>CUSTOMER:</td> <td>{this.state.viewData.TCompany.name}</td></tr>
                             <tr><td>PO#: </td> <td>{this.state.viewData.po_number}</td></tr>
                             <tr><td>RAILCAR#: </td> <td>{this.state.railcar}</td></tr>
                             <tr><td>MATERIAL: </td> <td>{this.state.viewData.material}</td></tr>
                             <tr><td>LOT#: </td> <td>{this.state.lot}</td></tr>
                             <tr><td>PACKAGING TYPE:</td> <td>{status}</td></tr>
                             <tr><td>BAG TYPE:</td> <td>{this.state.viewData.TPackagingMaterial ? this.state.viewData.TPackagingMaterial.packagingName : 'bag'}</td></tr>
                             <tr><td>BAGS PER PALLET:</td> <td>{this.state.viewData.bags_per_pallet}</td></tr>
                             <tr><td>STRETCH WRAP:</td> <td>{this.state.viewData.TWrapType.name}</td></tr>
                             <tr><td>PALLET TYPE:</td> <td>{this.state.viewData.TPalletType.palletType}</td></tr>
                             <tr><td>ORIGIN: </td> <td>{this.state.viewData.TOrigin.origin}</td></tr>
                             </tbody>
                         </table>
                     </div>

                 )
             }
         }

     })




            return (
                <div>
                    <div className="warpper-inner">
                        <div className="content-inside">
                            <div className="logo" style={{"margin-left":"290"}}>
                                <div className="img"><span className="img-responsive logo_icon"></span></div>
                                    <div className="text" style={{"margin-top":"15","margin-left":"-200","clear":"both","margin-right":"480","font-size":"15"}}> PACKAGING INSTRUCTIONS - {(this.state.viewData && this.state.viewData.TPackagingType && this.state.viewData.TPackagingType.packagingType && this.state.viewData.TPackagingType.packagingType.length > 1 && this.state.viewData.TPackagingType.packagingType[0] == 'Boxes')? 'Boxes' : 'Bags'} </div>
                                </div>
                                <div className="packaging_details " style={{"margin":"0","text-align":"center","margin-left":"150"}}>
                                    {
                                      this.dataList
                                    }

                                </div>
                                <div className="label_confirmation" style={{"margin-top" : "-25"}}>
                                    <h3>LABEL CONFIRMATION</h3>
                                    <p>SAMPLE LABEL</p>

                                    <div className="info" style={{"float":"left" , "margin-top" : 30,"width":"150px"}}>
                                        {this.state.viewData.custom_label.split("\n").map(function(item ,index) {
                                          debugger
                                            return (
                                                <span>
                                                    {item}

                                                  <br/>

                                                  {/*lengthLabel && lengthLabel == index +1) ?  "Stamp Confirmed By : __________" : ""*/}

                                                </span>
                                            )
                                        })}

                                    </div>
                                <div style={{"float":"left" , "margin" : 70}}>Stamp Confirmed By : __________</div>

                                </div>


                                <div className="inventry" style={{"float":"left" , "margin-top" : "5"}}>
                                    <h3>INVENTORY</h3>
                                    <div className="inventry_data">
                                        <table>
                                            <tr>
                                                <td>A.</td>
                                                <td>____ Full {this.state.packType}</td>
                                                <td>X  ____ Weight per {this.state.packType}  </td>
                                                <td>= ____Total Weight of Full {this.state.packType}</td>
                                            </tr>
                                            <tr>
                                                <td>B.</td>
                                                <td>____ Partial {this.state.packType}</td>
                                                <td>X  ____ Weight per {this.state.packType}  </td>
                                                <td> = ____Total Weight of Partial {this.state.packType}</td>
                                            </tr>
                                            <tr>
                                                <td colSpan="4" className="total">____Total {this.state.packType} (A+B)</td>
                                            </tr>
                                        </table>
                                        <div className="info">
                                            <span>Total Net Weight 	= __________ </span>
                                            <span>Railcar Weight 	= {this.state.weight} </span>
                                            <span>Weight Gain/Loss 	= __________ </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="location" style={{"margin-top" : "-25"}}>
                                    <h3>LOCATION</h3>
                                    <div className="location_data">
                                        <table>
                                            <tr>
                                                <td>_______ {this.state.packType} in  Location # _______</td>
                                                <td>_______ {this.state.packType} in  Location # _______</td>
                                                <td>_______ {this.state.packType} in  Location # _______</td>
                                            </tr>
                                            <tr>
                                                <td>_______ {this.state.packType} in  Location # _______</td>
                                                <td>_______ {this.state.packType} in  Location # _______</td>
                                                <td>_______ {this.state.packType} in  Location # _______</td>
                                            </tr>

                                        </table>
                                    </div>
                                </div>

                                <div className="qtyVerification" style={{"margin-top" : "-35"}}>
                                  <h3>QUANTITY VERIFICATION</h3>
                                    <div style={{"margin-top" : "15"}}>
                                    <table>
                                        <tr>
                                            <td>1) ________________</td>
                                            <td>2)  ____________________________</td>
                                        </tr>
                                        <tr>
                                            <td colSpan="2">Packout Accuracy and Inventory Input):</td>
                                            <td>_______________________________</td>
                                        </tr>
                                    </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button id="create_pdf" type="button" className="create_btn"  >CREATE PDF </button></div>
);
    }
}
