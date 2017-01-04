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
		name: <span>Packaging<i className="fa fa-angle-double-right"/>Enter Packaging Instruction</span>,
		getComponent(nextState, cb){
			System.import('./containers/Packaging/EnterPackagingInstruction/EnterPackagingInstructionPage')
			.then(loadModule(cb))
			.catch(errorLoading)
		}

	},
	{
		path: '/Packaging/enterpackginginst/(:id)/(:lotId)',
		name: <span>Packaging<i className="fa fa-angle-double-right"/>Enter Packaging Instruction</span>,
		getComponent(nextState, cb){
			System.import('./containers/Packaging/EnterPackagingInstruction/EnterPackagingInstructionPage')
			.then(loadModule(cb))
			.catch(errorLoading)
		}

	},
	{
		path: '/Packaging/packaginginstview/(:id)',
		name: <span>Packaging<i className="fa fa-angle-double-right"/>Packaging Instruction View</span>,
		getComponent(nextState, cb){
			System.import('./containers/Packaging/PackagingInstructionView/PackagingInstructionViewPage')
			.then(loadModule(cb))
			.catch(errorLoading)
		}
	},
	{
		path: '/Packaging/railcararrival',
		name: <span>Packaging<i className="fa fa-angle-double-right"/>Railcar Arrival</span>,
		getComponent(nextState, cb){
			System.import('./containers/Packaging/RailcarArrivalEntry/RailcarArrivalEntryPage')
			.then(loadModule(cb))
			.catch(errorLoading)
		}
	},
	{
		path: '/Packaging/railcardeparte',
		name: <span>Packaging<i className="fa fa-angle-double-right"/>Railcar Departure</span>,
		getComponent(nextState, cb){
			System.import('./containers/Packaging/RailcarDepartureEntry/RailcarDepartureEntryPage')
			.then(loadModule(cb))
			.catch(errorLoading)
		}
	},
	{
		path: '/Packaging/packaginginstqueue',
		name: <span>Packaging<i className = "fa fa-angle-double-right"/>Packaging Queue View</span>,
		getComponent(nextState, cb){
			System.import('./containers/Packaging/PackagingInstructionQueueView/PackagingInstructionQueueViewPage')
			.then(loadModule(cb))
			.catch(errorLoading)
		}
	},
	{
		path: '/Shipment/shipmententry',
		name: <span>Shipment<i className="fa fa-angle-double-right"/>Shipment Entry</span>,
		getComponent(nextState, cb){
			System.import('./containers/Shipment/ShipmentEntry/ShipmentEntryPage')
			.then(loadModule(cb))
			.catch(errorLoading)
		}
	},
		{
			path: '/Shipment/shipmentPrint/(:id)',
			name: 'Form Print',
			getComponent(nextState, cb){
				System.import('./containers/Shipment/ShipmentPrint/ShipmentPrint')
					.then(loadModule(cb))
					.catch(errorLoading)
			}
		},
		{
			 path: '/Shipment/shipmentPrint/(:id)/(:contId)',
			 name: 'Form Print',
			 getComponent(nextState, cb){
				 System.import('./containers/Shipment/ShipmentPrint/ShipmentPrint')
					 .then(loadModule(cb))
					 .catch(errorLoading)
			 }
		 },



	{
		path: '/Shipment/shipmentview',
		name: <span>Shipment<i className="fa fa-angle-double-right"/>Shipment View</span>,
		getComponent(nextState, cb){
			System.import('./containers/Shipment/ShipmentView/ShipmentViewPage')
			.then(loadModule(cb))
			.catch(errorLoading)
		}
	},
	{
		path: '/Shipment/shipmentConfirmation/(:id)',
		name: <span>Shipment<i className = "fa fa-angle-double-right"/>Confirm Shipment</span>,
		getComponent(nextState,cb){
			System.import('./containers/Shipment/ShipmentConfirmation/ShipmentConfirmationPage')
			.then(loadModule(cb))
			.catch(errorLoading)
		}
	},
	{
		path:'/Shipment/shipmentedit/(:id)',
		name: <span>Shipment<i className="fa fa-angle-double-right"/>Edit Shipment</span>,
		getComponent(nextState,cb){
			System.import('./containers/Shipment/ShipmentEdit/ShipmentEditPage')
			.then(loadModule(cb))
			.catch(errorLoading)
		}
	},
	{
		path: '/Container/containerarrivalentry',
		name: <span>Container<i className="fa fa-angle-double-right"/>Container Arrival Entry</span>,
		getComponent(nextState, cb){
			System.import('./containers/containers/ContainerArrivalEntry/ContainerArrivalEntryPage')
			.then(loadModule(cb))
			.catch(errorLoading)
		}
	},
		{
			path: '/Container/containerarrivalentry/(:id)/(:id)',
			name: 'Container Arrival Entry',
			getComponent(nextState, cb){
				System.import('./containers/containers/ContainerArrivalEntry/ContainerArrivalEntryPage')
					.then(loadModule(cb))
					.catch(errorLoading)
			}
		},
	{
		path: '/Container/containerview',
		name: <span>Container<i className="fa fa-angle-double-right"/>Container View Page</span>,
		getComponent(nextState, cb){
			System.import('./containers/containers/ContainerView/ContainerViewPage')
			.then(loadModule(cb))
			.catch(errorLoading)
		}
	},
	{
		path: '/Container/containeredit/(:id)',
		name: <span>Container<i className="fa fa-angle-double-right"/>Container Edit</span>,
		getComponent(nextState,cb){
			System.import('./containers/containers/ContainerEdit/ContainerEditPage')
			.then(loadModule(cb))
			.catch(errorLoading)
		}
	},
	{
		path: '/Container/containeredit/(:id)/(:contId)',
		name: <span>Container<i className="fa fa-angle-double-right"/>Container Edit</span>,
		getComponent(nextState,cb){
			System.import('./containers/containers/ContainerEdit/ContainerEditPage')
			.then(loadModule(cb))
			.catch(errorLoading)
		}
	},
	{
		path: '/Conatainer/containerqueueview',
		name: <span>Container<i className="fa fa-angle-double-right"/>Container Queue View Page</span>,
		getComponent(nextState, cb){
			System.import('./containers/containers/ContainerQueueView/ContainerQueueViewPage')
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
		path: '/Admin/modifyUser',
		name: <span>Admin<i className="fa fa-angle-double-right"/>Modify User</span>,
		getComponent(nextState, cb){
			System.import('./containers/Admin/ModifyUser/ModifyUserPage')
			.then(loadModule(cb))
			.catch(errorLoading)
		}
	},
	{
		path: '/Admin/editUser/(:empId)',
		name: <span>Admin<i className="fa fa-angle-double-right"/>Edit User</span>,
		getComponent(nextState, cb){
			System.import('./containers/Admin/ModifyUser/EditUser')
			.then(loadModule(cb))
			.catch(errorLoading)
		}
	},
	{
		path: '/Admin/CustAndTruck',
		name: <span>Admin<i className="fa fa-angle-double-right"/>Customers And Truckers</span>,
		getComponent(nextState, cb){
			System.import('./containers/Admin/CustomersAndTruckers/CustomersAndTruckersPage')
			.then(loadModule(cb))
			.catch(errorLoading)
		}
	},
	{
		path: '/Admin/AddCustAndTruck',
		name: <span>Admin<i className="fa fa-angle-double-right"/>Add Customers And Truckers</span>,
		getComponent(nextState, cb){
			System.import('./containers/Admin/CustomersAndTruckers/AddCustomersAndTruckers')
			.then(loadModule(cb))
			.catch(errorLoading)
		}
	},
	{
		path: '/Admin/EditCustAndTruck/(:custId)',
		name: <span>Admin<i className="fa fa-angle-double-right"/>Edit Customers And Truckers</span>,
		getComponent(nextState, cb){
			System.import('./containers/Admin/EditCustomersAndTruckers/EditCustomersAndTruckersPage')
			.then(loadModule(cb))
			.catch(errorLoading)
		}
	},
	{
		path: '/Admin/createusr',
		name: <span>Admin<i className="fa fa-angle-double-right"/>Create User</span>,
		getComponent(nextState, cb){
			System.import('./containers/Admin/CreateUser/CreateUserPage')
			.then(loadModule(cb))
			.catch(errorLoading)
		}
	},
	{
		path: '/Admin/AddMaterial',
		name: <span>Admin<i className="fa fa-angle-double-right"/>Add Material</span>,
		getComponent(nextState, cb){
			System.import('./containers/Admin/AddMaterial/AddMaterialPage')
			.then(loadModule(cb))
			.catch(errorLoading)
		}
	},

	{
	  path: '/Admin/UploadData',
	  name: <span>Admin<i className="fa fa-angle-double-right"/>Upload Data</span>,
	  getComponent(nextState, cb){
	   System.import('./containers/Admin/UploadData/UploadDataPage')
	   .then(loadModule(cb))
	   .catch(errorLoading)
	  }
	 },
	{
		path: '/Packaging/inventorycard/(:id)/(:cID)',
		name: <span>Packaging<i className="fa fa-angle-double-right"/>Inventory Card</span>,
		getComponent(nextState, cb){
			System.import('./containers/Packaging/InventoryCard/InventoryCardPage')
			.then(loadModule(cb))
			.catch(errorLoading)
		}
	},
	{
		path: '/Packaging/confirmpckginst/(:id)',
		name: <span>Packaging<i className="fa fa-angle-double-right"/>Confirm Packaging</span>,
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
	{
            path: '/Packaging/packagingInstFormPrint/(:id)/(:cID)',
            name: 'Print Form',
            getComponent(nextState, cb){
                System.import('./containers/Packaging/PackagingInstructionView/PackagingInstructionFormPrint')
                    .then(loadModule(cb))
                    .catch(errorLoading)
            }
        },
        {
            path: '/Container/containerPrint/(:containerId)',
            name: 'Form Print',
            getComponent(nextState, cb){
                System.import('./containers/containers/ContainerPrint/ContainerPrint')
                    .then(loadModule(cb))
                    .catch(errorLoading)
            }
        },
        {
        	path: '/Shipment/shipmentDetails/(:id)',
        	name: <span>Shipment<i className="fa fa-angle-double-right"/>Shipment View Details</span>,
        	getComponent(nextState,cb){
        		System.import('./containers/Shipment/ShipmentDetails/ShipmentDetailsPage')
        		.then(loadModule(cb))
        		.catch(errorLoading)
        	}
        },
		{
			path: '/Shipment/shipmentDetails/(:id)/(:isDomestic)',
			name: <span>Shipment<i className="fa fa-angle-double-right"/>Shipment View Details</span>,
			getComponent(nextState,cb){
				System.import('./containers/Shipment/ShipmentDetails/ShipmentDetailsPage')
					.then(loadModule(cb))
					.catch(errorLoading)
			}
		},
        {
        	path:'/Conatainer/containerDetails/(:id)/(:isDomestic)',
        	name: <span>Container<i className="fa fa-angle-double-right"/>Container Edit Detail</span>,
        	getComponent(nextState,cb){
        		System.import('./containers/containers/ContainerDetails/ContainerDetailsPage')
        		.then(loadModule(cb))
        		.catch(errorLoading)
        	}

        },

	];

}
