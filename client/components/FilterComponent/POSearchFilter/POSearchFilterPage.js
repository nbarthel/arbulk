import React from  'react';
import axois from 'axios'
import { Base_Url} from '../../../constants'

class POSearchFilterPage extends React.Component {
    constructor(props){
        super(props);
        this.showAll = this.showAll.bind(this);
        this.state = {
            show : false
        }
    }

    componentDidMount() {
        axois.get(Base_Url+"TPackagingInstructions/getPoList").then((response) => {
            this.setState({
                polList: response.data
            })
        })
            .catch(function(err){
                console.log(err)
            })
}

    showAll(){
        this.state.show = true;
        this.expandList =
            _.map(this.state.polList , (view) =>{
                return(
                    <li id="POSearch" onClick = {this.props.onClickPo}  value = {view.poNumber}>{view.poNumber}</li>
                )
            })

        this.forceUpdate()

    }




    render() {
        return (
            <div className="">
                <hr/>
                    <div className="">
                        <div className="head_bg">
                            <h6 className="pull-left text_left">PO#  </h6>
                            <a href="javascript:void(0)" className="pull-right text_right"  onClick={this.showAll}> Show All</a>
                        </div>
                        <div className="">
                            <div className="left-inner-addon ">
                                <i className="fa fa-search" aria-hidden="true"></i>

                                <input type="search" id="POSearch"  onChange = {this.props.onTextChange} className="form-control" placeholder="Search" />
                                <ul className = "scroll list-hover">
                                    { this.state.show== true? this.expandList : ''}
                                </ul>
                            </div>
                        </div>


                    </div>
                </div>


        );
    }
}
export default POSearchFilterPage;