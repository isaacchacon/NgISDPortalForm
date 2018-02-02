import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms'
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTooltipModule,MatDatepickerModule,MatNativeDateModule} from '@angular/material';


import {NgTaxServices} from 'ng-tax-share-point-web-services-module';
import {TaxReusableComponentsModule} from 'ng-tax-reusable-components';
import {ReactivePeoplePickerModule} from 'reactive-people-picker-angular-material';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,HttpClientModule,ReactiveFormsModule,BrowserAnimationsModule,
	NgTaxServices.forRoot(),MatTooltipModule,MatDatepickerModule,MatNativeDateModule,
	TaxReusableComponentsModule,ReactivePeoplePickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
