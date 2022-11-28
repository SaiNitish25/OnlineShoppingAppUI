import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Orders } from '../API-Models/orders';
import { Products } from '../API-Models/products';
import { ShoppingService } from '../shopping.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  prodId:string|null|undefined;
  custId:string|null|undefined;
  product:Products={
    id: '',
    productName: '',
    productDescription: '',
    productStatus: '',
    price: 0,
    features: '',
    
  };
  ord:Orders={
    customerId:'',
    productId:'',
    email:'',
    productName:''
  }
  email: string | null|undefined;

  constructor(private route:Router,private router:ActivatedRoute,private shoppingService:ShoppingService) { }

  ngOnInit(): void {
    this.router.paramMap.subscribe(
      (params)=>{
        this.prodId=params.get('id');
        if(this.prodId){
          this.shoppingService.viewProduct(this.prodId).subscribe(

            (successResponse=>{
              console.log(successResponse);
              this.product=successResponse;
            })
          )
          }

        

      }
    )
    
  }
  logout(){

    sessionStorage.setItem("isLoggedIn", "no");
    console.log(sessionStorage.getItem("isLoggedIn"));
    this.route.navigateByUrl("/login");
    sessionStorage.removeItem("custId");
  }

  order(){
    this.custId=sessionStorage.getItem("custId");
    this.email=sessionStorage.getItem("email");
    if(this.custId && this.prodId &&this.email){
      this.ord.customerId=this.custId;
      this.ord.email=this.email;
      
      this.ord.productId=this.prodId;
      this.ord.productName=this.product.productName;
      this.shoppingService.orderProduct(this.ord).subscribe(
        (successResponse)=>{
          
          if(successResponse){
            Swal.fire("Hey Hey","Order Placed","success").then(
              ()=>{
                setTimeout(()=>{
                  this.route.navigateByUrl('');
                },2000)
              }
            )

          }
          else{
            Swal.fire("Better Luck Next Time","Out Of stock","error").then(
              ()=>{
                setTimeout(()=>{
                  this.route.navigateByUrl('');
                },2000)
              }
            )
          }
        }
        
      )
    }
        
  }

}
