
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { Router } from "@angular/router";
import { UntilDestroy } from "@psb/angular-tools";

@Component({
    selector: 'loc-layout',
    templateUrl: 'layout.component.html',
    styleUrls: ['layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
@UntilDestroy()
export class LayoutComponent {
    constructor(
        private router: Router,
    ) { }

    handleLetterOfCreditShow() {
        this.router.navigateByUrl('/create-letter');
    }

    handleNewPaymentClick() {
        this.router.navigateByUrl('/create-payment');
    }
}
