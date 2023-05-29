import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { } from '@angular/platform-browser';

import { NotificationService } from './notification.service';
import { NotificationComponent } from './notification.component';

import { PsbModule } from '../../../psb/psb.module';

@NgModule({
    declarations: [
        NotificationComponent,
    ],
    imports: [
        CommonModule,
        PsbModule,
    ],
    providers: [
        NotificationService,
    ],
    exports: [
        NotificationComponent,
    ],
})
export class NotificationModule { }
