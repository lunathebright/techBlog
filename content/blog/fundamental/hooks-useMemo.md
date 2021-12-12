---
title: '[React] Hooks - useMemo'
date: 2021-10-28 15:02:13
category: 'fundamental'
draft: false
---

# Hooks - useMemo

```javascript
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b])
```

`useMemo` 는 성능 최적화를 위해 사용되는 훅이다.

예를 들어 a와 b라는 값이 있을 때, a의 값만 업데이트 되었는데 b를 구하는 로직까지 같이 실행되는 경우가 있다. 이런 경우 `useMemo`를 사용해 업데이트 되지 않은 값은 이전 값을 그대로 사용하고 업데이트 된 값만 다시 계산할 수 있다.

훅의 이름처럼 데이터를 메모해 두었다가 재사용하는 것이다.

## 사용해보기

유저가 태어난 월과 일을 받아 해당 정보를 사용해 만든 정보를 출력해주는 프로그램을 만들어 보았다.

```javascript
export default function Memo() {
  const [month, setMonth] = useState(0)
  const [date, setDate] = useState(0)

  const onChange = evt => {
    const { name, value } = evt.target
    if (name === 'month') {
      setMonth(value)
    } else if (name === 'date') {
      setDate(value)
    }
  }

  return (
    <div>
      <select name="month" onChange={onChange} placeholder="월">
        // 생략
      </select>
      <select name="date" onChange={onChange} placeholder="일">
        // 생략
      </select>
      <Text month={month} date={date} />
    </div>
  )
}

const getSeason = month => {
  console.log('getSeason')
  if (month > 11 || month < 3) {
    return '겨울'
  } else if (month > 2 && month < 6) {
    return '봄'
  } else if (month > 5 && month < 9) {
    return '여름'
  } else if (month > 8 && month < 12) {
    return '가을'
  }
}

const getTime = date => {
  console.log('getTime')
  if (date < 11) {
    return '초반'
  } else if (date > 10 && date < 21) {
    return '중반'
  } else if (date > 20) {
    return '후반'
  }
}

function Text({ month, date }) {
  const season = getSeason(month)
  const time = getTime(date)

  return (
    <>
      {month !== 0 && date !== 0 && (
        <span>{`${month}월 ${time}에 태어났고, 계절은 ${season}입니다`}</span>
      )}
    </>
  )
}
```

<br />

아래는 위 코드의 구현 영상이다.

![ezgif com-gif-maker](https://user-images.githubusercontent.com/63533584/139185153-a4749705-f267-42d0-b711-b6cbfd0bc64c.gif)

props로 받은 month와 date를 가공해 원하는 정보를 만들어내는 `getSeason` 과 `getTime` 은 실행될 때마다 콘솔에 로그를 출력한다.

리액트는 기본적으로 상태값이 업데이트 되면 해당 컴포넌트와 해당 컴포넌트의 하위 컴포넌트를 다시 수행한다. 그렇기 때문에 전체 값 중 하나의 값만 변경되어도 컴포넌트 내의 모든 과정이 실행된다. 위의 영상을 보면 월과 일 중 하나의 값만 변경해도 `getSeason` 이 `getTime` 둘 다 실행되는 것을 확인할 수 있다.

<br />

이런 경우에 `useMemo` 훅을 사용해 불필요한 연산 과정을 줄일 수 있다.

```javascript
const season = useMemo(() => getSeason(month), [month])
const time = useMemo(() => getTime(date), [date])
```

`getSeason` 과 `getTime` 을 호출하는 부분을 위와 같이 수정했다.

`useMemo` 의 첫번째 파라미터는 연산에 필요한 함수, 두번째 파라미터는 의존성 배열이다. 이제 첫번째 파라미터에 들어간 함수는 두번째 파라미터로 입력한 의존성 배열 내부에 지정한 값이 변경될 때만 실행된다.

![ezgif com-gif-maker (1)](https://user-images.githubusercontent.com/63533584/139187282-df0e6c68-1259-4e4a-88ce-3f8873bd1930.gif)

수정한 내용을 확인해보면 값의 변경이 있을 때 연산이 필요한 함수만 다시 실행되는 것을 확인할 수 있다.

<br />

## 주의사항

`useMemo` 를 사용하면 불필요한 연산을 줄여 성능에 도움이 될 수 있다는 것을 확인했다. 앞으로 작성하는 모든 코드에서 `useMemo` 를 최대한 적극 활용하고 싶을 수도 있다. 하지만 `useMemo` 를 사용할 때는 '정말로 성능 향상에 도움이 되는지'를 고려해야 한다.

<br />

1. **모든 코드는 전부 실행되는 비용이 든다.** 함수를 더 많이 호출할수록, 더 많은 코드를 실행시킬수록 더 많은 비용이 든다는 것이다. 온갖 곳에서 `useMemo` 를 실행하는 것이 결과적으로 더 좋지 않은 퍼포먼스를 낼 수도 있다.

<br />

2. **react와 같은 대다수의 최신 기술들은 충분히 빠르다.** 컴퓨터를 활용해 아주 비싼 연산을 해야되는 게 아니라면 퍼포먼스에 차이가 있을 정도의 영향을 주지 않을 확률이 높다.

<br />

결론적으로 성능 최적화를 위해 `useMemo` 를 사용할 때는 기회비용을 따져보는 것이 중요하다. 최적화를 위해서는 어떤 종류의 것이든 자원이 소모되기 마련인데 발생하는 이득이 언제나 소모된 자원보다 큰 것은 아니다.

<br/>
<br/>
<br/>
<br/>
