---
title: '[record] React에서 네이버 맵 API 사용하기 - 폴리곤'
date: 2022-02-08 16:21:13
category: 'record'
draft: false
---

# Naver Map API - 폴리곤

네이버 지도 api는 지도 위에 도형을 표시하는 방법으로 `polyline`, `polygon`, `rectangle`, `circle`, `ellipse` 이렇게 총 다섯가지를 제공하고 있다. 이 중에서 닫힌 다각형을 표현할 수 있는 polygon을 표현해보려고 한다. (polyline은 선)

[Tutorial - 도형](https://navermaps.github.io/maps.js.ncp/docs/tutorial-4-Shape.html)

<br />

## 폴리곤 표시하기

폴리곤은 `paths` 라는 key로 원하는 모양에 맞춰 지도의 좌표를 배열 형식으로 전달해 만들 수 있다. 이 때 주의할 점은 전달하는 배열을 배열 안의 첫번째 배열로 전달해야 된다는 것이다.

색상, 두께, 선 스타일, 투명도, 폴리곤 내부 채우기 색상과 투명도 등 다양한 스타일을 설정할 수 있다. 이런 다양한 옵션들은 폴리곤 객체를 생성할 때 옵션 객체로 전달할 수도 있고, 생성 후에 `setOptions` 메소드를 사용해 동적으로 변경할 수도 있다.

> 폴리곤의 첫 번째 좌표와 마지막 좌표는 일치해야 한다

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
    new naver.maps.Polygon({
      map: map,
      paths: [
        [
          new naver.maps.LatLng(37.37544345085402, 127.11224555969238),
          new naver.maps.LatLng(37.37230584065902, 127.10791110992432),
          new naver.maps.LatLng(37.35975408751081, 127.10795402526855),
          new naver.maps.LatLng(37.359924641705476, 127.11576461791992),
          new naver.maps.LatLng(37.35931064479073, 127.12211608886719),
          new naver.maps.LatLng(37.36043630196386, 127.12293148040771),
          new naver.maps.LatLng(37.36354029942161, 127.12310314178465),
          new naver.maps.LatLng(37.365211629488016, 127.12456226348876),
          new naver.maps.LatLng(37.37544345085402, 127.11224555969238),
        ],
      ],
      fillColor: '#ff0000',
      fillOpacity: 0.3,
      strokeColor: '#ff0000',
      strokeOpacity: 0.6,
      strokeWeight: 3,
    })
  }, [])

  return <div id="map" style={{ width: '50vw', height: '50vh' }} />
}
```

<br />

## 구멍 뚫린 폴리곤 표시하기

위에서 폴리곤을 그리는 path를 전달할 때 배열 안의 첫 번째 요소로 전달해야 한다고 했는데, 이는 구멍 뚫린 폴리곤을 표시하기 위함이라고 한다.

구멍 뚫린 폴리곤을 그리고 싶다면 `paths` 배열의 두 번째 요소로 뚫릴 구멍에 대한 좌표값을 배열로 전달하면 된다.

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
    new naver.maps.Polygon({
      map: map,
      paths: [
        [
          new naver.maps.LatLng(37.37544345085402, 127.11224555969238),
          new naver.maps.LatLng(37.37230584065902, 127.10791110992432),
          new naver.maps.LatLng(37.35975408751081, 127.10795402526855),
          new naver.maps.LatLng(37.359924641705476, 127.11576461791992),
          new naver.maps.LatLng(37.35931064479073, 127.12211608886719),
          new naver.maps.LatLng(37.36043630196386, 127.12293148040771),
          new naver.maps.LatLng(37.36354029942161, 127.12310314178465),
          new naver.maps.LatLng(37.365211629488016, 127.12456226348876),
          new naver.maps.LatLng(37.37544345085402, 127.11224555969238),
        ],
        [
          new naver.maps.LatLng(37.368485964153784, 127.10971355438232),
          new naver.maps.LatLng(37.368520071054576, 127.11464881896971),
          new naver.maps.LatLng(37.36350619025713, 127.11473464965819),
          new naver.maps.LatLng(37.363403862670665, 127.1097993850708),
          new naver.maps.LatLng(37.368485964153784, 127.10971355438232),
        ],
      ],
      fillColor: '#ff0000',
      fillOpacity: 0.3,
      strokeColor: '#ff0000',
      strokeOpacity: 0.6,
      strokeWeight: 3,
    })
  }, [])

  return <div id="map" style={{ width: '50vw', height: '50vh' }} />
}
```

<br/>
<br/>
<br/>
<br/>
