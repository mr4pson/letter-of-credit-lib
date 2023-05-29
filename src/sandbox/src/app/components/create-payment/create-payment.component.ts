import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { UntilDestroy, takeUntilDestroyed } from "@psb/angular-tools";
import { LetterOfCreditService } from "@psb/letter-of-credit";
import { filter, map, pairwise, switchMap, tap } from "rxjs/operators";

@Component({
    selector: 'loc-create-payment',
    templateUrl: 'create-payment.component.html',
    styleUrls: ['create-payment.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
@UntilDestroy()
export class CreatePaymentComponent implements OnInit {
    private isLoCAllowed = true;
    public newPaymentForm = new FormGroup({
        summa: new FormControl('', []),
        destination: new FormControl('', []),
        receiver: new FormGroup({
            inn: new FormControl('', []),
            name: new FormControl('', []),
            account: new FormControl('', []),
            kpp: new FormControl('', []),
            bik: new FormControl('', []),
            bankAccount: new FormControl('', []),
        }),
        account: new FormControl('', []),
    });

    constructor(
        private letterOfCreditService: LetterOfCreditService,
        private router: Router,
    ) { }

    selectClient(client) {
        console.log(client);
    }

    handleAccountSelect(account) {
        console.log(account);
    }

    handleSend() {
        this.checkIsLoCAllowedAndOpenPaymentDialog();
        // Иначе выполнить дефолтное действие
    }

    handleSign() {
        this.checkIsLoCAllowedAndOpenPaymentDialog();
        // Иначе выполнить дефолтное действие
    }

    handleSave() {
        this.checkIsLoCAllowedAndOpenPaymentDialog();
        // Иначе выполнить дефолтное действие
    }

    checkIsLoCAllowedAndOpenPaymentDialog(): void {
        if (this.isLoCAllowed) {
            console.log('validate payment form');
            // smbPaymentForm.validate();

            if (!this.newPaymentForm.valid) {
                return;
            }

            // Передаю тестовые данные в стор letter of credit. Заменить на данные из smb-payment-form
            this.letterOfCreditService.setStorePayment({
                number: 1,
                summa: 100,
                receiver: {
                    inn: 'test val',
                    kpp: 'test val',
                    name: 'test val',
                    displayName: 'test val',
                    fullName: 'test val',
                    id: 1,
                    okpo: 'test val',
                    toStringName: false,
                    account: {
                        budget: false,
                        code: "",
                        depNum: null
                    },
                    bankInfo: {
                        account: 'test val',
                        adress: 'test val',
                        bik: 'test val',
                        fullName: 'test val',
                        name: 'test val',
                        type: 1,
                    },
                },
                sender: {
                    inn: 'test val',
                    kpp: 'test val',
                    name: 'test val',
                    displayName: 'test val',
                    fullName: 'test val',
                    id: 1,
                    okpo: 'test val',
                    toStringName: false,
                    account: {
                        budget: false,
                        code: "",
                        depNum: null
                    },
                    bankInfo: {
                        account: 'test val',
                        adress: 'test val',
                        bik: 'test val',
                        fullName: 'test val',
                        name: 'test val',
                        type: 1,
                    },
                },
            });

            this.letterOfCreditService.openSafePaymentDialog();

            return;
        }
    }

    ngOnInit(): void {
        const receiverInn = this.newPaymentForm.get('receiver.inn');

        // receiverAutocomplete.receiverFormGroup.valueChanges
        receiverInn.valueChanges.pipe(
            map(() => receiverInn.valid),
            pairwise(),
            filter(([cur, prev]) => (
                cur !== prev
                && receiverInn.valid
            )),
            switchMap(() => {
                console.log('Показать лоадинг paymentForm');
                // smbPaymentForm.spinnerService.start(smbPaymentForm.paymentFormContext);
                return this.letterOfCreditService.getIsLoCVisible(receiverInn)
            }),
            tap((isLoCAllowed) => {
                console.log('Скрыть лоадинг paymentForm');
                // smbPaymentForm.spinnerService.stop(smbPaymentForm.paymentFormContext);
                this.isLoCAllowed = isLoCAllowed;
            }),
            takeUntilDestroyed(this)
        ).subscribe();
    }
}