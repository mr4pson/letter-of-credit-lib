import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormArray } from '@angular/forms';

import { filter } from 'rxjs/operators';
import { Router } from '@angular/router';

import { ClosingDoc } from '../../interfaces/closing-doc.interface';
import { Page, paths } from '../../constants/routes';
import { StepService } from '../../services/step.service';
import { AccreditationPeriodFormService } from './accreditation-period-form.service';
import { AccreditationPeriodFormField } from '../../enums/accreditation-period-form-field.enum';

import { ButtonType } from '@psb/fe-ui-kit';
import { StoreService } from '../../../../services/store.service';
import { getSubstractDatesDays, getSummedDateDays, getTomorrowDate } from '../../../../utils/utils';
import moment from 'moment';
import { isFormValid } from '../../../../utils';
import { takeUntilDestroyed, UntilDestroy } from '@psb/angular-tools';
import { ruLocaleDateConfig } from '../../constants/constants';

@Component({
    selector: 'accreditation-period',
    templateUrl: 'accreditation-period.component.html',
    styleUrls: ['accreditation-period.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
@UntilDestroy()
export class AccreditationPeriodComponent implements OnInit {
    form = this.formService.createForm();
    ButtonType = ButtonType;
    minEndLocDate = getTomorrowDate();
    currentDate = new Date();
    AccreditationPeriodFormField = AccreditationPeriodFormField;
    closingDocsControl: FormArray;

    constructor(
        private store: StoreService,
        private router: Router,
        private stepService: StepService,
        private formService: AccreditationPeriodFormService,
    ) {
        this.closingDocsControl = this.formService.closingDocsControl;
    }

    ngOnInit(): void {
        const initialEndLocDate = this.store.letterOfCredit.endLocDate;

        this.form.patchValue({
            ...this.store.letterOfCredit,
            endLocDate: initialEndLocDate ? moment(initialEndLocDate) : moment(getTomorrowDate()),
        });

        this.form.markAllAsTouched();
        this.subscribeOnFormFieldsChanges();
    }

    private subscribeOnFormFieldsChanges(): void {
        this.formService.endLocDateControl.valueChanges.pipe(
            filter(endLocDate => endLocDate && endLocDate.getTime() > 0),
            takeUntilDestroyed(this),
        ).subscribe(this.setStoreEndLocDate.bind(this));

        this.formService.locDaysNumberControl.valueChanges.pipe(
            takeUntilDestroyed(this),
        ).subscribe(this.setLocDateOnDaysNumberChange.bind(this));

        this.formService.isDocumentDigitalControl.valueChanges.pipe(
            takeUntilDestroyed(this),
        ).subscribe(this.setStoreIsDocumentDigital.bind(this));

        this.formService.allowUsePartOfLocControl.valueChanges.pipe(
            takeUntilDestroyed(this),
        ).subscribe(this.setStoreAllowUsePartOfLoc.bind(this));

        this.closingDocsControl.valueChanges.pipe(
            takeUntilDestroyed(this),
        ).subscribe(this.setStoreClosingDocs.bind(this));

        if (this.store.letterOfCredit.closingDocs) {
            this.store.letterOfCredit.closingDocs.forEach(closingDoc => this.addClosingDoc(closingDoc));

            return;
        }
    }

    addClosingDoc(closingDoc = {} as ClosingDoc): void {
        this.formService.addClosingDocControl(closingDoc);
    }

    handleDelete(index: number): void {
        this.formService.removeClosingDoc(index);
    }

    handleSubmit(): void {
        if (isFormValid(this.form)) {
            const endLocDate = new Date(this.store.letterOfCredit.endLocDate.toString());
            const stepDescription = `До ${endLocDate.toLocaleDateString(
                ruLocaleDateConfig.locale,
                ruLocaleDateConfig.config
            )}`;

            this.stepService.setStepDescription(
                paths[Page.ACCREDITATION_PERIOD],
                stepDescription,
            );
            this.router.navigateByUrl(paths[Page.SEND_APPLICATION]);
        }
    }

    private setStoreEndLocDate(endLocDate: Date): void {
        const newLocDaysNumber = getSubstractDatesDays(endLocDate, this.currentDate);

        if (newLocDaysNumber > 0 && newLocDaysNumber !== this.formService.locDaysNumberControl.value) {
            this.store.letterOfCredit.endLocDate = this.formService.endLocDateControl.valid
                ? endLocDate
                : getTomorrowDate();

            this.formService.setLocDays(this.currentDate);
        }
    }

    private setLocDateOnDaysNumberChange(locDaysNumber): void {
        this.store.letterOfCredit.locDaysNumber = locDaysNumber;
        const newEndLocDate = getSummedDateDays(this.currentDate, Number(locDaysNumber));

        if (newEndLocDate === this.formService.endLocDateControl.value) {

            return;
        }


        const days: number = Number(locDaysNumber);

        if (!locDaysNumber) {
            return;
        }

        if (days < 1 || days > 365) {
            this.formService.locDaysNumberControl.setValue('');

            return;
        }

        this.formService.setLocDate(days, this.currentDate);
    }

    private setStoreIsDocumentDigital(): void {
        this.store.letterOfCredit.isDocumentDigital = this.formService.isDocumentDigitalControl.value;
    }

    private setStoreAllowUsePartOfLoc(): void {
        this.store.letterOfCredit.allowUsePartOfLoc = this.formService.allowUsePartOfLocControl.value
    }

    private setStoreClosingDocs(closingDocs: ClosingDoc[]): void {
        this.store.letterOfCredit.closingDocs = [];
        closingDocs.forEach((closingDoc: ClosingDoc) => {
            if (!closingDoc.document?.trim()) {

                return;
            }
            this.store.letterOfCredit.closingDocs.push({ ...closingDoc });
        });
    }
}
