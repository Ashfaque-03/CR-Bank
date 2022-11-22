import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

const options={
  headers:new HttpHeaders
}


@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http:HttpClient) { }

  toHttpheader(){
    var token=JSON.parse(localStorage.getItem('Token')||'')
    console.log(token)
    let headers=new HttpHeaders()
    if(token){
      headers=headers.append('encrypted-token',token)
      options.headers=headers
    }
    return options
  }

  register(acno:any,pswd:any,uname:any){
    const data={
      "acno":acno,
      "pswd":pswd,
      "uname":uname
    }
    return this.http.post('http://localhost:3000/register',data)
  }

  login(acno:any,pswd:any){
    const data={
      "acno":acno,
      "pswd":pswd
    }
    return this.http.post('http://localhost:3000/login',data)
  }

  deposit(acno:any,pswd:any,amount:any){
    const data={
      "acno":acno,
      "pswd":pswd,
      "amount":amount
    }
    return this.http.post('http://localhost:3000/deposit',data,this.toHttpheader())
  }

  withdraw(acno:any,pswd:any,amount:any){
    const data={
      "acno":acno,
      "pswd":pswd,
      "amount":amount
    }
    return this.http.post('http://localhost:3000/withdraw',data,this.toHttpheader())
  }

  creditCard(acno:any, pswd:any, UID:any, Pan:any){
    const data={
      "acno":acno,
      "pswd":pswd,
      "UID":UID,
      "Pan":Pan
    }
    return this.http.post('http://localhost:3000/creditCard',data,this.toHttpheader())
  }
  
}
