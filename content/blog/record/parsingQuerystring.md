---
title: '[record] 쿼리스트링 파싱하기'
date: 2021-07-18 18:05:13
category: 'record'
draft: false
---

이번 프로젝트를 진행하며 서버와 통신 과정에서 처음으로 쿼리스트링을 사용해보았다. 쿼리스트링은 요청하는 데이터에 대한 정보를 담고 있기 때문에 페이지네이션 등에 굉장히 유용하게 활용이 가능하다.

처음에는 페이지네이션을 위해 쿼리스트링을 활용하면 편하겠다는 생각만 했지 어떻게 활용해야 편할지는 감이 안 잡혔었는데 쿼리스트링을 객체로 바꿔 사용하면 된다는 것을 알게 되었다.

<br />

# 쿼리스트링

서버에 데이터를 전달하는 방법 중 하나로 url 주소에 미리 협의된 파라미터를 사용해 `key=value`의 형태로 작성한다. 또한, 쿼리스트링은 엔드포인트 뒤에 '?'로 시작하며 각 프로퍼티는 '&'로 구분한다.

> 예시) path?offset=10&limit=10

<br />

## 쿼리스트링 파싱 함수

```javascript
const stringToQuery = query => {
  const queryStr = query.slice(1)
  return queryStr.split('&').reduce((acc, crr) => {
    const [queryKey, queryValue] = crr.split('=')
    return { ...acc, [queryKey]: queryValue }
  }, {})
}

const queryToString = queryObj => {
  return (
    '?' +
    Object.entries(queryObj)
      .flatMap(e => e.join('='))
      .join('&')
  )
}

//사용할 때
const queryObj = stringToQuery(query)
const queryStr = queryToString(queryObj)
```

stringToQuery는 쿼리스트링을 객체화하는 함수이고, queryToString은 객체화한 쿼리스트링을 다시 문자열로 변환하는 함수이다.

<br/>

### stringToQuery

쿼리스트링이 '?'로 시작해서 각 프로퍼티를 '&'로 구분한다는 점을 활용하면 쉽게 객체화가 가능하다.

시작점인 '?'를 제거할 때는 위처럼 slice 메서드를 사용해도 되고, 좀 더 명시적인 표현을 하고 싶다면 `const [_, queryString] = query.split('?')` 와 같은 형태도 좋다.

물음표를 제거했다면 split 메서드로 앰퍼샌드 기준으로 분리한다. 그러면 `[ 'offset=10', 'limit=10' ]`과 같은 형태의 배열이 생기게 되는데 이를 다시 key와 value를 연결하는 '='을 기준으로 분리해 reduce로 빈 객체에 밀어넣는다.

결과적으로 `{ offset: '10', limit: '10' }`처럼 쿼리스트링의 각 프로퍼티를 객체의 key와 value로 변환할 수 있다.

<br/>

### queryToString

객체화한 쿼리스트링을 다시 문자열로 변경하는 건 조금 더 간단하다. Object.entries를 사용하면 `[ [ 'offset', '10' ], [ 'limit', '10' ] ]` 형태의 이중배열로 객체의 key와 value를 묶어준다. 이를 '='과 '&'를 이용해 하나의 스트링으로 합쳐주면 된다.

위에서는 flatMap 메서드를 사용했는데 다른 반복문을 사용해도 상관 없다. 하지만 flatMap의 사용법 자체는 자주 사용되는 map과 다를 것이 없고 한 레벨의 배열을 평탄화시켜주기 때문에 지금과 같은 경우 매우 편리하다. MDN을 한 번만 꼼꼼히 읽어보면 바로 활용할 수 있다.

[MDN: Array.prototype.flatMap()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap)

<br />

---

<br />

쿼리스트링 파싱 함수를 별도의 파일로 분리해 만들어놓고 필요할 때마다 import해 사용하면 정말 편리하다. 아니면 아예 프로토타입 내에 넣어놓고 사용할 수도 있다.

파싱 함수 자체는 특별히 어렵거나 까다롭지 않지만, 나처럼 쿼리스트링을 객체화해 사용한다는 생각을 못해서 고통 받는 분들이 줄기를 바라는 마음을 담아 블로그에 옮겼다.

<br/>
<br/>
<br/>
<br/>
