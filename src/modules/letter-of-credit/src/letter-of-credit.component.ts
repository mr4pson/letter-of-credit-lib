import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
    selector: 'loc-letter-of-credit',
    templateUrl: './letter-of-credit.component.html',
    styleUrls: ['./letter-of-credit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LetterOfCreditComponent { }