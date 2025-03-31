import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { AccountsPageComponent } from '../accounts/accounts-page/accounts-page.component';
import { TransactionsPageComponent } from '../transactions/transactions-page/transactions-page.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardPageComponent
  },
  {
    path: 'accounts',
    loadChildren: () => import('../accounts/accounts.module').then(m => m.AccountsModule),
  },
  {
    path: 'transactions',
    loadChildren: () => import('../transactions/transactions.module').then(m => m.TransactionsModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
