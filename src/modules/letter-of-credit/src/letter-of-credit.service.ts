import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { UntilDestroy, takeUntilDestroyed } from "@psb/angular-tools";
import { DialogService, DialogSize, IBaseDialogData, SimpleDialogComponent } from "@psb/fe-ui-kit";
import { Observable, forkJoin, of } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { GET_ACCREDITIVE_INFO_ERROR_MESSAGE, GET_COUNTERPARTY_INFO_ERROR_MESSAGE } from "./constants";
import { SafePaymentButton } from "./enums/safe-payment-button.enum";
import { SmbPayment } from "./interfaces";
import { Page, paths } from "./modules/issue/constants/routes";
import { SafePaymentComponent } from "./modules/safepayment/safe-payment.component";
import { AccountService, ErrorHandlerService, StoreService } from "./services";

@Injectable({
    providedIn: 'root',
})
@UntilDestroy()
export class LetterOfCreditService {
    closeLetterOfCreditCallback = () => { };

    constructor(
        private store: StoreService,
        private accountService: AccountService,
        private errorHandler: ErrorHandlerService,
        private dialogService: DialogService,
        private router: Router,
    ) {
    }

    changeIsOrdinalPayment(value: boolean): void {
        this.store.isOrdinalPayment = value;
    }

    setStorePayment(payment: SmbPayment): void {
        this.store.payment = payment;
    }

    setCloseLetterOfCreditCallback(fn: () => void): void {
        this.closeLetterOfCreditCallback = fn;
    }

    setLetterOfCreditBaseUrl(url: string): void {
        console.log(url);
        this.store.letterOfCreditBaseUrl = url;
    }

    getLetterOfCreditBaseUrl(): string {
        return this.store.letterOfCreditBaseUrl;
    }

    navigate(...args: string[]): void {
        this.router.navigateByUrl([this.getLetterOfCreditBaseUrl()].concat(args).join('/'));
    }

    public getIsLoCVisible(receiverAutocomplete: any): Observable<boolean> {
        if (this.store.isOrdinalPayment) {
            this.store.isOrdinalPayment = false;

            return of(false);
        }

        return forkJoin([
            this.accountService.getAllowLoC(receiverAutocomplete.receiverFormGroup.value.inn).pipe(
                catchError(() => {
                    this.errorHandler.showErrorMessage(GET_ACCREDITIVE_INFO_ERROR_MESSAGE);

                    return of(false);
                }),
            ),
            this.accountService.getIsBadReliability(receiverAutocomplete.receiverFormGroup.value.inn).pipe(
                catchError(() => {
                    this.errorHandler.showErrorMessage(GET_COUNTERPARTY_INFO_ERROR_MESSAGE);

                    return of(false);
                }),
            ),
        ]).pipe(
            map(([isLoCAllowed, isBadReliability]) => {
                return isBadReliability && isLoCAllowed;
            }),
        )
    }

    public openSafePaymentDialog(): void {
        const dialogData: IBaseDialogData = {
            title: 'Рекомендуем безопасный платёж',
            component: SafePaymentComponent,
            contentData: {
                width: '100px',
            }
        };

        const dialogRef = this.dialogService.open<
            IBaseDialogData,
            any,
            SimpleDialogComponent<SafePaymentButton>
        >(SimpleDialogComponent, dialogData, {
            size: DialogSize.Medium
        });

        dialogRef.afterClosed
            .pipe(
                tap((result) => {
                    switch (result) {
                        case SafePaymentButton.RefusePay:
                            this.store.isOrdinalPayment = false;

                            break;
                        case false:
                        case SafePaymentButton.OrdinalPay:
                            this.store.isOrdinalPayment = true;
                            break;
                    }
                }),
                takeUntilDestroyed(this)
            )
            .subscribe();
    }
}