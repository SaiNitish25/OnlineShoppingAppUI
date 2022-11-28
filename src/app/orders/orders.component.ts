import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Orders } from '../API-Models/orders';
import { ShoppingService } from '../shopping.service';
import { ViewOrders } from '../UI-Models/viewOrders';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
custId:string|null|undefined;
  constructor(private shoppingService:ShoppingService,private route:Router) { }
  order:ViewOrders[]=[]

  ngOnInit(): void {
    this.custId=sessionStorage.getItem("custId");
    if(this.custId)
    this.shoppingService.viewOrders(this.custId).subscribe(
      (successResponse)=>{
          this.order=successResponse;
      }
    )
  }
  
  logout(){
    sessionStorage.setItem("isLoggedIn", "no");
    console.log(sessionStorage.getItem("isLoggedIn"));
    this.route.navigateByUrl("/login");
    sessionStorage.removeItem("custId");
  }


}
