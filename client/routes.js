import React from 'react';
import { Route , IndexRoute } from 'react-router';
import LoginPage from './containers/Login/LoginPage';
import ForgotPasswordPage from './containers/ForgotPassword/ForgotPasswordPage';
import PackagingInstructionEditPage from './containers/Packaging/PackagingInstructionEdit/PackagingInstructionEditPage';
import ConfirmPackagingInstructionPage from './containers/Packaging/ConfirmPackagingInstruction/ConfirmPackagingInstructionPage';
import InventoryCardPage from './containers/Packaging/InventoryCard/InventoryCardPage';
import InventoryEditPage from './containers/Packaging/InventoryEdit/InventoryEditPage';
import RailcarArrivalEntryPage from './containers/Packaging/RailcarArrivalEntry/RailcarArrivalEntryPage';
import RailcarDepartureEntryPage from './containers/Packaging/RailcarDepartureEntry/RailcarDepartureEntryPage';
import PackagingInstructionQueueViewPage from './containers/Packaging/PackagingInstructionQueueView/PackagingInstructionQueueViewPage';
import PackagingInstructionViewPage from './containers/Packaging/PackagingInstructionView/PackagingInstructionViewPage';
import EnterPackagingInstructionPage from './containers/Packaging/EnterPackagingInstruction/EnterPackagingInstructionPage';
import ShipmentArrivalEntryPage from './containers/Shipment/ShipmentArrivalEntry/ShipmentArrivalEntryPage';
import ShipmentEntryPage from './containers/Shipment/ShipmentEntry/ShipmentEntryPage';
import ShipmentViewPage from './containers/Shipment/ShipmentView/ShipmentViewPage';
import ShipmentDetailsPage from './containers/Shipment/ShipmentDetails/ShipmentDetailsPage';
import ShipmentDetailsEditPage from './containers/Shipment/ShipmentDetailsEdit/ShipmentDetailsEditPage';
import ShipmentConfirmationPage from './containers/Shipment/ShipmentConfirmation/ShipmentConfirmationPage';
import ShipmentEditPage from './containers/Shipment/ShipmentEdit/ShipmentEditPage';
import AdminLoginPage from './containers/Admin/AdminLogin/AdminLoginPage';
import CreateUserPage from './containers/Admin/CreateUser/CreateUserPage';
import ModifyUserPage from './containers/Admin/ModifyUser/ModifyUserPage'; 
 export default (
	<Route path="/">
	<IndexRoute name="Home" component={LoginPage}/>
	<Route path="forgotpass" name="Forgot Password" component={ForgotPasswordPage} />
	<Route path="packageedit" name="Package Edit" component={PackagingInstructionEditPage} />
	<Route name="Confirm Packaging Instruction"  path="confirmpckginst" component={ConfirmPackagingInstructionPage} />
	<Route path="inventorycard" name="Inventory Card" component={InventoryCardPage} />
	<Route path="inventoryedit" name="Inventory Edit" component={InventoryEditPage} />
	<Route path="railcararrival" name="Railcar Arrival" component={RailcarArrivalEntryPage} />
	<Route path="railcardeparte" name="Railcar Departure" component={RailcarDepartureEntryPage} />
	<Route path="packaginginstqueue" name="Packaging Queue View" component={PackagingInstructionQueueViewPage} />
	<Route path="packaginginstview" name="Packaging Instruction View" component={PackagingInstructionViewPage} />
	<Route path="enterpackginginst" name="Enter Package" name="Enter Package" component={EnterPackagingInstructionPage} />	
	<Route path="shipmententry" name="Shipment Entry" component={ShipmentEntryPage} />
	<Route path="shipmentarrive" name="Shipment Arrival" component={ShipmentArrivalEntryPage} />
	<Route path="shipmentview" name="Shipment View" component={ShipmentViewPage} />
	<Route path="shipmentdetails" name="Shipment Details" component={ShipmentDetailsPage} />
	<Route path="shipdetailsedit" name="Shipement Details Edit" component={ShipmentDetailsEditPage} />
	<Route path="shipmentconfirm" name="Shipment Confirm" component={ShipmentConfirmationPage} />
	<Route path="shipmentedit" name="Shipment Edit" component={ShipmentEditPage} />
	<Route path="adminlogin" name="Admin Login" component={AdminLoginPage} />
	<Route path="createusr" name="Create User" component={CreateUserPage} />
	<Route path="modifyusr" name="Modify User" component={ModifyUserPage} />
	</Route>
	)
