export class QuoteInput {
  label: string;
  type: string;
  value: string | Date | number | boolean;
  constructor(label: string, type: string, value) {
    this.label = label;
    this.type = type;
    this.value = value;
  }
}
