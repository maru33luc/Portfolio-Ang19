import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'elapsedTime',
})
export class ElapsedTimePipe implements PipeTransform {
  transform(period: string): string {
    const startDate = this.extractStartDate(period);
    if (!startDate) {
      return period; // Devuelve el texto original si no se puede calcular
    }

    const parts = period.split('-');
    const startPart = parts[0].trim();

    const currentDate = new Date();
    const elapsedMonths =
      (currentDate.getFullYear() - startDate.getFullYear()) * 12 +
      (currentDate.getMonth() - startDate.getMonth());
    const years = Math.floor(elapsedMonths / 12);
    const months = elapsedMonths % 12;

    const isSpanish = period.toLowerCase().includes('actualidad');

    let result = '';
    if (isSpanish) {
      if (years > 0) {
        result += `${years} año${years > 1 ? 's' : ''}`;
      }
      if (months > 0) {
        result += `${years > 0 ? ' y ' : ''}${months} mes${months > 1 ? 'es' : ''}`;
      }
      if (result === '') {
        result = 'menos de un mes';
      }
      return `${startPart} - Actualidad · ${result}`;
    } else {
      if (years > 0) {
        result += `${years} year${years > 1 ? 's' : ''}`;
      }
      if (months > 0) {
        result += `${years > 0 ? ' ' : ''}${months} month${months > 1 ? 's' : ''}`;
      }
      if (result === '') {
        result = 'less than a month';
      }
      return `${startPart} - Present · ${result}`;
    }
  }

  private extractStartDate(period: string): Date | null {
    const parts = period.split('-');
    if (parts.length > 0) {
      const startPart = parts[0].trim();
      const match = startPart.match(/^([A-Za-z]+)\.?\s+(\d{4})$/);
      if (match) {
        const [_, month, year] = match;
        const monthIndex = this.getMonthIndex(month);
        if (monthIndex >= 0) {
          return new Date(parseInt(year), monthIndex, 1);
        }
      }
    }
    return null;
  }

  private getMonthIndex(month: string): number {
    const cleanMonth = month.toLowerCase().replace('.', '').trim();
    
    // English months
    const englishMonths = [
      ['jan', 'january'],
      ['feb', 'february'],
      ['mar', 'march'],
      ['apr', 'april'],
      ['may'],
      ['jun', 'june'],
      ['jul', 'july'],
      ['aug', 'august'],
      ['sep', 'sept', 'september'],
      ['oct', 'october'],
      ['nov', 'november'],
      ['dec', 'december']
    ];

    // Spanish months
    const spanishMonths = [
      ['ene', 'enero'],
      ['feb', 'febrero'],
      ['mar', 'marzo'],
      ['abr', 'abril'],
      ['may', 'mayo'],
      ['jun', 'junio'],
      ['jul', 'julio'],
      ['ago', 'agosto'],
      ['sep', 'sept', 'septiembre'],
      ['oct', 'octubre'],
      ['nov', 'noviembre'],
      ['dic', 'diciembre']
    ];

    for (let i = 0; i < 12; i++) {
      if (englishMonths[i].includes(cleanMonth) || spanishMonths[i].includes(cleanMonth)) {
        return i;
      }
    }
    return -1;
  }
}

