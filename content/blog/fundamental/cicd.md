---
title: '[DevOps] CI/CD Pipeline'
date: 2021-09-10 20:05:13
category: 'fundamental'
draft: false
---

# CI/CD 파이프라인

![CI/CD example](https://miro.medium.com/max/700/1*7k5Z3-gJaqrY7YFxQx509g.png)

> [출처: What is CI/CD Pipeline?](https://nanduribalajee.medium.com/what-is-ci-cd-pipeline-e2f25db99bbe)

CI와 CD는 서로 다른 개념이지만 매우 밀접한 관계를 가지고 있기 때문에 일반적으로 두 항목을 합쳐 CI/CD라고 부른다. CI/CD를 위한 툴로는 Jenkins, Buildkite, GitHub Actions, GitLab CI/CD, Bitbucket Pipelines, circleci 등이 있다.

## Continuous Integration 지속적인 통합

어플리케이션의 코드 변경 사항이 주기적으로 빌드 및 테스트를 거쳐 공유 레포지토리 통합되는 것.

주기적으로 merge를 하기 때문에 conflict를 줄일 수 있어 개발 생산성 향상에 도움을 주며, merge 되는 모든 코드들이 자동으로 테스트를 거치기 때문에 문제가 발생해도 빠르게 발견하고 해결할 수 있다. 이러한 과정을 거치면 당연히 코드 퀄리티도 향상된다.

## Continuous Delivery & Continuous Deployment

개발, 통합, 배포, 릴리즈, 테스트를 자동화하여 지속적으로 배포하는 것.

(Delivery의 경우 배포는 수동, Deployment의 경우 배포까지 자동)

<br/>

<br/>

---

<br/>

<br/>

인턴십 과정에서 CTO분이 진행하시는 CI/CD 파이프라인 작업을 옆에서 볼 기회가 있었는데 사실 그때는 CI/CD에 대한 개념이 제대로 잡히지 않았을 때라서 보면서도 이해하기가 쉽지 않았다. 간단하게나마 정리를 하고 나니 그때 내가 보았던 것이 무엇을 위한 과정이었는지 명쾌해져서 좋다.

<br/>
<br/>
<br/>
<br/>
