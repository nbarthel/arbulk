import React from  'react';
import axois from 'axios'
import { Base_Url} from '../../../constants'

class RailCarFilterPage extends React.Component {

    constructor(){
        super()
        this.showAll = this.showAll.bind(this);
        this.state = {
            show : false
        }
    }

    componentDidMount() {
        debugger;
        axois.get(Base_Url+"TPackagingInstructionLots/getrailCarList").then((response) => {
            this.setState({
                railList: response.data
            })
        })
            .catch(function(err){
                console.log(err)
            })


    }

    showAll(){
        debugger;
        this.state.show = true;
        this.expandList =
            _.map(this.state.railList , (view) =>{
                return(
                    <li id="railcarSearch" onClick = {this.props.onClickli}  value = {view.railcarList}>{view.railcarList}</li>
                )
            })

        this.forceUpdate()

    }




    render() {
        return (

            <div className="">
                <hr/>
                    <div className="head_bg">
                        <h6 className="pull-left text_left">RAIL CAR#  </h6>
                        <a href="javascript:void(0)" className="pull-right text_right"  onClick={this.showAll}> Show All</a>
                    </div>

                    <div className="">
                        <div className="left-inner-addon ">
                            <i className="fa fa-search" aria-hidden="true"></i>
                            <input type="search"className="form-control" id="railcarSearch"  onChange = {this.props.onTextChange}  placeholder="Search" />
                            <ul className = "scroll list-hover">
                            { this.state.show== true? this.expandList : ''}
                            </ul>
                        </div>
                    </div>
                </div>

        );
    }
}
export default RailCarFilterPage;