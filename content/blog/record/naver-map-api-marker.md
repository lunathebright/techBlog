---
title: '[record] React에서 네이버 맵 API 사용하기 - 마커'
date: 2022-02-08 15:12:13
category: 'record'
draft: false
---

# Naver Map API - 마커

[Tutorial - 마커](https://navermaps.github.io/maps.js.ncp/docs/tutorial-2-Marker.html)

## 마커 표시하기

마커는 지도 위의 한 위치를 표시하는 아이콘으로 지도에 오버레이되어 표현된다. 가장 기본적인 사용은 Map 클래스와 마찬가지로 Marker 클래스의 새 인스턴스를 생성하면 된다.

마커를 생성할 때는 마커가 표시될 위치인 `position` 값을 필수로 넣어주어야 한다. 네이버의 튜토리얼 상에는 `position` 외의 필수값이 안내되어 있지 않지만, 확인해 본 결과로는 어떤 지도 위에 위치할 것인지 연결해주는 `map` 값이 없어도 마커가 표현되지 않았다.

```javascript
import React, { useEffect } from 'react'

const { naver } = window

export default function Map() {
  const mapOptions = {
    zoom: 10,
    center: new naver.maps.LatLng(37.3595704, 127.105399),
  }

  useEffect(() => {
    const map = new naver.maps.Map('map', mapOptions)
    const marker = new naver.maps.Marker({
      position: new naver.maps.LatLng(37.3595704, 127.105399),
      map: map,
    })
  }, [])

  return <div id="map" style={{ width: '50vw', height: '50vh' }} />
}
```

마커는 `setPosition` 메소드를 사용해 클릭 지점으로 이동하는 것과 같은 이벤트를 연출할 수 있다.

<br />

## 마커 이미지 변경하기

마커에는 기본적인 옵션인 `position` 이나 `map` 외에도 다양한 옵션이 있다. 그 중 하나인 `icon` 을 사용하면 마커의 모양을 원하는 이미지로 쉽게 대체할 수 있다.

마커 옵션 객체 리터럴 안에 아래와 같은 형식 중 하나로 옵션을 추가해주면 된다.

```javascript
// 아이콘의 세부 사항 조절이 필요할 경우
icon: {
  url: './img/pin_default.png',
  size: new naver.maps.Size(22, 35),
  origin: new naver.maps.Point(0, 0),
  anchor: new naver.maps.Point(11, 35)
}

// 아이콘을 그냥 사용할 경우
icon: './img/pin_default.png'
```

단순히 마커 이미지를 변경하는 것 외에도 마커에 애니메이션 효과를 부여하거나, 폴리곤 형태의 마커 사용하기, 마크업을 마커로 사용하기 등의 다양한 기능을 제공하고 있다.

<br/>
<br/>
<br/>
<br/>
