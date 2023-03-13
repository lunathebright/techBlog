---
title: '[Book] Refactoring 2판 8장'
date: 2022-08-18 15:40:13
category: 'fundamental'
draft: false
---

# 리팩터링 2판 8장 - 기능 이동

**요소를 다른 클래스나 모듈, 필드로 옮기기**

1. 함수 옮기기
2. 필드 옮기기
   <br/>
   <br/>

**문장 단위의 옮기기**

1. 문장을 함수로 옮기기
2. 문장을 호출한 곳으로 옮기기
3. 문장 슬라이드하기
4. 인라인 코드를 함수 호출로 바꾸기
   <br/>
   <br/>

**반복문 관련**

1. 반복문 쪼개기
2. 반복문을 파이프라인으로 바꾸기
   <br/>
   <br/>

마지막으로 직접적으로 기능을 이동하는 리팩터링은 아니지만 **죽은 코드 제거하기**가 있다.

<br/>

## 함수 옮기기

함수 옮기기는 서로 연관된 요소들을 함께 묶고, 요소 사이의 연결 관계를 쉽게 찾고 이해할 수 있도록 도와주는 작업의 일종이다.
이 작업을 통해 소프트웨어의 모듈성을 높일 수 있다.

> **모듈성**
>
> 프로그램의 어딘가를 수정하려 할 때 해당 기능과 깊이 관련된 작은 일부만 이해해도 가능하게 해주는 능력

<br />

**절차**

1. 이동시킬 함수가 사용 중인 요소를 살펴 함께 옮겨야 하는지 고려한다.
2. 이동시킬 함수를 원하는 곳에 복사한 후 옮긴 위치에 맞도록 다듬는다.
3. 기존 위치에서 이동시킨 함수를 참조할 방법을 찾아 반영한다.

<br />

**예시**

중첩 함수 calculateDistance를 최상위로 옮겨 독립적으로 계산하고자 할 때

```javascript
function trackSummary(points) {
  const totalTime = calculateTime();
  const totalDistance = calculateDistance();
  const pace = totalTime / 60 / totalDistance;
  return ...

  function calculateDistance() {
    let result = 0;
    for(let i = 0; i < points.length; i++) {
      result += distance(points[i-1], points[i])
    }
    return result
  }
}

// 옮길 함수를 원하는 위치에 복사시킨다
function trackSummary(points) {
  const totalTime = calculateTime();
  const totalDistance = calculateDistance();
  const pace = totalTime / 60 / totalDistance;
  return ...

  function calculateDistance() {
    let result = 0;
    for(let i = 0; i < points.length; i++) {
      result += distance(points[i-1], points[i])
    }
    return result
  }
  ...
}

function top_calculateDistance(points) {
  // 임시 이름을 지어 구분하고 points를 매개변수로 넘겨준다
    let result = 0;
    for(let i = 0; i < points.length; i++) {
      result += distance(points[i-1], points[i])
    }
    return result
  }
```

<br />

## 필드 옮기기

적합한 데이터 구조를 사용하면 동작 코드도 자연스럽게 단순하고 직관적으로 짜여진다.
그렇기 때문에 기존의 데이터 구조가 적절하지 않다는 것을 알게 되었다면 곧바로 수정해야만 한다.

**절차**

1. 소스 필드가 캡슐화되어 있지 않다면 캡슐화한다.
2. 타깃 객체에 필드를 생성한다.
3. 소스 객체에서 타깃 객체를 참조할 수 있는지 확인한다.
4. 접근자들이 타깃 필드를 사용하도록 수정한다.

<br />

**예시**

discountRate 필드를 Customer에서 CustomerContract로 옮길 때

```javascript
class Customer {
  constructor(name, discountRate) {
    this._name = name;
    this._discountRate = discountRate;
    this._contract = new CustomerContract(dateToday());
  }

  get discountRate() {
    return this._discountRate;
  }
}

class CustomerContract {
  constructor(startDate) {
    this._startDate = startDate;
  }
}


// 이동시키고자 하는 필드를 캡슐화한다(6.6절 변수 캡슐화하기)
class Customer {
  constructor(name, discountRate) {
    ...
    this._setDiscountRate(discountRate);
    ...
  }

  _setDiscountRate(aNumber) {
    this._discountRate = aNumber
  }
  ...
}

// 이동할 위치의 클래스에 필드와 접근자를 추가한다
class CustomerContract {
  constructor(startDate, discountRate) {
    ...
    this._discountRate = discountRate;
  }

  get discountRate() {
    return this._discountRate
  }
  set discountRate(arg) {
    this._discountRate = arg;
  }
}

// Customer의 접근자들이 새로운 필드를 사용하도록 수정한다
class Customer {
  constructor(name, discountRate) {
    ...
    this._contract = new CustomerContract(dateToday());
  }

  get discountRate() {
    return this._contract.discountRate;
  }
  _setDiscountRate(aNumber) {
    this._contract.discountRate = aNumber;
  }
}
```

<br />

## 문장을 함수로 옮기기, 문장을 호출한 곳으로 옮기기

문장을 함수로 옮기기와 문장을 호출한 곳으로 옮기기는 서로 반대되는 리팩터링이다.

