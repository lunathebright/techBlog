---
title: '[React] LifeCycle Method'
date: 2021-10-28 17:10:13
category: 'fundamental'
draft: false
---

# LifeCycle Method

리액트의 생명주기 메서드는 컴포넌트가 브라우저에 나타나고(mount), 업데이트 되고(update), 사라질 때(unmount) 호출되는 메서드이다.

본 포스트에서는 자주 사용되는 아래의 메서드들에 대해서만 다룬다.

![life cycle](https://miro.medium.com/max/700/1*EnuAy1kb9nOcFuIzM49Srw.png)

> 출처: [react-lifecycle-methods-diagram](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)

<br />

## Mount

컴포넌트가 마운트 된다는 것은 브라우저 상에 나타난다는 것이다. 마운트 단계에서는 `constructor`, `render`, `componentDidMount` 총 세 개의 메서드가 있다.

### constructor

컴포넌트가 마운트 되기 전에 호출된다. 메서드를 바인딩하거나 state 초기화 작업이 없다면 `constructor` 를 구현하지 않아도 된다. 유일하게 state를 직접 할당할 수 있는 장소이다. `setState` 등의 기타 부수 효과를 발생시키는 작업을 할 수 없다.

### render

클래스 컴포넌트에서 반드시 구현해야 하는 메서드이다. 반환 값이 존재해야 한다.

### componenetDidMount

마운트가 된 직후 호출된다. 컴포넌트가 처음 나타날 때만 실행되기 때문에 외부 데이터를 받아오는 작업을 하기 적절한 위치이다.

<br />

## Update

props 또는 state 값이 업데이트 될 때를 말한다. `render`와 `componentDidUpdate`가 있다. `render`는 마운트 단계의 메서드와 동일한 메서드이다.

### componentDidUpdate

최초 렌더링 시에는 호출되지 않으며, props나 state 값이 업데이트 된 직후에 호출된다. 해당 메서드 내부에서 `setState`를 호출할 경우 업데이트 된 값에 의해 무한 렌더링이 일어날 수 있기 때문에 반드시 적절한 조건문으로 감싸서 사용해야 한다.

<br />

## Unmount

컴포넌트가 DOM상에서 사라질 때를 말한다. 페이지를 이동하거나 브라우저를 닫을 때를 말한다.

### componentWillUnmount

컴포넌트가 제거되기 직전에 호출된다. 타이머 제거, 네트워크 요청 취소, 페이지 이동에 따른 스크롤 이벤트 해제 등 정리 작업이 가능하다.

<br />

## 확인해보기

![ezgif com-gif-maker (2)](https://user-images.githubusercontent.com/63533584/139207524-f9a61400-b57e-4197-8cd3-981120da46a8.gif)

각 메서드가 호출될 때마다 로그를 출력한다.

1. 처음 컴포넌트가 생성됐을 때 `constructor > render > Did Mount`
2. 클릭 이벤트로 카운트 숫자가 업데이트 됐을 때 `render > Did Update`
3. 노출되는 컴포넌트가 변경될 때 `Will Unmount`

<br/>
<br/>
<br/>
<br/>
