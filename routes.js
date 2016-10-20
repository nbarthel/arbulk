import React from 'react';
import { Route , IndexRoute } from 'react-router';

const errorLoading = (err) => {
	console.error('Page Loading Failed',err)
}

const loadModule = (cb) => (componentModule) => {
	cb(null,componentModule.default)
}

export default function createRoutes(store) {

	return [{
		path: '/',
		name: 'Home',
		getComponent(nextState, cb){
			System.import('./containers/Login/LoginPage')
			.then(loadModule(cb))
			.catch(errorLoading)
		}
	},
	{
		path: '/Packaging/enterpackginginst/(:id)',
		name: 'Enter Packaging Instruction ',
		getComponent(nextState, cb){
			System.import('./containers/Packaging/EnterPackagingInstruction/EnterPackagingInstructionPage')
			.then(loadModule(cb))
			.catch(errorLoading)
		}

	},
	{
		path: '/Packaging/packaginginstview/(:id)',
		name: 'Packaging Instruction View',
		getComponent(nextState, cb){
			System.import('./containers/Packaging/PackagingInstructionView/PackagingInstructionViewPage')
			.then(loadModule(cb))
			.catch(errorLoading)
		}
	},
	{
		path: '/Packaging/railcararrival',
		name: 'Railcar Arrival',
		getComponent(nextState, cb){
			System.import('./containers/Packaging/RailcarArrivalEntry/RailcarArrivalEntryPage')
			.then(loadModule(cb))
			.catch(errorLoading)
		}
	},
	{
		path: '/Packaging/railcardeparte',
		name: 'Railcar Departure',
		getComponent(nextState, cb){
			System.import('./containers/Packaging/RailcarDepartureEntry/RailcarDepartureEntryPage')
			.then(loadModule(cb))
			.catch(errorLoading)
		}
	},
	{
		path: '/Packaging/packaginginstqueue',
		name: 'Packaging Queue View',
		getComponent(nextState, cb){
			System.import('./containers/Packaging/PackagingInstructionQueueView/PackagingInstructionQueueViewPage')
			.then(loadModule(cb))
			.catch(errorLoading)
		}
	},
	{
		path: '/Shipment/shipmententry',
		name: 'Shipment Entry',
		getComponent(nextState, cb){
			System.import('./containers/Shipment/ShipmentEntry/ShipmentEntryPage')
			.then(loadModule(cb))
			.catch(errorLoading)
		}
	},
	{
		path: '/Shipment/shipmentview',
		name: 'Shipment View',
		getComponent(nextState, cb){
			System.import('./containers/Shipment/ShipmentView/ShipmentViewPage')
			.then(loadModule(cb))
			.catch(errorLoading)
		}
	},
	{
		path: '/Container/containerarrivalentry',
		name: 'Container Arrival Entry',
		getComponent(nextState, cb){
			System.import('./containers/containers/ContainerArrivalEntry/ContainerArrivalEntryPage')
			.then(loadModule(cb))
			.catch(errorLoading)
		}
	},
	{
		path: '/Container/containerview',
		name: 'Container View Page',
		getComponent(nextState, cb){
			System.import('./containers/containers/ContainerView/ContainerViewPage')
			.then(loadModule(cb))
			.catch(errorLoading)
		}
	},
	{
		path: '/Container/containerdetails',
		name: 'Container Details Page',
		getComponent(nextState, cb){
			System.import('./containers/containers/ContainerDetails/ContainerDetailsPage')
			.then(loadModule(cb))
			.catch(errorLoading)
		}
	},
	{
		path: '/Container/containereditloadorder',
		name: 'Container Edit Load Order Page',
		getComponent(nextState, cb){
			System.import('./containers/containers/ContainerEditLoadOrder/ContainerEditLoadOrderPage')
			.then(loadModule(cb))
			.catch(errorLoading)
		}
	},
	{
		path: '/Conatainer/containerarrivaledit',
		name: 'Container Arrival Edit Page',
		getComponent(nextState, cb){
			System.import('./containers/containers/ContainerArrivalEdit/ContainerArrivalEditPage')
			.then(loadModule(cb))
			.catch(errorLoading)
		}
	},
	{
		path: '/Conatainer/containerqueueview',
		name: 'Container Queue View Page',
		getComponent(nextState, cb){
			System.import('./containers/containers/ContainerQueueView/ContainerQueueViewPage')
			.then(loadModule(cb))
			.catch(errorLoading)
		}
	},
	{
		path: '/Conatainer/containerqueueviewedit',
		name: 'Container Queue View Edit Page',
		getComponent(nextState, cb){
			System.import('./containers/containers/ContainerQueueViewEdit/ContainerQueueViewEditPage')
			.then(loadModule(cb))
			.catch(errorLoading)
		}
	},
	{
		path: '/Admin/adminlogin',
		name: 'Admin Login',
		getComponent(nextState, cb){
			System.import('./containers/Admin/AdminLogin/AdminLoginPage')
			.then(loadModule(cb))
			.catch(errorLoading)
		}
	},
	{
		path: '/Admin/createusr',
		name: 'Create User',
		getComponent(nextState, cb){
			System.import('./containers/Admin/CreateUser/CreateUserPage')
			.then(loadModule(cb))
			.catch(errorLoading)
		}
	},
	{
		path: '/Packaging/inventorycard/(:id)/(:cID)',
		name: 'Inventory Card',
		getComponent(nextState, cb){
			System.import('./containers/Packaging/InventoryCard/InventoryCardPage')
			.then(loadModule(cb))
			.catch(errorLoading)
		}
	},
	{
		path: '/Packaging/confirmpckginst/(:id)',
		name: 'Confirm Packaging',
		getComponent(nextState, cb){
			System.import('./containers/Packaging/ConfirmPackagingInstruction/ConfirmPackagingInstructionPage')
			.then(loadModule(cb))
			.catch(errorLoading)
		}
	},
	{
		path: '/forgotpass',
		name: 'Forgot Password',
		getComponent(nextState, cb){
			System.import('./containers/ForgotPassword/ForgotPasswordPage')
			.then(loadModule(cb))
			.catch(errorLoading)
		}
	},

	];

}