import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { TickerComponent } from './components/ticker/ticker.component';




@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    TickerComponent
  ],
  imports: [
    CommonModule,
    RouterModule 
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    TickerComponent,
    RouterModule
  ]
})
export class SharedModule { }
