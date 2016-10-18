import React from  'react';
import axois from 'axios'
import { Base_Url} from '../../../constants'

class LotSearchFilterPage extends React.Component {

    constructor(){
        super()
        this.showAll = this.showAll.bind(this);
        this.state = {
            show : false
        }
    }

    componentDidMount() {
        debugger;
        axois.get(Base_Url+"TPackagingInstructionLots/getLotList").then((response) => {
            this.setState({
                lotLIst: response.data
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
       _.map(this.state.lotLIst , (view) =>{
            return(
                <li id="LotSearch" onClick = {this.props.lotSearch} value= {view.lotNumber}>{view.lotNumber}</li>
            )
        })

        this.forceUpdate()

    }


    render() {

     return (

            <div className="">
                <hr/>
                    <div className="head_bg">
                        <h6 className="pull-left text_left">LOT#  </h6>
                        <a href="javascript:void(0)" className="pull-right text_right"  onClick={this.showAll}> Show All</a>
                    </div>
                    <div className="">
                        <div className="left-inner-addon ">
                            <i className="fa fa-search" aria-hidden="true"></i>
                            <input type="search" id="LotSearch" onChange = {this.props.onTextChange}  className="form-control" placeholder="Search" />
                            <ul className = "scroll list-hover">
                                  { this.state.show== true? this.expandList : ''}
                            </ul>

                        </div>
                    </div>
                </div>




        );
    }
}
export default LotSearchFilterPage;