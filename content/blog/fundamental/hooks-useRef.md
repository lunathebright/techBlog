---
title: '[React] Hooks - useRef'
date: 2021-10-26 13:41:13
category: 'fundamental'
draft: false
---

# Hooks - useRef

```javascript
const refContainer = useRef(initialValue)
```

리액트의 빌트인 훅 중 하나인 `useRef`는 가변성이 있는 객체를 리턴하는 특성이 있다. 이 객체 안에는 `current`라는 속성이 있는데 `current` 의 초기값은 `useRef` 의 첫번째 인자로 전달해 설정할 수 있다. `useRef` 는 보통 아래의 두 가지 용도로 사용된다.

<br />

## DOM elements 접근하기

리액트는 `getElementById` 나 `getElementsByClassName`, `querySelector` 와 같은 방법으로 DOM에 접근하는 것을 추천하지 않는다.

기본적으로 컴포넌트를 재사용하는 컨셉을 가지고 있기 때문에 바닐라의 방법으로는 원치 않는 요소를 선택하게 될 수도 있고(class), 고유해야 하는 값인 id가 중복사용 될 수도 있기 때문이다.

리액트에서 특정 요소에 접근해야 하는 일이 생기면 useRef를 사용하는 것이 권장된다.

```javascript
function Box() {
  const textRef = useRef()

  useEffect(() => {
    console.log(textRef.current) // <span>hello</span>
  }, [])

  return (
    <div>
      <span ref={textRef}>hello</span>
    </div>
  )
}
```

DOM 요소 선택을 위해 `useRef` 를 사용할 때는

1. 선택할 요소를 담을 변수를 만들어 `useRef` 실행(initialValue는 빈 값)
2. 선택할 요소에 `ref={변수명}` 설정

이렇게 두 단계를 거치면 된다. 그러고 나면 만든 변수 내에 `useRef` 가 `current` 라는 속성이 담긴 객체를 리턴하고, 이 `current` 가 바로 우리가 선택한 요소가 된다.

<br />

## 가변한 값 사용하기

본 포스트 최상단의 `useRef` 문법을 보면 초기값 전달이 가능하다. `useRef.current` 는 가변성을 띄기 때문에 이를 활용할 수 있다.

```javascript
function Box() {
  const valueRef = useRef(0)

  const onClick = () => {
    valueRef.current++
    console.log(valueRef.current)
  }

  return (
    <div>
      <button onClick={onClick}>click me</button> // 클릭마다 1, 2, 3, 4 ...
    </div>
  )
}
```

위의 코드로 콘솔을 확인해보면 클릭할 때마다 0으로 초기화 되었던 숫자가 1씩 증가하는 것을 볼 수 있다. `useRef` 의 이런 특성을 이용해 다양한 값을 컨트롤 할 수 있다.

일반적으로 화면에 직접적으로 노출되는 정보가 아닌, 노출되는 정보 계산을 위해 필요한 값을 다루기 위해 사용된다. 아래와 같이 `setTimeout`이나 `setInterval` 같은 함수를 클리어할 때도 사용할 수 있다.

```javascript
const setIntervalRef = useRef(0)

const count = () => {
  setInervalRef.current = setInterval(() => {
    console.log('1s')
  }, 1000)
}

const stop = () => {
  clearInterval(setIntervalRef.current)
}
```

<br />

## useRef 주의사항

### 1. useState와는 다르다

가변한 값으로 사용 가능하다는 설명을 보면 `useState` 와 다를 게 별로 없는 것처럼 느껴질 수 있다. 하지만 `useRef` 는 `useState` 와 다르게 값이 변해도 리렌더링이 발생하지 않는다. 그렇기 때문에 내부적으로 필요한 계산을 다룰 때 사용하는 것이다.

<br />

### 2. 값을 업데이트 하는 위치에 제한이 있다

`userRef` 의 `current` 값을 변경할 때는 반드시 콜백 함수 내부 또는 이벤트 핸들러 내부에서 사용해야 한다.

```javascript
function MyComponent({ prop }) {
  const myRef = useRef(0)

  useEffect(() => {
    myRef.current++ // O

    setTimeout(() => {
      myRef.current++ // O
    }, 1000)
  }, [])

  const onClick = () => {
    myRef.current++ // O
  }

  myRef.current++ // X

  if (prop) {
    myRef.current++ // X
  }

  return <button onClick={onClick}>click me!</button>
}
```

<br/>
<br/>
<br/>
<br/>
