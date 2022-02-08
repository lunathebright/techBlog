---
title: '[redux] Redux Toolkit'
date: 2022-01-27 15:05:13
category: 'fundamental'
draft: false
---

# Redux Toolkit

Redux는 대표적인 상태관리 라이브러리로 현재 가장 보편적으로 사용되고 있다. 하지만 꾸준히 언급되는 Redux의 단점은 바로 '보일러플레이트(상용구) 코드가 너무 많고, 환경 설정이 복잡하다'는 것이다.
<br />
Redux Toolkit(RTK)은 Redux의 이러한 단점을 보완하기 위해 만들어졌다. 다시 말해, 기존 Redux의 복잡함을 줄여 사용성을 높이고자 하는 목적을 가지고 있다.

## store: configureStore

store를 생성할 때 redux에서는 `createStore` 사용하지만, rtk에서는 `configureStore` 를 사용한다.

```javascript
// createStore
import { createStore } from 'redux'
import rootReducer from '경로'

const store = createStore(rootReducer)

// configureStore
import { configureStore } from '@reduxjs/toolkit'
import aaaReducer from '경로'
import bbbReducer from '경로'

const store = configureStore({
  reducer: {
    aaa: aaaReducer,
    bbb: bbbReducer,
    ccc: cccReducer,
  },
})
```

### createStore

createStore를 사용할 때는 redux의 `combineReducers` 로 묶어준 `rootReducer` 를 인자로 넣어준다. 위의 코드를 얼핏 보면 `createStore` 가 더 간단하다고 느낄 수도 있지만, `rootReducer` 를 만들기 위해 리듀서들을 컴바인 하는 작업이 별도로 필요하다. 또한, devTool을 사용하기 위해서는 두 번째 인자로 따로 넣어주어야 한다.

### configureStore

configureStore는 별도의 `rootReducer` 를 만들 필요 없이 인자로 객체 형태의 reducer를 넣어주면 된다. devTool은 추가 작업 없이 기본적으로 제공한다.

<br />

## reducer: createSlice

기존 redux에서는 reducer 생성을 위해 액션의 타입과 생성 함수, 초기 상태값을 별도로 필요로 하며 `switch` 문으로 reducer를 표현하는 것이 일반적이다. 하지만 RTK에서는 `createSlice` 로 필요한 값들을 한 번에 생성할 수 있다.

아래는 가장 기본적인 예제인 counter 구현을 예시로 작성된 코드이다.

### redux

```javascript
// 액션 타입 정의
const increase = "INCREASE";
const decrease = "DECREASE";

// 액션 생성 함수
const increaseAction = () => {
  return { type: increase };
};

const decreaseAction = () => {
  return { type: decrease };
};

// 초기 상태값
const initialState = {
  counter: 0;
};

// 리듀서
const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case increase:
      return {
        ...state, counter: state.counter + 1,
      };
    case decrease:
      return. {
        ...state, counter: state.counter - 1,
      };
    default:
      return state
  }
};
```

### RTK: createSlice

```javascript
import { createSlice } from '@reduxjs/toolkit'

const counterSlice = createSlice({
  name: 'counter', // 해당 모듈의 이름
  initialState: {
    // 초기 상태값
    value: 0,
  },
  reducers: {
    // 필요한 리듀서들을 작성하면 해당 key 값으로 액션 함수 자동 생성
    increment: state => {
      state.value += 1
    },
    decrement: state => {
      state.value -= 1
    },
  },
})

export const { increment, decrement } = counterSlice.actions
export default counterSlice.reducer
```

한눈에 봐도 코드가 훨씬 간단하고 깔끔해졌다. reducer 객체에 들어가는 리듀서들은 자동으로 액션 함수가 생성되는데 만약 별도의 액션 함수를 정의하고 싶다면 `extraReducers` 객체를 사용할 수 있다.

<br />

## async: createAsyncThunk

createAsyncThunk는 createAction의 비동기 버전을 위해 고안되었다. 꼭 서버 통신만을 뜻하는 것이 아닌, 특정 결과에 따라 로직을 실행해야 하는 경우에도 활용 가능하다.

```javascript
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { authAPI } from './authAPI'

const getToken = createAsyncThunk('auth/getToken', async loginData => {
  const response = await authAPI.getToken(loginData)
  return response.data
})

const authSlice = createSlice({
  name: 'auth',
  initialState: { auth: '' },
  reduceres: {},
  // extraReducers에 리듀서를 추가해 프로미스의 진행 상태에 따라 리듀서를 실행할 수 있다
  extraReduceres: () => {},
})

//  사용
dispatch(getToken())
```

<br/>
<br/>
<br/>
<br/>
