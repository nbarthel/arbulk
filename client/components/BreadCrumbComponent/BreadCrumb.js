import React from 'react';
import routes from '../../routes';
//import BreadCrumbs from 'react-breadcrumbs';
export default class BreadCrumb extends React.Component {
    componentDidMount() {
        console.log("Routes",this.props);

    }

    render() {

        return (
            <section className="breadcrumb_bg">
                <div className="container">
                    <div id="row">
                        <strong>{this.props.routes[1].name.props.children[2]!="Enter Packaging Instruction" && this.props.routes[1].name.props.children[2]!= "Packaging Instruction View"?this.props.routes[1].name : (this.props.routes[1].name.props.children[2]=="Enter Packaging Instruction"?"Packaging >> Enter RailCars":"Packaging >> View RailCars")}</strong>
                    </div>
                </div>
            </section>
        );
    }
}
