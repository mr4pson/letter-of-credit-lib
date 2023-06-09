import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import '@angular/common/locales/global/ru';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

import { StepService } from '../../services/step.service';
import { AccreditationAmountComponent } from './accreditation-amount.component';
import { ClientAccountService } from '../../services/client-accounts.service';
import { Page, paths } from '../../constants/routes';
import { AccreditationAmountFormService } from './accreditation-amount-form.service';
import { clickSubmitButton } from './testIng.utils';

import { AccountService, ErrorHandlerService, StoreService } from '../../../../services';
import { PsbModule } from '../../../../modules/psb/psb.module';
import { UiKitModule } from '../../../../modules/ui-kit/ui-kit.module';
import { isFormValid } from '../../../../utils';
import { AccreditationAmountFormField } from '../../enums/accreditation-amount-form-field.enum';
import { MoneyAmountPipe } from '@psb/angular-tools';

describe('AccreditationAmountComponent', () => {
    let component: AccreditationAmountComponent;
    let fixture: ComponentFixture<AccreditationAmountComponent>;
    let router: Router;
    let store: StoreService;
    const accounts = [
        {
            title: 'Расчетный',
            balance: 0,
            accountCode: '0000 0000 0000 0000',
        },
    ];

    const initialForm = {
        issueSum: '100',
        selectedAccount: accounts[0],
    };

    const commission$$ = new BehaviorSubject(0);
    const accounts$$ = new BehaviorSubject([]);

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [
                AccreditationAmountComponent,
            ],
            imports: [
                CommonModule,
                PsbModule,
                ReactiveFormsModule,
                RouterTestingModule,
                UiKitModule,
            ],
            providers: [
                StoreService,
                StepService,
                AccreditationAmountFormService,
                MoneyAmountPipe,
                {
                    provide: AccountService,
                    useValue: {
                        getCommision: (issueSum: number) => {
                            return commission$$.asObservable();
                        },
                    },
                },
                {
                    provide: ClientAccountService,
                    useValue: {
                        getClientAccounts: () => {
                            return accounts$$.asObservable();
                        },
                    },
                },
                {
                    provide: ErrorHandlerService,
                    useValue: {
                        showErrorMessage: () => { },
                    },
                },
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AccreditationAmountComponent);
        component = fixture.componentInstance;
        router = TestBed.inject(Router);
        store = TestBed.inject(StoreService);

        component.form.reset();
        fixture.detectChanges();
    });

    it('При patchValue форма принимает аналогичное значение заданному', () => {
        const initialForm = {
            issueSum: '100',
            selectedAccount: accounts[0],
        };
        component.form.patchValue(initialForm);

        expect(initialForm).toEqual(component.form.value);
    });

    it('При задании суммы комиссии как 100 изменяет значение комиссии до 10', fakeAsync(() => {
        const commissionValue = 10;
        commission$$.next(commissionValue);
        component.form.get(AccreditationAmountFormField.IssueSum).patchValue('100');
        fixture.detectChanges();
        tick();

        expect(component.commission).toEqual(commissionValue);
    }));

    it('Задает первый аккаунт после получения списка аккаунтов', fakeAsync(() => {
        store.isIssueVissible = true;
        accounts$$.next(accounts);
        tick();

        expect(component.form.get(AccreditationAmountFormField.SelectedAccount).value).toEqual(accounts[0]);
    }));

    it('Вызывает handleSubmit при сабмите формы', () => {
        spyOn(component, 'handleSubmit');
        clickSubmitButton(fixture);

        expect(component.handleSubmit).toHaveBeenCalled();
    });

    it('Редиректит к маршруту send appliation при валидной форме', () => {
        component.form.patchValue(initialForm);

        spyOn(router, 'navigateByUrl');
        clickSubmitButton(fixture);

        expect(isFormValid(component.form)).toBeTruthy();
        expect(router.navigateByUrl).toHaveBeenCalledWith(paths[Page.COUNTERPARTY]);
    });
});
