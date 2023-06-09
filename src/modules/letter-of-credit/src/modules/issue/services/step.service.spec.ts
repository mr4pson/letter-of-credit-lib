import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { STEPS } from '../constants/constants';
import { StepService } from './step.service';

describe('StepService', () => {
    let service: StepService;
    let router: Router;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            providers: [StepService],
        });
        service = TestBed.inject(StepService);
        router = TestBed.inject(Router);

        router.initialNavigation();
    });

    it('Инициализурует шаги', () => {
        expect(service.steps).toBe(STEPS);
    });

    it('При вызове getPrevUrl со значением url 2 шага возвращает урл предыдущего шага', () => {
        expect(service.getPrevUrl(STEPS[1].url)).toBe(STEPS[0].url);
    });

    it('Возвращает текущий номер шага', () => {
        expect(service.getCurrentStepNumber(STEPS[0].url)).toBe(1);
    });

    it('Задает описание шага', () => {
        const TEST_DESCRIPTION = 'test description';
        service.setStepDescription(STEPS[0].url, TEST_DESCRIPTION);

        expect(STEPS[0].description).toBe(TEST_DESCRIPTION);
    });
});
