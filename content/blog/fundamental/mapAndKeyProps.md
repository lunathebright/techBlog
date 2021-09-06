---
title: '[React] map과 key props'
date: 2021-06-26 20:05:13
category: 'fundamental'
draft: false
---

# map()함수와 key props

map()함수는 React에서 특정 UI를 원하는 횟수만큼 생성시키기 위해 굉장히 자주 사용된다.

<span style="color: #9D9F9D;">React에서 자주 사용하지만 map()함수 자체는 React의 특별한 기능이 아닌 순수 JS메서드이다.

[MDN: Array.prototype.map()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/map)</span>

그런데 map()함수를 그냥 사용하면 렌더링에는 문제가 없지만 console에 `Each child in an array should have a unique “key” prop.`이라는 경고가 발생한다. 여기서 React가 요구하는 key prop은 리스트의 각 항목마다 가지고 있는 고유한 문자열이다. 일반적으로 데이터가 가지고 있는 id 값을 사용한다.

</br>

## key props가 필요한 이유

map()함수를 사용하면 React는 map()함수를 호출한 배열의 길이만큼 같은 동작을 반복한다. 이 과정에서 key가 필요한 이유는 React가 변경 사항을 알아내는 것을 돕기 위해서이다.

잠시 React에 대해서 짚고 넘어가자면, React는 UI를 만들어내는 라이브러리로 화면의 뷰를 담당한다. 그리고 컴포넌트 기반으로 되어 있어 컴포넌트의 조합으로 원하는 UI를 만들어내거나 특정 컴포넌트를 원하는 만큼 보여주기 편리하다는 장점이 있다. 무엇보다 Virtual DOM을 이용해 화면에서 변경이 필요한 부분만 변경하기 때문에 효율성이 좋아 속도가 빠르다.

그런데 리액트는 항상 효율성이 좋을까? 그렇지는 않다. 리액트는 **'변경이 필요한 부분만 변경할 수 있을 때'** 효율이 좋다.

리액트는 state를 사용해 변경 사항이 있는 부분을 리렌더링 하는데 만약 불필요한 리렌더링이 자주 발생하게 되면 효율적이지 못하다는 뜻이다. 그래서 map()함수를 이용할 경우 리액트가 변경된 부분을 쉽게 알아차릴 수 있도록 key가 필요하다.

```html
<li>a: apple</li>
<li>b: banana</li>
<li>c: cantaloupe</li>
```

예를 들어 화면에 위와 같은 코드로 작성된 내용이 보여지고 있었는데 중간에 banana가 삭제되었다. 이 상황에서 key가 없다면 리스트를 순차적으로 모두 비교해서 차이가 있는 부분을 찾아내야 한다. 그런데 리스트의 아이템마다 부여된 고유의 값인 key가 있다면 리액트가 자동으로 key를 어떤 컴포넌트를 업데이트 할 지 판단하는 데에 사용하기 때문에 빠른 판단을 할 수 있다. key를 이용해 기존에 있던 key가 없어졌다면 해당 아이템을 삭제하고 기존에 없던 key가 생기면 새 아이템을 만든다.

리액트 공식 홈페이지의 Key 항목을 살펴보면 동적인 리스트를 만들 때마다 적절한 key를 할당할 것을 강력하게 추천하고 있다. 또한, key로 사용할만한 항목이 없을 경우 데이터의 재구성까지 고려해보길 권유한다.

map()의 두번째 인자로 배열의 인덱스를 넘겨 사용할 수도 있지만, 이는 성능 향상에 도움이 되는 실질적인 key 값이 되지 못하기 때문에 추천되지 않는 방법이다.

<br />

## key props 사용하기

```javascript
class MainSummer extends React.Component {
  state = {
    myInfo: {...
    },
    stories: [...
    ],
    feeds: [...
    ],
    recommend: [...
    ],
  };

  render() {
    const { myInfo, stories, feeds, recommend } = this.state;

    return (
      <div className="Main-summer">
        <Nav />
        <main>
          <article className="contents-container">
            <Story storyLis={stories} />
            <section className="feeds-container">
              {feeds.map(feed => (
                <Feed feed={feed} key={feed.postId} />
              ))}
            </section>
          </article>
          <div className="right-container">
            <aside>
              <MyInfo myInfo={myInfo} />
              <Recommend recommendLis={recommend} />
            </aside>
            <Footer />
          </div>
        </main>
      </div>
    );
  }
}

```

위의 코드는 리액트로 인스타그램 클론 코딩을 하며 직접 짠 코드이다. state의 feeds 데이터를 사용해 화면에 Feed 컴포넌트를 feeds 데이터의 길이만큼 반복시켰다.

key는 반복이 되는 UI의 태그 안에 다른 props와 동일하게 `key={}` 형식으로 넣어주면 된다. 하지만 다른 props처럼 this.props.key로 조회나 참조하는 것은 불가능하다.

예시의 경우 각 피드마다 고유하게 가지고 있는 값인 postId가 key 값으로 가장 적합하다고 생각해 feed.postId를 넣어주었다.

<span style="color: #9D9F9D;">_key는 전역에서 고유할 필요는 없다. 해당 반복문 내부에서 고유하면 된다._</span>

<br/>
<br/>
<br/>
<br/>
