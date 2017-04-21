import React from  'react';
import axois from 'axios'
import { Base_Url} from '../../../constants'
import { createDataLoader } from 'react-loopback';

class POSearchFilterPage extends React.Component {
    constructor(props){
        super(props);
        this.showAll = this.showAll.bind(this);
        this.state = {
            show : false
        }
        this.onKeyUp = this.onKeyUp.bind(this)
    }

    componentDidMount() {
        axois.get(Base_Url+"TPackagingInstructions/getPoList").then((response) => {
            this.setState({
                polList: response.data
            })
        })
            .catch(function(err){
              //  console.log(err)
            })
}

onKeyUp(e){

 var poArray = [];
   // console.log(">>>>>>>>>>>>" , e.target.value)
     var PIview = createDataLoader(POSearchFilterPage, {
                        queries: [{
                            endpoint: 'TPackagingInstructions',
                            filter: {
                                include : ['TPackagingInstructionLots',{"relation": "TPackagingInstructions", "scope": {"include": ["TLocation"]}}]
                            }
                        }]
                    });
                    var base = 'TPackagingInstructions';

                    var poUrl = PIview._buildUrl(base, {
                            "where": {"po_number": {"like": "%" + e.target.value + "%"}}
                     }
                 
                               
              );
if(e.target.value.length > 2){
    axois.get(poUrl).then((response) => {
       
            this.poResult = {
                polList: response.data
            }

           
            for(var i in this.poResult.polList){
               poArray.push(this.poResult.polList[i].po_number)
            }
            
     if(poArray.length >0){
           this.state.show = true;
          this.expandList =  _.map(poArray , (view) =>{
                return(
                    <li id="POSearch" onClick = {this.props.onClickPo}  value = {view}>{view}</li>
                )
            })

        this.forceUpdate()  
            }
        

        })
            .catch(function(err){
              //  console.log(err)
            })
}
else{
        poArray = [];
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
                            <a href="javascript:void(0)" className="pull-right text_right"  onClick={this.showAll}> {this.state.show ? "Hide All" : "Show All"}</a>
                        </div>
                        <div className="">
                            <div className="left-inner-addon ">
                                <i className="fa fa-search" aria-hidden="true"></i>

                                <input type="search" id="POSearch" onKeyUp={this.onKeyUp}  onChange = {this.props.onTextChange} className="form-control" placeholder="Search" />
                                <ul className = "list-hover scrollshow">
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