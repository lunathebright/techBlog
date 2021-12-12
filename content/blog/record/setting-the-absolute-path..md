---
title: '[record] babel로 절대 경로 설정하기'
date: 2021-12-12 17:07:13
category: 'record'
draft: false
---

# babel 절대 경로 설정하기

상대 경로를 이용하다 보면 폴더 구조가 깊어졌을 때 import 되는 경로가 매우 지저분해진다. 그리고 폴더 구조를 변경하게 되는 일이 생겼을 때도 경로를 하나하나 다시 설정해주어야 하기 때문에 번거롭다. 그렇기 때문에 규모가 아주 작은 프로젝트가 아니라면 절대 경로(or 별칭 경로)를 설정해 사용하는 것이 편리하다.

<br />

## babel module resolver 설치하기

```javascript
npm i -D babel-plugin-module-resolver
```

제일 먼저 위의 명령어로 babel의 module-resolver라는 plugin을 설치해준다.

<br />

## .babelrc 설정하기

프로젝트 루트 경로에 `.babelrc` 라는 이름의 설정 파일이 필요하다. 해당 파일의 `plugins` 항목에 `module-resolver` 를 추가해준다.

```javascript
{
  "presets": [...필요한 preset 설정],
  "plugins": [
    ["module-resolver"]
  ]
}
```

그 후 사용할 경로에 대한 별칭을 `alias` 로 아래와 같이 지정해주면 된다. (경로의 기준은 프로젝트의 루트)

```javascript
{
  "presets": [...필요한 preset 설정],
  "plugins": [
    [
      "module-resolver",
      {
        "alias": {
			    "@": "./src",
           "@components": "./components",
           "@api": "./src/api",
           "@styles": "./src/styles",
           "@utils": "./src/utils"
        }
      }
    ]
  ]
}
```

<br />

## 사용하기

설정한 경로를 사용할 때는 별칭으로 설정한 이름을 사용해 기존에 import 하던 것과 동일하게 사용할 수 있다.

```javascript
import Create from '@components'
import theme from '@styles'
import { sum } from '@utiles/math'
```

<br/>
<br/>
<br/>
<br/>
