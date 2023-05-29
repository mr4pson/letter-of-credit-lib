import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'loc-issue',
    templateUrl: 'issue.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IssueComponent { }