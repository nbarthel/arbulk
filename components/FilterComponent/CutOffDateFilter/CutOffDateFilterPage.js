import React from  'react';

class CutOffDateFilterPage extends React.Component {
    render() {
        return (
            <div className="">
                <hr/>
                    <div className="head_bg">
                        <h6 className="pull-left text_left">CUT OFF DATE </h6>
                        <a href=""   className="pull-right text_right"> Show All</a>
                    </div>

                    <div className="">
                        <div id="date" className="row">
                            <div className="col-md-6 col-sm-6 col-xs-6">

                                <input type="text" id="date" name="date" className="form-control pull-left "  placeholder="From"/>

                                </div>
                                <div className="col-md-6 col-sm-6 col-xs-6">

                                    <input type="text" className="form-control  "  id="date" name="date"  placeholder="To"/>
                                    </div>
                                </div>
                            </div>
                        </div>
        )
    }
}
export default CutOffDateFilterPage;