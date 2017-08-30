
        //  <RailCarFilterPage onClickli={this.props.onClickli}  onTextChange = {this.props.onTextChange} />
         
import React from 'react';
import CompanyNameFilterPage from './CompanyNameFilter/CompanyNameFilterPage';
import CustomerNameFilterPage from './CustomerNameFilter/CustomerNameFilterPage';
import POSearchFilterPage from './POSearchFilter/POSearchFilterPage';
import RailCarFilterPage from './RailCarFilter/RailCarFilterPage';
import LotSearchFilterPage from './LotSearchFilter/LotSearchFilterPage';
import CutOffDateFilterPage from './CutOffDateFilter/CutOffDateFilterPage';
import StatusFilterPage from './StatusFilter/StatusFilterPage';
import ShipmentTypeFilter from './ShipmentTypeFilter/ShipmentTypeFilter'
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
                <POSearchFilterPage selectedPO={this.props.selectedPO} onClickPo = {this.props.onClickPo}  onTextChange = {this.props.onTextChange}  />
                <LotSearchFilterPage selectedRelease = {this.props.selectedRelease} lotSearch = {this.props.lotSearch} onTextChange = {this.props.onTextChange}/>
                <ShipmentTypeFilter selectedshipType = {this.props.selectedshipType} ShipmentType={this.props.ShipmentType} />
                <CutOffDateFilterPage SelectedCutOffDate = {this.props.SelectedCutOffDate} startDate = {this.props.startDate} endDate = {this.props.endDate} handleChange = {this.props.handleChange} handleChange1 = {this.props.handleChange1}/>
                <StatusFilterPage statusSelected = {this.props.statusSelected} onStatusFilter = {this.props.onStatusFilter} />
            </div>
        </div>
              
        )
    }
}
export default FilterComponent;



