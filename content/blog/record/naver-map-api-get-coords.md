---
title: '[record] React에서 네이버 맵 API 사용하기 - 좌표얻기'
date: 2022-02-09 13:54:13
category: 'record'
draft: false
---

# Naver Map API - 좌표 얻기

네이버 지도에서는 `addListener` 메소드나 `geocode` 를 사용해 좌표값을 얻을 수 있다.

`addListenr` 는 리스너라는 이름에 맞게 클릭이나 마우스오버 등 특정 이벤트가 일어났을 때 실행되며, `geocode` 는 검색이나 클릭 등으로 주소 또는 좌표값이 있을 때 반대값으로 변환이 가능하다.

<br />

## addListener

```javascript
naver.maps.Event.addListener(map, 'click', e => {
  console.log(e)
})
```

`addListener` 는 위와 같이 사용 가능하다. 인자의 첫 번째는 연결해 줄 맵, 두 번째는 이벤트 종류, 세 번째는 이벤트 발생 시 수행될 함수이다.

```javascript
{
  coord: o.LatLng {y: 37.390605, _lat: 37.390605, x: 127.1616181, _lng: 127.1616181}
  domEvent: PointerEvent {isTrusted: true, pointerId: 1, width: 1, stop: ƒ, pos: ƒ, …}
  latlng: o.LatLng {y: 37.390605, _lat: 37.390605, x: 127.1616181, _lng: 127.1616181}
  offset: o.Point {x: 1042, y: 138}
  originalEvent: PointerEvent {isTrusted: true, pointerId: 1, width: 1, stop: ƒ, pos: ƒ, …}
  point: o.Point {x: 218.42603953845486, y: 99.29420120258015}
  pointerEvent: PointerEvent {isTrusted: true, pointerId: 1, width: 1, stop: ƒ, pos: ƒ, …}
  type: "click"
}
```

발생한 이벤트를 확인해 보면, 위와 같은 정보가 담겨있다. `coord` 와 `latlng` 부분에 동일한 좌표값이 담겨있는데 둘의 차이에 대해서는 공식 문서에서 찾지 못했다.

이 방식은 유저가 선택한 부분의 좌표값을 얻기에 가장 간단한 방법이다.

<br />

## geocode

`geocoding` 은 주소값 <-> 좌표값 변환을 수행하는 api로, 특정 지점의 주소값이나 좌표값이 필요할 때 유용하다.

```javascript
// 주소값 -> 좌표값
naver.maps.Service.geocode(
  {
    query: '불정로 6',
  },
  function(status, response) {
    if (status !== naver.maps.Service.Status.OK) {
      return alert('Something wrong!')
    }

    const result = response.v2 // 검색 결과의 컨테이너
    const items = result.addresses // 검색 결과의 배열

    console.log(items)
  }
)

// 좌표값 -> 주소값
naver.maps.Service.reverseGeocode(
  {
    coords: new naver.maps.LatLng(37.3595316, 127.1052133),
  },
  function(status, response) {
    if (status !== naver.maps.Service.Status.OK) {
      return alert('Something wrong!')
    }

    const result = response.v2 // 검색 결과의 컨테이너
    const items = result.results // 검색 결과의 배열

    console.log(items)
  }
)
```

`geocode` 는 네이버 클라우드 플랫폼에서 `geocoding` 서비스를 등록해야 사용 가능하다. 다른 서비스들과 마찬가지로 콘솔에서 등록해주면 된다.

```javascript
<script
  type="text/javascript"
  src="https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=YOUR_CLIENT_ID&submodules=geocoder"
></script>
```

그 후, 위의 스크립트를 `index.html` 에 추가하면 기본 세팅이 끝난다.

<br />

**주소값 -> 좌표값**

위의 코드에서 `query` 부분에 주소를 입력하면 해당 주소에 대한 정보가 응답으로 돌아온다. 상황에 따라 편리하게 사용가능하도록 응답 중 `addressElements` 에 전체 주소 각 요소에 대한 정보값 또한 포함되어 있다.

> Example: '불정로 6'
>
> **addressElements**: Array(9)
>
> **0**: {types: Array(1), longName: '경기도', shortName: '경기도', code: ''}
>
> **1**: {types: Array(1), longName: '성남시 분당구', shortName: '성남시 분당구', code: ''}
>
> **2**: {types: Array(1), longName: '정자동', shortName: '정자동', code: ''}
>
> **3**: {types: Array(1), longName: '', shortName: '', code: ''}
>
> **4**: {types: Array(1), longName: '불정로', shortName: '불정로', code: ''}
>
> **5**: {types: Array(1), longName: '6', shortName: '6', code: ''}
>
> **6**: {types: Array(1), longName: 'NAVER그린팩토리', shortName: 'NAVER그린팩토리', code: ''}
>
> **7**: {types: Array(1), longName: '178-1', shortName: '178-1', code: ''}
>
> **8**: {types: Array(1), longName: '13561', shortName: '13561', code: ''}

<br />

**좌표값 -> 주소값**

좌표값을 주소값으로 변환하는 것도 `coords` 부분에 형식을 맞춰 좌표값을 넣어주면 된다. 응답으로는 json 객체가 돌아온다.

<br/>
<br/>
<br/>
<br/>
