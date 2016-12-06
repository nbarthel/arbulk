import React from 'react';
import '../../../public/stylesheets/style.css';
import '../../../public/stylesheets/bootstrap.min.css';
import './arrayclean.js';
import ReactDOM from 'react-dom'

class  ContainerQueueViewForm extends React.Component {
    constructor(props){
        super(props)

        this.handleSortableUpdate  = this.handleSortableUpdate.bind(this)
        this.callonEdit = this.callonEdit.bind(this)
    }
    componentDidMount(){

    }

    callonEdit(){
        $(ReactDOM.findDOMNode(this)).sortable({
            items: 'tr',
            update: this.handleSortableUpdate
        } );
    }


    handleSortableUpdate() {

        var newItems = _.clone(this.props.data, true);
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


        //for(var j in ids)
        //{
        //    axios.put(Base_Url+"TPackagingInstructionLots/" + ids[j] , {queue_sequence : newSequence[j] }).then((response)=>{
        //        debugger;
        //        console.log('response>>>>>>' , response)
        //    });
        //}

        // Lets React reorder the DOM
        // swal("Success" , 'Successfully updated Qsequence' , 'success')
        // $node.sortable('cancel');
        // this.setState({ items: newItems });
        // this.props.data = this.state.items
        // this.forceUpdate();

    }






    render() {
        var propsdata = (this.props.queueData && this.props.queueData.length > 0 )?this.props.queueData.reverse() : []
        this.queueViewList = _.map(propsdata , (data , index) =>{
            if(data.sequence != null){
                return(
                    <tr key={data.sequence}>
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
                                <input type="checkbox" id="row1"/><div className="control__indicator"></div>
                            </label>
                        </td>
                    </tr>
                )
            }

        })

        return (
            <section className="view_table-queue">
                <div className="container-fluid">
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
                                <div className="padding-20-last-l pull-left"><button type="button"    className="btn  btn-gray text-uppercase">Back</button></div>

                               <div className="padding-20-all pull-right"><button type="button"   id="edit_btn"  className="btn  btn-orange text-uppercase" onClick={this.callonEdit}>Edit</button></div>
                                <div className="padding-20-all pull-right"><button type="button"     className="btn  btn-primary text-uppercase">Print Container Load Order</button></div>

                            </div>
                        </div>



                        </div>

                    </div>

                </section>	
            )
            }
            }
            export default ContainerQueueViewForm;