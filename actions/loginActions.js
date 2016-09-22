import axios from 'axios';
export function userLoginRequest(userData){
	const url ="http://172.31.98.51:8080/api/TUsers/login";
	
	return dispatch => {
		return axios.post(url,userData);
	}
}