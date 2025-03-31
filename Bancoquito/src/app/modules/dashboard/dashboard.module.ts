import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { Router, RouterModule } from '@angular/router';
import { AccountsPageComponent } from '../accounts/accounts-page/accounts-page.component';
import { SharedModule } from "../../shared/shared.module";


@NgModule({
  declarations: [
    DashboardPageComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    RouterModule,
    SharedModule
]
})
export class DashboardModule { }
