import React from 'react';
import routes from '../../routes';
//import BreadCrumbs from 'react-breadcrumbs';
export default class BreadCrumb extends React.Component {
    constructor(props) {
        super(props);
        this.state = {selectedOption: 'lbs'}
    }
 componentDidMount() {
     console.log("Routes", this.props);

 }

    handleOptionChange() {
        var that = this;
        that.setState({
            selectedOption: 'lbs'
        })
        this.props.setWeight('lbs');
    }

    handleOptionChange1() {
        this.setState({
            selectedOption: 'kg'
        });
        this.props.setWeight('kg');
    }

   render() {

     return (
      <section className="breadcrumb_bg">
	    <div className="container">
             <div id="row">
                 <strong>{
                     this.props.routes[1].name.props.children[2] != "Enter Packaging Instruction" &&
                     this.props.routes[1].name.props.children[2] != "Packaging Instruction View" ?
                         this.props.routes[1].name :
                         (this.props.routes[1].name.props.children[2] == "Enter Packaging Instruction"
                                 ? "Packaging >> Enter RailCars" :
                                 "Packaging >> View RailCars"
                         )
                 }</strong>
            </div>
            {(this.props.routes[1].name.props.children[2] == "Railcar Arrival" ||this.props.routes[1].name.props.children[2] == "Enter Packaging Instruction")?
            <div>
                <div className="pull-right margin-30-right" id="hide2">
                    <label className="control control--radio ">LBS
                        <input
                            type="radio"

                            name="ADDCustomers1"

                            onChange={this.handleOptionChange.bind(this)}
                            checked={this.state.selectedOption==='lbs'}
                            />

                        <div className="control__indicator"></div>
                    </label>
                </div>
                <div className="pull-right margin-30-right" id="hide3">
                    <label className="control control--radio ">Kg
                        <input type="radio"

                               name="ADDCustomers1"

                               onChange={this.handleOptionChange1.bind(this)}
                               checked={this.state.selectedOption==='kg'}
                            />

                        <div className="control__indicator"></div>
                    </label>
                </div>
            </div>
            :""}
	    </div>
    </section>
    );
  }
}
