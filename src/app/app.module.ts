import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { LoadingComponent } from './components/loading/loading.component';
import { QueryExpComponent } from './components/query-exp/query-exp.component';
import { ExpedientComponent } from './components/expedient/expedient.component';
import { ErrorComponent } from './components/error/error.component';
import { ListExpComponent } from './components/query-exp/list-exp/list-exp.component';
import { ResumeExpComponent } from './components/query-exp/resume-exp/resume-exp.component';
import { BarRecordsComponent } from './components/expedient/bar-records/bar-records.component';
import { BarFilesComponent } from './components/expedient/bar-files/bar-files.component';
import { ScanFingerComponent } from './components/query-exp/scan-finger/scan-finger.component';
import { BarDetailsRecordComponent } from './components/expedient/bar-details-record/bar-details-record.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoadingComponent,
    QueryExpComponent,
    ExpedientComponent,
    ErrorComponent,
    ListExpComponent,
    ResumeExpComponent,
    BarRecordsComponent,
    BarFilesComponent,
    ScanFingerComponent,
    BarDetailsRecordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
