/**
 * Created by azmat on 18/10/16.
 */

import React from 'react';
//import EnterPackagingInstructionForm from './EnterPackagingInstructionForm';
import { createDataLoader } from 'react-loopback';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import './formPrint.css';
import { hashHistory } from 'react-router'

var Loader = require('react-loader');
export default class PrintPackaging extends React.Component {
    constructor(props){
        super(props);
        this.state = {loaded: true,lot:'',railCar:'',weight:'',noBox:''};
        this.state.viewData={packaging_status:'',custom_label:'',TCompany:{},TLocation:{},TPackagingType:{},TPalletType:{},TWrapType:{},TOrigin:{},TPackagingInstructionLots:[]}
        this.createPDF = this.createPDF.bind(this);
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
        console.log("I have recieved props")
        //debugger

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

                /*forEach(data.TPackagingInstructionLots,function(item){
                        lot=item.lot_number;
                }*/
                for(var a=0;a<data.TPackagingInstructionLots.length;a++){
                    lot=lot+data.TPackagingInstructionLots[a].lot_number+',';
                    railcar=railcar+data.TPackagingInstructionLots[a].railcar_number+',';
                    weight=data.TPackagingInstructionLots[a].weight+',';
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

                this.setState({
                    viewData : data,
                    lots : data.TPackagingInstructionLots,
                    lot:lot,
                    railcar:railcar,
                    weight:weight,
                    noBox:noBox,
                    LocationId : data.TLocation.id
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
            return (
                <div>
                    <div className="warpper-inner">
                        <div className="content-inside">
                            <div className="logo">
                                <div className="img"><span className="img-responsive logo_icon"></span></div>
                                    <div className="text"> PACKAGING INSTRUCTIONS - BOXES </div>
                                </div>
                                <div className="packaging_details ">
                                    {
                                        _.map(this.state.viewData.TPackagingType.packagingType , (status,index)=>{
                                            console.log(';;;;;;;;;',status)
                                            if(status!=''){
                                                if(status=='Boxes'){
                                                    return(
                                                        <div className="packaging_data ">
                                                            <table width="100%" className="bg_striped">
                                                                <tbody>
                                                                <tr><td>DATE:</td> <td>{moment(this.state.viewData.TCompany.createdOn).format("YYYY-MM-DD")}</td></tr>
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
                                                        <div className="packaging_data ">
                                                            <table width="100%" className="bg_striped">
                                                                <tbody>
                                                                <tr><td>DATE:</td> <td>{moment(this.state.viewData.TCompany.createdOn).format("YYYY-MM-DD")}</td></tr>
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
                                    }

                                </div>
                                <div className="label_confirmation">
                                    <h3>LABEL CONFIRMATION</h3>
                                    <p>SAMPLE LABEL</p>
                                    <div className="info">
                                        {this.state.viewData.custom_label.split("\n").map(function(item) {
                                            return (
                                                <span>
                                                    {item}
                                                    <br/>
                                                </span>
                                            )
                                        })}

                                    </div>
                                </div>

                                <div className="inventry">
                                    <h3>INVENTORY</h3>
                                    <div className="inventry_data">
                                        <table>
                                            <tr>
                                                <td>A.</td>
                                                <td>____ Full Boxes</td>
                                                <td>X  ____ Weight per Box  </td>
                                                <td>= ____Total Weight of Full Boxes</td>
                                            </tr>
                                            <tr>
                                                <td>B.</td>
                                                <td>____ Partial Boxes</td>
                                                <td>X  ____ Weight per Box  </td>
                                                <td> = ____Total Weight of Partial Boxes</td>
                                            </tr>
                                            <tr>
                                                <td colSpan="4" className="total">____Total Boxes (A+B)</td>
                                            </tr>
                                        </table>
                                        <div className="info">
                                            <span>Total Net Weight 	= __________ </span>
                                            <span>Railcar Weight 	= {this.state.weight} </span>
                                            <span>Weight Gain/Loss 	= __________ </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="location">
                                    <h3>LOCATION</h3>
                                    <div className="location_data">
                                        <table>
                                            <tr>
                                                <td>_______ Boxes in  Location # _______</td>
                                                <td>_______ Boxes in  Location # _______</td>
                                                <td>_______ Boxes in  Location # _______</td>
                                            </tr>
                                            <tr>
                                                <td>_______ Boxes in  Location # _______</td>
                                                <td>_______ Boxes in  Location # _______</td>
                                                <td>_______ Boxes in  Location # _______</td>
                                            </tr>

                                        </table>
                                    </div>
                                </div>

                                <div className="qtyVerification">
                                    <table>
                                        <tr>
                                            <td>Quantity Verification:</td>
                                            <td>1) ________________</td>
                                            <td>2)  ____________________________</td>
                                        </tr>
                                        <tr>
                                            <td colSpan="2">Packout Accuracy & Inventory Input):</td>
                                            <td>_______________________________</td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </div>
             
                        <button id="create_pdf" type="button" className="create_btn" >CREATE PDF </button></div>
);
    }
}

