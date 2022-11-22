import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from '../AuthService/service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  loginArray=this.validation.group({
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd:['',[Validators.required,Validators.maxLength(10),Validators.minLength(3)]]
  })
  constructor(private route:Router,private validation:FormBuilder,private mongoDB:ServiceService) { }

  ngOnInit(): void {
  }
  register(){
    this.route.navigateByUrl('register')
  }
  login(){
    var acno:any=this.loginArray.value.acno
    var pswd:any=this.loginArray.value.pswd

    if(this.loginArray.valid){
      this.mongoDB.login(acno,pswd)
      .subscribe((result:any)=>{
        if(result){
          localStorage.setItem('CustomerName',JSON.stringify(result.currentName))
          localStorage.setItem('Token',JSON.stringify(result.token))
          localStorage.setItem('AccountNumber',JSON.stringify(result.acno))
          localStorage.setItem('balance',JSON.stringify(result.balance))
          localStorage.setItem('creditCardBalance',JSON.stringify(result.CreditCardBalance))
          alert('Login successfull')
          this.route.navigateByUrl('home')
        }
      },(result)=>{
        alert(result.error.message)
      })

    }
    else{
      alert('Account number or Password not in the valid form.')
    }
  }

}
