---
title: '[JS] 알아두면 좋은 문법'
date: 2021-09-09 15:35:13
category: 'fundamental'
draft: false
---

## Nullish Coalescing Operator 널 병합 연산자

nullish coalescing operator는 왼쪽 피연산자가 null 또는 undefined인 경우 오른쪽 피연산자를 반환하고, 그렇지 않은 경우 왼쪽 피연산자를 반환한다.

논리 연산자의 or(||)와 비슷해 보일 수 있지만 or는 null과 undefined를 포함해 falsy한 값일 경우 오른쪽 피연산자를 반환한다는 차이점이 있다.

```javascript
const example = str => {
  const result = str ?? 'none'
  console.log(result)
}

example('Hi') // Hi
example(null) // none
```

nullish coalescing operator를 사용해 아래와 같은 표현도 가능하다.

```javascript
const defaultValue = () => {
  return null
}

const realData = () => {
  return 'something'
}

const result = defaultValue() ?? realData()
```

## Optional Chaining

optional chaining 은 체인의 각 참조의 유효성을 명시적으로 검증하지 않고도 객체 체인 내에 위치한 속성 값을 읽을 수 있다.

만약 유효하지 않은 값에 접근하려 하면 에러를 발생시키지 않고 undefined를 리턴한다.

```javascript
const person = {
  name: 'Luna',
  dog: {
    name: 'moomoo',
  },
}

const dogName = person.dog?.name
console.log(dogName) // moomoo

const catName = person.cat?.name
console.log(catName) // undefined
```

아래와 같이 활용하는 것도 가능하다.

```javascript
const displayPetName = person => {
  const dogName = person.dog?.name ?? 'no dog'
  const catName = person.cat?.name ?? 'no cat'
}
```

<br/>
<br/>
<br/>
<br/>
