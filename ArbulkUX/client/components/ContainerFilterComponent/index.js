import React from 'react';
import CompanyNameFilterPage from './CompanyNameFilter/CompanyNameFilterPage';
import CustomerNameFilterPage from './CustomerNameFilter/CustomerNameFilterPage';
import StatusFilterPage from './StatusFilter/StatusFilterPage';
import ContainerFilter from './ContainerFilter/ContainerFilter';
import TruckerFilter from './TruckerFilter/TruckerFilter'
import SteamshipLineFilter from './SteamshipLineFilter/SteamshipLineFilter'
import ContainerTypeFilter from './ContainerTypeFilter/ContainerTypeFilter'
import ArrivalFilter from './ArrivalFilter/ArrivalFilter'
//<TruckerFilter />
class FilterComponent extends React.Component {
	constructor(props){
		super(props);
		this.state = { }
	}
    render() {
        return (

        <div className="">
 			<div className="well filter_bg collapse navbar-collapse" id="filter-menu">
                <h4 className=" hidden-xs"> REFINE YOUR RESULT </h4>
                <CompanyNameFilterPage locationSelected = {this.props.locationSelected} onCompanyFilter = {this.props.onCompanyFilter}/>
                <CustomerNameFilterPage customerSelected = {this.props.customerSelected} onCustomerFilter = {this.props.onCustomerFilter} />
                <ContainerFilter selectedRelease = {this.props.selectedRelease} lotSearch = {this.props.lotSearch} onTextChange = {this.props.onTextChange}/>
                <ArrivalFilter selectedArrd = {this.props.selectedArrd} Arrival={this.props.Arrival}/>
                <SteamshipLineFilter selectedSteamShip = {this.props.selectedSteamShip} onSteamShipFilter={this.props.onSteamShipFilter} SteamLine ={this.props.SteamLine} />
                <ContainerTypeFilter selectedContainerType = {this.props.selectedContainerType} onContainerFilter = {this.props.onContainerFilter}/>
                <StatusFilterPage statusSelected = {this.props.statusSelected} onStatusFilter = {this.props.onStatusFilter}/>
            </div>
        </div>

        )
    }
}
export default FilterComponent;
