---
title: '[JS] var, let, const의 차이'
date: 2021-06-05 18:05:13
category: 'fundamental'
draft: false
---

# ~ES5

var는 ES5까지 변수를 선언할 수 있는 유일한 방법이었다.

var는 함수의 코드 블록만을 스코프로 인정하는 함수 레벨 스코프를 가지기 때문에 함수 외부에 생선한 변수는 모두 전역 변수이다. 전역 변수는 유효 범위가 넓어서 의도치 않은 변수값의 변경 등이 일어나기 쉽기 때문에 사용을 자제해야 한다.

또한, var를 사용할 경우 호이스팅으로 인해 변수를 선언하기 전에 참조할 수 있게 된다. 이는 간단한 코드에서는 변수 접근이 쉽게 만들어줄 수 있지만 의도하지 않은 결과를 만들어낼 수도 있다.

## var

변수 재선언, 재할당 가능

```javascript
var variable = '변수선언'
console.log(variable) //변수선언

var variable = '변수재선언'
console.log(variable) //변수재선언

variable = '변수재할당'
console.log(variable) //변수재할당
```

<br/>

# ES6~

var의 문제점을 보완해 ES6부터 새롭게 등장한 키워드로 let과 const가 있다.

let과 const는 블록 레벨 스코프를 갖기 때문에 모든 코드 블록({}, 함수, if문, for문, while문 등) 내에서 선언된 변수는 코드 블록 내에서만 유효하다.(=지역 변수)

또한, let과 const는 호이스팅이 이루어지는 것도 var와 다르다. 선언 단계와 초기화 단계가 분리되어 진행되기 때문에(초기화는 변수 선언문이 도달했을 때 이루어짐) 초기화 이전에 변수에 접근하면 Reference Error가 발생한다.

let과 const는 기본적으로 굉장히 유사하지만, 재할당 가능 여부에 따라 사용 용도가 나뉜다. ES6이후의 JS에서는 변수 선언을 위해 const를 사용하고 재할당이 필요한 경우에 한정적으로 let을 사용하길 추천하고 있다.

## let

변수 재선언 불가, 재할당 가능

```javascript
let variable = '변수선언'
console.log(variable) //변수선언

let variable = '변수재선언'
console.log(variable) //변수재선언
//개발자도구 확인 시 Syntax Error 발생

variable = '변수재할당'
console.log(variable) //변수재할당
```

변수의 재할당이 가능하기 때문에 값을 재할당해야 하는 경우에 유용하게 사용이 가능하다.

## const

변수 재선언, 재할당 불가

```javascript
const variable = '변수선언'
consolel.log(variable) //변수선언

const variable = '변수재선언'
console.log(variable) //에러 발생

variable = '변수재할당'
console.log(variable) //에러 발생
```

변수의 재할당이 불가능하기 때문에 const를 이용해 값을 할당하게 되면 원치않는 값의 변경이 발생할 가능성을 차단한다.

<br/>
<br/>
<br/>
<br/>
