---
title: '[React] props, state'
date: 2021-06-24 18:05:13
category: 'fundamental'
draft: false
---

# React의 데이터 관리

props(properties)와 state는 둘 다 일반 JS 객체이며, React 내에서 데이터를 관리하기 위해 사용된다.

<br/>

## props

props는 부모 컴포넌트에서 자식 컴포넌트로 전달 가능하며, 역방향은 불가능하다.
defaultProps 값을 정해 기본값을 설정할 수 있고, prop-types를 사용하면 자료형을 지정할 수 있다.

```javascript
import React from 'react';
import Comp from './Comp';

class App extends React.Component {
	render() {
    	return(
        	<Comp name="프로퍼티' />
        )
    }
}

export default App;
```

## state

컴포넌트 내부에서 선언되는 데이터이다. 값 변경이 가능하기 때문에 동적인 데이터를 다루기 위해서는 state를 사용해야 한다.
하지만 state 값을 직접 변경할 수는 없고, 함수를 통해 변경해야 한다. 클래스형 컴포넌트의 경우 setState메소드, 함수형 컴포넌트의 경우 hook을 사용한다.
(React는 state의 변경을 감지해 리렌더링 되기 때문에 setState를 사용하지 않으면 변경 감지 불가)

```javascript
import React from 'react';
import Comp from './Comp';

class App extends React.Component {
  state = {

  }

	render() {
    	return(
        	<Comp name="프로퍼티' />
        )
    }
}

export default App;
```

<br/>
<br/>
<br/>
<br/>
