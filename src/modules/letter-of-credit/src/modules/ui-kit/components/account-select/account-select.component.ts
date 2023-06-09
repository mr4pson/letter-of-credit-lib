import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { CustomControlAccessorDirective } from '../../directives/custom-control-accessor.directive';

import { ClientAccount } from '../../../../modules/issue/interfaces/client-account.interface';

@Component({
    selector: 'loc-account-select',
    templateUrl: 'account-select.component.html',
    styleUrls: ['account-select.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountSelectComponent extends CustomControlAccessorDirective implements OnInit {
    @Input() accounts: ClientAccount[] = [];
    @Input() isAccountCodeVisible = false;
    @Input() placeholderHidden = false;
    @Input() description = '';

    @Output() accountSelect = new EventEmitter<ClientAccount>();

    selectedAccount$$ = new BehaviorSubject<ClientAccount>(null);
    selectedAccount$ = this.selectedAccount$$.asObservable();
    private get selectedAccount(): ClientAccount {
        return this.selectedAccount$$.getValue();
    }
    private set selectedAccount(value) {
        this.selectedAccount$$.next(value);
    }

    private dropped$$ = new BehaviorSubject(false);
    dropped$ = this.dropped$$.asObservable();
    private get dropped(): boolean {
        return this.dropped$$.getValue();
    }
    private set dropped(value) {
        this.dropped$$.next(value);
    }

    handleHeaderClick(): void {
        this.dropped = !this.dropped;
    }

    handleClickOutside(): void {
        this.dropped = false;
    }

    handleSelectAccount(account: ClientAccount): void {
        this.dropped = false;
        this.selectedAccount = account;

        this.formControl.setValue(account);
        this.accountSelect.emit(account);
    }

    private initSelectedOption(initAccount: ClientAccount): void {
        if (initAccount && !this.selectedAccount$$.getValue() && this.accounts?.length) {
            this.selectedAccount = this.accounts.find(account => (
                account.accountCode === initAccount.accountCode
            )) ?? null;
            this.cdr.markForCheck();
        }
    }

    writeValue(initAccount: ClientAccount): void {
        this.initSelectedOption(initAccount);
    }
}
