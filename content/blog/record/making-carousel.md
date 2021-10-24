---
title: '[record] React로 carousel 기능 구현하기'
date: 2021-07-11 18:05:13
category: 'record'
draft: false
---

# React에서 carousel 구현하기

## carousel의 기본 동작 원리

모든 캐러셀(슬라이드)의 기본 동작 원리는 동일하다.

![](https://images.velog.io/images/anachrosh/post/6aebbc56-5521-4fa8-b2b4-ea9daca54f9a/3c42a3de-abcc-4df6-b8db-cfdf83eb412b.png)

브라우저에 보이는 슬라이드의 큰 틀이 있고 그 내부에 슬라이드의 컨텐츠들이 들어있다. 이때 슬라이드 컨텐츠 전체의 길이는 당연히 한번에 보이는 틀의 길이보다 길어지게 된다. 틀 부분에 css로 `overflow: hidden` 을 주면 넘치는 부분이 보이지 않는 것을 이용하는 원리이다.

일정 시간이 지나거나 좌, 우로 이동하는 버튼을 눌렀을 때 `translate` 속성의 값이 동적으로 변경되게 하면 된다.

하단의 슬라이드는 이 방법으로 직접 구현한 슬라이드이다.

![](https://images.velog.io/images/anachrosh/post/5e7fbc67-a475-426c-bb7c-fd3fd14cc057/chrome-capture.gif)

<br />

---

## 코드 분석

```javascript
class StoreImgList extends React.Component {
  state = {
    slideSpot: 0,
    //현재 화면에 보이고 있는 슬라이드의 시작점
  }

  imgQuantity = this.props.imagesData.length
  //데이터로 들어오는 총 이미지 수가 항상 다르기 때문에 총 이미지 수를 구해준다.
  slideWidth = IMG_WIDTH * this.imgQuantity + (this.imgQuantity - 1) * SLIDE_GAP
  //슬라이드 내부 컨텐츠의 전체 길이를 구해준다.
  hiddenedSlideWidth = this.slideWidth - window.innerWidth
  //슬라이드 내부 컨텐츠 전체 길이에서 윈도우의 innerWidth 값을 빼 남아있는 슬라이드의 길이를 구한다.
  slideEnd
  //슬라이드의 끝부분에 갔을 때 next 버튼이 없어지도록 만들 때 사용할 변수이다.

  handlePrevBtn = () => {
    const { slideSpot } = this.state

    if (Math.abs(slideSpot) < SLIDE_MOVING_UNIT) {
      //슬라이드 왼쪽으로 남은 값이 한 번에 이동하는 값보다 작으면

      this.setState({
        slideSpot: 0,
        //0까지만 이동
      })
    } else {
      //그 외의 경우

      this.setState({
        slideSpot: slideSpot + SLIDE_MOVING_UNIT,
        //현재 위치에서 한 번에 이동해야 하는 값만큼 이동
      })
    }
  }

  handleNextBtn = () => {
    const { slideSpot } = this.state

    if (this.hiddenedSlideWidth - Math.abs(slideSpot) < SLIDE_MOVING_UNIT) {
      //남아있는 슬라이드의 길이에서 현재 슬라이드의 위치값을 뺀 값이 한 번에 움직여야 하는 값보다 작으면

      this.setState({
        slideSpot: slideSpot - (this.hiddenedSlideWidth - Math.abs(slideSpot)),
        //남은 길이만큼만 이동하고
      })
      this.slideEnd =
        slideSpot - (this.hiddenedSlideWidth - Math.abs(slideSpot))
      //slideEnd의 값을 slideSpot의 값과 동일하게 만들어 nextBtn을 보이지 않게 한다
    } else {
      //남아있는 슬라이드의 길이가 한 번에 움직여야 하는 값보다 크면

      this.setState({
        slideSpot: slideSpot - SLIDE_MOVING_UNIT,
        //한 번에 움직여야 하는 만큼 값을 빼준다
      })
    }
  }

  render() {
    const { slideSpot } = this.state
    const { imagesData } = this.props

    return (
      <div className="storeImgBox">
        {!!slideSpot && (
          <button onClick={this.handlePrevBtn} className="slideArrow arrowLeft">
            <i className="fas fa-chevron-left"></i>
          </button>
        )}
        <ul className="storeImgUl">
          <div
            style={{ transform: `translateX(${slideSpot}px)` }}
            className="slideInner"
          >
            {imagesData.map((img, i) => (
              <li key={i} className="storeImgLi">
                <img src={img} />
              </li>
            ))}
          </div>
        </ul>
        {slideSpot !== this.slideEnd && (
          <button
            onClick={this.handleNextBtn}
            className="slideArrow arrowRight"
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        )}
      </div>
    )
  }
}

const SLIDE_GAP = 14 //각 슬라이드 사이 간격
const SLIDE_MOVING_UNIT = 500 //슬라이드 버튼 클릭 시 움직일 길이
const IMG_WIDTH = 400 //이미지 가로 길이

export default StoreImgList
```

<br/>
<br/>
<br/>
<br/>
