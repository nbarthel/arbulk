import React from  'react';
import axois from 'axios'
import { Base_Url} from '../../../constants'
import { createDataLoader } from 'react-loopback';

class LotSearchFilterPage extends React.Component {

    constructor(){
        super()
        this.showAll = this.showAll.bind(this);
        this.state = {
            show : false,
            lotValue:''
        }
         this.onKeyUp = this.onKeyUp.bind(this)
    }
    componentWillReceiveProps(nextProps){
         
        if(nextProps.selectedLot){
            this.setState({
                lotValue : nextProps.selectedLot["lot"]
            })
        }

    }
    componentDidMount() {
        axois.get(Base_Url+"TPackagingInstructionLots/getLotList").then((response) => {
            this.setState({
                lotLIst: response.data
            })
        })
            .catch(function(err){
                console.log(err)
            })
 }



onKeyUp(e){
   var lotArray = [];
    console.log(">>>>>>>>>>>>" , e.target.value)
     var PIview = createDataLoader(LotSearchFilterPage, {
                        queries: [{
                            endpoint: 'TPackagingInstructions',
                            filter: {
                                include : ['TPackagingInstructionLots',{"relation": "TPackagingInstructions", "scope": {"include": ["TLocation"]}}]
                            }
                        }]
                    });
                    var base = 'TPackagingInstructionLots';

                    var lotlUrl = PIview._buildUrl(base, {
                        "where": {"lot_number": {"like": "%" + e.target.value + "%"}}
                     }
                 
                               
              );
                   
if(e.target.value.length > 2){
    axois.get(lotlUrl).then((response) => {
        debugger;
            this.lotResult = {
                lotList: response.data
            }

           
            for(var i in this.lotResult.lotList){
               lotArray.push(this.lotResult.lotList[i].lot_number)
            }
            
     if(lotArray.length >0){
           this.state.show = true;
          this.expandList =  _.map(lotArray , (view) =>{
                 return(
                <li id="LotSearch" onClick = {this.props.lotSearch} value= {view}>{view}</li>
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
        lotArray = [];
         this.state.show = false;
       this.forceUpdate() 
}
     
}






    showAll(){
         if(this.state.show == true){
           this.setState({
            show  : false
           })
           this.forceUpdate()
           return; 
        }
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
                        <a href="javascript:void(0)" className="pull-right text_right"  onClick={this.showAll}> {this.state.show ? "Hide All" : "Show All"}</a>
                    </div>
                    <div className="">
                        <div className="left-inner-addon ">
                            <i className="fa fa-search" aria-hidden="true"></i>
                            <input type="search" onKeyUp={this.onKeyUp}  id="LotSearch" value = {this.state.lotValue} onChange = {this.props.onTextChange}  className="form-control" placeholder="Search" />
                            <ul className = "list-hover scrollshow">
                                  { this.state.show== true? this.expandList : ''}
                            </ul>

                        </div>
                    </div>
                </div>




        );
    }
}
export default LotSearchFilterPage;