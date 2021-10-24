---
title: '[record] Gatsby 블로그 검색 기능 추가하기'
date: 2021-09-16 14:08:13
category: 'record'
draft: false
---

# Gatsby 블로그에 검색 기능 추가하기

처음 블로그를 만들 때, 빠른 블로그 구축을 위해서 가장 깔끔하고 기본에 충실하다고 생각된 gatsby-starter-bee 템플릿을 선택했다. 그런데 사용하다보니 포스팅이 조금씩 많아져 검색 기능이 있으면 좋겠다는 생각이 들었다. 생각이 들었다면 실천해야지! 라는 생각으로 작업을 시작했다.

<br/>

## 서치 창 위치 정하기

![image](https://user-images.githubusercontent.com/63533584/133545941-67c8770b-391a-42b2-b4cf-eee45a31878b.png)

가장 먼저 서치 창을 어디에 삽입할지 결정해야 했는데 처음에는 오른쪽 상단의 깃헙 아이콘을 없애고 그 위치에 삽입하려고 했었다.

실제로 작업도 어느정도 진행했었는데 하다보니 뭔가 썩 마음에 들지 않는달까... 그리고 무엇보다 검색 결과가 나오는 부분의 위치가 조금 어정쩡해질 것 같다고 느꼈다.

그래서 고민 끝에 바이오와 카테고리 탭 사이에 위치시키기로 결정했다. 이미지 속 서치 창의 위치다.

<br/>

## GraphQL 확인하기

내가 사용한 템플릿은 GraphQL을 사용하고 있다. 사실 블로그를 구축하며 GraphQL을 처음 접했기 때문에 깊은 이해를 하고 있지는 않다. 하지만 사용하는 방법이 굉장히 쉬우니 겁 먹지 않고 도전해보도록 하자. GraphQL이 우리가 필요한 데이터를 제공해 줄 것이라는 것 정도만 알고 있으면 사용할 수 있다.

`npm start`로 개발 모드 서버를 실행시키면 `http://localhost:8000/` 밑에 `http://localhost:8000/___graphql` 이라는 url이 함께 노출된다.

이 url에 대한 설명으로 `View GraphiQL, an in-browser IDE, to explore your site's data and schema`라는 문구가 나오는데 말 그대로 해당 사이트의 데이터와 스키마를 웹 상에서 볼 수 있도록 제공해준다.

<br/>

![image](https://user-images.githubusercontent.com/63533584/133548206-e876ab0b-10a5-4780-b803-e951be232184.png)

여기에서 내가 필요한 데이터들을 선택하면 필요한 쿼리를 자동 생성해주고, 그 상태에서 상단의 플레이 버튼을 누르면 오른쪽에 실행 결과에 대한 내용을 보여준다. (id는 필수 선택 값이므로 선택을 해제하면 플레이 했을 때 에러가 발생한다.)

<br/>

나는 검색 결과에서 포스트의 **제목**과 **카테고리**, **생성 날짜**를 노출 시킬 생각이었고 눌렀을 때 해당 포스트로 이동하기 위해 **slug**값이 필요했다. 또 **draft**라는 속성으로 블로그에 노출 여부를 결정하기 때문에 draft가 false인지 검사가 필요했다.

<br/>

![image](https://user-images.githubusercontent.com/63533584/133548801-0452845f-2e7d-412e-98d1-380f1e5073a1.png)

필요한 값들을 선택하면 이런 식의 결과가 나온다. 만약 검색 대상에 포스트의 본문 내용을 추가하고 싶다면 **excerpt**라는 값도 이때 가져와야 한다. 나는 이 값은 가져오지 않았다.

물론 본문 내용까지 검색 되면 검색 기능이 더 좋아지겠지만 아무래도 검색을 할 때마다 모든 포스트를 검사하는 만큼 성능상 좋지 못할 것이라고 판단했기 때문이다.

지금 포스트 수로는 성능에 문제가 있을 정도는 아니지만 그래도 뭔가 좀 더 최적화된 방법을 찾고 싶었다. 그래서 우선은 타이틀만을 검색 대상으로 사용하고 있다.

원하는 항목을 전부 추가하고 결과를 확인했다면 이제 자동 생성된 쿼리를 복사해서 사용할 수 있다.

<br/>

## 서치 컴포넌트 만들기

gatsby-stater-bee 템플릿은 모든 컴포넌트가 `src > components` 디렉토리 안에 위치해 있어 서치 컴포넌트도 그 안에서 작업했다. 내 서치 컴포넌트는 아래의 코드에서 알 수 있듯이 `<SearchIcon />, <SearchInput />, <SearchResult />` 이렇게 크게 세 부분으로 구성되어 있다.

```javascript
export const Search = () => {
  const [searchState, setSearchState] = useState({
    searchedData: null,
    query: '',
  })

  return (
    <StaticQuery
      query={searchQuery}
      render={data => {
        return (
          <section className="search-container">
            <SearchIcon />
            <SearchInput data={data} setSearchState={setSearchState} />
            {searchState.searchedData && (
              <SearchResult searchedData={searchState.searchedData} />
            )}
          </section>
        )
      }}
    />
  )
}

const searchQuery = graphql`
  query SearchQuery {
    allMarkdownRemark(sort: { fields: id }) {
      edges {
        node {
          id
          frontmatter {
            title
            draft
            category
            date
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
```

SearchInput 컴포넌트 내의 input 태그에서 쿼리 값을 받아 검색 결과를 state에 저장하고, SearchResult 컴포넌트로 렌더링하는 구조이다. 앞서 복사해 온 쿼리를 하단에 붙여넣고 사용했다.

<br/>

### SearchInput

SearchInput 컴포넌트는 input 태그로 입력된 값을 받아 state에 값을 저장하는 역할을 한다.

```javascript
export const SearchInput = ({ setSearchState, data }) => {
  const handleChange = e => {
    const query = e.target.value
    if (query === '') {
      setSearchState({
        searchedData: null,
        query: '',
      })
      return
    }

    const posts = data.allMarkdownRemark.edges || []

    const searchedData = posts.filter(post => {
      const { title, draft } = post.node.frontmatter
      return (
        !draft && title && title.toLowerCase().includes(query.toLowerCase())
      )
    })

    setSearchState({
      searchedData,
      query,
    })
  }

  return (
    <div className="search-input">
      <input onChange={handleChange} type="text" />
    </div>
  )
}
```

input 태그에 onChange 이벤트를 달아 제어했다. handleChange 이벤트의 가장 상단에서는 만약 쿼리가 빈 문자열일 경우 state를 초기화하는 작업을 하고 있다.

쿼리가 빈 문자열이 아닌 경우에만 전체 포스트의 title 값으로 입력된 쿼리가 포함되어 있는지 확인해 draft가 false이면서 쿼리가 포함된 결과만을 state에 저장한다.

<br/>

### SearchResult

SearchResult 컴포넌트에서는 검색 결과값을 렌더링한다. 컴포넌트 자체가 검색된 결과값이 존재할 때만 렌더링되게 되어있기 때문에 검색 결과가 없는 경우는 제외했다.

```javascript
export const SearchResult = ({ searchedData }) => {
  return (
    <ul className="search-results">
      {searchedData.map(({ node }) => {
        const { slug } = node.fields
        const { title, category, date } = node.frontmatter

        return (
          <Link to={slug} key={slug} className="link">
            <li className="search-result">
              <p className="result-title">{title}</p>
              <span className="result-info">{`${category} | ${
                date.split('T')[0]
              }`}</span>
            </li>
          </Link>
        )
      })}
    </ul>
  )
}
```

상위 컴포넌트인 <Search />에서 결과값을 props로 받아 원하는대로 구성하면 된다.

사실 맨 처음 구상할 때는 검색 결과에 따라 기존에 포스트가 나열되는 부분을 갈아끼우려고 했었다.

그런데 만약 유저가 ALL이 아닌 특정 카테고리를 선택한 상황에서는 그 카테고리 내부에서의 검색 결과를 노출할 것인지에 대한 문제가 있었고, 이에 따라 경우의 수가 너무 많아진다고 느껴 검색창 하단에 전체 포스트에 대한 검색 결과창을 띄우기로 결정했다.

<br/>

## 모드에 맞춰 스타일링하기

모드에 관계 없이 한 가지 스타일을 제공해도 기능에는 문제가 없지만 이미 블로그가 라이트모드와 다크모드를 지원하고 있고 나는 예쁜 게 좋기 때문에 모드에 맞춰 스타일링을 해줬다. 컬러는 고민하다가 이름 태그의 컬러와 맞췄다.

![chrome-capture (1)](https://user-images.githubusercontent.com/63533584/133551315-7f7f8803-6151-4f1a-bb93-b65e9a05b069.gif)

만약 gatsby-starter-bee 템플릿을 사용한다면 src 내부의 styles 디렉토리에서 `dark-theme.scss`파일과 `light-theme.scss` 파일을 찾을 수 있다. 이 부분에서 자신이 부여한 클래스명에 따라 모드에 따라 달라지는 부분을 스타일링 해주면 된다.

<br/>

## 완성된 모습

![chrome-capture (2)](https://user-images.githubusercontent.com/63533584/133552172-77485852-0d5a-4aeb-83c5-eb2f2b472bed.gif)

위의 과정을 거쳐 완성된 모습이다. 포스트의 타이틀을 기준으로 검색을 진행하고, 해당 포스트로의 이동 기능을 제공한다. 테마 변경에 따라서 컬러도 잘 변경되는 것을 확인할 수 있다.

<br/>

### 리팩토링

이 글을 작성하면서 코드를 다시 보니 정리해야 하는 부분이 다소 보였다. 또, 지금은 모든 타이핑마다 검색 결과가 업데이트 되는데 성능 향상을 위해서 throttle이나 debounce를 적용시킬 예정이다.

추가적으로 검색 대상을 포스트의 본문까지 확장시키고, 검색 결과에 매치되는 부분을 하이라이트 해 노출시키는 것까지를 최종 목표로 잡고 있다.

+) 검색 기능에서 버그를 발견하신 분은 댓글을 통해 알려주시면 감사하겠습니다! 🙏

<br/>
<br/>
<br/>
<br/>
