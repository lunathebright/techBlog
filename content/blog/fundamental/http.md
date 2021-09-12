---
title: '[Network] HTTP'
date: 2021-09-12 14:38:13
category: 'fundamental'
draft: false
---

# HTTP

HTTP(Hypertext Transfer Protocol)는 통신 프로토콜이다. 즉, HTTP 자체가 데이터를 어떻게 주고받을지에 대해 정의한 거대한 약속이다.

<span style="color: #9d9f9d">프로토콜이란 규칙에 대한 약속이다. 서로 다른 기기가 데이터를 원활하게 주고 받기 위해 정의되었다.</span>

## Request & Response

![HTTP Request & Response](https://www.gatevidyalay.com/wp-content/uploads/2018/09/Hyper-Text-Transfer-Protocol-HTTP.png)

> [출처: [HyperText Transfer Protocol | HTTP Tutorial]](https://www.gatevidyalay.com/hypertext-transfer-protocol-http-protocol/)

<br/>

HTTP는 반드시 클라이언트 측의 Request로부터 통신이 시작된다. 그러므로 Request 없이 서버가 Response를 보내는 경우는 없다. 한 번의 통신에 Request와 Response가 짝지어져 있는 구조라고 이해했다.

<span style="color: #9d9f9d">클라이언트는 요청을 보내는 쪽, 서버는 요청을 받는 쪽을 의미한다. 웹 관점의 클라이언트는 브라우저이다.</span>

## Stateless Protocol

HTTP는 상태를 유지하지 않는(stateless) 프로토콜이다.

'상태를 유지하지 않는다'는 것은 리퀘스트와 리스폰스를 교환하는 동안 상태를 관리하지 않는다는 뜻이고, 이는 지난 리퀘스트나 리스폰스에 대해 전혀 기억하지 못한다는 것을 의미한다.

HTTP의 stateless한 특징 덕에 서버는 별도의 추가 정보를 관리하지 않아도 되므로 데이터를 매우 빠르고 확실하게 처리하는 범위성을 가질 수 있다.

하지만 웹의 발전에 따라 stateless한 상태로 처리하기 어려운 일이 생겨나기도 했다. 대표적인 예로 사이트 로그인이 있다. 로그인을 하고 나면 페이지를 이동한 후에도 로그인 상태가 유지되어야 하지만 stateless한 프로토콜은 이를 유지하지 못한다. 이러한 점을 보완하고자 Cookie가 도입되었다.

## URL & URI

### URI(Uniform Resource Identifier)

네트워크 상에서 자원 위치를 알려주기 위한 규약. 인터넷이 요구하는 기본 조건으로 인터넷 프로토콜에 항상 붙어 다닌다.

### URL(Uniform Resource Locater)

통합자원 식별자로 인터넷에 있는 자원의 위치를 나타내는 고유한 주소. 흔히 웹 주소라고 부른다.

![URI&URL&URN](https://hanseul-lee.github.io/2020/12/24/20-12-24-URL/uri.png)

> [출처: URL의 구조](https://hanseul-lee.github.io/2020/12/24/20-12-24-URL/)

<br/>

URI가 URL의 상위 개념이다. (URI의 하위 개념에는 URL과 URN이 있지만 URN에 대한 내용은 생략한다) URI와 URL의 가장 큰 차이점은 URI는 식별하고, URL은 위치를 가르킨다는 것이다.

위의 이미지에 따르면, `http://www.mydomain.com:80/javascript/global.php`까지는 URL이고 여기에 `?who=me&type=human#Intro`가 붙으면 URI이다. 이유는 내가 원하는 리소스를 얻을 수 있는 위치를 알려주는 것이 URL이고, 내가 원하는 리소스를 얻기 위해서는 해당 리소스에 해당하는 식별자가 필요한데 이 식별자까지 포함된 것이 URI이기 때문이다.

## HTTP Request Method

Request는 원하는 행동에 따라 아래와 같은 메소드를 가지고 있다.

- **GET**: 존재하는 자원 요청
- **POST**: 새로운 자원 생성
- **PATCH**: 존재하는 자원 변경
- **DELETE**: 존재하는 자원 삭제

<br/>

이 외에도 여러 메소드가 있지만 주로 사용되는 것은 위의 네 가지이다. 각 메소드를 적절하게 사용하는 것은 API의 RESTful한 사용과도 연관되어 있다.

## HTTP Status Code

서버에 Request를 보내면 Response가 돌아온다. Response는 상태 코드(status code)를 가지고 있어 클라이언트 측에서 상태 코드에 따른 로직을 구현할 수 있다. 주로 사용되는 상태 코드는 아래와 같다.

- **2xx: Success**

  통신이 성공한 경우 일반적으로 200번 대의 코드를 사용한다

- **4xx: Client Error**

  클라이언트 측의 Request가 잘못된 경우 400번 대의 코드를 사용한다. 유효하지 않은 자원 요청이나 권한이 잘못된 경우 등이 있다

- **5xx: Server Error**

  서버 측에서 오류가 난 경우 500번 대의 코드를 사용한다

<br/>
<br/>
<br/>
<br/>
