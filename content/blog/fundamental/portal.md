---
title: '[React] Portal'
date: 2021-10-29 10:40:13
category: 'fundamental'
draft: false
---

# Portal

```javascript
ReactDOM.createPortal(child, container)
```

portal은 부모 컴포넌트 DOM 계층 구조 바깥에 있는 DOM 노드로 자식 컴포넌트를 렌더링하는 방법이다. 인자에서 child는 렌더링 가능한 react의 자식, container는 첫번째 인자를 렌더링할 DOM 엘리먼트이다.

간단하게 생각하면 root를 하나 더 만드는 것이다. 모달 창이나 툴팁처럼 항상 최상위에 위치한 것처럼 노출되어야 하는 컴포넌트를 생성할 때 유용하다.

<br />

## 사용해보기

**portal 적용 모습**

![ezgif com-gif-maker (3)](https://user-images.githubusercontent.com/63533584/139359350-cf86bf78-9835-4a77-acde-b12d1f98b7a2.gif)

<br />

```html
// index.html

<body>
  <div id="root"></div>
  <div id="portal"></div>
</body>
```

1. `index.html` 의 바디 태그 안에 컨테이너를 만든다. (`<div id="portal"></div>`)

<br />

```javascript
const Portal = ({ children }) => {
  return createPortal(children, document.getElementById('portal'))
}

export default function PortalParent() {
  const [isModalOn, setIsModalOn] = useState(false)

  return (
    <div>
      {isModalOn && (
        <Portal>
          <PortalChild setIsModalOn={setIsModalOn} />
        </Portal>
      )}
      <button onClick={() => setIsModalOn(true)}>open</button>
    </div>
  )
}
```

2. `createPortal` 을 사용해 1에서 만든 태그를 지정한다.

3. 부모 컴포넌트의 DOM 계층 구조 바깥에 위치시킬 컴포넌트를 2에서 만든 컴포넌트로 감싸준다.

<br/>
<br/>
<br/>
<br/>
