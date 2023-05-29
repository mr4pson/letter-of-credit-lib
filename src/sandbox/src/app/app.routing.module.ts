import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; // CLI imports router
import { CreatePaymentComponent } from './components/create-payment/create-payment.component';
import { LayoutComponent } from './components/layout/layout.component';

const routes: Routes = [
    {
        path: '', component: LayoutComponent, children: [
            { path: 'create-letter', loadChildren: () => import('@psb/letter-of-credit').then(m => m.LetterOfCreditModule) },
            { path: 'create-payment', component: CreatePaymentComponent, }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: false })],
    exports: [RouterModule]
})
export class AppRoutingModule { }