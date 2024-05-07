import { Routes } from '@angular/router';
import { ProductsComponent } from './componets/products/products.component';
import { PicoPreviewComponent } from './componets/pico-preview/pico-preview.component';

export const routes: Routes = [
    {
        path:'products',
        component:ProductsComponent
    },
    {
        path:'pico-preview',
        component:PicoPreviewComponent
    }
];
