import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ShoppingService } from '../shopping.service';
import { ForgotPassword } from '../UI-Models/forgotPassword';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPassword:ForgotPassword={
    email:'',
    password:'',
    confirmPassword:''

  }

  constructor(private shopingService:ShoppingService,private route:Router) { }

  ngOnInit(): void {
  }

  forgot(){
    this.shopingService.forgotPassword(this.forgotPassword).subscribe(
      (successResponse)=>{
        console.log(successResponse);
        if(successResponse){
          Swal.fire("Thank you","Passord changed Successfully","success").then(
            ()=>{
              setTimeout(() => {
                this.route.navigateByUrl("/login");
              }, 1000);
            }
          )
        }
        else{
          Swal.fire("","Password doesn't updated","error");
        }
      }
    )
  }

}
