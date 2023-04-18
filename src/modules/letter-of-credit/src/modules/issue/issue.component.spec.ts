import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';
import { By } from '@angular/platform-browser';

import { IssueComponent } from './issue.component';
import { StepService } from './services/step.service';
import { PsbModule } from '../psb/psb.module';
import { IssueStepsComponent } from './components/issue-steps/issue-steps.component';

import { StoreService } from '../../services';

describe('IssueComponent', () => {
    let component: IssueComponent;
    let fixture: ComponentFixture<IssueComponent>;
    let location: Location;
    let router: Router;

    beforeEach(waitForAsync(() => {
        const mockStore = {
            isIssueVissible: false,
        };

        TestBed.configureTestingModule({
            declarations: [
                IssueComponent,
                IssueStepsComponent,
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
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        router = TestBed.inject(Router);
        location = TestBed.inject(Location);
        fixture = TestBed.createComponent(IssueComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
        router.initialNavigation();
    });

    it('Вызывает navigateBack при клике на кнопку назад', () => {
        spyOn(component, 'navigateBack');

        const backButton = fixture.debugElement.query(By.css('.back-btn'));
        backButton.nativeElement.click();

        expect(component.navigateBack).toHaveBeenCalled();
    });

    it('При инициализации текущего шага, как второго и при клике на кнопку назад редиректит на первый шаг', () => {
        spyOn(router, 'navigateByUrl');
        component.currentUrl = component.steps[1].url;

        component.navigateBack();

        expect(router.navigateByUrl).toHaveBeenCalledWith(component.steps[0].url);
    });
});
