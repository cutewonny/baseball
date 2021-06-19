import Baseball from './Baseball';
import GuessInputControl from './GuessInputControl';

class App {
  constructor() {
    const queryParam = new URLSearchParams(location.search);
    this.digit = queryParam.get('digit'); //digit=3
    this.Baseball = new Baseball(this.digit); // 몇자리 만들까? Baseball 클래스에 값 설정
    /*
    console.log('App.js -> this.Baseball ', this.Baseball);
    Baseball {digit: "3", problem: ƒ}
    digit: "3"
    problem: ƒ makeProblem()
    */
    //console.log('App.js -> this.Baseball.problem: ', this.Baseball.problem); //   makeProblem() 함수 내용을 통째로 불러옴

    this.Baseball.problem; // Baseball 클래스에서 매개변수 콜? -> makeProblem 함수 실행 -> 문제 생성
    this.inputControl = new GuessInputControl('#guess', {
      // GuessInputControl: 추측값을 입력 받는 클래스
      callback: this.handleGuess.bind(this), //함수를 그냥 부르면 window 객체 값을 불러옴. bind로 묶으면 그안에 있는 값을 가져옴
      digitNumber: this.digit, //숫자
    });
    this.resultsContainerEl = document.querySelector('.result-container');
  }

  handleGuess(values, error) {
    //에러
    if (error) {
      alert(error.message);
      return;
    }
    console.log('App.js에 있는 handleGuess 함수: ', values); //(3) [9, 8, 7] : 입력한 값
    let result = this.Baseball.getResult(values); //결과값 받기
    console.log('result: ', result);

    // element.insertAdjacentHTML(position, text); 위치와 집어 넣을 text
    //console.log(result.isDone);
    console.log(result.isDone());
    if (result.isDone()) {
      alert('정답입니다');
      this.blockGame();
    }
    this.resultsContainerEl.insertAdjacentHTML('afterbegin', this.createResultEl(values, result.toString()));
  }

  createResultEl(a, b) {
    console.log('a: ', a);
    console.log('b: ', b);
    return `<li class="list-group-item">
    <span class="guess">${a}</span>
    <span class="badge result">${b}</span>
    </li>`;
  }

  blockGame() {
    this.inputControl.disable();
  }
}

new App();
