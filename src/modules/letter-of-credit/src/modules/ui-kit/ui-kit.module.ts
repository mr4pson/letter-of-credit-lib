import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PsbModule } from '../psb/psb.module';
import { AccountSelectComponent } from './components/account-select/account-select.component';
import { NotificationModule } from './components/notification/notification.module';

import { ClickOutsideModule } from '@psb/angular-tools';
import { FormErrorPipe } from './pipes/form-error.pipe';

@NgModule({
    declarations: [
        AccountSelectComponent,

        FormErrorPipe,
    ],
    imports: [
        ClickOutsideModule,
        CommonModule,
        NotificationModule,
        PsbModule,
    ],
    exports: [
        AccountSelectComponent,
        ClickOutsideModule,
        NotificationModule,
    ],
})
export class UiKitModule { }
