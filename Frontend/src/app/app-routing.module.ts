import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import LoginComponent from './pages/authentication/login/login.component';
import RegisterComponent from './pages/authentication/register/register.component';
import { DashbordComponent } from './pages/dashbord/dashbord.component';
import { GeneratefileComponent } from './features/generatefile/generatefile.component';
import { InvoicesComponent } from './features/invoices/invoices.component';
import { XlreaderComponent } from './features/xlreader/xlreader.component';
import { AuthGuard } from './Core/guards/auth.guard';
import { LogoutComponent } from './pages/authentication/logout/logout.component';

const routes: Routes = [
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:"dashbord",component:DashbordComponent,canActivate:[AuthGuard]},
  {path:"invoice",component:InvoicesComponent},
  {path:"invoice/create",component:GeneratefileComponent},
  {path:"clients",component:XlreaderComponent},
  {path:"logout",component:LogoutComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
