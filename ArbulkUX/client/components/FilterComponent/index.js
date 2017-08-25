import React from 'react';
import CompanyNameFilterPage from './CompanyNameFilter/CompanyNameFilterPage';
import CustomerNameFilterPage from './CustomerNameFilter/CustomerNameFilterPage';
import POSearchFilterPage from './POSearchFilter/POSearchFilterPage';
import RailCarFilterPage from './RailCarFilter/RailCarFilterPage';
import LotSearchFilterPage from './LotSearchFilter/LotSearchFilterPage';
import CutOffDateFilterPage from './CutOffDateFilter/CutOffDateFilterPage';
import StatusFilterPage from './StatusFilter/StatusFilterPage';
import RailcarArrival from './RailcarArrival/RailcarArrivalFilterPage'
import CreatedOndateFilter from './CreatedOnDateFilter/createdOnDateFilter'
import ShipmentReceivedFilter from './ShipmentRecievedFilter/shipmentRecievedFilter'

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
                <POSearchFilterPage onClickPo = {this.props.onClickPo}  onTextChange = {this.props.onTextChange}  />
                <RailCarFilterPage onClickli={this.props.onClickli}  onTextChange = {this.props.onTextChange} />
                <LotSearchFilterPage  lotSearch = {this.props.lotSearch} onTextChange = {this.props.onTextChange}/>
                <CutOffDateFilterPage startDate = {this.props.StartDate} endDate = {this.props.EndDate} getdt={this.props.getdt} parent={this.props.parent} />
                <StatusFilterPage statusSelected = {this.props.statusSelected} onStatusFilter = {this.props.onStatusFilter} parent={this.props.parent}/>
                <RailcarArrival railcarArrived={this.props.railcarArrived} onRailCarArrivalFilter = {this.props.onRailCarArrivalFilter} parent={this.props.parent}/>
                <CreatedOndateFilter getCreatedDate={this.props.getCreatedDate}/>
                <ShipmentReceivedFilter shipmentRecived={this.props.shipmentRecived}/>
            </div>
        </div>

        )
    }
}
export default FilterComponent;
