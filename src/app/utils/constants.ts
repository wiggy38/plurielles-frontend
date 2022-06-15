import {HttpHeaders} from "@angular/common/http";

export const inProduction = false;
export const developmentUrl = 'http://localhost:8081';
export const productionUrl = 'https://plurielles-backend.herokuapp.com';
/*const token = localStorage.getItem('auth');
//const bearer = token ?? `Bearer ${JSON.parse(token!)['authToken']}`;
console.log(">>>> bearer "+token);
export const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token!== null? JSON.parse(token!!)['authToken'] : ''}`
    })
}*/
