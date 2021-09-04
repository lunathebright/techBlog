---
title: '[JS] Hoisting'
date: 2021-06-11 18:05:13
category: 'fundamental'
draft: false
---

# Hoisting (호이스팅)

hoisting이란 '끌어올리다'라는 뜻의 hoist에 ing를 붙여 만든 개념으로, 자바스크립트가 실행될 때 현재 실행되는 컨텍스트와 관련된 코드의 식별자 정보들이 우선적으로 수집되는 과정이다.

hoisting을 변수 및 함수 선언이 작성한 코드의 상단으로 물리적 이동을 하는 개념으로 설명하는 경우가 많은데 실제로는 그렇지 않다. hoisting은 자바스크립트 엔진이 변수 정보를 수집하는 과정을 이해하기 쉽게 코드 상단으로 끌어올리는 것에 비유한 가상의 개념이다.

하지만 hoisting은 실행되는 컨텍스트의 대상이 되는 코드 내에 존재하는 식별자에만 관심이 있을 뿐, 식별자에 어떤 값이 할당되어 있는지는 궁금해하지 않는다. 그러므로 오로지 식별자만이 hoisting과정에 포함되어 상단으로 끌어올려지고, 할당 과정은 코드가 작성된 위치에 남아있는다.

## Hoisting의 예시

```javascript
console.log(a) //undefined

var a = 1
```

위의 코드에서 첫 구문의 결과가 undefined가 나타나는 이유가 바로 hoisting의 결과이다. 코드의 순서대로라면 첫 줄의 구문이 실행될 때 변수 a는 선언도 되지 않은 상태이다. 그러므로 'a is not defined'라는 ReferenceError가 발생하는 것이 맞다. undefined라는 것은 이미 선언되었지만 값이 할당되지는 않은 변수의 값이기 때문이다.

해당 코드가 실행될 때, 자바스크립트 엔진은 현재 실행되는 컨텍스트(예시의 경우는 전역 컨텍스트)의 내부에 존재하는 식별자를 코드 실행 전 우선적으로 수집한다. 실제로 물리적 이동이 일어나는 것은 아니지만 아래와 같은 형태의 과정을 거쳐 a의 값으로 undefined가 출력되게 되는 것이다.

```javascript
var a

console.log(a)

a = 1
```

## 함수의 Hoisting

함수도 hoisting의 대상이기 때문에 hoisting되는 기본 원리는 위와 동일하지만 함수가 표현식인지 선언식인지에 따라 차이가 생긴다.

> **함수 표현식(Functon Expression)과 함수 선언식(Function Declaration)**
>
> ```javascript
> //함수 표현식
> var func = function() {}
> //함수 선언식
> function func() {}
> ```

함수의 기본 형태는 함수 선언식의 형태로 볼 수 있다. 함수 표현식은 작성한 함수를 특정 변수에 할당시켜 함수를 변수 내에 위치시키는 것이다. 이러한 차이는 hoisting 과정에서 아래와 같은 결과를 가져온다.

```javascript
//hoisting 전
func1()

var func1 = function() {
  console.log('func')
}

//------------------------

func2()

function func2() {
  console.log('func')
}

///hoisting 후
var func1

func1() //TypeError: func1 is not a function

func1 = function() {
  console.log('func')
}

//------------------------

function func2() {
  console.log('func')
}

func2() //func
```

func1과 func2는 동일한 내용을 수행하지만 결과는 위처럼 달라진다. 위에서 설명했던 내용인 'hoisting은 코드 실행 전 현재 실행되는 컨텍스트 내부의 식별자를 우선적으로 수집하는 과정이다'를 잘 생각해보면 당연한 결과이다.

func1은 func1이라는 변수에 담긴 함수이기 때문에 식별자가 hoisting된 시점에서는 아직 함수가 아닌 func1이라는 변수명일 뿐이다. func1 내부에 담긴 함수의 내용은 코드가 작성된 위치를 실행시킬 차례가 되어야 func1에 할당된다. 그렇기 때문에 func1이 작성된 위치보다 위에서 func1을 호출하면 func1 is not a function이라는 에러가 발생한다.
그에 비해 func2는 함수 hoisting 과정에서 함수 자체가 끌어올려지기 때문에 함수를 호출했을 때 문제없이 func라는 문자열이 출력된다.

위의 결과를 보고 나면 '그럼 아무데서나 사용하기 편리하도록 함수 선언식을 사용해야지!'라는 생각이 생길수도 있다. 하지만 아무데서나 사용할 수 있다는 것은 생각과 다르게 절대로 편리하지 않다. 이는 변수를 생성할 때 과거에 사용하던 var가 아닌 const나 let 사용을 추천하는 것과 같은 맥락이다. 동명의 함수를 작성해 기존에 있던 함수를 덮어씌우는 것과 같이 예상하지 못했던 일이 발생하면 의도했던 결과와는 전혀 다른 결과를 얻게 될 수 있다. 때문에 코드의 가독성과 유지보수를 위해 불필요한 hoisting이 발생하지 않도록 코드를 작성하는 것이 좋다.

<br />

## let과 const의 Hoisting

위에 작성된 모든 예시에서는 var가 사용되었다. var를 사용한 변수 선언 과정이 일반적인 hoisting 맥락을 이해하기 쉽기 때문이다. let이나 const 사용 시 var와는 다른 hoisting 결과를 볼 수 있다.

let/const와 var의 hoisting이 다른 이유는 변수 생성 과정에 차이가 있기 때문이다. 변수는 선언과 초기화, 할당의 세 단계에 걸쳐 생성된다.

<br/>

**변수 생성 단계**

1. 선언(Declaration)
   변수가 실행 컨텍스트 내의 변수 객체에 등록된다.

2. 초기화(Initialization)
   변수 객체에 등록된 변수를 저장하기 위해 메모리 공간을 확보한다.
   이때 변수의 값으로 'undefined'를 할당한다.

3. 할당(Assignment)
   실제로 할당한 값을 변수의 값으로 할당한다.

<br/>

그런데 var는 선언과 초기화가 동시에 이루어진다. 선언과 동시에 undefined가 할당되는 것이다. 이와 다르게 let과 const는 선언과 초기화가 별도로 이루어지기 때문에 변수를 선언한 시점에는 메모리에 값을 저장할 자리도 준비되어 있지 않다. undefined라는 값조차 가질 수 없는 상태인 것이다.

이렇게 선언만 되어있고 초기화가 되지 않아 액세스 할 수 없는 변수는 TDZ(Temporal Dead Zone)에 위치해 있다.
<span style="color: #9D9F9D;">TDZ는 이름 그대로 일시적으로 죽어있는 공간이라고 생각하면 된다.</span>

결과적으로 const와 let은 hoisting이 이루어지기는 하지만 선언과 초기화가 별도로 이루어지기 때문에 변수에 값을 할당하기 전 접근하면 ReferenceError를 발생시킨다.

<br/>
<br/>
<br/>
<br/>
