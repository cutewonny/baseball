export function getRandomInt(min, max) {
  // 2~9 --> 0.1 * 8 = 0.8 +2 = 2
  // 1~9 -> 0.1 * 9 = 0.9 +1 = 1
  let a = Math.floor(Math.random() * (max - min + 1)) + min;
  //Math.floor() 함수는 주어진 숫자와 같거나 작은 정수 중에서 가장 큰 수를 반환합니다
  //Math.random() 함수는 0 이상 1 미만의 구간에서 근사적으로 균일한 부동소숫점 의사난수를 반환
  console.log('랜덤 숫자 만들기 >>>> ', a);
  return a;
}
