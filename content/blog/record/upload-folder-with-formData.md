---
title: '[record] 복수 파일 업로드 및 폴더 업로드 구현하기'
date: 2022-01-10 16:38:13
category: 'record'
draft: false
---

# 복수 파일 업로드 및 폴더 업로드 구현하기

`input` 태그의 타입을 `file` 로 사용하면 파일 업로드를 간단하게 구현할 수 있다. 그런데 `<input type="file" />` 만으로는 단일 파일 업로드만이 가능하다. 한 번에 여러개의 파일을 업로드하거나 폴더를 통째로 업로드하기 위해서는 별도의 옵션이 필요하다.

> [MDN: input type="file"](https://developer.mozilla.org/ko/docs/Web/HTML/Element/Input/file)

<br />

## 옵션 추가하기

### 복수 파일

```javascript
<input type="file" multiple />
```

복수 파일 업로드의 경우 `input` 태그가 기본으로 제공하는 옵션인 `multiple` 을 사용하면 된다. 옵션의 이름 그대로 복수의 파일을 선택하겠다는 뜻이다. `multiple` 을 설정하면 기존에 하나의 파일만 선택 가능하던 파일 선택 창에서 여러개의 파일을 선택할 수 있도록 변경된다.

<br />

### 폴더

```javascript
<input type="file" webkitdirectory mozdirectory />
```

폴더 업로드를 가능하게 해주는 `webkitdirectory` 나 `mozdirectory` 옵션의 경우 `multiple` 과 다르게 비표준 옵션이다. 따라서 옵션을 적용해도 해당 옵션을 지원하지 않는 브라우저에서는 동작하지 않는다.

<br />

#### 주의할 점

폴더 업로드 옵션을 사용하면 폴더와 단일 파일 모두 업로드 가능한 것이 아닌 폴더'만' 업로드가 가능하다. 일부 브라우저에서는 (ex.사파리) 해당 옵션을 사용했을 때 폴더와 파일 업로드 모두 지원하지만 사용도가 높은 크롬은 지원하지 않는다.

서치 결과 스택오버플로우에서 현재로서는 브라우저에서 지원해주지 않는 경우 폴더와 파일 모두를 업로드 할 방법이 없다는 글을 찾았다. 꼭 두 기능을 모두 지원해야 한다면 버튼이 각각 존재해야 한다.

> [Stack overflow](https://stackoverflow.com/questions/42633306/how-to-allow-the-user-to-pick-any-file-or-directory-in-an-input-type-file-ta)

<br />

## FormData로 복수 파일 전송하기

```javascript
const formData = new FormData()
formData.append('key', 'value')
```

`FormData` 를 서버로 전송하기 위해서는 위와 같이 `append` 를 사용한다. 만약 위에서 복수로 받은 파일을 전송하고 싶다면 반복문을 사용해 `append` 하면 된다. 주의할 점은 `key` 값이 동일해야 한다는 것이다.

```javascript
const formData = new FormData()

const onChange = e => {
  const { files } = e.target
  Object.values(files).map(file => {
    formData.append('file', file)
  })
}
```

예를 들어 유저에게서 여러개의 이미지 파일을 다중 선택 받아 `file` 이라는 키로 전송한다면 위와 같이 된다. `append` 를 완료한 후의 `formData` 를 `getAll` 메소드를 사용해 조회하면 아래와 같은 결과가 나온다.

<br />

<img alt="스크린샷 2022-01-10 오후 4 27 13" src="https://user-images.githubusercontent.com/63533584/148730782-2b7bcccb-e51e-4592-8a56-2071ff0cba44.png">

<br />

`getAll` 메소드는 `formData.getAll('key')` 형식으로 입력된 키 값에 일치하는 데이터를 모두 보여준다. 이는 `FormData` 의 `append` 메소드가 동일한 키 값이 있을 경우 값을 새 값으로 변경하지 않고 기존 데이터에 덧붙이기 때문이다.

`formData.get('key')` 를 사용할 경우, 해당 키와 일치하는 첫번째 값만을 조회한다.

<br/>
<br/>
<br/>
<br/>
