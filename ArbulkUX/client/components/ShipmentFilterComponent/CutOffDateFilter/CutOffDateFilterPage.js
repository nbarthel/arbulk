
import React from  'react';
var DatePicker = require('react-datepicker');
var moment = require('moment');
require('react-datepicker/dist/react-datepicker.css');

class CutOffDateFilterPage extends React.Component {
    /**/
    constructor(props){
        super(props)
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.SelectedCutOffDate && nextProps.SelectedCutOffDate.length>=2){

        }
    }
    render() {
        return (
            <div className="">
                <hr/>
                <div className="head_bg">
                    <h6 className="pull-left text_left">CUT OFF DATE </h6>
                </div>

                <div className="">
                    <div id="date" className="row">
                        <div className="col-md-6 col-sm-6 col-xs-6 pr-5">
                            <DatePicker
                                selected={this.props.startDate}
                                onChange={this.props.handleChange} placeholderText="from" />
                        </div>
                        <div className="col-md-6 col-sm-6 col-xs-6 pl-5">

                            <DatePicker
                                selected={this.props.endDate}
                                onChange={this.props.handleChange1} placeholderText="to"/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}
export default CutOffDateFilterPage;