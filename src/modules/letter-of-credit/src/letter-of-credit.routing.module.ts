import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; // CLI imports router
import { LetterOfCreditComponent } from './letter-of-credit.component';
import { IssueModule } from './modules/issue/issue.module';

const routes: Routes = [
    {
        path: '', component: LetterOfCreditComponent, children: [
            { path: '', loadChildren: () => IssueModule },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LetterOfCreditRoutingModule { }