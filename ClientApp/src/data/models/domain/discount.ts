export class Discount {
  constructor(name: string, scope: string, amount: number, state: string) {
    this.name = name;
    this.scope = scope;
    this.amount = amount;
    this.state = state;
  }

  discountId: number;
  name: string;
  scope: string;
  amount: number;
  state: string;
}
