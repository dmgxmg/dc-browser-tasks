import { isString } from "../util/string";

type DateValue = string | number | Date;

export class DateTime {
  static of(value: DateValue | DateTime = Date.now()) {
    return new this(value instanceof DateTime ? value.toDate() : value);
  }
  static now() {
    return this.of();
  }

  private readonly value: DateValue;
  private constructor(value: DateValue) {
    //Safari bug fix
    this.value = isString(value) ? value.replace(/-/g, "/") : value;
  }

  toDate() {
    return new Date(this.value);
  }

  startOfDay() {
    return DateTime.of(this.toDate().setHours(0, 0, 0, 0));
  }

  endOfDay() {
    return DateTime.of(this.toDate().setHours(23, 59, 59, 999));
  }

  subtractDays(num: number) {
    return this.addDays(-num);
  }

  addDays(num: number) {
    const date = this.toDate();
    return DateTime.of(date.setDate(date.getDate() + num));
  }

  isBefore(value: DateValue | DateTime) {
    return this.compare(value) < 0;
  }

  isAfter(value: DateValue | DateTime) {
    return this.compare(value) > 0;
  }

  isSame(value: DateValue | DateTime) {
    return this.compare(value) === 0;
  }

  compare(value: DateValue | DateTime) {
    return this.toDate().getTime() - DateTime.of(value).toDate().getTime();
  }

  format(formatString: string) {
    const date = this.toDate();
    const o = {
      Y: date.getFullYear(),
      M: date.getMonth() + 1,
      D: date.getDate(),
      H: date.getHours(),
      m: date.getMinutes(),
      s: date.getSeconds(),
      S: date.getMilliseconds(),
    };
    return formatString.replace(/(Y+|M+|D+|H+|m+|s+|S+)/g, (v) => {
      const key = v.slice(-1);
      return String(o[key]).padStart(v.length, "0");
    });
  }

  dateFormat(formatString = "YYYY-MM-DD") {
    return this.format(formatString);
  }

  dateTimeFormat(formatString = "YYYY-MM-DD HH:mm:ss") {
    return this.format(formatString);
  }
}
