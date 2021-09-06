---
title: '[React] JSX'
date: 2021-06-20 18:05:13
category: 'fundamental'
draft: false
---

# JSX

JSX란 JavaScript와 XML을 합쳐서 만든 단어로 React에서 사용되는 JavaScript 확장 구문이다. React내에 JSX를 사용한 구문이 있으면 컴파일 과정을 거쳐 정규 JavaScript 문법으로 변환하는 과정이 필요하다.

React에서 JSX를 사용하는 것이 필수는 아니지만 UI 관련 코드를 작성할 때 시각적으로 화면의 구성을 확인하는 것에 도움이 되기도 하고 작성이 편리하기 때문에 JSX 사용이 권장된다.

- [JSX없이 사용하는 React](https://ko.reactjs.org/docs/react-without-jsx.html)

<br />

```javascript
const element = <h1>Hello, React!</h1>
```

JSX는 위처럼 JavaScript와 HTML이 합쳐진 것처럼 생겼다.

<br />

```javascript
function App() {

  function titleModi(){
    코드 내용
  }

  return (
    <div className="App">
      <div className="nav">
        <div>개발 Blog</div>
      </div>
      <div className="list">
        <h4 onClick={()=>titleModi}> post Title </h4>
        <p>11월 7일 발행</p>
        <hr/>
      </div>
    </div>
  );
}
```

위의 코드에서 return 내부에 들어간 내용이 JSX이다. JSX는 React의 가장 작은 단위인 element, 다시 말해 화면에 표시될 내용을 생성한다.

<br />

```javascript
function getGreeting(user) {
  if (user) {
    return <h1>Hello, {formatName(user)}!</h1>
  }
  return <h1>Hello, Stranger.</h1>
}
```

또한, JSX 내부에 중괄호를 사용해 JavaScript 표현식 사용이 가능하며 JSX 자체도 표현식이기 때문에 위의 코드처럼 사용이 가능하다.

<br/>
<br/>
<br/>
<br/>
