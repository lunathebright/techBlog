---
title: '[React] Error Boundaries'
date: 2021-10-26 17:09:13
category: 'fundamental'
draft: false
---

# Error Boundaries

## 개념과 사용법

Error Boundaries는 UI 일부에 있는 자바스크립트 에러로 인해 전체 애플리케이션이 훼손되는 것을 막기 위해 리액트 16부터 새롭게 도입된 개념이다.

하위 컴포넌트 트리의 자바스크립트 에러를 기록하고, 에러 발생으로 정상적이지 못한 컴포넌트 대신 fallback UI를 보여준다. (클래스형 컴포넌트만 지원)

애플리케이션 일부분에서 에러가 발생하면 유저에게는 아무것도 존재하지 않는 백지 페이지가 노출되기 때문에 이를 방지해 유저들의 경험 개선을 위한 처리라고 볼 수 있다.

<br />

```javascript
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    // 다음 렌더링에서 폴백 UI가 보이도록 상태를 업데이트 합니다.
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    // 에러 리포팅 서비스에 에러를 기록할 수도 있습니다.
    logErrorToMyService(error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      // 폴백 UI를 커스텀하여 렌더링할 수 있습니다.
      return <h1>Something went wrong.</h1>
    }

    return this.props.children
  }
}
```

Error Boundaries 안에서는 `static getDerivedStateFromError()` 와 `componentDidCatch()` 메서드를 사용할 수 있다. 두 메서드를 함께 사용하는 것이 가능하며, 최소한 하나의 메서드를 사용해야 클래스 컴포넌트 자체가 error boundary가 된다.

<br />

**static getDerivedStateFromError()**

에러가 발생했을 때 fallback UI가 보이도록 상태를 업데이트 한다.

**componentDidCatch()**

에러 정보를 서버로 전송하는 용도로 사용된다.

<br />

```javascript
<ErrorBoundary>
  <MyComponent />
</ErrorBoundary>
```

컴포넌트를 정의한 후에는 일반 컴포넌트처럼 사용하면 된다.

에러가 발생하면 위의 메서드가 구현된 가장 가까운 부모 컴포넌트를 찾기 때문에 하나의 바운더리로 묶을 단위를 고려해야 한다. 단위는 상황과 조건에 따라 달라질 수 있다.

예를 들어 하나의 컴포넌트에만 문제가 생겨도 전체 페이지를 fallback UI로 노출시킬 수도 있고, 해당 컴포넌트만 fallback UI로 노출시킬 수도 있다.

페이스북 메신저는 사이드 바, 정보 패널, 대화 기록에 각각의 바운더리를 적용했다고 한다.

<br />

## 적용해보기

기존에 했던 프로젝트에 Error Boundary를 적용해보았다.

<br />

1. Error Boundary 컴포넌트 생성

```javascript
class ErrorBoundary extends React.Component {
  state = { hasError: false }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      // 재사용을 위해 노출 내용 props로 받아 사용
      return <h1>{this.props.fallBack}</h1>
    }

    return this.props.children
  }
}
```

<br />

2. 원하는 컴포넌트에 바운더리 적용

```javascript
class Detail extends React.Component {
  // 코드 다수 생략

  render() {
    const { restaurants, foods, reviews } = this.state

    return (
      <section className="detailPage">
        {foods && <StoreImgBox foodsData={foods} />}
        <div className="detailMain">
          // fallback 문구로 "error occurred" 전달
          {restaurants && (
            <ErrorBoundary fallBack="error occurred!">
              <StoreInfo />
            </ErrorBoundary>
          )}
          {reviews && <StoreReviewBox />}
        </div>
      </section>
    )
  }
}
```

<br />

3. 강제 에러 트리거

```javascript
class StoreInfo extends React.Component {
  // 코드 다수 생략

  render() {
    throw new Error()

    return (
      <div className="storeInfo">
        <StoreHeader />
        <StoreInfoTable />
        <StoreLocation />
      </div>
    )
  }
}
```

<br />

### 실제 페이지 노출 결과

**Error Boundary 적용 전**

![010F35BE-E4F7-4B74-9AC3-054CF99EE2C9_1_105_c](https://user-images.githubusercontent.com/63533584/138834888-22f37950-afc2-4be0-b05c-48afebc60670.jpeg)

<br />

**Error Boundary 적용 후**

![1B688509-E0E8-4E67-ACAD-98F38D339F98_1_105_c](https://user-images.githubusercontent.com/63533584/138834901-bbf156d7-48f9-45d0-a966-c47956aff79f.jpeg)

<br />

식당 소개 상세 페이지의 식당 정보를 바운더리로 묶어주었다. 식당 정보 컴포넌트에서 문제가 발생하면, 해당 부분만 지정해 준 에러 문구가 노출되고 상단의 이미지와 하단의 리뷰 창은 유지된다.
<span style="color:#9D9F9D">단순 문구가 아닌 컴포넌트도 당연히 전달 가능하다. </span>

<br/>
<br/>
<br/>
<br/>
