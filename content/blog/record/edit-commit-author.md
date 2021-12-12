---
title: '[record] 잘못 작성된 commit author 변경하기'
date: 2021-10-25 18:18:13
category: 'record'
draft: false
---

아주 옅은 색일지라도 github의 잔디를 열심히 가꾸려고 노력하고 있는데 작업 환경이 바뀔 때마다 이메일 설정하는 것을 꼭 잊어버리고는 한다... 커밋에 푸쉬까지 해놓고 하얗기만 한 잔디밭을 보면 그제서야 '아, 메일 연동...!'을 외치게 된다.

아직 로컬에 있다면 비교적 간단하지만, 푸쉬까지 했다면 사실 좀 번거롭다. 하지만 잔디를 놓치고 싶지는 않으니까 commit author를 수정해보자.

## git config 수정

우선 또 같은 일이 발생하지 않도록 가장 먼저 git config를 수정해 주어야 한다.

```bash
// 레포별 다른 email 지정하기
git config user.email "github에 등록되어 있는 이메일"

// 전체 레포에 동일한 email 지정하기
git config --global user.email "github에 등록되어 있는 이메일"
```

설정하고 난 뒤에는 `git config --list` 명령어로 확인해 볼 수 있다. 이 설정을 한 다음 커밋부터는 제대로 기록된다.

## Local

아직 로컬에 있는 직전 커밋이라면 `git commit --amend` 명령어로 쉽게 수정이 가능하다.

## Remote

이미 커밋 사항을 푸쉬했다면 rebase를 사용해 commit history를 변경해야 한다.

1. `git log` 명령어로 **수정이 필요한 커밋 직전 커밋**의 해쉬를 복사해둔다. rebase는 입력된 해쉬의 다음 커밋부터 보여주기 때문에 수정이 필요한 커밋의 해쉬로는 해당 커밋을 수정할 수 없다.

2) `git rebase -i [복사해둔 커밋의 해쉬]` 를 실행하면 에디터 창에 입력한 해쉬 다음의 모든 커밋이 뜬다. author 수정이 필요한 커밋들의 앞부분에 있는 `pick` 을 `edit`으로 바꿔주고 에디터를 나온다.

   - `pick` 은 해당 커밋 그대로 사용

   - `edit` 은 해당 커밋 변경

3. `git commit --amend --author="이름 <메일>"` 명령어로 변경할 author에 대한 정보를 입력한다.

4. `git rebase --continue`

5. `git push origin +푸쉬할 브랜치 명` 로 강제 푸쉬 (이미 푸쉬했던 사항이기 때문에 강제로 푸쉬해야 함)

<br/>
<br/>
<br/>
<br/>
