---
title: '[TS] Type assertion(타입 단언)'
date: 2021-10-21 00:09:13
category: 'fundamental'
draft: false
---

# Type assertions(타입 단언)

타입 단언은 컴파일러에게 타입에 대한 확신을 주는 것이다. TS보다 개발자가 값에 대해 더 잘 알고 있고 타입을 단언할 수 있을 때 사용하게 된다.

다른 언어의 타입 변환과 유사하지만 별도의 검사를 하거나 데이터 재구성을 하지 않는다는 특징이 있다. 온전히 컴파일 과정에서만 사용된다.

타입 단언은 두 가지 방법으로 가능하다.

```typescript
// angle-bracket 문법
const value: any = 'hello'
const strLength: number = (<string>value).length

// as 문법
const value: any = 'helo'
const strLength: number = (value as string).length
```

angle-bracket을 사용한 문법과 as를 사용한 문법의 내용은 동일하다. (JSX와 함께 사용할 때는 as 문법만 사용 가능)

아래와 같은 사용도 가능하다.

```typescript
interface IPerson {
  name: string
  age: number
}

const person = {} as IPerson
person.name = 'luna'
person.age = '10'
```

## Type assertion 주의점

타입 단언을 사용하면 다른 코드에서 가져온 부분을 활용하거나 기존의 코드를 수정할 때 쉽게 넘어갈 수 있다. 하지만 개발자가 실수한 경우에도 TS가 알려주지 않는다. 그렇기 때문에 되도록이면 타입 단언을 사용하기 보다 타입을 지정해주는 것이 안전하다.

```typescript
interface IPerson {
  name: string
  age: number
}

const person = {} as IPerson
// 이 경우 person 안에 필요한 속성에 대한 정보가 없다
```

<br/>
<br/>
<br/>
<br/>
