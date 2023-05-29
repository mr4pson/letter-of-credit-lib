import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { Page, paths } from '../../constants/routes';
import { AccreditationAmountFormField } from '../../enums/accreditation-amount-form-field.enum';
import { ClientAccountService } from '../../services/client-accounts.service';
import { StepService } from '../../services/step.service';

import { MoneyAmountPipe, UntilDestroy, takeUntilDestroyed } from '@psb/angular-tools';
import { ButtonType } from '@psb/fe-ui-kit';
import { LetterOfCreditService } from '../../../../letter-of-credit.service';
import { AccountService, ErrorHandlerService, StoreService } from '../../../../services';
import { isFormValid } from '../../../../utils';
import { ClientAccount } from '../../interfaces/client-account.interface';
import { AccreditationAmountFormService } from './accreditation-amount-form.service';
import { GET_ACCOUNTS_ERROR_MESSAGE, GET_COMMISSION_ERROR_MESSAGE } from './constants';

@Component({
    selector: 'accreditation-amount',
    templateUrl: 'accreditation-amount.component.html',
    styleUrls: ['accreditation-amount.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
@UntilDestroy()
export class AccreditationAmountComponent {
    commission = 0;
    ButtonType = ButtonType;
    form = this.formService.createForm();
    AccreditationAmountFormField = AccreditationAmountFormField;
    comissionLoading = false;
    accounts$: Observable<ClientAccount[]>;

    constructor(
        private store: StoreService,
        private accountService: AccountService,
        private clientAccountService: ClientAccountService,
        private errorHandlerService: ErrorHandlerService,
        private stepService: StepService,
        private formService: AccreditationAmountFormService,
        private formatMoney: MoneyAmountPipe,
        private letterOfCreditService: LetterOfCreditService
    ) {
        this.initObservables();
        this.subscribeOnFormFieldsChanges();
    }

    private initObservables(): void {
        this.form.get(AccreditationAmountFormField.IssueSum).patchValue(this.store.payment?.summa.toString());

        this.accounts$ = this.clientAccountService.getClientAccounts().pipe(
            tap(accounts => {
                if (accounts.length) {
                    this.form.get(AccreditationAmountFormField.SelectedAccount).patchValue(accounts[0]);
                }
            }),
            catchError(() => {
                this.errorHandlerService.showErrorMessage(GET_ACCOUNTS_ERROR_MESSAGE);

                return of([]);
            }),
        );
    }

    private subscribeOnFormFieldsChanges(): void {
        this.form.get(AccreditationAmountFormField.IssueSum).valueChanges.pipe(
            switchMap(issueSum => {
                const summa = issueSum ? Number(issueSum) : 0;
                this.comissionLoading = true;
                return this.accountService.getCommision(Number(summa))
            }),
            map((commission) => {
                this.commission = Number(commission);
                this.comissionLoading = false;

                return this.commission;
            }),
            catchError(() => {
                this.comissionLoading = false;
                this.errorHandlerService.showErrorMessage(GET_COMMISSION_ERROR_MESSAGE);
                this.commission = 0;

                return of(this.commission);
            }),
            takeUntilDestroyed(this)
        ).subscribe();
    }

    handleAccountSelect(account: ClientAccount): void {
        this.store.letterOfCredit.payerAccount = account.accountCode;
    }

    handleSubmit(): void {
        if (isFormValid(this.form)) {
            this.store.letterOfCredit.paymentSum = this.formService.issueSum;

            this.stepService.setStepDescription(
                paths[Page.ACCREDITATION_AMOUNT],
                `${this.formatMoney.transform((Number(this.formService.issueSum) + this.commission), '₽')}`,
            );
            this.letterOfCreditService.navigate(paths[Page.COUNTERPARTY]);
        }
    }
}
