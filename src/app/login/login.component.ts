import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { timeout } from 'rxjs/operators';

import Swal from 'sweetalert2';
import { ShoppingService } from '../shopping.service';
import { LoginCustomer } from '../UI-Models/LoginCustomer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private shoppingService:ShoppingService,private route:Router) { }

  ngOnInit(): void {
    sessionStorage.setItem("isLoggedIn", "no");
    console.log(sessionStorage.getItem("isLoggedIn"));
  }
Customer:LoginCustomer={
  email:'',
  password:''
}

  submit(){
   if(this.Customer.email!="" || this.Customer.password!=""){
    console.log(this.Customer.email);
    this.shoppingService.checkLogin(this.Customer).subscribe(

      (successResponse)=>{
        console.log(successResponse);
        if(successResponse){
          
          console.log("succesfully Logged");
          
          console.log(sessionStorage.getItem("isLoggedIn"));
          sessionStorage.setItem("email",this.Customer.email);
          this.shoppingService.viewCustomer(this.Customer.email).subscribe(
            (successResponse)=>{
              console.log(successResponse);
              sessionStorage.setItem("custId", successResponse.id);
            }
          )
          sessionStorage.setItem("isLoggedIn", "yes");
          this.route.navigateByUrl("");
          /*Swal.fire("Good Job!!","Successfully Logged","success").then(
            ()=>{
              setTimeout(() => {
                sessionStorage.setItem("isLoggedIn", "yes");
                console.log("home---");
                
              }, 1000);
            }
          )*/
          
        }
         
        else{
          console.log("Login Failed");
          Swal.fire("","Login Failed","error");
         
        }
      }

    );
  }

}
}
