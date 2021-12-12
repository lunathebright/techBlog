---
title: '[React] HOC'
date: 2021-10-29 16:00:13
category: 'fundamental'
draft: false
---

# HOC(Higher Order Component)

컴포넌트 로직을 재사용하기 위한 기술로 리액트의 구성적 특성을 활용한 것이다. (컴포넌트로 새 컴포넌트 반환)

예를 들어, 여러개의 컴포넌트에서 마운트 될 때 외부에서 데이터를 받아오는 작업을 동일하게 수행하다면 이 로직을 HOC로 분리할 수 있다. HOC의 이름은 보통 `withRequest, withRouter` 처럼 with로 시작한다.

리액트의 서드 파티 라이브러리에서도 흔하게 사용된다.

<br />

## 사용해보기

우선 코드상에서 중복이 발생해 로직을 분리했을 때 더 효율적인 부분이 있는지 찾아내야 한다. 예시에서는 컴포넌트 마운트 시 블로그의 포스트와 코멘트 데이터를 받아 저장하는 로직을 사용한다.

```javascript
// Post.jsx

function Post() {
  // 중복 로직
  const [posts, setPosts] = useState(null)

  useEffect(() => {
    fetch('/posts.json')
      .then(res => res.json())
      .then(res => setPosts(res))
  }, [])
  // 중복 로직 끝

  return (
    <div>
      {posts.map(post => (
        <>
          <h1>{post.title}</h1>
          <p>{post.contents}</p>
        </>
      ))}
    </div>
  )
}
```

`Post` 와 `Comment` 는 둘 다 위와 위와 같은 구조를 갖는다. 데이터를 요청하는 주소와 얻은 데이터로 렌더링 하는 부분의 차이만 있다. 중복되는 부분을 추출해 범용적으로 사용 가능하게 만들어보자.

<br />

```javascript
// withRequest.jsx

const withRequest = url => WrappedComponent => {
  const Request = () => {
    const [data, setData] = useState(null)

    useEffect(() => {
      fetch(url)
        .then(res => res.json())
        .then(res => setData(res))
    }, [])

    return data && <WrappedComponent data={data} />
  }

  return Request
}
```

`withRequest` 라는 이름의 HOC를 만들고, 상황에 따라 변경되어야 하는 값(url, WrappedComponent)은 인자로 넣어주었다. 그리고 받은 데이터를 props로 넘겨준다. `WrappedComponent` 가 중복된 기능을 사용하고 싶어하는 모든 컴포넌트를 지칭한다.

<br />

```javascript
// Post.jsx

function Post({ data }) {
  return (
    <div>
      {data.posts.map(post => (
        <>
          <h1>{post.title}</h1>
          <p>{post.contents}</p>
        </>
      ))}
    </div>
  )
}

export default withRequest('/posts.json')(Post)
```

이제 `withRequest`로 추출한 로직 부분을 `Post` 컴포넌트와 `Comment` 컴포넌트에서 모두 제거한다.

그 후 만들어놓은 HOC를 사용하기 위해서 마지막 줄처럼 `만든 HOC(요청 url)(해당 컴포넌트)`의 형태로 export하면 `withRequest`로 감싸진 `Post` 가 추출된다.

<span style="color: #9D9F9D">실제 엘리먼트로 확인 가능하게 감싸지는 것이 아니라 추출한 로직이 붙은 컴포넌트가 만들어지기 때문에 감싸진다고 표현했다</span>

마지막으로 `withRequest`에서 props로 넘겨받는 데이터로 필요한 작업을 수행하면 된다.

<br/>
<br/>
<br/>
<br/>
