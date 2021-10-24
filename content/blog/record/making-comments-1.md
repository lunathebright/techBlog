---
title: '[record] fetch로 댓글 기능 구현하기 .01'
date: 2021-07-03 18:05:13
category: 'record'
draft: false
---

# fetch로 댓글 기능 구현하기

서버 연동을 통해 댓글을 생성 및 삭제하고, 각 댓글마다의 좋아요 기능을 구현해보았다.

</br>

## 댓글 생성하기

```javascript
fetchData = () => {
  fetch(`http://${IP_ADDRESS}:8000/postings/post`)
    .then(res => res.json())
    .then(data => {
      this.setState({
        feeds: data.results[0].feeds,
      })
    })
    .catch(err => console.log('feeds', err))
}

sendingComment = (postId, commentInput) => {
  if (commentInput === '') return

  fetch(`http://${IP_ADDRESS}:8000/postings/comment`, {
    method: 'POST',
    body: JSON.stringify({
      name: 'peach',
      id: postId,
      content: commentInput,
    }),
  })
    .then(res => res.json())
    .then(this.fetchData)
}
```

댓글 생성 부분에서 가장 많은 어려움을 겪었다.

우선 내 컴포넌트의 구조는 main > feed > comments, commentInput으로 이루어져 있다. 서버없이 기능을 구현을 할 때는 main에서 props로 받아온 feeds 데이터 내부의 comments 부분을 feed에서 다시 state에 넣어 관리했었다. props로 받은 값을 다시 state로 관리하는 것은 React의 공식문서에서도 권장하지 않고 있는 사항인데 아직 React에 완전히 익숙하지 못한 탓인지 그 당시에는 이 부분을 깨닫지도 못했다. 그리고 이렇게 만들어놓은 구조에 따라 input을 받아 댓글을 생성하는 메서드 자체도 feed 컴포넌트 내부에 있었다.

그런데 서버 연동을 하다보니 구조상의 문제를 깨닫게 되어 여기저기 수정한 부분이 많다. 제일 큰 변화는 input을 받아 댓글을 생성하는 메서드가 feed에서 main으로 올라온 것이다. 새 댓글이 작성될 때마다 받은 input을 서버에 전송하고 새로 fetch를 하기 때문에 그러려면 comments가 속해있는 feeds 데이터 전체를 다시 받아와야 했다. 또, 앞서 말한 문제를 해결하기 위해 feed 컴포넌트 state에서 comments를 삭제했기 때문이기도 하다.

기능 구현을 위해 feeds 데이터를 새로 fetch 하는 빈도가 높아 일단 fetchData라는 메서드를 별도로 정의해 놓고 재사용했다.

그리고 사용자의 input을 서버로 전송하는 sendingComment라는 메서드를 만들어 commentInput까지 props로 내려보내 사용했다. 서버에 POST 요청을 보낼 때는 댓글 작성자의 이름, 댓글이 달릴 포스트의 id, 댓글 내용 이렇게 세 가지를 body에 포함시켜 보냈다.

정리해놓고 보니 참 간단한데 이걸 하던 당시에는 참 쉽지 않았다. 댓글이 댓글 내용 없이 달리기도 했고, 새로고침을 해야만 새로 달린 댓글이 보이기도 했었다. 이런 문제는 대부분 잘못된 state를 삭제하고 컴포넌트의 구조를 변경하는 것으로 해결되었다.

<br/>
<br/>
<br/>
<br/>
