import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { UntilDestroy, takeUntilDestroyed } from "@psb/angular-tools";
import { LetterOfCreditService } from "@psb/letter-of-credit";
import { filter, tap } from "rxjs/operators";

@Component({
    selector: 'loc-app',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
@UntilDestroy()
export class AppComponent implements OnInit {
    constructor(
        private letterOfCreditService: LetterOfCreditService,
        private router: Router,
    ) { }

    ngOnInit(): void {
        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd),
            tap(() => {
                this.letterOfCreditService.changeIsOrdinalPayment(false);
            }),
            takeUntilDestroyed(this),
        ).subscribe();

        this.letterOfCreditService.setCloseLetterOfCreditCallback(() => {
            this.router.navigateByUrl('/create-payment');
        });
        this.letterOfCreditService.setLetterOfCreditBaseUrl('/create-letter');
    }
}
