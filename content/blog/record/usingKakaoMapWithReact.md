---
title: '[record] React에서 카카오 지도 API 사용하기'
date: 2021-07-12 18:05:13
category: 'record'
draft: false
---

# 카카오 지도 API 사용하기

[kakao Developers](https://developers.kakao.com/)

카카오가 제공하는 api를 이용하기 위해서는 우선 카카오 개발자 사이트에서 앱 키를 발급받아야 한다. 회원가입 후 프로젝트를 등록하기만 하면 간단하게 발급받을 수 있다.

앱 키를 발급받았다면 오른쪽 상단 내 애플리케이션 메뉴에서 발급받은 앱 키를 확인할 수 있다.

각 api마다 사용방법에 대한 자세한 문서가 있으니 사용하기에 앞서 꼼꼼하게 읽어보길 추천한다.

<br />

---

<br />

[카카오 지도 API 사용법](https://apis.map.kakao.com/web/guide/)

위 링크에 JS에서 지도 api를 사용하는 방법이 자세하게 안내되어 있다. 안내는 바닐라 기준으로 되어있어 당황할 수 있지만 react에 적용하는 것도 크게 다를 것 없다.

```javascript
class StoreLocation extends React.Component {
  componentDidMount = () => {
    //컴포넌트가 마운트 되자마자 상위 컴포넌트에서 받아 온 매장 위도와 경도의 값으로 initMap 함수를 실행시킨다.
    const { storeCoordinate } = this.props

    this.initMap(storeCoordinate[0], storeCoordinate[1])
    //props로 받아오는 위도와 경도 값이 배열에 들어있기 때문에 위처럼 사용했다.
  }

  initMap = (lat, lng) => {
    const script = document.createElement('script')
    //head태그 안에 스크립트 api를 바로 넣어도 되지만 필요한 부분에만 넣어주기 위해 script라는 이름의 요소를 생성했다.

    script.async = true
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${API_APP_KEY}&autoload=false`
    document.head.appendChild(script)
    //위에서 만든 script 요소 안에 실제로 api를 불러오기 위해 필요한 값을 넣고 head태그 안에 붙여주었다.

    script.onload = () => {
      kakao.maps.load(() => {
        const container = document.getElementsByClassName('storeLocation')[0]
        const options = {
          center: new kakao.maps.LatLng(lat, lng),
          //띄울 지도의 위도와 경도값
          level: 4,
          //지도의 확대 정도
        }
        const map = new window.kakao.maps.Map(container, options)
        //여기까지가 실제 지도를 띠우기 위해 필요한 코드 부분인데 이 부분은 카카오의 설명 페이지를 참고하면 쉽게 작성할 수 있다.

        const markerPosition = new kakao.maps.LatLng(lat, lng)
        const marker = new kakao.maps.Marker({
          position: markerPosition,
        })
        marker.setMap(map)
        // 지도에 마커를 띄우기 위한 코드 부분이다. 위도와 경도 값을 넣어주고 실행시키면 된다.
      })
    }
  }

  render() {
    return <div className="storeLocation"></div>
    //지도가 들어갈 자리
  }
}
```

<br/>
<br/>
<br/>
<br/>
