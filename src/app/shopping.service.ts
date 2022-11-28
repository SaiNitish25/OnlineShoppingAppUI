import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customers } from './API-Models/Customers';
import { Orders } from './API-Models/orders';
import { Products } from './API-Models/products';
import { addProduct } from './UI-Models/addProduct';
import { ForgotPassword } from './UI-Models/forgotPassword';
import { LoginCustomer } from './UI-Models/LoginCustomer';
import { NewCustomer } from './UI-Models/newCustomer';
import { ViewOrders } from './UI-Models/viewOrders';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {
  private baseApiUrl="https://onlineshoppingappapi.azurewebsites.net/Shopping/";
  constructor(private httpclient:HttpClient) {
   }

   checkLogin(cust:LoginCustomer):Observable<string>{
     return this.httpclient.post<string>(this.baseApiUrl+'login',cust)
   }

   viewAllProducts():Observable<Products[]>{
     return this.httpclient.get<Products[]>(this.baseApiUrl+'all')
   }

   viewProduct(id:string):Observable<Products>{
    return this.httpclient.get<Products>(this.baseApiUrl+'product/'+id);
   }

   viewCustomer(email:string):Observable<Customers>{
    return this.httpclient.get<Customers>(this.baseApiUrl+'customer/'+email);
   }

   orderProduct(order:Orders):Observable<boolean>{
     return this.httpclient.post<boolean>(this.baseApiUrl+'orderProduct',order);
   }
   register(newCust:NewCustomer):Observable<boolean>{
    return this.httpclient.post<boolean>(this.baseApiUrl+'register',newCust);

   }
   forgotPassword(forgotPassword:ForgotPassword):Observable<boolean>{
    return this.httpclient.put<boolean>(this.baseApiUrl+'forgotPassword',forgotPassword);
   }
   checkAdmin(id:string):Observable<boolean>{
    return this.httpclient.get<boolean>(this.baseApiUrl+'checkAdmin/'+id);
   }
   addProduct(prod:addProduct):Observable<boolean>{
     return this.httpclient.post<boolean>(this.baseApiUrl+'add',prod);
   }
   updateProdStat(id:string,cid:string):Observable<boolean>{
      return this.httpclient.put<boolean>(this.baseApiUrl+'update/'+id+"/"+cid,'');
   }
   deleteProd(id:string,cid:string):Observable<boolean>{
    return this.httpclient.delete<boolean>(this.baseApiUrl+'delete/'+id+"/"+cid);
 }
    viewOrders(id:string):Observable<ViewOrders[]>{
      return this.httpclient.get<ViewOrders[]>(this.baseApiUrl+'orders/'+id);
    }
   
}