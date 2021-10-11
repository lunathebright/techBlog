---
title: '[record] Mac OS 개발환경 세팅하기'
date: 2021-10-12 18:05:13
category: 'record'
draft: true
---

# 프론트엔드 개발자를 위한 Mac OS 초기세팅

우연한 기회로 개발을 시작하게 되면서 한동안 리눅스 우분투를 사용했다. 나는 프론트엔드 공부를 했기 때문에 사실 윈도우가 큰 문제가 되지는 않았다. 하지만 다른 사람들과 함께 팀 프로젝트를 하다보면 맥과 윈도우의 차이로 인해 자잘한 문제들을 맞이하게 된다. 그런 점이 불편하기도 했고 사실 애초에 윈도우의 디자인적인 부분을 좋아하지 않았기 때문에 우분투를 사용하면서 만족도가 굉장히 높았다.

하지만 우분투도 단점은 있다. 개발 목적으로는 굉장히 좋지만, 컴퓨터라는 기기의 편의성에서는 뒤쳐진다는 것이다. 일반적으로 많이 사용하는 OS가 아니기 때문에 리눅스를 지원하지 않는 프로그램이 굉장히 굉장히 정말 많다. 물론 어떻게든 설치하고 싶다면 어찌저찌 힘든 길을 걸어 설치할 수는 있지만 사실 그렇게까지 해서 사용하고 싶은 프로그램이 없기도 했다.

그래서 아이폰을 사용하고 있기도 하니까 애플의 그 엄청나다는 동기화도 느껴볼 겸 맥북을 선택하게 되었다. 이 글은 조만간 또 맥북의 초기 세팅을 하게 될 지도 모르는 미래의 나를 위해 작성한다. (M1 기준)

<br />

## 1. iTerm2 설치하기

[iTemr2](https://iterm2.com/)

커맨드로 설치도 가능하고, 위의 사이트를 통해 설치도 가능하다. 아주 간단하니 먼저 설치해주자.

<img width="937" alt="스크린샷 2021-10-11 오후 3 21 38" src="https://user-images.githubusercontent.com/63533584/136742449-b7ceb302-90b0-4b3c-9fce-03683f4744ce.png">

설치 후 터미널에서 한글이 깨진다면, iTerm2 > preferences > profile > text > unicode에서 form을 none에서 NFC로 변경한다.

## 2. oh my zsh 설치하기

[oh my zsh](https://github.com/ohmyzsh/ohmyzsh)

위의 링크에서 curl 메소드의 커맨드를 복사해 터미널에서 실행시킨

## 3. Homebrew 설치하기

[Homebrew](https://brew.sh/index_ko)

![image](https://user-images.githubusercontent.com/63533584/136740268-fcf976eb-86ef-4918-89bf-a7519dec2bc2.png)

```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Homebrew 웹에서 위의 코드를 복사해 터미널에 붙여넣는다. 중간에 비밀번호를 입력해거나 엔터를 눌러줘야 하니 방치해두지 말자. 그런데 설치가 완료된 후에도 brew를 사용하려고 하면 brew를 찾을 수 없다는 문구가 뜰 것이다.

기존 intel칩에서는 brew가 `/user/local` 아래에 설치되는데 m1은 `/opt/homebrew` 아래에 설치되기 때문이다. 경로만 바꿔주면 된다.

(m1에서 설치하고 나면 )

`vi ~/.zshrc` 를 입력하고 하단에 `export "PATH=/opt/homebrew/bin:$PATH"`를 추가해주자.

그 후 변경된 설정을 적용시키기 위해 `source ~/.zshrc`를 입력하면 설치가 완료된다.

터미널에서 `which brew`를 입력하면 `/opt/homebrew/bin/brew`라는 결과를 볼 수 있다.

<br/>
<br/>
<br/>
<br/>
