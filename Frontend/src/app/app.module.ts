import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { AutocompleteModule } from 'ng2-input-autocomplete';

import { AppComponent } from './app.component';

import { ProductThumbnailComponent } from './Components/product-thumbnail/product-thumbnail.component';
import { ProductGridComponent } from './Components/product-grid/product-grid.component';

import { ProductPageComponent } from './Pages/product-page/product-page.component';
import { HomePageComponent } from './Pages/home-page/home-page.component';

import { ProductsService } from './Services/products-service.service';
import { AuthService } from './Services/auth.service';

import { routing } from './app.routing';
import { UserAuthComponent } from './Components/user-auth/user-auth.component';
import { RegisterPageComponent } from './Pages/register-page/register-page.component';
import { LoginPageComponent } from './Pages/login-page/login-page.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductThumbnailComponent,
    ProductGridComponent,
    HomePageComponent,
    ProductPageComponent,
    UserAuthComponent,
    RegisterPageComponent,
    LoginPageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    InfiniteScrollModule,
    routing,
    AutocompleteModule.forRoot()
  ],
  providers: [ProductsService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
