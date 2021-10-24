---
title: '[TS] TypeScript 타입 지정 - 기본 타입'
date: 2021-10-20 23:58:13
category: 'fundamental'
draft: false
---

# TypeScript 타입 지정 - 기본 타입

정적 타입 언어인 TS는 JS와 거의 동일한 데이터 타입을 지원한다.

- boolean
- number
- string
- array
- tuple
- enum
- any
- void
- null / undefined
- never

TS에서 공식으로 제공하는 핸드북에서는 위의 타입들을 기본 타입으로 정의하고 있다.

## boolean / number / string

boolean과 number, string은 기본 타입 중에서도 가장 기본으로 볼 수 있는 타입이라고 생각한다. 타입 지정은 아래의 코드 블럭처럼 가능하다.

```typescript
// boolean
const a: boolean = true

// number
const b: number = 1

// string
const c: string = 'text'
```

이 중 number 타입은 2진수, 8진수, 10진수, 16진수를 지원하기 때문에 아래와 같이 사용할 수 있다.

```typescript
// 10진수
const decimal: number = 6

// 16진수
const hex: number = 0xf00d

// 2진수
const binary: number = 0b1010

// 8진수
const octal: number = 0o744
```

string 타입의 경우 템플릿 문자열을 사용해 표현식을 포함시키는 것 또한 가능하다.

```typescript
const name: string = 'luna'

// 백틱을 사용한 템플릿 문자열
const introduce: string = `Hello, my is ${luna}`
```

## array

array 타입은 두 가지 방법으로 타입 지정이 가능하다.

```typescript
// array요소의 타입 뒤에 []표시
const numbers: number[] = [1, 2, 3]

// 제네릭 타입 사용
const numbers2: Array<number> = [1, 2, 3]
```

## tuple

tuple은 array와 매우 유사한 타입이다. 요소의 타입과 개수가 고정된 array라는 것이 차이점이다. (요소들의 타입은 다를 수 있다)

```typescript
const a: [string, number] = ['hello', 10]
const b: [number, number, number] = [1, 2, 3]

const c: [string, number] = ['hello', 'luna'] // 에러
const d: [number, number, number] = [1, 2] // 에러
const ㄷ: [string, number] = [10, 'luna'] // 에러
```

tuple은 요소의 타입과 개수가 고정되어 있기 때문에 각 요소의 타입과 전체 요소의 개수가 맞지 않으면 에러가 발생한다.

## enum

enum은 enumerated type으로 열거형 데이터 타입을 뜻한다. JS에서는 지원하지 않는 데이터 형태이다. 특정 값의 타입을 좁히는 데에 유용하다.

object처럼 key, value 쌍으로 사용이 가능해 코드의 가독성을 높일 수 있다는 장점이 있다. 얼핏보면 object와 다를 것이 없어 보일 수 있으나 eum은 선언 시점 이후에 변경할 수 없고, 속성값으로 문자열과 숫자만 허용한다는 점이 다르다.

```typescript
enum LangCode {
  korean = 'ko',
  english = 'en',
  japanese = 'ja',
  chinese = 'zh',
  spanish = 'es',
}

const selectedLang: LangCode = LangCode.korean

console.log(selectedLang) // "ko"
```

위와 같이 속성값으로 string을 부여하면 객체에서 key 값을 사용하는 것과 같은 효과를 낼 수 있다.

enum은 별도의 값을 부여하지 않으면 자동으로 0부터 시작하는 값을 부여한다. 속성값으로 숫자를 부여할 때는 원하는 임의의 숫자를 부분적으로 또는 전체적으로 부여가 가능하다.

```typescript
// 값을 부여하지 않았을 때
enum Colors {
  Red,
  Green,
  Blue,
}
console.log(Colors[1]) // "Green"

// 부분적으로 값을 부여했을 때
enum Colors {
  Red,
  Green = 5,
  Blue,
}
console.log(Colors[0]) // "Red"
console.log(Colors[6]) // "Blue"
// 숫자를 중간 값에 부여한 경우, 0부터 시작하고 값을 부여한 요소 뒤에서부터는 부여된 값부터 1씩 증가한다

// 전체적으로 값을 부여했을 때
enum Colors {
  Red = 2,
  Green = 6,
  Blue = 3,
}
console.log(Colors[6]) // "Green"
console.log(Colors[4]) // 에러
```

## any

any는 단어 그대로 모든 타입의 데이터를 허용한다. 이로 인해 any를 사용하면 타입에 대한 고민을 하지 않아도 된다고 느껴질 수도 있다.

하지만 무조건적으로 any를 사용하면 typescript를 사용하는 이유가 없을 뿐더러 정적 타입 언어가 제공하는 편리한 기능도 사용할 수 없다. 그렇기 때문에 any를 남발해서는 안 된다.

any는 주로 외부 라이브러리를 위해 사용하는 경우가 많다.

```typescript
let a: any = 'any type'
a = '1'
a = true
a = [1, 2, 'hello']
```

## void

void는 어떤 타입도 존재할 수 없음을 나타낸다. 일반적으로 리턴값이 없는 함수의 리턴 타입을 표현할 때 자주 사용한다.

```typescript
function example(): void {
  console.log('nothing returned')
}
```

## null / undefined

null 또는 undefined 타입의 변수에는 null 또는 undefined 값 외에 할당할 수 있는 값이 없다.

```typescript
const a: null = null
const b: undefined = undefined
```

## never

never는 절대 발생할 수 없는 타입을 말한다. 일반적으로 함수의 리턴 타입으로 사용되며, 이 경우 항상 오류를 출력하거나 리턴 값을 절대로 내보내지 않음을 의미한다.

```typescript
function throwError(message: string): never {
  throw new Error(message)
}
```

<br/>
<br/>
<br/>
<br/>
