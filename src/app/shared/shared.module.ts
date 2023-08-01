import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';

// Google Recaptcha V2
import { RecaptchaModule, RecaptchaFormsModule, RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';

// Constantes
const RECAPTCHA_V2_KEY = '6LdPsm8nAAAAAPAOzPdXE2qyZqGfwIucr2yn_qw4';

@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NavbarComponent,
    RecaptchaFormsModule,
    RecaptchaModule
  ],
  providers: [
    { provide: RECAPTCHA_SETTINGS, useValue: { siteKey: RECAPTCHA_V2_KEY } as RecaptchaSettings }
  ]
})
export class SharedModule { }
