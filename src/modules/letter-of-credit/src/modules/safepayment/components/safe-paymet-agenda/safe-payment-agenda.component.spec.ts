import { CommonModule } from '@angular/common';
import '@angular/common/locales/global/ru';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SafePaymentAgendaComponent } from './safe-payment-agenda.component';
import { By } from '@angular/platform-browser';

fdescribe('SafePaymentAgendaComponent', () => {
    let component: SafePaymentAgendaComponent;
    let fixture: ComponentFixture<SafePaymentAgendaComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [
                SafePaymentAgendaComponent,
            ],
            imports: [
                CommonModule,
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SafePaymentAgendaComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    it('Отображает то же число элементов, что и в массиве agendaItems', () => {
        const angenda = fixture.debugElement.query(By.css('.agenda'));

        expect(angenda).toBeTruthy();
        expect(component.agendaItems.length).toEqual(angenda.children.length);
    });
});
