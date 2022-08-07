import Advice from "./Advice";

export default class AroundAdvice extends Advice {
  constructor(func, { flat = false } = {}) {
    super(func);
    this.flat = flat;
  }
}
