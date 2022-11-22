import { Component } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from '../AuthService/service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerArray=this.validation.group({
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd:['',[Validators.required,Validators.maxLength(10),Validators.minLength(3)]],
    uname:['',[Validators.required,Validators.pattern('[a-zA-Z]*')]]
  })

  constructor(private route:Router, private validation:FormBuilder, private service:ServiceService) { }

  ngOnInit(): void {
  }

  register(){
    var acno:any=this.registerArray.value.acno
    var pswd:any=this.registerArray.value.pswd
    var uname:any=this.registerArray.value.uname

    if(this.registerArray.valid){
      this.service.register(acno,pswd,uname)
      .subscribe((result:any)=>{
        if(result){
          alert('Registered Successfully')
          this.route.navigateByUrl('')
        }
      },(result)=>{
        alert(result.error.message)
      })
    }else{
      alert('Entered details not in a valid form')
    }
  }
}
