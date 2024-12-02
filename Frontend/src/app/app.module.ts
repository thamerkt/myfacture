import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DashbordComponent } from './pages/dashbord/dashbord.component';
import { SidebarComponent } from './pages/dashbord/sidebar/sidebar.component';
import { NavbarComponent } from './pages/dashbord/navbar/navbar.component';
import { InvoicesComponent } from './features/invoices/invoices.component';
import { XlreaderComponent } from './features/xlreader/xlreader.component';
import { GeneratefileComponent } from './features/generatefile/generatefile.component';


@NgModule({
  declarations: [
    AppComponent,DashbordComponent,SidebarComponent,NavbarComponent, InvoicesComponent, XlreaderComponent, GeneratefileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
