import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numApo',
  standalone: true,
})
export class NumberApostrophePipe implements PipeTransform {
  transform(value: number | string | null | undefined): string {
    if (value === null || value === undefined) {
      return '0';
    }

    const numeric =
      typeof value === 'number' ? Math.trunc(value) : parseInt(value, 10);
    if (Number.isNaN(numeric)) {
      return '0';
    }

    const digits = numeric.toString();
    return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }
}
