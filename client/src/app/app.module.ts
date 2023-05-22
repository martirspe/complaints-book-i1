import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { FormPageComponent } from './form-page/form-page.component';
import { SharedModule } from './shared/shared.module';

// Services
import { ClaimsService } from './services/claims.service';

@NgModule({
  declarations: [
    AppComponent,
    FormPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [
    ClaimsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
