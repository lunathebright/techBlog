---
title: '[kata] Day 01. 직사각형 그리기'
date: 2021-09-07 16:24:13
category: 'codekata'
draft: false
---

**문제**

직사각형을 만드는 데 필요한 4개의 점 중 3개의 좌표가 주어질 때, 나머지 한 점의 좌표를 구하려고 합니다. 점 3개의 좌표가 들어있는 배열 v가 매개변수로 주어질 때, 직사각형을 만드는 데 필요한 나머지 한 점의 좌표를 return 하도록 solution 함수를 완성해주세요. 단, 직사각형의 각 변은 x축, y축에 평행하며, 반드시 직사각형을 만들 수 있는 경우만 입력으로 주어집니다.

**제한사항**

- v는 세 점의 좌표가 들어있는 2차원 배열입니다.
- v의 각 원소는 점의 좌표를 나타내며, 좌표는 [x축 좌표, y축 좌표] 순으로 주어집니다.
- 좌표값은 1 이상 10억 이하의 자연수입니다.
- 직사각형을 만드는 데 필요한 나머지 한 점의 좌표를 [x축 좌표, y축 좌표] 순으로 담아 return 해주세요.

<br/>
<br/>

---

<br/>
<br/>

**풀이**

```javascript
function solution(v) {
  let coordX = []
  let coordY = []

  v.forEach(el => {
    coordX.push(el[0])
    coordY.push(el[1])
  })

  function findCoord(coords) {
    return coords.filter(
      coord => coords.indexOf(coord) === coords.lastIndexOf(coord)
    )
  }

  return [findCoord(coordX), findCoord(coordY)].flat()
}
```

<br/>

**다른 풀이**

```javascript
answer[0] = v[0][0] ^ v[1][0] ^ v[2][0]
answer[1] = v[0][1] ^ v[1][1] ^ v[2][1]

return answer
```

다른 풀이를 찾아보다가 비트연산자를 사용하는 방법을 알게 되었다. 알고는 있지만 익숙하지 않아서 제대로 사용해 본 적이 없는데 풀이 자체도 간단하고, 테스트 해보지는 않았지만 이진수를 시간복잡도도 훨씬 낮을 것이라고 생각된다.

<br/>
<br/>
<br/>
<br/>
