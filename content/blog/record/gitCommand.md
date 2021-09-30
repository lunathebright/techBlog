---
title: '[record] 자주 사용하는 Git 명령어'
date: 2021-09-28 15:23:13
category: 'record'
draft: false
---

# 자주 사용하는 Git 명령어

사용 빈도가 높거나 git을 사용하다 필요를 느껴 검색해 본 적이 있는 명령어 위주로 정리했다.

<br/>

## 계정(이름/이메일)

**git config --global --list**

유저 정보 조회 (터미널 상에서 에디터로 노출)

<br/>

**git config --global user.name / git config user.email**

유저 이름 / 이메일 조회

<br/>

**git config --global user.name [변경할 이름]**

**git config --global user.email [변경할 이메일]**

유저 이름 / 이메일 변경 또는 등록

<br/>

<span style="color:#9d9f9d">\* `--global`은 전역 설정을 위한 키워드이기 때문에 저장소별 설정을 원하면 해당 키워드 없이 사용해야 함</span>

<br/>

## 저장소 생성 / 연결 / 연결 해제

**git init**

git 저장소 생성

<br/>

**git clone [clone 할 저장소 url]**

존재하는 저장소 복제

<br/>

**git remote add [저장소 url]**

로컬 저장소 원격 저장소에 연결하기

<br/>

**git remote -v**

연결되어 있는 원격 레파지토리 확인

<br/>

**git remote remove origin**

연결되어 있는 원격 레파지토리 연결 끊기

<br/>

## 기본 사용

**git log**

모든 이력 조회

<br/>

**git status**

현재 git 상태 조회

<br/>

**git log [시작 지점]...[끝 지점]**

두 지점 사이의 커밋 로그 조회 (지점은 커밋 명, 브랜치 명, 태그 명이 가능하며 조합해 사용 가능)

<br/>

**git pull origin [원격 브랜치]**

원격 저장소 브랜치의 변경 사항을 현재 브랜치에 가지고 오기

<br/>

**git add [add할 파일] / git add .**

변경 사항 스테이징 하기 (.은 모든 변경 사항)

<br/>

**git commit -m [commit 메세지]**

스테이징된 사항 커밋하기 (git commit까지만 입력하면 commit 메세지를 길게 입력할 수 있도록 에디터 노출)

<br/>

**git push origin [push할 브랜치]**

커밋한 사항 푸쉬하기

<br/>

**git merge [합칠 브랜치]**

다른 브랜치를 현재 브랜치로 합치기

<br/>

## 브랜치

**git branch**

로컬 브랜치 목록 조회

<br/>

**git branch -r**

원격 브랜치 목록 조회

<br/>

**git branch [새 브랜치 명]**

현재 브랜치에서 새 브랜치 생성

<br/>

**git checkout [이동할 브랜치 명]**

다른 브랜치로 이동

<br/>

**git checkout -b [새 브랜치 명]**

현재 브랜치에서 새 브랜치 생성하고 체크아웃

<br/>

**git branch [새 브랜치 명]&nbsp;[브랜치 생성 위치]**

다른 시작 지점에서 브랜치 생성하기

<br/>

**git branch -m [바꿀 브랜치 명]&nbsp;[새 브랜치 명]**

브랜치 이름 변경하기

<br/>

**git merge --no-commit [합칠 브랜치]**

커밋 없이 합치기

<br/>

**git cherry-pick [커밋 명]**

선택한 커밋만 합치기

<br/>

**git branch -d [삭제할 브랜치]**

브랜치 삭제하기 (삭제할 브랜치가 현재 브랜치에 합쳐지지 않았을 경우 -d 대신 -D 사용)

<br/>

**git remote update > git checkout -t origin/[가져올 원격 브랜치]**

원격 브랜치 가져와서 체크아웃하기

<br/>
<br/>
<br/>
<br/>
