import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from '../AuthService/service.service';
import { HttpClient,HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent {

  depositArray = this.validation.group({
    amount: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    pswd: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]]
  })

  withdrawArray = this.validation.group({
    amount: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    pswd: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]]
  })

  creditCardArray = this.validation.group({
    UID: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    Pan: ['', [Validators.required, Validators.minLength(4)]],
    pswd: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]]
  })

  dummyarray:any=[]

  constructor(private validation: FormBuilder, private service: ServiceService,private route:Router,private http:HttpClient) {
    var acno=JSON.parse(localStorage.getItem('AccountNumber')||'')
    this.http.post('http://localhost:3000/transaction',{"acno":acno})
    .subscribe((result:any)=>{
      console.log(result)
      this.dummyarray=result.Transaction
    })
   }

  ngOnInit(): void {

  }

  // scrolling
  depositScroll() {
    window.scrollTo(0, 700);
  }
  withdrawScroll() {
    window.scrollTo(0, 1400);
  }
  creditCardScroll() {
    window.scrollBy(0, 2100);
  }
  transactionHistory() {
    window.scrollBy(0, 2800);
  }

  //  Deposit
  deposit() {
    var amount: any = this.depositArray.value.amount
    var pswd: any = this.depositArray.value.pswd
    var acno: any = JSON.parse(localStorage.getItem('AccountNumber') || '')

    if (this.depositArray.valid) {
      this.service.deposit(acno, pswd, amount)
        .subscribe((result: any) => {
          if (result) {
            localStorage.setItem('balance', JSON.stringify(result.balance))
            // localStorage.setItem('transactionHistory', JSON.stringify(result.Transaction))
            alert(result.message)
            window.location.reload();
            
            
          }
        }, (result) => {
          alert(result.error.message)
        })
    } else {
      alert('Your entered details are not in a valid form')
    }
  }

  // withdraw
  withdraw() {
    var acno: any = JSON.parse(localStorage.getItem('AccountNumber') || '')
    var pswd: any = this.withdrawArray.value.pswd
    var amount: any = this.withdrawArray.value.amount

    if (this.withdrawArray.valid) {
      this.service.withdraw(acno, pswd, amount)
        .subscribe((result: any) => {
          if (result) {
            console.log(result)
            localStorage.setItem('balance', JSON.stringify(result.balance))
            // localStorage.setItem('transactionHistory', JSON.stringify(result.Transaction))
            alert(result.message)
            window.location.reload();
            
            
          }
        }, (result) => {
          alert(result.error.message)
        })
    } else {
      alert('Your entered details are not in a valid form')
    }
  }

  // credit card
  creditCard() {
    var UID: any = this.creditCardArray.value.UID
    var Pan: any = this.creditCardArray.value.Pan
    var pswd: any = this.creditCardArray.value.pswd
    var acno: any = JSON.parse(localStorage.getItem('AccountNumber') || '')

    if (this.creditCardArray.valid) {
      this.service.creditCard(acno, pswd, UID, Pan)
        .subscribe((result: any) => {
          localStorage.setItem('creditCardBalance',JSON.stringify(result.CreditCardBalance))
          alert(result.message)
        }, (result) => {
          alert(result.error.message)
        })

    } else {
      alert('Your entered details are not in a valid form')
    }
  }

}
