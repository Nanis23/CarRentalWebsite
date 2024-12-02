import { Component, NgModule } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './auth/components/signup/signup.component';
import { LoginComponent } from './auth/components/login/login.component';


import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { StorageService } from './auth/services/storage/storage.service';
import { Router } from '@angular/router';






@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    FormsModule, 
    ReactiveFormsModule,
    CommonModule,
    


    NzPageHeaderModule,
    NzSpinModule,
    NzButtonModule,
    NzFormModule,
    NzInputModule,
    NzLayoutModule,
    NzFlexModule,
    NzSpaceModule,
    NzDescriptionsModule
    
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'car_rental_angular';

  isCustomerLogedIn: boolean= false;
  isAdminLogedIn: boolean= false;

  constructor( private router : Router){

  }

  ngOnInit(){

    this.isAdminLogedIn= StorageService.isAdminLogedIn();
    this.isCustomerLogedIn= StorageService.isCustomerLogedIn();
    
    this.router.events.subscribe(event=>{
      if(event.constructor.name==="NavigationEnd"){
        this.isAdminLogedIn= StorageService.isAdminLogedIn();
        this.isCustomerLogedIn= StorageService.isCustomerLogedIn();
      }
    } )
  }

  logout(){
    StorageService.logout();
    this.router.navigateByUrl("/login")
  }

  
}
