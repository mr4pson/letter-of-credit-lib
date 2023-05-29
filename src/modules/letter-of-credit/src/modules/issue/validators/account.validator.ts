import { FormControl, ValidatorFn } from '@angular/forms';

export const getAccountValidator = (message?: string | undefined): ValidatorFn => (control: FormControl) => {
    const searchRegExp = / /g;
    const replaceWith = '';

    const account = control.value?.replace(searchRegExp, replaceWith);
    return account?.length > 0 && account.length !== 20
        ? { error: message }
        : {};
};
