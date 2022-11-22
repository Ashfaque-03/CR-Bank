import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  customerName:any
  accountNumber:any
  balance:any
  creditCardBalance:any
  deleteButton:boolean=false

  constructor(private route:Router){
    this.customerName=JSON.parse(localStorage.getItem('CustomerName')||'')
    this.accountNumber=JSON.parse(localStorage.getItem('AccountNumber')||'')
    this.balance=JSON.parse(localStorage.getItem('balance')||'')
    this.creditCardBalance=JSON.parse(localStorage.getItem('creditCardBalance')||'')
  }
  ngOnInit():void{ }

  log_out(){
    this.route.navigateByUrl('')
  }
  delete_Account(){
    this.deleteButton=true
  }
  yes_button(){
    
  }
  no_button(){
    this.deleteButton=false
  }

}
