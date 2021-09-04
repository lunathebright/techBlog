---
title: '[record] fetch로 서버와 통신하기'
date: 2020-06-30 16:21:13
category: 'record'
draft: false
---

# React에서 fetch를 사용해 서버와 통신하기

오늘 서버와 통신을 통해 회원가입 및 로그인 과정을 진행해보았다.

오픈된 API를 사용할 때는 데이터를 받아오면서도 통신을 하고 있다는 게 와닿지 않았었다. 그런데 서버 화면을 같이 보면서 데이터를 요청해보니 통신이 이루어지는 과정을 명확하게 이해할 수 있었다. 진짜 너무 재밌다. 흑흑 이렇게까지 즐거울 수 있다니

</br>

## 회원가입

```javascript
fetch('http://10.58.6.201:8000/users/signup', {
  method: 'POST',
  body: JSON.stringify({
    email: this.state.idInput,
    password: this.state.pwInput,
    name: '포켓몬',
    phone_number: '010-0000-0000',
  }),
})
  .then(res => res.json())
  .then(res => {
    console.log('result', res)
  })
```

로그인용으로 구현한 화면에서 회원가입과 로그인 과정을 둘 다 진행했기 때문에 회원가입에 필요한 name과 phone_number가 없어 해당 부분을 임의로 하드코딩해서 진행했다. response도 콘솔로 확인만 했다.

## 로그인

```javascript
fetch('http://10.58.6.201:8000/users/signin', {
  method: 'POST',
  body: JSON.stringify({
    email: this.state.idInput,
    password: this.state.pwInput,
  }),
})
  .then(res => res.json())
  .then(res => {
    localStorage.setItem('TOKEN', res.access_token)
    this.props.history.push('/summer/main')
  })
```

유저가 로그인에 성공하면 넘어오는 토큰을 로컬 스토리지에 저장하고 메인 페이지로 넘어가도록 했다. 받은 토큰 값을 사용해 로그인한 유저를 특정짓고 싶었지만 일단은 통신 과정을 확인한 것만으로도 공부에 많이 도움이 되었다.

<span style="color: #9D9F9D;">+) 통신 결과에 대한 status 넘버를 받아오려면 `.then(res => res.json())`이 처리되는 부분에서 값을 받아야 한다. json()을 거치면 요청 결과의 body 부분만 남기 때문에 status가 들어있는 header 등은 전부 떨어져 나간다. </span>

</br>

## 에러

![](https://images.velog.io/images/anachrosh/post/6b8132be-7e0a-47b2-a871-eb8663b0bc2f/key_vld_exi.png)![](https://images.velog.io/images/anachrosh/post/15499a84-30e8-4d15-a29a-09693c700937/success.jpg)

통신 과정에서 발생하는 에러를 확인하기 위해서 일부러 다양한 시도를 해보았다.

필수로 요구되는 key값 누락, 로그인 유효 양식에 맞지 않는 값 입력, 회원가입시 이미 존재하는 정보로 가입 요청, 서버를 끈 상태로 통신 요청 등을 시도했다.

<br/>
<br/>
<br/>
<br/>
