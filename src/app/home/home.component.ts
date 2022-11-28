import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Products } from '../API-Models/products';
import { ShoppingService } from '../shopping.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  productName:string='';
products:Products[]=[];
custId:string|null|undefined;
isAdmin:boolean=false;
filterString='';
dataSource:MatTableDataSource<Products>=new MatTableDataSource<Products>();
displayedColumns: string[] = ['productName','price','view','edit','delete'];
  constructor(private route:Router,private shoppingService:ShoppingService) { }

  ngOnInit(): void {
    
this.shoppingService.viewAllProducts().subscribe(
  (successResponse)=>{
    
    this.products=successResponse;
    console.log(this.products);
    this.dataSource=new MatTableDataSource<Products>(this.products);
    this.custId=sessionStorage.getItem("custId");
    console.log("Admin"+this.isAdmin);
    if(this.custId){
      this.shoppingService.checkAdmin(this.custId).subscribe(
        (successResponse)=>{
          console.log(successResponse);
          if(successResponse){
            sessionStorage.setItem("isAdmin","yes");
            this.isAdmin=true;
          }
              
          else{
            sessionStorage.setItem("isAdmin","no");
            this.isAdmin=false;
          }
          

        }
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

  addProduct(){
    this.route.navigateByUrl('/add');
  }
  orders(){
    this.route.navigateByUrl('/orders');
  }

 updProdStat(id:string){
   console.log(id);
   if(this.custId){
    this.shoppingService.updateProdStat(id,this.custId).subscribe(
    (successResponse)=>{
      if(successResponse)
      Swal.fire("Hello Admin","Product Status Updated","success").then(
        ()=>{
          setTimeout(()=>{
            this.route.navigateByUrl('');
          },2000)
        }
      )
    }
    )
   }

     //this.shoppingService.updateProdStat(id,this.custId)

 }
 delete(id:string){
  if(confirm("Are you sure you want to delete?")&&this.custId){
    this.shoppingService.deleteProd(id,this.custId).subscribe(
      (successResponse)=>{
        if(successResponse)
        Swal.fire("Hello Admin","Product Deleted","success").then(
          ()=>{
            setTimeout(()=>{
              this.route.navigateByUrl("");
            },500)
          }
        )
      }
    )
  }
 }

 

}
