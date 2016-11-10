import React from  'react';
var DatePicker = require('react-datepicker');
var moment = require('moment');
require('react-datepicker/dist/react-datepicker.css');

class CutOffDateFilterPage extends React.Component {
constructor(){
    super()

    this.state = {
        startDate: '',
        endDate : ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChange1 = this.handleChange1.bind(this);

    };


    handleChange(date){
        this.setState({
            startDate: date,
        });

    }

    handleChange1(date){
        this.setState({
            endDate: date
        });

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
                        <div className="col-md-6 col-sm-6 col-xs-6">
                            <DatePicker
                                selected={this.state.startDate}
                                onChange={this.handleChange} placeholderText="from" />
                     </div>
                        <div className="col-md-6 col-sm-6 col-xs-6">

                            <DatePicker
                                selected={this.state.endDate}
                                onChange={this.handleChange1} placeholderText="to"/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}
export default CutOffDateFilterPage;