---
title: '[React] Custom Hook'
date: 2021-10-25 16:55:13
category: 'fundamental'
draft: false
---

# React Custom Hook

react에서는 useEffect나 useState처럼 기본으로 제공하는 hook 외에도 필요에 따라 hook을 커스텀 할 수 있다. custom hook은 반복되는 로직을 효율적으로 처리할 수 있게 해준다.

<br />

> **hook의 이름은 use로 시작해야 됨** (ex. useInput, useLocalStorage, useFetch)
> **hooks 디렉토리를 생성해 그 안에 hook들을 모아놓는 것이 관리하기 편함**

<br />

## Custom Hook 만들기

'custom'이라는 단어 때문에 처음에는 뭔가 굉장히 까다롭고 어려울 것 같은 느낌이 들었지만 생각보다 간단하다. custom hook은 결국 반복되는 작업을 처리하기 위해 기존의 hook을 사용해 만드는 함수일 뿐이다.

custom hook을 만들 때는 함수 내에서 `useState`, `useEffect`, `useCallback` 등의 기존 hook을 사용해 원하는 기능을 구현하고, 사용해야 하는 값들을 반환해주면 된다.

<br />

### custom hook 예시

이름, 이메일, 비밀번호 등 여러가지 인풋의 값이 변경될 때마다 local storage에 변경된 값을 저장하는 기능이 필요한 경우를 가정해보자.

<br />

#### without custom hook

```javascript
// without custom hook

const [userName, setUserName] = useState('')
const [email, setEmail] = useState('')
const [pw, setPw] = useState('')
const [isValid, setIsValid] = useState(false)

// 1번
useEffect(() => {
  localStorage.setItem('userName', userName)
  localStorage.setItem('email', email)
  localStorage.setItem('pw', pw)
  localStorage.setItem('isValid', isValid)
}, [userName, email, pw, isValid])

// 2번
useEffect(() => {
  localStorage.setItem('userName', userName)
}, [userName])

useEffect(() => {
  localStorage.setItem('email', email)
}, [email])

useEffect(() => {
  localStorage.setItem('pw', pw)
}, [pw])

useEffect(() => {
  localStorage.setItem('isValid', isValid)
}, [isValid])
```

우선, custom hook 없이 작업을 하면 1번이나 2번과 같은 코드를 짤 수 있다. 둘 다 기능이 작동하는 것에는 문제가 없다.

하지만 1번의 경우 의존성 배열 안에 전체 항목이 모두 들어있어 4개의 항목 중 하나의 값만 변경되어도 전체 항목을 local storage에 다시 저장하게 된다. 변경 사항이 없는 항목까지 다시 저장하는 것은 불필요한 작업이기 때문에 좋지 않다.

2번은 1번과 다르게 변경된 값만 다시 저장할 수 있다. 하지만 중복되는 코드가 많아서 깔끔하지 못하고 재사용성이 떨어진다.

<br />

#### with custom hook

```javascript
// with custom hook

function useLocalStorage = (item, value = "") => {
  const [state, setState] = useState(() => {
    return localStroage.getItem(item) || value
  });

  useEffect(() => {
    localStorage.setItem(item, state);
  }, [state]);

  return [state, setState];
};

const [userName, setUserName] = useLocalStorage("userName");
const [email, setEmail] = useLocalStorage("email");
const [pw, setPw] = useLocalStorage("pw");
const [isValid, setIsValid] = useLocalStorage("isValid", false);
```

custom hook을 적용하면 같은 기능을 위의 코드처럼 짤 수 있다.

1. 수행할 기능에 적절한 이름을 가진 함수를 생성한다. (useLocalStorage)
2. 생성한 함수 내부에서 필요한 기능을 구현한다. (useLocation 내부에 있는 useEffect의 의존성 배열에 state가 있기 때문에 변화가 있는 항목만 작동)
3. 실제로 사용할 값인 `[state, setState]` 를 반환

<span style="color: #9D9F9D">위의 코드에서는 데이터 형식이 다른 값인 isValid를 함께 처리하기 위해 value의 기본값으로 빈 문자열을 할당했다</span>

## Custom Hook의 장점

- 재사용성이 높다(중복 코드 제거)
- 로직 분리로 가독성 향상
- 로직을 특정 디렉토리 내에 모아둘 수 있어 관리가 수월함

<br />

반복되는 기능을 위해 util로 만들어 사용하는 함수와 같은 느낌이라고 생각하니 이해가 쉬웠다. <span style="color: #9D9F9D">~~_근데 이제 hook을 곁들인..._~~</span>

<br/>
<br/>
<br/>
<br/>
