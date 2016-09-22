import axios from 'axios';
export function getCustomerOptions(){
	//const url ="http://172.31.98.51:8080/api/TCompanies";
	return axios.get("http://172.31.98.51:8080/api/TCompanies");
	

}