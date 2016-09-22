import React from  'react';

class LotSearchFilterPage extends React.Component {
    render() {
        return (

            <div className="">
                <hr/>
                    <div className="head_bg">
                        <h6 className="pull-left text_left">LOT#  </h6>
                        <a href=""   className="pull-right text_right"> Show All</a>
                    </div>
                    <div className="">
                        <div className="left-inner-addon ">
                            <i className="fa fa-search" aria-hidden="true"></i>
                            <input type="search" id="LotSearch" onChange = {this.props.onTextChange}  className="form-control" placeholder="Search" />
                        </div>
                    </div>
                </div>




        );
    }
}
export default LotSearchFilterPage;