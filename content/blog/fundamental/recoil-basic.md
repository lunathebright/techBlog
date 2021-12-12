---
title: '[Recoil] 상태 관리 라이브러리 Recoil'
date: 2021-11-01 15:19:13
category: 'fundamental'
draft: false
---

# React 상태관리 라이브러리 Recoil

recoil은 react를 위한 상태관리 라이브러리로, react와 동일하게 페이스북에서 제작 및 관리하고 있다.

상태 관리를 위해 기존에 주로 사용되던 redux나 mobX 등 과는 다르게 react 내부에 접근이 가능하다는 것이 가장 큰 차이점이다. 사용 방식이 react hook과 굉장히 유사해 러닝커브도 아주 낮은 편이다. 또한, redux의 단점으로 꾸준히 언급되는 많은 양의 보일러 플레이트 코드도 필요하지 않다는 장점이 있다.

<br />

> [Recoil](https://recoiljs.org/ko/)

<br />

## 사용해보기

### Install

```javascript
npm install recoil

or

yarn add recoil
```

우선 위 명령어로 react 프로젝트에 recoil을 설치한다. (cra 기준)

<br />

### RecoilRoot

```javascript
// App.js
import { RecoilRoot } from 'recoil'

function App() {
  return (
    <RecoilRoot>
      <화면을 구성할 컴포넌트 />
    </RecoilRoot>
  )
}
```

특정 컴포넌트에서 recoil로 상태 값을 사용하기 위해서는 해당 컴포넌트의 부모 트리 중 `RecoilRoot` 가 있어야 한다. 전역적인 상태 관리를 위해서 가장 추천되는 위치는 루트 컴포넌트이다(App.js)

<br />

### Atom

```javascript
// store.js

const countState = atom({
  key: 'countState', // unique ID (with respect to other atoms/selectors)
  default: 0, // default value (aka initial value)
})
```

`atom` 은 어떤 컴포넌트에서나 읽고 쓸 수 있는 state의 일부이다. `atom` 값을 읽는 컴포넌트들은 암묵적으로 `atom` 을 구독하고 있기 때문에 값에 변화가 생기면 해당 `atom` 을 구독하는 모든 컴포넌트들이 리렌더링 된다.

recoil에서 별도로 store의 개념에 대한 안내가 있지는 않다. 하지만 다양한 값을 관리하기 위해서는 값을 한 곳에 모아두는 것이 편리하다고 생각되어 `store.js` 파일에 필요한 `atom` 을 만들어주었다.

#### useRecoilState

```javascript
// Count.jsx

export default function Count() {
  const [count, setCount] = useRecoilState(countState)

  return (
    <div>
      <div>count: {count}</div>
      <div>
        <button
          onClick={() => {
            setCount(prev => prev - 1)
          }}
        >
          -
        </button>
        <button
          onClick={() => {
            setCount(prev => prev + 1)
          }}
        >
          +
        </button>
        <button>reset</button>
      </div>
    </div>
  )
}
```

store에 저장해놓은 값을 사용하기 위해서는 `useRecoilState` 함수를 사용하면 된다. 인자로는 사용할 값의 이름을 넣어준다. 그리고 `useState` 를 사용할 때와 동일하게 사용하면 된다.

#### useResetRecoilState

```javascript
// Count.jsx

export default function Count() {
  const [count, setCount] = useRecoilState(countState)
  const resetCount = useResetRecoilState(countState)

  return (
    <div>
      <div>count: {count}</div>
      <div>
        <button
          onClick={() => {
            setCount(prev => prev - 1)
          }}
        >
          -
        </button>
        <button
          onClick={() => {
            setCount(prev => prev + 1)
          }}
        >
          +
        </button>
        <button onClick={resetCount}>reset</button>
      </div>
    </div>
  )
}
```

값 초기화를 위해서는 `useResetRecoilState` 를 사용한다. `atom` 생성 시 부여한 default 값을 사용할 수 있다.

#### useRecoilValue

```javascript
// Text.jsx

export default function Text() {
  const count = useRecoilValue(countState)
  return <div>총 카운트 수는 {count}입니다.</div>
}
```

읽기 전용 컴포넌트인 `Text` 를 만들어주었다. `useRecoilValue` 를 사용하면 현재 값에 대한 정보만 받아올 수 있고 수정은 불가하다.

#### useSetRecoilState

```javascript
// Input.jsx

export default function Input() {
  const setCount = useSetRecoilState(countState)
  return (
    <div>
      <input onChange={e => setCount(e.target.value)} type="number" />
    </div>
  )
}
```

수정 전용 컴포넌트인 `Input` 이다. `useSetRecoilState` 함수를 이용해 값을 변경할 수 있다.

<br />

### Selector

```javascript
// store.js

export const countSelector = selector({
  key: 'countSelector',
  get: ({ get }) => {
    const count = get(countState)
    return count.toString()
  },
})
```

selector는 atom의 상태에 의존해 파생된 상태를 나타낸다. 상태 값을 사용해 필요에 맞게 가공된 상태를 표현할 수 있다는 뜻이다.

`get` 함수는 selector의 필수 항목이며, 필요한 atom 정보를 1개 이상 가져올 수 있기 때문에 atom을 조합해 새로운 데이터 생성이 가능하다.

```javascript
set: ({ set }, newValue) => {
  set(수정할 atom, 수정 내용);
}
```

selector의 옵션인 `set` 을 사용해 복수의 atom 값을 수정도 가능하다.

<br />
<br />
<br />

<hr />
Recoil의 사용법을 간단하게 알아보았는데 직접 사용해보니 생각했던 것보다도 러닝 커브가 낮아서 놀라웠다. 기존에 이미 hook을 사용하고 있었다면 새로 배워야 할 개념은 거의 없다고 봐도 될 정도라고 생각한다.

2020년 5월에 발표되어 아직 0.4.1 버전이라는 것이 유일한 아쉬움이다. 리액트의 시장점유율이 앞으로도 지금과 같다면 막강한 파급력을 갖게 되지 않을까 하는 기대가 있다.

<br/>
<br/>
<br/>
<br/>
