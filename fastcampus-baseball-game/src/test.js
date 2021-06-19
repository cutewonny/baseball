// 클래스명 MyClass는 함수 표현식과 동일하게 클래스 몸체 내부에서만 유효한 식별자이다.
const Foo = class MyClass {};

const foo = new Foo();
console.log(foo); // MyClass {}

new MyClass(); // ReferenceError: MyClass is not defined
