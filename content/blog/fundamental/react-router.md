---
title: '[React] React-Router'
date: 2021-06-24 20:05:13
category: 'fundamental'
draft: false
---

# Routing

Routing은 경로(url)에 따라 다른 화면을 보여주는 것으로 한 개의 페이지(html)로 이루어진 SPA에서 여러 화면을 보여주고 싶다면 Routing은 필수이다. 하지만 React에는 routing을 위한 내장 기능이 없기 때문에 routing을 위해서는 서드파티 라이브러리를 사용해야 한다.
(routing을 제공하는 여러 라이브러리가 있고, React-Router는 그 중 가장 많이 쓰이는 라이브러리이다)

```javascript
import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Login from './pages/Login/Login'
import Main from './pages/Main/Main'

class Routes extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/main" component={Main} />
        </Switch>
      </Router>
    )
  }
}

export default Routes
```

<br/>

## Router

History API를 사용해 페이지 새로고침 없이 주소를 변경해주고 관련된 정보를 props로 쉽게 이용할 수 있게 해준다. HashRouter의 경우 검색 엔진으로 읽을 수 없다는 단점이 있어 일반적으로 BrowserRouter를 사용한다. 사용할 Router 태그로 Routing이 필요한 부분을 전체적으로 감싸주면 된다.

## Route

컴포넌트에 path 속성을 이용해 어느 경로에서 어떤 페이지를 보여줄 것인지 지정할 수 있다. 그런데 Router는 기본적으로 일치하는 모든 경로를 보여주기 때문에 `/` 로 이동하면 `/main`의 페이지도 화면상에 함께 나타난다. 이를 방지하기 위해 exact 속성을 사용하면 경로가 정확하게 일치하는 페이지만을 보여준다.

## Switch

Route 태그를 `Switch` 태그로 감싸주면 자식으로 포함된 Route 중 경로가 일치하는 첫번째 컴포넌트를 렌더링한다. Route의 `exact` 속성과 `Switch`의 역할이 헷갈릴 수 있는데 `Switch`는 일치하는 첫번째 Route만을 렌더링한다는 것을 기억하면 된다.

## Link

`Link` 태그에 지정한 url로 이동시켜 준다. HTML의 a 태그와 같은 역할을 한다고 생각하면 되는데, 아예 외부 사이트로 이동시켜 주는 a 태그와는 다르게 `Link` 태그는 프로젝트 내에서 페이지 전환이 가능하다.

<br/>
<br/>
<br/>
<br/>
