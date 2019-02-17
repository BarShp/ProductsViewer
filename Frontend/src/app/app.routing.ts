import { Routes, RouterModule } from '@angular/router';

import { HomePageComponent } from './Pages/home-page/home-page.component';
import { ProductPageComponent } from './Pages/product-page/product-page.component';

const APP_ROUTES: Routes = [
    { path: '', redirectTo: '/Home', pathMatch: 'full' },
    { path: 'Home', component: HomePageComponent },
    { path: 'Product/:id', component: ProductPageComponent }
];

export const routing = RouterModule.forRoot(APP_ROUTES);