특정 함수를 호출할 때마다 그 앞이나 뒤에 동일한 코드가 추가로 붙는다면, 해당 부분을 함수로 옮겨 중복을 제거할 수 있다.
만약 추후에 해당 코드에 여러 변형이 필요해진다면 문장을 호출한 곳으로 다시 옮겨내는 것도 가능하다.

<br />

**예시**

사진 관련 데이터를 HTML로 내보내기

```javascript
function renderPerson(outStream, person) {
  const result = [];
  result.push(`<p>${person.photo.title}</p>`) //중복되는 부분
  result.push(emitPhotoData(person.photo));
  ...
}

function emitPhotoData(aPhoto) {
  const result = [];
  ...
}

// 옮기고자 하는 부분의 코드와 옮겨갈 코드의 호출부를 추출한다
function zznew(p) {
  return [
    `<p>${p.photo.title}</p>`,
    emitPhotoData(p)
  ]
}

// 호출부에서 바로 위에서 생성한 함수를 호출하도록 수정한다
function renderPerson(outStream, person) {
  const result = [];
  result.push(zznew(person.photo));
  ...
}

// emitPhotoData() 함수를 인라인(6.2절)한다
function zznew(p) {
  return [
    `<p>${p.title}</p>`,
    `<p>${p.location}</p>`,
    `<p>${p.date.toDateString()}</p>`,
  ]
}

// 함수 이름을 적절히 바꿔 마무리한다
zznew -> emitPhotoData
```

문장을 함수로 옮긴 위의 예시와 반대되는 리팩터링인 문장을 호출한 곳으로 옮기기도 과정은 위와 매우 비슷하다.
함수 내에 유지할 부분을 추출하고, 그 외에 변화가 필요한 부분을 적절하게 적용시켜주면 된다.

<br />

## 인라인 코드를 함수 호출로 바꾸기

함수는 여러 동작의 묶음이며, 함수 이름을 통해 목적을 말해주기 때문에 함수를 활용하면 코드를 이해하기가 쉬워진다.
또한, 반복해서 사용되는 내용을 함수로 만들어두면 그만큼 중복되는 코드를 줄일 수 있다.

```javascript
let appliesToMass = false
for (const s of states) {
  if (s === 'MA') appliesToMass = true
}

appliesToMass = states.includes('MA')
```

<br />

## 문장 슬라이드하기

문장의 위치를 이동시키는 리팩터링을 통해 관련 코드들을 함께 모아두면 코드를 이해하기가 더 쉬워진다.
문장 슬라이드의 가장 흔한 사례는 변수의 선언이다.

다른 리팩터링에 비해 절차는 간단하다. 코드 조각을 이동할 목표 위치를 찾아 해당 위치가 적합한지 확인한 후 목표 위치에 붙여 넣고 테스트를 진행한다.

<br />

## 반복문 쪼개기

반복문 하나에서 두 가지 이상의 일을 수행하는 경우가 있다. 이럴 경우 반복문을 수정할 때마다 모든 일에 대해 잘 이해하고 진행해야 한다는 단점이 있다.
그렇기 때문에 여러가지 일을 한번에 처리할 수 있는 경우에도 반복문을 쪼개는 리팩터링을 진행하기도 한다.

<br />

**예시**

```javascript
let averageAge = 0
let totalSalary = 0
for (const p of people) {
  averageAge += p.age
  totalSalary += p.salary
}
averageAge = averageAge / people.length

// 반복문을 필요한만큼 복제하고 중복으로 인해 생기는 부수효과를 파악해 제거한다
let averageAge = 0
let totalSalary = 0 // 문장 슬라이드 가능

for (const p of people) {
  averageAge += p.age
}

for (const p of people) {
  totalSalary += p.salary
}
averageAge = averageAge / people.length

// 반복문 쪼개기 후 필요에 따라 각 반복문을 함수로 추출할수도 있다
```

<br />

## 반복문을 파이프라인으로 바꾸기

map이나 filter 함수는 대표적인 파이프라인 함수로, 컬렉션을 입력받아 일련의 과정을 거친 후 다른 컬렉션을 내뱉는다.
반복문을 파이프라인 함수로 변경하면 이해하기가 훨씬 쉬워진다. 반복문을 적절한 컬렉션 파이프라인 연산으로 대체하면 되기 때문에 리팩터링도 간단한 편이다.

<br />

**예시**

```javascript
const names = []
for (const i of input) {
  if (i.job === 'programmer') {
    names.push(i.name)
  }
}

const names = input.filter(i => i.job === 'programmer').map(i => i.name)
```

<br />

## 죽은 코드 제거하기

쓰이지 않는 코드가 있다고 해서 시스템에 치명적인 영향을 주는 것은 아니지만 더 이상 사용되지 않는 코드는 지워주는 게 좋다.
과거에는 주석 처리를 하는 방법이 널리 쓰였지만 이는 버전 관리 시스템이 보편화되지 않았을 때의 이야기이다.

<br />

**절차**

1. 죽은 코드가 혹시라도 사용되는 곳이 있는지 확인한다.
2. 없다면 코드를 제거한다.

<br/>
<br/>
<br/>
<br/>
