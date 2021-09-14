---
title: '[kata] Day 05. 부족한 금액 계산하기'
date: 2021-09-11 15:24:13
category: 'codekata'
draft: false
---

**문제**

새로 생긴 놀이기구는 인기가 매우 많아 줄이 끊이질 않습니다. 이 놀이기구의 원래 이용료는 price원 인데, 놀이기구를 N 번 째 이용한다면 원래 이용료의 N배를 받기로 하였습니다. 즉, 처음 이용료가 100이었다면 2번째에는 200, 3번째에는 300으로 요금이 인상됩니다.
놀이기구를 count번 타게 되면 현재 자신이 가지고 있는 금액에서 얼마가 모자라는지를 return 하도록 solution 함수를 완성하세요.
단, 금액이 부족하지 않으면 0을 return 하세요.

**제한사항**

- 놀이기구의 이용료 price : 1 ≤ price ≤ 2,500, price는 자연수
- 처음 가지고 있던 금액 money : 1 ≤ money ≤ 1,000,000,000, money는 자연수
- 놀이기구의 이용 횟수 count : 1 ≤ count ≤ 2,500, count는 자연수

<br/>
<br/>

---

<br/>
<br/>

**풀이**

```javascript
function solution(price, money, count) {
  let totalPrice = 0

  ;[...Array(count)].forEach((_, idx) => {
    totalPrice = totalPrice + price * (idx + 1)
  })

  return money - totalPrice < 0 ? (money - totalPrice) * -1 : 0
}
```

<br/>

**다른 풀이**

```javascript
function solution(price, money, count) {
  const tmp = (price * count * (count + 1)) / 2 - money
  return tmp > 0 ? tmp : 0
}
```

이런 유형의 문제가 주어지면 반복문을 활용해야 한다는 생각이 가장 먼저 드는데, 이 풀이는 반복문 없이 가우스 공식을 활용한 풀이라 인상 깊었다. 확실히 알고리즘 풀이는 수학적인 지식이 뒷받침되면 더 수월한 것 같다.

<br/>
<br/>
<br/>
<br/>
