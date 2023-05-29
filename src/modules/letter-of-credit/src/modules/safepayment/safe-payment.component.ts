import {
    ChangeDetectionStrategy,
    Component,
    ViewChild,
} from "@angular/core";

import { Page, paths } from "../issue/constants/routes";
import { SafePaymentEmailComponent } from "./components/safe-payment-email/safe-payment-email.component";
import { SafePayStates } from "./enums/safe-payment.enum";
import { SafePaymentStateManagerService } from "./services";

import { UntilDestroy, takeUntilDestroyed } from "@psb/angular-tools";
import { DialogRefService } from "@psb/fe-ui-kit";
import { ButtonSize, ButtonType } from "@psb/fe-ui-kit/src/components/button";
import { tap } from "rxjs/operators";
import { SafePaymentButton } from "../../enums/safe-payment-button.enum";
import { LetterOfCreditService } from '../../letter-of-credit.service';
import { StoreService } from "../../services/store.service";
import { SafePaymentFormField } from "./enums/safe-payment-form-field.enum";
import { SafePaymentFormService, SafePaymentService } from "./services";

@Component({
    selector: "safe-payment",
    templateUrl: "safe-payment.component.html",
    styleUrls: ["safe-payment.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
@UntilDestroy()
export class SafePaymentComponent {
    @ViewChild(SafePaymentEmailComponent) emailComponent: HTMLElement;

    SafePaymentButton = SafePaymentButton;
    ButtonType = ButtonType;
    ButtonSize = ButtonSize;
    form = this.formService.createForm();
    SafePaymentFormField = SafePaymentFormField;
    letterOfCredit = this.store.letterOfCredit;
    SafePayStates = SafePayStates;

    constructor(
        public stateManager: SafePaymentStateManagerService,
        public store: StoreService,
        private dialogRef: DialogRefService<SafePaymentButton>,
        private formService: SafePaymentFormService,
        private safePaymentService: SafePaymentService,
        private letterOfCreditService: LetterOfCreditService

    ) {
        this.stateManager.state = SafePayStates.ShowAgenda;
    }

    doSafePay(): void {
        this.dialogRef.close(SafePaymentButton.DoPay);
        this.letterOfCreditService.navigate(paths[Page.ACCREDITATION_AMOUNT]);
    }

    closeDialog(payButton: SafePaymentButton = SafePaymentButton.OrdinalPay): void {
        this.dialogRef.close(payButton);
    }

    takeEmail(email: string): void {
        if (email?.trim() === "") {
            return;
        }

        this.store.clientEmail = email;
        this.stateManager.state = SafePayStates.ShowAgenda;
        this.safePaymentService.loading = true;

        this.safePaymentService
            .getMaterials(email)
            .pipe(
                tap((resp) => {
                    this.safePaymentService.loading = false;
                }),
                takeUntilDestroyed(this)
            )
            .subscribe();
    }

    showEmail(): void {
        this.stateManager.state = SafePayStates.ShowEmail;
    }
}
