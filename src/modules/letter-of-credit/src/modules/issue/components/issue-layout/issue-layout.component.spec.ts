import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';
import { By } from '@angular/platform-browser';

import { IssueLayoutComponent } from './issue-layout.component';
import { StepService } from '../../services/step.service';
import { PsbModule } from '../../../psb/psb.module';
import { IssueStepsComponent } from '../issue-steps/issue-steps.component';

import { AccountService, ErrorHandlerService, StorageService, StoreService } from '../../../../services';
import { LetterOfCreditService } from '../../../../letter-of-credit.service';
import { NotificationService } from '../../../ui-kit/components/notification/notification.service';
import { CurrentStepNumberPipe } from '../../pipes/current-step-number.pipe';

describe('IssueLayoutComponent', () => {
    let component: IssueLayoutComponent;
    let fixture: ComponentFixture<IssueLayoutComponent>;
    let location: Location;
    let router: Router;

    beforeEach(waitForAsync(() => {
        const mockStore = {
            isIssueVissible: false,
        };

        TestBed.configureTestingModule({
            declarations: [
                IssueLayoutComponent,
                IssueStepsComponent,
                CurrentStepNumberPipe,
            ],
            imports: [
                RouterTestingModule,
                PsbModule,
            ],
            providers: [
                StepService,
                {
                    provide: StoreService,
                    useValue: mockStore,
                },
                LetterOfCreditService,
                AccountService,
                StorageService,
                ErrorHandlerService,
                NotificationService,
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        router = TestBed.inject(Router);
        location = TestBed.inject(Location);
        fixture = TestBed.createComponent(IssueLayoutComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
        router.initialNavigation();
    });

    it('Вызывает navigateBack при клике на кнопку назад', () => {
        jest.spyOn(component, 'navigateBack');

        const backButton = fixture.debugElement.query(By.css('.back-btn'));
        backButton.nativeElement.click();

        expect(component.navigateBack).toHaveBeenCalled();
    });

    it('При инициализации текущего шага, как второго и при клике на кнопку назад редиректит на первый шаг', () => {
        jest.spyOn(router, 'navigateByUrl');
        component.currentUrl = component.steps[1].url;

        component.navigateBack();

        expect(router.navigateByUrl).toHaveBeenCalledWith(`/${component.steps[0].url}`);
    });
});
