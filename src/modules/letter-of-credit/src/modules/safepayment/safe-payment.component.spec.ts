import { CommonModule } from '@angular/common';
import '@angular/common/locales/global/ru';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { SafePaymentComponent } from './safe-payment.component';
import { SafePaymentStateManagerService } from './services/safe-payment-state-manager.service';
import { SafePaymentFormService } from './services/safe-payment-form.service';
import { PsbModule } from '../psb/psb.module';
import { SafePaymentAgendaComponent } from './components/safe-paymet-agenda/safe-payment-agenda.component';
import { SafePaymentEmailComponent } from './components/safe-payment-email/safe-payment-email.component';
import { SafePayStates } from './enums/safe-payment.enum';
import { Page, paths } from '../issue/constants/routes';

import { AccountService, ErrorHandlerService, StorageService, StoreService } from '../../services';
import { SafePaymentButton } from '../../enums/safe-payment-button.enum';
import { ReceiverStatus } from '../../enums/receiver-status.enum';
import {
    clickEmailLink,
    clickNthPaymentBtn,
} from './testing.utils';
import { NotificationService } from '../ui-kit/components/notification/notification.service';
import { DialogRefService } from '@psb/fe-ui-kit';
import { SafePaymentService } from './services/safe-payment.service';
import { ReliableClassPipe, ReliableTextPipe } from './pipes';
import { AccreditationAmountComponent } from '../issue/components/accreditation-amount/accreditation-amount.component';

describe('SafePaymentComponent', () => {
    let component: SafePaymentComponent;
    let fixture: ComponentFixture<SafePaymentComponent>;
    let store: StoreService;
    let safePaymentStateManager: SafePaymentStateManagerService;
    let dialogRef: DialogRefService<SafePaymentButton>;
    let router: Router;
    let route: ActivatedRoute;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [
                SafePaymentComponent,
                SafePaymentAgendaComponent,
                SafePaymentEmailComponent,

                ReliableClassPipe,
                ReliableTextPipe,
            ],
            imports: [
                CommonModule,
                PsbModule,
                RouterTestingModule.withRoutes(
                    [{ path: paths[Page.ACCREDITATION_AMOUNT], component: AccreditationAmountComponent }]
                ),
                ReactiveFormsModule,
            ],
            providers: [
                StoreService,
                SafePaymentStateManagerService,
                SafePaymentFormService,
                NotificationService,
                ErrorHandlerService,
                AccountService,
                StorageService,
                {
                    provide: DialogRefService,
                    useValue: {
                        close: (value) => { },
                    },
                },
                SafePaymentService
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SafePaymentComponent);
        component = fixture.componentInstance;
        store = TestBed.inject(StoreService);
        safePaymentStateManager = TestBed.inject(SafePaymentStateManagerService);
        dialogRef = TestBed.inject(DialogRefService);
        router = TestBed.inject(Router);
        route = TestBed.inject(ActivatedRoute);
        store.receiverStatus = ReceiverStatus.Unknown;

        fixture.detectChanges();
    });

    it('При вызове takeEmail задает email в store и меняет статус на ShowAgenda', () => {
        const email = 'test@gmail.com';
        component.takeEmail(email);

        expect(store.clientEmail).toEqual(email);
        expect(safePaymentStateManager.state).toEqual(SafePayStates.ShowAgenda);
    });

    it('При клике на кнопку "Показать email" вызывает showEmail', () => {
        jest.spyOn(component, 'showEmail');
        clickEmailLink(fixture);

        expect(component.showEmail).toHaveBeenCalled();
    });

    it('Закрывает диалоговое окно при клике на кнопку "Совершить безопасный платёж" c параметром DoPay и редиректит к accredit amount', () => {
        jest.spyOn(dialogRef, 'close');
        jest.spyOn(router, 'navigateByUrl');
        clickNthPaymentBtn(fixture, 1);

        expect(dialogRef.close).toHaveBeenCalledWith(SafePaymentButton.DoPay);
        expect(router.navigateByUrl).toHaveBeenCalledWith(`${route.snapshot.url}/${paths[Page.ACCREDITATION_AMOUNT]}`);
    });

    it('Закрывает диалоговое окно при клике на кнопку "Отказаться от платежа" c параметром RefusePay', () => {
        jest.spyOn(dialogRef, 'close');
        clickNthPaymentBtn(fixture, 2);

        expect(dialogRef.close).toHaveBeenCalledWith(SafePaymentButton.RefusePay);
    });

    it('Закрывает диалоговое окно при клике на кнопку "Отправить обычный платёж" c параметром OrdinalPay', () => {
        jest.spyOn(dialogRef, 'close');
        clickNthPaymentBtn(fixture, 3);

        expect(dialogRef.close).toHaveBeenCalledWith(SafePaymentButton.OrdinalPay);
    });
});
