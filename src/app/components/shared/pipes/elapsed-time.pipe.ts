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

    const currentDate = new Date();
    const elapsedMonths =
      (currentDate.getFullYear() - startDate.getFullYear()) * 12 +
      (currentDate.getMonth() - startDate.getMonth());
    const years = Math.floor(elapsedMonths / 12);
    const months = elapsedMonths % 12;

    let result = '';
    if (years > 0) {
      result += `${years} año${years > 1 ? 's' : ''}`;
    }
    if (months > 0) {
      result += `${years > 0 ? ' y ' : ''}${months} mes${months > 1 ? 'es' : ''}`;
    }
    return `${startDate.toLocaleDateString('es-AR')} - Actualidad · ${result}`;
  }

  private extractStartDate(period: string): Date | null {
    // Extrae la fecha inicial del texto, asumiendo el formato 'MMM. YYYY - Actualidad'
    const match = period.match(/([A-Za-z]{3})\. (\d{4})/);
    if (match) {
      const [_, month, year] = match;
      const monthIndex = this.getMonthIndex(month);
      if (monthIndex >= 0) {
        return new Date(parseInt(year), monthIndex, 1);
      }
    }
    return null;
  }

  private getMonthIndex(month: string): number {
    const months = [
      'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
      'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic',
    ];
    return months.indexOf(month);
  }
}
