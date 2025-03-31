import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthModule } from '../auth/auth.module';


@NgModule({
  declarations: [
    HomePageComponent,
  
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    
  ],
  exports: [
    HomePageComponent,
  
  ]
})
export class HomeModule { }
