import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DialogModalModule } from './components/dialog-modal/dialog-modal.module';
import { HomeModule } from './home/home.module';
import { ApiInterceptor } from './services/api.interceptor';


/** Extraemois el forma para Colombia */
import es_CO from '@angular/common/locales/es-CO';
import { registerLocaleData } from '@angular/common';
registerLocaleData(es_CO, 'es_CO');

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    HttpClientModule,
    DialogModalModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true},
    { provide: LOCALE_ID, useValue: 'es_CO'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
