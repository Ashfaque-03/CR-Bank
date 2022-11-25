import { style } from '@angular/animations';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../AuthService/service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  customerName: any
  accountNumber: any
  balance: any
  creditCardBalance: any
  deleteButton: boolean = false
  statusClass:any

  constructor(private route: Router, private service: ServiceService) {

    if (!localStorage.getItem('AccountNumber')) {
      alert('Please login again')
      this.route.navigateByUrl('')
    }

    this.customerName = JSON.parse(localStorage.getItem('CustomerName') || '')
    this.accountNumber = JSON.parse(localStorage.getItem('AccountNumber') || '')
    this.balance = JSON.parse(localStorage.getItem('balance') || '')
    this.creditCardBalance = JSON.parse(localStorage.getItem('creditCardBalance') || '')

  }
  ngOnInit(): void { }

  log_out() {
    localStorage.removeItem('AccountNumber')
    localStorage.removeItem('Token')
    localStorage.removeItem('CustomerName')
    localStorage.removeItem('creditCardBalance')
    localStorage.removeItem('balance')
    this.route.navigateByUrl('')
  }
  delete_Account() {
    this.statusClass='deactive'
    this.deleteButton = true

  }
  yes_button() {
    var acno = JSON.parse(localStorage.getItem('AccountNumber') || '')
    this.service.deleteYes(acno)
      .subscribe((result: any) => {
        if (result) {
          localStorage.removeItem('AccountNumber')
          localStorage.removeItem('Token')
          localStorage.removeItem('CustomerName')
          localStorage.removeItem('creditCardBalance')
          localStorage.removeItem('balance')
          alert(result.message)
          this.route.navigateByUrl('')
        }
      }, (result) => {
        alert(result.error.message)
      })


  }
  no_button() {
    this.statusClass=''
    this.deleteButton = false
  }

}
