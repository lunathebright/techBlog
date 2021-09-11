---
title: '[JS] Closure'
date: 2021-09-11 18:43:13
category: 'fundamental'
draft: false
---

# Closure 클로저

![closure](https://rahuldotout.files.wordpress.com/2011/05/closure-intro.gif?w=543&h=310)

> [출처: Technical Graffiti](https://rahuldotout.wordpress.com/2011/05/15/professional-javascript-part-5-closures/)

위의 이미지를 보면 foo scope 외부의 함수인 func에서 bar라는 값에 접근하고 있다. 이처럼 클로저는 함수를 선언할 때 만들어지는 유효범위(스코프)가 사라진 이후에도 함수 내부의 값을 사용할 수 있게 해준다. 이를 위해서는 외부 함수 foo 내에서 선언한 변수 x를 참조하는 내부 함수 bar를 외부로 전달하는 과정이 필요하다.

## 클로저 예시

```javascript
function outer() {
  let count = 0

  const inner = () => {
    return ++count
  }

  inner() // 1
}

outer()
```

위의 코드에서 inner 함수를 실행시켰을 때 1이 반환되는 이유는 inner 안에 count라는 변수가 선언되지 않았기 때문에 inner가 참조하고 있는 outer 함수 내에서 count를 찾아 사용하기 때문이다. 그리고 outer의 전체 실행이 완료된 후에는 count는 더 이상 필요하지 않은 값이므로 가비지 컬렉터의 수집 대상이 된다. outer를 다시 실행시키는 것이 아닌 이상 count에 접근할 방법이 없어지는 것이다.

<br/>

> **Garbage Collector 가비지 컬렉터**
>
> 가비지 컬렉터는 이름 그대로 더 이상 필요하지 않은 쓰레기를 수집하는 쓰레기차라고 생각하면 이해가 쉽다. 코드를 짤 때 필요한 값을 할당하고, 사용하는 과정을 거치게 되는데 가비지 컬렉터는 이러한 코드의 흐름에서 필요가 없어진 값들을 제거한다. 이는 메모리를 효율적으로 관리하기 위함이다.

<br/>

그런데 클로저를 활용하면 outer가 종료된 이후에도 count에 접근이 가능해진다.

```javascript
function outer() {
  let count = 0

  const inner = () => {
    return ++count
  }

  return inner
}

outer()

const outer2 = outer()

console.log(outer2()) // 1
console.log(outer2()) // 2
console.log(outer2()) // 3
```

위의 코드에서는 outer 내부에서 inner의 결과값이 아닌 inner 자체를 반환하고 있다. 그리고 outer 함수의 실행이 완료되었음에도 count의 값이 유지되어 콘솔에 1, 2, 3이 차례로 찍히는 것을 확인 할 수 있다. 이는 가비지 컬렉터가 outer 함수가 실행 완료된 이후에도 outer를 수집하지 않기 때문이다.

outer 함수가 inner 함수를 반환하고 있기 때문에 outer 함수가 할당된 outer2 함수에 의해 inner가 언제든 호출될 가능성이 남아있다. inner 함수가 호출될 때, inner는 내부에 count라는 값을 가지고 있지 않아 outer 함수의 count를 사용하기 위해 outer 함수의 Lexical Environment를 필요로 한다. 그래서 함수의 실행은 완료되었지만 여전히 해당 값을 참조하고 있는 변수가 남아있고(outer2), 이로 인해 가비지 컬렉터는 해당 변수를 수집 대상에서 제외시킨다.

<br/>
<br/>
<br/>
<br/>
