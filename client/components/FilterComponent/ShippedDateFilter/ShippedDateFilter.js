/**
 * Created by ankit on 3/8/17.
 */
import React from  'react';
var DatePicker = require('react-datepicker');
var moment = require('moment');
require('react-datepicker/dist/react-datepicker.css');

class ShippedDateFilter extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            startDate: '',
            endDate : ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleChange1 = this.handleChange1.bind(this);
        //this.getDate() = this.getDate().bind(this);

    };


    handleChange(date){
        var tempDate;
        if(date != null)
        {
            tempDate = date.year()+"-"+(parseInt(date.month())+parseInt(1))+"-"+date.date()
        }
        else{
            date=""
        }
        var obj = {id:"1",tempDate:tempDate}
        this.setState({
            startDate: date,
        });
        this.props.getdt(obj)
    }

    handleChange1(date){
        debugger
        var tempDate;
        if(date != null)
        {
            tempDate = date.year()+"-"+(parseInt(date.month())+parseInt(1))+"-"+date.date()
        }
        else{
            date=""
        }
        var obj = {id:"2",tempDate:tempDate}
        this.setState({
            endDate: date
        });
        this.props.getdt(obj)

    }
    render() {

        if((this.props.parent && this.props.parent !="RailcarArrivalEntry" && this.props.parent !="RailcarDeparture")||this.props.parent==undefined){
            return (
                <div className="">
                    <hr/>
                    <div className="head_bg">
                        <h6 className="pull-left text_left">SHIPPED DATE FILTER</h6>
                    </div>

                    <div className="">
                        <div id="date" className="row">
                            <div className="col-md-6 col-sm-6 col-xs-6 pr-5">
                                <DatePicker
                                    id="startDate"
                                    selected={this.state.startDate}
                                    onChange={this.handleChange} placeholderText="from" />
                            </div>
                            <div className="col-md-6 col-sm-6 col-xs-6 pl-5">

                                <DatePicker
                                    id="endDate"
                                    selected={this.state.endDate}
                                    onChange={this.handleChange1} placeholderText="to"/>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        else{
            return (<div></div>)
        }
    }

}
export default ShippedDateFilter;
