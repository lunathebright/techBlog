---
title: '[record] 작업 내용 임시 저장 git stash'
date: 2021-12-19 16:06:13
category: 'record'
draft: false
---

# 작업 내용 임시 저장 git stash

며칠 전 작업을 완료하고 commit을 하려는데 그제서야 브랜치 이동을 하지 않았다는 것을 깨달았다. 해당 작업을 하기 위한 브랜치도 이미 파놓았는데 기존 브랜치에서 이어서 작업을 한 것이다. 해당 브랜치는 이미 머지가 된 후였고, 추가 작업 내용이 브랜치와도 전혀 어울리지 않았기 때문에 어떻게 하면 좋을지 고민스러웠다.

하지만 이런 문제가 생길 때마다 늘 드는 생각은 나보다 먼저 이런 일에 직면한 사람이 있기 마련이라는 것이었다. 아니나 다를까 찾아보니 아주 좋은 명령어가 있었다.

<br />

## git stash

stash는 작업 내용을 스택에 임시 저장하는 명령어이다. 임시 저장한 내용은 브랜치가 달라져도 적용이 가능하다.

- 변경 내용을 다른 브랜치에 적용하고 싶을 때
- 다른 브랜치에서 잠시 작업해야 하는 일이 생겼는데 현재 브랜치에서 commit을 하기 애매할 때

그래서 대표적으로 위와 같은 경우에 유용하게 사용할 수 있다.

<br />

## 사용하기

### stash 생성하기

```javascript
git stash
git stash save
```

`git stash` 또는 `git stash save` 명령어를 통해 새로운 stash 생성이 가능하다. stash 하고 나면 워킹 디렉토리가 깔끔해지는 것을 확인할 수 있다. 가장 최근 commit 후의 상태로 돌아가는 것이다,

### stash 목록 확인하기

```javascript
git stash list
```

저장된 내역을 확인해야 할 때도 생길 수 있다. 그럴 때는 위의 명령어를 통해 확인이 가능하다. 리스트 조회를 통해 `stash@{0}` 과 같은 stash Id 를 확인할 수 있다.

### stash 가져오기

```javascript
git stash apply
git stash apply [stash ID]
```

저장된 stash를 가져올 때는 apply 명령어를 사용한다. 그냥 사용하면 가장 최근의 stash를 가져오고, 특정 stash를 가져오고 싶을 때는 뒤에 해당 stash의 아이디를 붙여주면 된다.

### stash 제거하기

```javascript
git stash drop
git stash drop [stash ID]
```

apply는 stash를 적용만 하는 명령어이기 때문에 적용된 stash라도 여전히 스택에 남아있다. 더 이상 저장해두지 않아도 되는 stash라면 drop 명령어로 삭제할 수 있다.

apply 와 마찬가지로 그냥 사용하면 가장 최근 stash 삭제, 특정 stash 삭제를 원할 때는 아이디를 붙여 사용한다.

### stash 가져온 후 바로 삭제하기

```javascript
git stash pop
```

저장된 stash를 가져오고 list에서 삭제하는 것을 한 번에 하고 싶다면 위의 명령어를 사용하면 된다.

<br />

## 실제 사용

```
git stash
git checkout [이동할 브랜치]
git stash pop
```

나는 마지막 커밋 이후의 작업 내용을 전부 다른 브랜치로 옮기고 싶었기 때문에 위와 같은 방법으로 간단하게 해결할 수 있었다.

<br/>
<br/>
<br/>
<br/>
