import React from  'react';
import axois from 'axios'
import { Base_Url} from '../../../constants'
import { createDataLoader } from 'react-loopback';

class RailCarFilterPage extends React.Component {

    constructor(){
        super()
        this.showAll = this.showAll.bind(this);
        this.state = {
            show : false
        }
        this.onKeyUp = this.onKeyUp.bind(this)
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


onKeyUp(e){
   debugger;
   var railArray = [];
    console.log(">>>>>>>>>>>>" , e.target.value)
     var PIview = createDataLoader(RailCarFilterPage, {
                        queries: [{
                            endpoint: 'TPackagingInstructions',
                            filter: {
                                include : ['TPackagingInstructionLots',{"relation": "TPackagingInstructions", "scope": {"include": ["TLocation"]}}]
                            }
                        }]
                    });
                    var base = 'TPackagingInstructionLots';

                    var railUrl = PIview._buildUrl(base, {
                        "where": {"railcar_number": {"like": "%" + e.target.value + "%"}}
                     }
                 
                               
              );
                   
if(e.target.value.length > 2){
    axois.get(railUrl).then((response) => {
        debugger;
            this.railResult = {
                railList: response.data
            }

           
            for(var i in this.railResult.railList){
               railArray.push(this.railResult.railList[i].railcar_number)
            }
            
     if(railArray.length >0){
           this.state.show = true;
          this.expandList =  _.map(railArray , (view) =>{
                 return(
                    <li id="railcarSearch" onClick = {this.props.onClickli}  value = {view}>{view}</li>
                )
            })

        this.forceUpdate()  
            }
        

        })
            .catch(function(err){
                console.log(err)
            })
}
else{
        railArray = [];
         this.state.show = false;
       this.forceUpdate() 
}
     
}



    showAll(){
        debugger;
         if(this.state.show == true){
           this.setState({
            show  : false
           })
           this.forceUpdate()
           return; 
        }
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
                        <a href="javascript:void(0)" className="pull-right text_right"  onClick={this.showAll}> {this.state.show ? "Hide All" : "Show All"}</a>
                    </div>

                    <div className="">
                        <div className="left-inner-addon ">
                            <i className="fa fa-search" aria-hidden="true"></i>
                            <input type="search"className="form-control" onKeyUp={this.onKeyUp}  id="railcarSearch"  onChange = {this.props.onTextChange}  placeholder="Search" />
                            <ul className = "list-hover">
                            { this.state.show== true? this.expandList : ''}
                            </ul>
                            <ul className="pddn-10-top">
                    <li>
                        <label className="control control--checkbox">Open Shipment
                          <input id="row1" type="checkbox"/><div className="control__indicator"></div>
                        </label>
                    </li>                   
               </ul>
                        </div>
                    </div>
                </div>

        );
    }
}
export default RailCarFilterPage;