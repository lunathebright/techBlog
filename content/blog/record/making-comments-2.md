---
title: '[record] fetch로 댓글 기능 구현하기 .02'
date: 2021-07-03 20:05:13
category: 'record'
draft: false
---

## 댓글 삭제하기

```javascript
handleClickDel = commentId => {
  const { IP_ADDRESS, fetchData } = this.props

  fetch(`http://${IP_ADDRESS}:8000/postings/comment/${commentId}`, {
    method: 'DELETE',
  })
    .then(res => res.json())
    .then(fetchData)
}
```

댓글 삭제는 훨씬 수월했다. 댓글 생성 과정에서 많은 부분을 수정한 덕이 크다고 생각한다. DELETE 요청을 보낼 때는 삭제할 요소의 id값이 필요해 fetch 요청을 보내는 주소의 제일 뒷 부분에 id 값을 추가해 보냈다. 또, DELETE는 body부분이 필요하지 않다.

## 댓글 좋아요

```javascript
handleClickLike = comment => {
  const { IP_ADDRESS, fetchData } = this.props

  fetch(`http://${IP_ADDRESS}:8000/postings/comment/like`, {
    method: 'POST',
    body: JSON.stringify({
      comment_id: comment.commentId,
      bool: !comment.bool,
    }),
  })
    .then(res => res.json())
    .then(fetchData)
}
```

각 댓글의 좋아요는 상태에 따라 하트 아이콘의 상태가 변경되기 때문에 boolean 값을 이용했다.

<br/>

### Comments 컴포넌트의 구조

```javascript
class Comments extends React.Component {
  render() {
    const { comments, handleClickDel, handleClickLike } = this.props

    return (
      <ul className="detail-comments">
        {comments.map(comment => (
          <li key={comment.commentId} className="comment">
            <em className="user-name">{comment.userName}</em>
            <span>{comment.content}</span>
            <div className="comment-icons">
              <i
                onClick={() => handleClickLike(comment)}
                className={`fa-heart cmt-like ${comment.bool ? 'fas' : 'far'}`}
              ></i>
              <i
                onClick={() => handleClickDel(comment.commentId)}
                className="fas fa-times cmt-del"
              ></i>
            </div>
          </li>
        ))}
      </ul>
    )
  }
}
```

</br>

## 정리하며

느낀 점이 크게 두 가지가 있는데, 하나는 서버가 있을 때와 없을 때의 코드 진행이 상당히 달라진다는 것이고 나머지는 프론트와 백의 의사소통이 정말 중요하다는 것이다. 이번에는 함께 고생해주신 지우님 덕분에 이틀이 조금 넘는 짧은 기간에 많은 걸 해낼 수 있었다.

오픈된 API를 받아오는 것을 제외하면 처음으로 경험한 서버와의 통신이었는데 정말 즐거웠던 기억으로 머릿속에 오래 남을 것 같다.

<span style="color: #9D9F9D;">사실 포스팅에 구현한 부분이 작동하는 모습을 gif 파일로 첨부하고 싶었는데 같은 와이파이의 가호를 받는 서버라 한 공간에 있지 않으면 화면을 볼 수가 없다... 또륵</span>

<br/>
<br/>
<br/>
<br/>
