---
title: '[React] Hooks - useReducer'
date: 2021-10-27 18:02:13
category: 'fundamental'
draft: false
---

# Hooks - useReducer

```javascript
const [state, dispatch] = useReducer(reducer, initialArg, init)
```

`useReducer` 는 `useState` 의 대체 함수이다. 일반적으로 `state` 값이 이전 값에 의존적인 경우나 다수의 하윗값을 포함하는 경우에 사용한다.

`useState` 와는 다르게 상태 업데이트 로직을 컴포넌트와 분리시킬 수 있다는 장점이 있다. (분리한 상태 업데이트 로직을 별도 파일에 작성하고 불러와서 사용도 가능)

<br />

`(state, action) => newState` 의 형태로 각 액션에 짝지어진 `dispatch` 메서드를 실행시켜 업데이트된 `state` 를 반환한다.

<br />

## 사용해보기

`useReducer` 를 이용해 카운터를 만들어 보았다.

```javascript
import React, { useReducer } from 'react'

export default function Reducer() {
  const initialState = { count: 0 }

  function reducer(state, action) {
    switch (action.type) {
      case 'reset':
        return initialState
      case 'decrement':
        return { count: state.count - 1 }
      case 'increment':
        return { count: state.count + 1 }
      default:
        throw new Error()
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <div>
      <span>count: {state.count}</span>
      <button onClick={() => dispatch({ type: 'reset' })}>reset</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
    </div>
  )
}
```

1. 우선 `reducer` 함수가 필요하다. 해당 함수 내에서 발생하는 액션 타입에 따라 수행해야 되는 기능을 작성한다. 그리고 이 함수를 `useReducer` 의 첫번째 인자로 넣어주면 된다.

<br />

2. 두번째 값으로는 state의 초기값을 넣는다. 위의 예시처럼 하나의 값만 다룬다면 별도로 `initialState` 라는 변수를 지정하지 않고 원하는 초기값을 바로 넣을 수도 있다.

<br />

3. 이벤트가 필요한 엘리먼트에는 `dispatch` 함수를 사용해 적절한 타입을 지정한다.

<br />

이제 `useReducer` 는 발생한 이벤트에 지정되어 있는 타입의 메서드를 실행하고 이에 따라 업데이트 된 state 값을 반환한다.

<br />

## useReducer와 useState

`useReducer` 와 `useState` 는 결과적으로 같은 기능을 하기 때문에 둘 중 어떤 것을 사용해야 할지 고민스러울 수 있다. 단순하게 생각하면 '어떤 것을 사용했을 때 더 편해질 것 같은가'를 고려하면 된다. 아래의 기준은 절대적인 것이 아니라 둘 중 어떤 방법으로 상태값을 관리할지 결정할 때 참고할 수 있는 기준이다.

**useState**

- 컴포넌트 내에서 관리하는 상태 값이 적을 때

- 상태 구조가 단순할 때

<br />

**useReducer**

- 컴포넌트 내에서 관리하는 상태 값이 많을 때
- 상태 구조가 복잡할 때

<br/>
<br/>
<br/>
<br/>
