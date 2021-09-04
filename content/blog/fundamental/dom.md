---
title: '[JS] DOM(Document Object Model)'
date: 2021-06-10 18:05:13
category: 'fundamental'
draft: false
---

# DOM(Document Object Model)

DOM(Document Object Model)은 그대로 번역해서 문서 객체 모델이라고 부르기도 한다.

'문서 객체 모델'에서 사용된 문서는 우리가 작성하는 html파일을 뜻한다. 즉, DOM은 우리가 작성한 html을 객체화하여 JavaScript가 이용할 수 있도록 만든 것이다.(JavaScript는 html에 있는 내용을 객체화 없이 바로 다룰 수 없다)

웹 브라우저가 html을 해석해서 만들어 놓은 것이라고도 표현할 수 있다.

<br />
<br />

## DOM의 구성

![tree example](https://images.velog.io/images/anachrosh/post/2692af54-62d6-4b21-adbe-d42b2d45e0c0/image.png)

DOM은 트리형식의 자료 구조를 가지고 있다.

<span style="color: #9D9F9D;">트리형식 자료 구조(노드 트리): 하나의 부모 줄기로부터 여러개의 가지와 나뭇잎이 뻗어나오는 나무 같은 구조. 트리를 구성하는 각 요소를 모두 node라고 한다.</span>

```html
<!DOCTYPE html>
<html>
  <head>
    <title>title</title>
  </head>
  <body>
    <h1>Hello, world!</h1>
  </body>
</html>
```

위와 같은 코드를 작성했다면 root node인 html에서부터 head와 body가 가지로 뻗어나오고, head와 body 하위의 코드도 같은 방식으로 하위 요소가 없어질 때까지 뻗어나온다.

<br />

## DOM 개념에 대한 오해

### 1. DOM은 브라우저에 보이는 화면이다?

DOM과 브라우저에 노출되는 화면은 다르다. 브라우저를 통해 우리 눈에 보이는 화면은 DOM과 CSSOM의 조합인 렌더 트리이다. 렌더 트리는 스크린에 시각적으로 보이지 않는 요소는 제외되고, 시각적으로 확인할 수 있는 요소들만으로 구성된다.

대표적인 예로 display: none의 스타일 속성을 가지고 있는 요소가 있다. 해당 요소는 스크린에서 시각적으로 확인할 수 없지만 DOM에는 포함된다.

<span style="color: #9D9F9D">CSSOM(CSS Object Model)은 DOM과 마찬가지로 우리가 작성한 CSS를 JavaScript가 조작할 수 있도록 만들어 놓은 것이다. CSS버전의 DOM이라고 생각하면 된다.</span>

### 2. DOM은 개발자 도구의 Elements탭과 동일하다?

DOM과 개발자 도구 내부의 컨텐츠는 다르다. 개발자 도구의 Elements탭에서는 DOM에 포함되지 않는 요소들이 포함된다. ::before나 ::after와 같은 CSS의 가상 요소가 그 예시이다. CSS의 가상 요소는 DOM이 아닌 CSSOM을 구성하는 요소이다. DOM은 오직 html문서로 구성된다는 것을 생각하면 헷갈리지 않는다.

### 3. DOM과 HTML은 동일하다?

DOM이 오로지 원본 html로부터 구성된다는 것을 생각하면 DOM과 html은 동일하다고 생각할 수 있지만 그렇지 않다. DOM과 html은 다를 수 있다.

#### 3.1 작성된 HTML 문서가 유효하지 않을 때

작성한 html에 실수가 있을 경우, 브라우저가 이를 자동 교정(Autocorrection) 할 수 있다.

```html
<!DOCTYPE html>
<html>
  <body>
    <h1>DOM은 무엇일까?</h1>
  </body>
</html>
```

위와 같은 코드를 작성했다고 가정해보자. 모든 html 파일은 <body>태그 위에 <head>태그를 필수적으로 가지고 있어야 하는데 <head>태그가 누락된 상태이다. 이런 경우 별도의 요청을 하지 않아도 브라우저가 html파일을 이용해 DOM을 만들면서 자동으로 <head>태그를 삽입한다. html 파일 내부에 아무런 태그 없이 단어를 입력해도 브라우저 화면에 문제없이 노출되는 것 또한 브라우저가 문제가 있는 부분을 자동 교정했기 때문이다.

#### 3.2 JavaScript로 DOM을 조작한 경우

JavaScript를 사용하면 html에 작성한 내용을 변경하거나 요소를 추가 및 삭제하는 등의 다양한 액션이 가능하다. 그런데 이런 액션을 취했다고 해서 우리가 작성한 원본 html 파일 내부가 수정되는 것은 아니다. 원본 html을 기반으로 구성된 DOM의 내용이 변경되었을 뿐이다. 그렇기 때문에 이 경우에도 DOM과 html은 동일하지 않다.

<br/>
<br/>
<br/>
<br/>
