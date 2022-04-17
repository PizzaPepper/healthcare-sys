import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { LoadingComponent } from './components/loading/loading.component';
import { QueryExpComponent } from './components/query-exp/query-exp.component';
import { ExpedientComponent } from './components/expedient/expedient.component';
import { ErrorComponent } from './components/error/error.component';

import { AuthGuard } from './auth.guard';

import { LoadingSettingResolve } from './resolves/loading-setting.resolve';
import { QuerySettingService } from './resolves/query-setting.resolve';
import { ExpSettingResolve } from './resolves/exp-setting.resolve';

const routes: Routes = [
  {path: '', component:LoginComponent, },
  {path: 'login', component:LoginComponent},
  {path: 'loading', component:LoadingComponent,canActivate: [AuthGuard], resolve:{cres:LoadingSettingResolve}},
  {path: 'query', component:QueryExpComponent,canActivate: [AuthGuard], resolve:{cres:QuerySettingService}},
  {path: 'expedient/:id', component:ExpedientComponent, canActivate: [AuthGuard],resolve:{cres:ExpSettingResolve}},
  {path: '**', component:ErrorComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
