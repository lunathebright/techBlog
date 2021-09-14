---
title: '[kata] Day 02. 음양 더하기'
date: 2021-09-08 18:39:13
category: 'codekata'
draft: false
---

**문제**

어떤 정수들이 있습니다. 이 정수들의 절댓값을 차례대로 담은 정수 배열 absolutes와 이 정수들의 부호를 차례대로 담은 불리언 배열 signs가 매개변수로 주어집니다. 실제 정수들의 합을 구하여 return 하도록 solution 함수를 완성해주세요.

**제한사항**

- absolutes의 길이는 1 이상 1,000 이하입니다.
  - absolutes의 모든 수는 각각 1 이상 1,000 이하입니다.
- signs의 길이는 absolutes의 길이와 같습니다.
  - `signs[i]` 가 참이면 `absolutes[i]` 의 실제 정수가 양수임을, 그렇지 않으면 음수임을 의미합니다.

<br/>
<br/>

---

<br/>
<br/>

**풀이**

```javascript
function solution(absolutes, signs) {
  return signs.reduce((acc, crr, idx) => {
    if (crr) {
      return acc + absolutes[idx]
    } else {
      return acc + -absolutes[idx]
    }
  }, 0)
}
```

<br/>

**다른 풀이**

```javascript
function solution(absolutes, signs) {
  return absolutes.reduce((acc, val, i) => acc + val * (signs[i] ? 1 : -1), 0)
}
```

내 풀이와 비슷하지만 음수와 양수를 1과 -1을 곱하는 방식으로 접근한 부분이 다르다. 나처럼 앞에 마이너스를 붙여주는 것보다 좀 더 깔끔하고 확실하다고 느꼈다.

<br/>
<br/>
<br/>
<br/>
