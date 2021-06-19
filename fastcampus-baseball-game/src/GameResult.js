export default class GameResult {
  // 결과 얻기
  constructor(digit, strike, ball) {
    this.digit = digit;
    this.strike = strike;
    this.ball = ball;
  }

  isDone() {
    //console.log('wonny ', this.toString());
    if (this.ball == 0 && this.strike == this.digit) {
      return true;
    }
    return false;
  }

  toString() {
    let resultString = `Strike:${this.strike} Ball:${this.ball}`;
    if (this.strike === 0 && this.ball === 0) {
      resultString = 'OUT';
    } else if (this.strike == this.digit) {
      resultString = 'STRIKE';
    } else {
      resultString = `${this.strike} S ${this.ball} B`;
    }
    return resultString;
  }
}
