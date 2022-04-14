import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatMoney',
  pure: false,
})
export class FormatMoneyPipe implements PipeTransform {
  transform(number: number): string {
    if (number === null || number === undefined) {
      return `0 ₽`;
    }

    const parts = number.toString().split(/[\.,]/);
    const prefix = parts[0].replace(/\d(?=(\d{3})+$)/g, '$& ');

    if (parts.length > 1) {
      return `${prefix}.${parts[1]} ₽`;
    }

    return `${prefix} ₽`;
  }
}