export default class GuessInputControl {
  // 추측값을 입력 받는 클래스
  constructor(containerSelector, digitNumber) {
    // 추측되는 정답을 입력 받는 컨트롤 클래스
    this.inputEl = document.querySelector(containerSelector); //#guess

    if (this.inputEl == null) {
      throw Error('컨테이너 아이디를 찾을 수 없습니다.');
    }

    this.inputEl.addEventListener('keydown', (e) => {
      console.log('e는 무엇일까: ', e); // 마치 지켜보는 것처럼 키보드를 치면 생성된다.
      //KeyboardEvent {isTrusted: true, key: "1", code: "Digit1", location: 0, ctrlKey: false, …}
      //KeyboardEvent {isTrusted: true, key: "2", code: "Digit2", location: 0, ctrlKey: false, …}
      //KeyboardEvent {isTrusted: true, key: "Enter", code: "NumpadEnter", location: 3, ctrlKey: false, …}
      console.log('e.target.value는 무엇일까: ', e.target.value); //guess라는 id를 가진 상자에 들어 있는 값: 543
      if (e.keyCode === 13) {
        const values = Array.from(e.target.value).map((v) => Number(v));
        console.log('values ', values);
        //Array.from는 문자열을 하나하나 따로 배열로 값 넣는다. 543 -> [5,4,3]
        //array.map(x => x * 2); map은 배열 내 각각을 -> 함수로 적용 -> 결과를 새로운 배열로 만듦
        if (values.length != digitNumber.digitNumber) {
          throw new Error('자릿수가 맞지 않습니다!');
        }
        digitNumber.callback(values); // 매개변수에 값을 전달을 이렇게 한다고? 다른 방법은 없나?

        //정답이 맞았습니다.
        //let test2 = digitNumber.getResult;
        //console.log(test2);

        this.clear();
        return;
      }
    });
  }
  disable() {
    this.inputEl.disable = true;
    this.inputEl.placeholder = '게임 끝';
  }

  clear() {
    this.inputEl.value = '';
  }
}
