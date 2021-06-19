import { getRandomInt } from './utils';
import GameResult from './GameResult';

export default class Baseball {
  constructor(digit = 3) {
    //digit: 매개 변수
    this.digit = digit; // this.digit: private 설정 변수
    this.problem = this.makeProblem(); // 정답 this,makeProblem 프로토타입, this.makeProblem(); 함수 콜
  }

  // 게임 문제 만들기 함수
  makeProblem() {
    //let arr = new Array(); //메모리를 쓴다
    let arr = []; // 리터럴에서 쓴다
    let index = 0;
    while (index < this.digit) {
      if (index == 0) {
        //arr.push(getRandomInt(0, 9));
        arr[index] = getRandomInt(0, 9);
      } else {
        let tempValue = getRandomInt(0, 9);
        let bb = arr.indexOf(tempValue);
        while (bb != -1) {
          //존재하지 않으면
          tempValue = getRandomInt(0, 9);
          bb = arr.indexOf(tempValue);
        }
        arr[index] = tempValue;
      }
      index++;
    }
    console.log('정답: ', arr);
    return arr;
  }

  // 정답 체크하기 함수
  getResult(values) {
    //guess: 내가 입력한 값
    //problem: 정답
    console.log('Baseball.js -> getResult 함수의 매개 변수 ', values); //undefined (3) [1, 2, 8]

    let strike = 0;
    let ball = 0;
    let index = 0;
    //console.log('this.problem: ', this.arr); //undefined
    console.log('this.problem: ', this.problem); //(3) [6, 5, 4]

    let guessEl;
    while (index < this.digit) {
      guessEl = values[index]; //입력한 값
      if (guessEl == this.problem[index]) {
        // 입력 == 정답
        strike++;
        console.log('자리랑 숫자가 일치함');
      } else {
        if (this.problem.indexOf(guessEl) > -1) {
          ball++;
          console.log('자리는 안맞음 숫자가 일치함');
        }
      }
      index++;
    } //while end
    return new GameResult(this.digit, strike, ball);
  }
}
