import { format, parse } from "date-fns";
import russianLocale from "date-fns/locale/ru";

const DATE_TOKEN = 'dd.MM.yyyy';

const DEFAULT_DATE_FORMAT = 'dd.MM.yyyy';

export class DateHelper {
  public static getFormattedDate(date: Date): string {
    try {
      return date ? format(date, DATE_TOKEN, { locale: russianLocale }) : '';
    } catch {
      return '';
    }
  }

  public static parseDate(
    dateString: string,
    format = DEFAULT_DATE_FORMAT,
    baseDate = new Date(),
  ): Date {
    if (!dateString) {
      return new Date();
    }
    return parse(dateString, format, baseDate);
  }
}