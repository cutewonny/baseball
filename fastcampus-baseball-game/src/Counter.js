const Counter = (() => {
  const VALUE = Symbol();
  return class {
    constructor(id) {
      this[VALUE] = 1;
      this.container = document.getElementById(id); // id:digit-number 엘리먼트 가져오기
      if (this.container == null) throw Error(id + ' 찾을 수 없습니다.'); //엘리먼트 못찾겠네요
      this.container.innerHTML = this[VALUE]; // 엘리먼트에 우선 1 넣기
    }
    increase() {
      if (this[VALUE] > 8) return this[VALUE];
      this[VALUE] += 1;
      this.container.innerHTML = this[VALUE];
      return this[VALUE];
    }
    decrease() {
      if (this[VALUE] < 2) return this[VALUE];
      this[VALUE] -= 1;
      this.container.innerHTML = this[VALUE];
      return this[VALUE];
    }
    get value() {
      return this[VALUE];
    }
  };
})();

const counter = new Counter('digit-number');
document.getElementById('minus-btn').addEventListener('click', (e) => counter.decrease());
document.getElementById('plus-btn').addEventListener('click', (e) => counter.increase());
document.getElementById('start-btn').addEventListener('click', (e) => {
  e.preventDefault(); // form 안에 있는 input 전송 동작을 중단시킨다.
  e.stopPropagation();
  location.assign(`game.html?digit=${counter.value}`); //url 파라미터 추가
});
