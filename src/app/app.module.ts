import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';

import { IonicStorageModule } from '@ionic/storage-angular';
import { DataService } from './services/data.service';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ToastFavoriteComponent } from './toast-favorite/toast-favorite.component';

@NgModule({
  declarations: [AppComponent, ToastFavoriteComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    HttpClientModule, 
    IonicModule.forRoot(), 
    IonicStorageModule.forRoot(), 
    AppRoutingModule,
  ],
  exports:[],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, DataService],
  bootstrap: [AppComponent,ToastFavoriteComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
