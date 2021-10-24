---
title: '[JS] 배열 내장함수'
date: 2021-06-06 18:05:13
category: 'fundamental'
draft: false
---

# 배열 내장함수

배열에는 기본적으로 제공되는 내장함수(array method라고 부르기도 함)가 있다. 자주 사용하는 것들 위주로 정리해보자.

<br/>

## push()

배열 가장 뒷부분에 값을 삽입

```javascript
let arr = [1, 2, 3]
arr.push(4)
console.log(arr) //[1, 2, 3, 4]
```

## pop()

배열 가장 뒷부분의 값을 삭제

```javascript
let arr = [1, 2, 3, 4]
arr.pop()
console.log(arr) //[1, 2, 3]
```

## unshift()

배열 가장 앞부분에 값을 삽입

```javascript
let arr = [1, 2, 3]
arr.unshift(0)
console.log(arr) //[0, 1, 2, 3]
```

## shift()

배열 가장 앞부분의 값을 삭제

```javascript
let arr = [1, 2, 3, 4]
arr.shift()
console.log(arr) //[2, 3, 4]
```

## splice()

배열의 특정 위치에 요소를 추가하거나 삭제
원본 배열을 수정한다는 특징이 있음

```javascript
splice(start, deleteCount, item1, item2, ...)

let arr = [1, 2, 3, 4, 5];
arr.splice(2, 2); //인덱스 2에서부터 2개 요소 제거
console.log(arr); //[1, 2, 5]

let arr = [1, 2, 3, 4, 5];
arr.splice(2, 1, "a", "b"); //인덱스 2에서부터 1개 요소 제거 후 "a"와 "b" 추가
console.log(arr); //[1, 2, "a", "b", 4, 5]
```

## slice()

배열의 startIndex부터 endIndex 바로 앞 요소까지에 대한 shallow copy를 새로운 배열로 반환
원본 배열은 그대로임

```javascript
let arr = [1, 2, 3, 4, 5, 6]
let newArr = arr.slice(2, 4)
console.log(arr, newArr) //[1, 2, 3, 4, 5, 6] [3, 4]
```

## concat()

여러개의 배열을 하나로 합치고 병합된 배열의 사본을 반환
인자로 들어온 배열의 순서대로 합쳐짐

```javascript
let arr1 = [1, 2, 3]
let arr2 = [4, 5, 6]
let arr3 = [7, 8, 9]

let concatted = arr1.concat(arr3, arr2)
console.log(concatted) //[1, 2, 3, 7, 8, 9, 4, 5, 6]
```

## every()

배열에 있는 각 요소에 callback 함수를 실행해 반환 값이 모두 true인지 확인
모든 case가 true이면 true 반환, 하나라도 false이면 false 반환

```javascript
let arr = [1, 2, 3, 4, 5, 6]

console.log(arr.every(item => item < 3)) //false
console.log(arr.every(item => item < 7)) //true
```

## some()

배열에 있는 각 요소에 callback 함수를 실행해 하나라도 true가 있는지 확인
하나라도 true가 있으면 true 반환, 모두 false이면 false 반환

```javascript
let arr = [1, 2, 3, 4, 5, 6]

console.log(arr.some(item => item < 2)) //true
console.log(arr.some(item => item > 7)) //false
```

## forEach()

주어진 함수를 배열 요소에 각각 실행

```javascript
let arr = [1, 2, 3]

arr.forEach(item => {
  console.log(item + 1)
})
//2
//3
//4
```

## map()

배열의 각 요소에 주어진 함수를 실행한 결과로 구성된 새로운 배열을 반환

```javascript
let arr = [1, 2, 3]

arr.map(item => item + 1) //[2, 3, 4]
```

## filter()

배열의 각 요소에 주어진 함수를 실행해 결과가 true인 값들로만 구성된 새로운 배열을 반환

```javascript
let arr = [1, 2, 3, 4, 5, 6]

let result = arr.filter(item => item % 2 === 0)
console.log(result) //[2, 4, 6]
```

## sort()

배열을 정렬할 때 사용
인자를 넣지 않으면 유니코드 순서에 따라 정렬됨, 인자를 넣으면(function) 인자의 조건에 따라 정렬됨

```javascript
let arr = [3, 11, 20, 15, 24]
console.log(arr.sort()) //[11, 15, 20, 24, 3]

//오름차순
arr.sort((a, b) => a - b) //[3, 11, 15, 20, 24]

//내림차순
arr.sort((a, b) => b - a) //[24, 20, 15, 11, 3]
```

## toString()

배열 내부의 요소를 문자열로 바꾸어 반환

```javascript
let arr = [1, 2, 3, 4]
console.log(arr.toString()) //1,2,3
```

## join()

배열 원소 전부를 하나의 문자열로 합쳐 반환
인자로 넣은 값이 배열 원소 사이의 연결 문자가 됨

```javascript
let arr = [1, 2, 3, 4]
console.log(arr.join()) //1,2,3,4
console.log(arr.join('-')) //1-2-3-4
```

## indexOf()

인자로 번달된 요소와 매치되는 첫번째 요소의 인덱스 반환
일치하는 요소가 없으면 -1 반환

```javascript
let arr = ['a', 'b', 'c', 'd']

console.log(arr.indexOf('b')) //1
console.log(arr.indexOf(5)) //-1
```

## reverse()

배열의 원소 순서를 역전시킴

```javascript
let arr = [1, 2, 3, 4]
console.log(arr.reverse()) //[4, 3, 2, 1]
```

<br/>
<br/>
<br/>
<br/>
