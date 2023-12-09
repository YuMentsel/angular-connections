import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpHeadersInterceptor } from './shared/interceptor/http.interceptor';
import { connectionsReducer } from './redux/reducers/connections.reducer';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot({ connections: connectionsReducer }),
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: HttpHeadersInterceptor, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule {}
