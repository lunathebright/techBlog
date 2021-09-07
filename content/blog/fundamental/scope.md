---
title: '[JS] Scope'
date: 2021-09-07 15:18:13
category: 'fundamental'
draft: false
---

# Scope (스코프)

**scope의 사전적 정의**

n. (주제조직활동 등이 다루는)범위

<br/>

**scope의 컴퓨터 공학적 정의**

식별자 접근 규칙에 따른 유효 범위

<br/>

'식별자 접근 규칙에 따른 유효 범위'라는 설명을 보면 괜히 어렵게 느껴진다. 하지만 이를 좀 더 단순하게 생각해보면 그냥 '접근 가능한 범위'이고, 다만 식별자에 따라서 규칙이 변경될 수 있다는 조건이 붙은 것이다.

예를 들어, 함수 A의 외부에서 선언한 변수는 함수 A 내부를 포함해 어디에서든 접근 가능하지만 A 내부에서 선언한 변수는 A 밖에서는 접근할 수 없다. 이러한 유효 범위를 scope라 부른다.

<br/>

## scope의 구분

### Global Scope (전역 유효범위)

전역에서 선언되었으며, 어느 위치에서든 참조할 수 있다.

```javascript
const a = 'global'

function test() {
  console.log(a) // 'global'
}

console.log(a) // 'global'
```

<br/>

### Local Scope (지역 유효범위)

지역(함수 또는 코드 블록) 내에서 선언된 변수이며 그 지역과 그 지역의 내부 지역에서만 참조할 수 있다.

<span style="color: #9D9F9D;">ES5까지는 코드 블록이 아닌 함수만 scope 생성 가능</span>

```javascript
function test() {
  const a = 'local'
  console.log(a) // 'local'
}

console.log(a) // ReferenceError: a is not defined

function test2() {
  console.log(a) // ReferenceError: a is not defined
}
```

<br/>

## scope의 특징

### scope는 중첩 가능하다

한 함수 안에 다른 함수가 포함된 경우 scope가 중첩된다. 이를 nested scope라 부른다.

```javascript
function outer() {
  const a = 1

  function inner() {
    const b = 2
    console.log(a) // 1
  }

  console.log(b) // ReferenceError: b is not defined
}
```

위와 같이 특정 함수 내부에 위치한 함수에서는 자신이 포함된 함수의 식별자에 접근이 가능하다. 하지만 반대로 외부의 함수에서 내부 함수의 식별자에 접근하는 것은 불가능하다.

함수가 중첩된 경우 내부 함수의 식별자에 접근 가능한 것은 Lexical Environment의 outer Environment Reference 때문이다.

<span style="color: #9D9F9D;">outer Environment Reference 는 직전 컨텍스트의 Lexical Environment 정보를 참조한 정보를 말한다.</span>

'선언'이라는 행위는 기본적으로 콜 스택 상에서 실행 컨텍스트가 활성화된 상태에서만 일어날 수 있다. 그렇기 때문에 어떤 함수 내부에서 선언된 함수는 자신을 포함하고 있는 함수의 Lexical Environment를 참조해 알고 있는 상태이고, 이로 인해 자신이 포함된 함수의 식별자에 접근이 가능한 것이다.

사실 global scope를 가진 식별자들이 어디에서든 접근 가능한 것도 같은 이유이다. 자신이 포함되어 있는 컨텍스트를 계속 타고 올라가다 보면 마지막에는 전역 컨텍스트에 도달하기 때문이다.

또한, 중첩이 여러번 발생한 경우에는 자신의 바로 바깥부터 차례대로 참조하기 때문에 동일한 식별자를 여러번 사용한 경우 가장 인접한 식별자만이 유효하다.

<br/>
<br/>
<br/>
<br/>
