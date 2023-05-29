import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, startWith } from 'rxjs/operators';

import { Observable } from 'rxjs';
import { STEPS } from '../constants/constants';
import { Page, paths } from '../constants/routes';

@Injectable()
export class StepService {
    steps = STEPS;
    currentUrl$: Observable<string>;

    constructor(
        private router: Router,
    ) {
        this.initObservables();
        this.getNoSlashUrl();
    }

    private initObservables(): void {
        this.currentUrl$ = this.router.events.pipe(
            startWith(this.getNoSlashUrl),
            map(this.getNoSlashUrl),
        );
    }

    private getNoSlashUrl() {
        const urlParts = window.location.pathname.split('/');
        const noSlashUrl = urlParts[urlParts.length - 1];

        if (!noSlashUrl) {
            return paths[Page.ACCREDITATION_AMOUNT];
        }

        return noSlashUrl;
    }

    getPrevUrl(currentUrl: string): string {
        const currentStepIndex = this.steps.findIndex(step => step.url === currentUrl);
        return this.steps[currentStepIndex - 1]?.url;
    }

    getCurrentStepNumber(currentUrl: string): number {
        const currentStepIndex = this.steps.findIndex(step => step.url === currentUrl);
        return currentStepIndex + 1;
    }

    setStepDescription(url: string, description: string): void {
        const curStep = this.steps.find(step => step.url === url);

        if (curStep) {
            curStep.description = description;
        }
    }
}
