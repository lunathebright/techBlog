---
title: '[record] React에서 네이버 맵 API 사용하기 - 기본설정'
date: 2022-02-08 14:05:13
category: 'record'
draft: false
---

# Naver Map API - 기본 설정

[Naver Cloud Platform](https://console.ncloud.com/)

네이버가 제공하는 api를 이용하기 위해서는 우선 네이버 클라우드 플랫폼에서 앱을 등록하고 클라이언트 아이디를 발급받아야한다. 회원가입과 결제 수단 등록을 완료하면 앱 등록이 가능하다.

[Naver Map API Tutorial](https://navermaps.github.io/maps.js.ncp/docs/tutorial-2-Getting-Started.html)

각종 메소드와 사용법에 대한 안내가 공식 문서로 잘 정리되어 있으니 사용 전에 참고하는 것이 좋다.

<br />

## API 사용 세팅하기

```javascript
<script
  type="text/javascript"
  src="https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=YOUR_CLIENT_ID"
></script>
```

우선, map API 도큐먼트에서 제공하는 스크립트를 `index.html` 에 추가해야 한다. `YOUR_CLIENT_ID` 부분에 앱을 등록하고 발급받은 클라이언트 아이디를 넣어준다.

<br />

```javascript
import React, { useEffect } from 'react'

const { naver } = window

export default function Map() {
  const mapOptions = {
    zoom: 10,
    // center: new naver.maps.LatLng(37.3595704, 127.105399),
    // draggable: false,
  }

  useEffect(() => {
    new naver.maps.Map('map', mapOptions)
  }, [])

  return <div id="map" style={{ width: '50vw', height: '50vh' }} />
}
```

그 후, 맵을 사용할 컴포넌트에서 원하는 지도가 노출될 수 있도록 설정해준다.

<br />

**mapOptions**

예시에서는 `zoom` 만 사용했지만 `center`, `background`, `baseTileOpacity`, `bounds`, `disableDoubleClickZoom` 등 굉장히 다양한 옵션들을 제공하고 있다. 필요에 따라 옵션을 설정해주면 된다.

<br />

**Map 클래스**

Map 클래스는 지도를 생성하는 클래스로, `new` 연산자로 새 인스턴스를 생성해 사용한다. Map 클래스에는 두 개의 인자 전달이 가능한데 첫 번째는 지도가 표현될 컨테이너를 나타내는 필수값이고, 두 번째는 지도의 속성을 초기화하는 값으로 옵셔널하게 사용 가능하다. 설정해주지 않으면 api가 가지고 있는 기본값을 사용하게 된다.

<br/>
<br/>
<br/>
<br/>
