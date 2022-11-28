import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ShoppingService } from '../shopping.service';
import { addProduct } from '../UI-Models/addProduct';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  constructor(private shoppingService:ShoppingService,private route:Router) { }

  ngOnInit(): void {
  }
  custId:string|null|undefined;
  product:addProduct={
    customerId:'',
    productName:'',
    productDescription:'',
    features:'',
    price:0,
    productStatus:'',
    quantity:0
  }
  add(){
    
      this.custId=sessionStorage.getItem("custId");
    if(this.custId)
    this.product.customerId=this.custId;
    this.shoppingService.addProduct(this.product).subscribe(
      (successresponse)=>{
        console.log(successresponse);
        Swal.fire("Thank you Admin","Product Added Successfully","success").then(
          ()=>{
            setTimeout(() => {
              this.route.navigateByUrl('');
            }, 100);
          }
        )
      }
    )
  }

  logout(){

    sessionStorage.setItem("isLoggedIn", "no");
    console.log(sessionStorage.getItem("isLoggedIn"));
    this.route.navigateByUrl("/login");
  }

}
