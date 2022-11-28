import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ShoppingService } from '../shopping.service';
import { NewCustomer } from '../UI-Models/newCustomer';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  newCust:NewCustomer={
    firstName:'',
    lastName:'',
    password:'',
    confirmPassword:'',
    email:'',
    contactNumber:'',
  }
  constructor(private shoppingService:ShoppingService,private route:Router) { }

  ngOnInit(): void {
  }

  register(){
    if(this.newCust!=null){
      console.log("hi");
    this.shoppingService.register(this.newCust).subscribe(
      (successResponse)=>{
        console.log(successResponse);
        if(successResponse){
          Swal.fire("Thank you","Registerd Successfully","success").then(
            ()=>{
              setTimeout(() => {
                
                this.route.navigateByUrl("/login");
              }, 1000);
            }
          )
        }
      }
    )

  }
}

}
