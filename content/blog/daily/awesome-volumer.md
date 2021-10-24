---
title: '[daily] 구린 볼륨 컨트롤러'
date: 2021-09-04 14:05:13
category: 'daily'
draft: false
---

정확한 명칭이 기억 나지는 않지만 인터넷에서 구린 UI를 가진 볼륨 컨트롤러 대회에 대한 내용을 본 적이 있다. 실제 사용을 하기에는 유저를 정말 환장하게 만들만한 것들이지만 따라하기에는 충분히 재밌어 보였다.

![volumer](https://user-images.githubusercontent.com/63533584/132171552-a8ecdf43-7931-4f0c-8df4-5652cd83f649.gif)

[GitHub Repo](https://github.com/lunathebright/awesomeVolumer.git)

이 작품(?)이 가장 기억에 남았던 이유는 기존의 볼륨 컨트롤러의 외향에 충실하면서도 원하는 볼륨 크기를 맞추기 정말 어려운 UI라는 점이다. ~~_재밌어...! 짜릿해...!_~~

마치 모바일에서 드래그 하는 듯한 이벤트를 구현하기 위해 처음으로 hammer js를 사용해보았다. 공식 홈페이지에 사용법에 대한 설명이 잘 되어있어서 사용이 어렵지 않아 좋았다. 이번에는 `pan` 이벤트를 사용했는데 `pinch, press, rotate, swipe, tap` 처럼 다양한 이벤트가 있어서 다른 이벤트들도 사용해보고 싶어졌다.

<br/>
<br/>
<br/>
<br/>
