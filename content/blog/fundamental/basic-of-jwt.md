---
title: '[CS] JWT란'
date: 2023-03-10 18:05:13
category: 'fundamental'
draft: false
---

# JWT(Json Web Token)

JWT는 토큰 자체에 사용자의 권한 정보나 서비스를 사용하기 위한 정보가 포함(Self-contained)되어 있다.

이와 같은 데이터들은 이름처럼 Json 데이터 형식으로 이루어져 있으며, 해당 데이터는 Base64 URL-safe Encode를 통해 인코딩하여 직렬화된다.

이뿐만 아니라 위변조 방지를 위해 개인키를 통한 전자서명도 포함되어 있다.

<br/>
<br/>

## JWT의 구조

# <span style="color: red">HEADER</span>.<span style="color:violet">PAYLOAD</span>.<span style="color:skyblue">SIGNATURE</span>

Jwt는 헤더, 페이로드, 시그니처의 세 부분으로 구성되어 있다.

실제로 [jwt.io](https://jwt.io/) 에 들어가보면 아래의 이미지처럼 세 개의 섹션으로 나누어 디코드 해주는 것을 확인할 수 있다.

<br/>

![jwt.io](https://user-images.githubusercontent.com/63533584/224614590-70c3d9bf-eb28-4636-a8ee-823e98b090f9.png)

<br />
<br/>

### Header

- **암호화 규칙(alg)**

  해싱 알고리즘을 지정한다. `HAMAC SHA256` , `RSA` 을 사용한다. 이 알고리즘은 토큰을 검증 할 때 사용되는 signature 부분에 사용.

- **토큰 타입(typ)**

  토큰의 타입을 지정한다.( JWT)

<br/>

### Payload

- **데이터**

  토큰에 담을 데이터가 들어간다. 정보 한 조각의 단위는 '클레임(claim)'으로 부르며, 각 클레임은 key, value 쌍으로 이루어져 있다. 또한, 클레임은 총 세개의 분류로 나뉘어진다.

  - 등록된 클레임 (registered)

  - 공개 클레임 (public)

  - 비공개 클레임 (private)

<br />

#### 등록된 클레임 (registered)

토큰의 정보를 담기위한 미리 정의된 클레임의 집합이다. 등록된 클레임의 사용은 선택적이지만 사용하는 것이 권장된다.

등록된 클레임의 대표적인 예시로는 `iss : 토큰 발급자 (issuer)`, `exp : 토큰 만료시간 (expiration)`, `iat : 토큰이 발급된 시간 (issued at)` 등이 있다.

#### 공개 클레임 (public)

사용자가 정의하는 클레임으로 공개용 정보 전달에 사용된다.

#### 비공개 클레임 (private)

공개 클레임과 마찬가지로 사용자가 정의하는 클레임이지만, 당사자간 정보를 공유하기 위해 만들어진 클레임이다.

<br/>
<br/>

### Signature

- **암호화를 위한 데이터**

  토큰을 인코딩하거나 유효성 검증을 할 때 사용하는 고유한 암호화 코드를 나타낸다. 헤더와 페이로드의 값을 각각 BASE64로 인코딩 하고, 인코딩 한 값을 비밀 키를 이용하여 헤더에서 정한 알고리즘으로 해싱을 하고, 이 값을 다시 BASE64로 인코딩 하여 생성한다.

<br/>
<br/>
<br/>
<br/>
