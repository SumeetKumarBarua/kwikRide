import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import { MustMatch } from './helpers/helper';
import { RegisteruserService } from '../registeruser.service';
import { User } from '../model/user';


@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {
   registerForm:   FormGroup;
   submitted= false;
   errorMsg:boolean;
   successMsg:boolean;
   private url = 
     'http://localhost:3000/users';
  user: {};
  constructor(private formBuilder: FormBuilder,private regService: RegisteruserService) { }
  
  get f() { return this.registerForm.controls; }
  onReset() {
    this.submitted = false;
    this.registerForm.reset();
}
 
  send(){
    let user={};
    for(let i in this.registerForm.controls){
     if(i!=="retypePassword"){
      user[i] =this.registerForm.controls[i].value;
     }
    }
      
    user['id']=Math.random();
    
      this.regService
        .createService(this.url, (user))
        .then(result => {console.log(result);this.successMsg =true;this.errorMsg=false;})
        .catch(error => {console.log(error);this.errorMsg=true;this.successMsg =false;});
  
  }
  ngOnInit() {
    this.registerForm =  this.formBuilder.group({
      fullName: ["",Validators.required],
      email:["",[Validators.required, Validators.email]],
      mobile:["",[Validators.required, Validators.pattern(/[0-9]{10}/)]]
      , password:["",[Validators.required, Validators.minLength(6)]],
      retypePassword:["",Validators.required],
      carModel: ["",Validators.required,],

    }, {
      validator: MustMatch('password', 'retypePassword')
  });
  }

}
