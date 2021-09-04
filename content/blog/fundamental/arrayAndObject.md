---
title: '[JS] 배열과 객체'
date: 2021-06-05 18:05:13
category: 'fundamental'
draft: false
---

## 배열 array

배열은 리스트 형태를 만드는 객체이다. 배열의 길이는 언제든지 늘어나거나 줄어들 수 있다. 일반적으로 `const arr = []` 형태로 생성하며 [] 안에 ','를 사용해 리스트를 작성한다.(new Array()로도 생성 가능)

배열 내부에는 함수, 배열, 객체 등 모든 타입이 들어갈 수 있으며, 0부터 시작하는 요소 인덱스를 가지고 있다. 또한, 배열은 배열에서 사용 가능한 기본적인 내장함수를 가지고 있다.

```javascript
const arr = ['a', 'b', 'c']

console.log(arr[0]) //a
```

<br />

## 객체 object

객체는 key, value 구조로 이루어져있다. 배열과는 다르게 순서가 없다. 일반적으로 `const obj = {name: 'my name', age: 'my age'}` 형태로 생성하며 {} 안에 ','를 사용해 프로퍼티를 작성한다.(new Object()로도 생성 가능)

```javascript
const person = {
	name: {firstName: 'Jane', lastName: 'Doe'},
  	age: 10,
  	gender: 'female;,
  	likes: ['ballet', 'music', 'travel'],
    sayHello: function() {
    	console.log(`Hi!`) //Hi!
    }
}

console.log(person.name.firstName); //Jane
console.log(person.likes[2]); //travel
person.sayHello(); //Hi!
```

<br/>
<br/>
<br/>
<br/>
