import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  public username:string;
  public password: string;
  public loginForm: FormGroup;
  public allUsers:[];
  private errorMsg:boolean;
  private urls = [
    'http://localhost:3000/users'
  ];

  getAllUsers(){
    let requests = this.urls.map(url => fetch(url).then((res) => res.json()));
    console.log(requests);
    Promise.all(requests)
      .then(responses => {
          this.allUsers=responses[0];
          console.log(JSON.stringify(responses));
      });
  
  }

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.getAllUsers();
   
  }

  onLoginClick(){
    console.log(this.loginForm);
    if(this.loginForm.value.username.includes('@')){
      this.allUsers.forEach(obj=>{
        if(obj['email']=== this.loginForm.value.username && obj['password'] === this.loginForm.value.password){
          this.router.navigate(['bookride']);
        }
      })
    }else{
      this.allUsers.forEach(obj=>{
        if(obj['mobile']=== this.loginForm.value.username && obj['password'] === this.loginForm.value.password){
          this.router.navigate(['bookride']);
        }
      })
    }
    this.onReset();
    this.errorMsg=true;

  }

  onReset() {
    this.loginForm.reset();
}

  ngOnInit() {
    this.loginForm =  this.formBuilder.group({
      username: ["",Validators.required],
      password: ["",Validators.required]
    });
  }

}
