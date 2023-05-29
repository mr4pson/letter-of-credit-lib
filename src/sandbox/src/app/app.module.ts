import { registerLocaleData } from '@angular/common';
import ru from '@angular/common/locales/ru';
import { ApplicationRef, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { createInputTransfer, createNewHosts, removeNgStyles } from '@angularclass/hmr';

import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LetterOfCreditService } from '@psb/letter-of-credit';
import { PsbModule } from 'src/modules/letter-of-credit/src/modules/psb/psb.module';
import { UiKitModule } from 'src/modules/letter-of-credit/src/modules/ui-kit/ui-kit.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { CreatePaymentComponent } from './components/create-payment/create-payment.component';
import { LayoutComponent } from './components/layout/layout.component';

import { AccountService, ErrorHandlerService, StorageService, StoreService } from 'src/modules/letter-of-credit/src/services';
import { SafePaymentFormService, SafePaymentService, SafePaymentStateManagerService } from 'src/modules/letter-of-credit/src/modules/safepayment/services';

registerLocaleData(ru);
@NgModule({
    declarations: [
        AppComponent,
        CreatePaymentComponent,
        LayoutComponent,
    ],
    imports: [
        AppRoutingModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        RouterModule,

        PsbModule,
        UiKitModule,
    ],
    providers: [
        LetterOfCreditService,

        StorageService,
        StoreService,
        AccountService,
        ErrorHandlerService,

        SafePaymentFormService,
        SafePaymentService,
        SafePaymentStateManagerService,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
    constructor(private appRef: ApplicationRef) { }
    hmrOnInit(store) {
        if (!store || !store.state) return;
        if ('restoreInputValues' in store) {
            store.restoreInputValues();
        }
        // change detection
        this.appRef.tick();
        delete store.state;
        delete store.restoreInputValues;
    }
    hmrOnDestroy(store) {
        const cmpLocation = this.appRef.components.map(
            cmp => cmp.location.nativeElement,
        );
        // recreate elements
        store.disposeOldHosts = createNewHosts(cmpLocation);
        store.restoreInputValues = createInputTransfer();
        removeNgStyles();
    }
    hmrAfterDestroy(store) {
        store.disposeOldHosts();
        delete store.disposeOldHosts;
    }
}
