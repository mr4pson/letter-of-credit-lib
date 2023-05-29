import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

import { StepService } from '../../services/step.service';

import { takeUntilDestroyed, UntilDestroy } from '@psb/angular-tools';
import { ButtonType } from '@psb/fe-ui-kit/src/components/button';
import { LetterOfCreditService } from '../../../../letter-of-credit.service';

@Component({
    selector: 'loc-issue-layout',
    templateUrl: 'issue-layout.component.html',
    styleUrls: ['issue-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
@UntilDestroy()
export class IssueLayoutComponent implements OnInit {
    ButtonType = ButtonType;
    steps = this.stepService.steps;
    currentUrl: string;

    constructor(
        private stepService: StepService,
        private letterOfCreditService: LetterOfCreditService,
    ) { }

    ngOnInit(): void {
        this.stepService.currentUrl$.pipe(
            tap((currentUrl) => {
                this.currentUrl = currentUrl;
            }),
            takeUntilDestroyed(this),
        ).subscribe();
    }

    navigateBack(): void {
        if (this.currentUrl === this.steps[0].url) {
            this.letterOfCreditService.closeLetterOfCreditCallback();

            return;
        }

        const prevStepUrl = this.stepService.getPrevUrl(this.currentUrl);
        this.letterOfCreditService.navigate(prevStepUrl);
    }
}
