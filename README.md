学会这些自定义 hooks，让你摸鱼时间再翻一倍 🐟🐟

## 前言

拿破仑曾说过，不想当将军的士兵不是好士兵，不会摸鱼的员工不是好员工 [手动狗头]。

本文将从各种实用场景出发，讲解不同场景下使用自定义`hooks`的最佳实践，手牵手教你封装自己的`hooks`工具库，高效摸鱼 🐟，拒绝低效 🙅。

文章中涉及到的代码都放到了 Github 中：[Demo](https://github.com/noBaldAaa/my-hooks)。

下面让我们开始吧 🏃。

## 自定义 hooks 环节

hooks 规则不是本文的重点，不做过多的赘述，详情见官网 [Building Your Own Hooks](https://reactjs.org/docs/hooks-custom.html#gatsby-focus-wrapper)。

按使用场景的频率进行排序，封装常用的 hooks 如下：

- useMount
- useUnMount
- useUpdateEffect
- useFirstMount
- useDebounceState
- useDebounceEffect
- useThrottleState
- useThrottleEffect
- useDeepCompareEffect
- useSetState
- useLatest
- useCountdown

如果有一些 hooks 你经常用，但是我没有列出来，请在评论区告诉我，你提需求，我来写 😉。

### useMount

在不少场景中，我们仅仅只需要在组件初次渲染时执行某些逻辑，比如项目中关于配置的请求，一般情况下我们会这么做：

```js
useEffect(() => {
  //做一些事情
}, []);
```

这么做最大的`缺点在于语义不够清晰`，即使在 deps 中我们传入的是一个空数组。

那我们是不是可以封住一个`hook: useMount`，让它只在组件初次渲染期间执行，用来`明确语义，提高代码可读性`。

期望用法：

```js
const UseMountExample = () => {
  const [num, setNum] = useState(0);

  useMount(() => {
    console.log("useMount");
  });

  return (
    <div>
      num:{num}
      <button onClick={() => setNum(num + 1)}>add</button>
    </div>
  );
};
```

useMount 具体实现（一行代码轻松搞定，是不是很简单）：

```js
import { EffectCallback, useEffect } from "react";

export const useMount = (callback: EffectCallback) => {
  useEffect(callback, []);
};
```

效果：我们可以看到，当组件重新渲染时，useMount 中也不会执行。

![echeu-q6z8g.gif](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/41ce94082fd545d69782a517ffb8c58f~tplv-k3u1fbpfcp-watermark.image?)

### useUnMount

同样的，在一些场景下，我们仅仅只需要在组件卸载时触发一些逻辑。例如，清除定时器或重置一些状态时，通常我们会这么做：

```js
useEffect(() => {
  return () => {
    //执行组件销毁时的逻辑
  };
}, []);
```

它的缺点同样很明显，`我们足足用了4行代码来表达组件卸载时的生命周期，而且语义也不清晰`，为了`提高代码可读`性，我们需要封装`hook: useUnMount`，用来明确语义。

期望用法：

```js
//Child.tsx
const Child = () => {
  const [num, setNum] = useState(0);

  useUnMount(() => console.log(num, "num")); //在组件销毁时打印出num值

  return (
    <div>
      num:{num}
      <button onClick={() => setNum(num + 1)}>add</button>
    </div>
  );
};

//Demo.tsx
const UseUnmountExample = () => {
  const [showFlag, setShowFlag] = useState(true); //模拟Child组件销毁，对Child组件进行显示/隐藏

  return (
    <div>
      {showFlag && <Child />}
      <button onClick={() => setShowFlag(false)}>销毁child</button>
    </div>
  );
};
```

useUnMount 具体实现（同样一行代码就能搞定）：

```js
import { useEffect } from "react";

export const useUnMount = (fn: () => any): void => {
  useEffect(() => () => fn(), []);
};
```

效果：

![uli3w-frzau.gif](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0bf8aa9546ae4bc9ad03ab7e4ff65ac9~tplv-k3u1fbpfcp-watermark.image?)
很明显，最后 Child 组件销毁时输出的 num 并不是我们想要的，这个其实是因为`useEffect中闭包机制`导致的，这样实现始终都是执行的第一次渲染时传入的函数，为了拿到实时的状态，这里需要借助 [useRef](https://reactjs.org/docs/hooks-reference.html#useref) 来实现。

修改 useUnMount 实现：

```js
import { useEffect, useRef } from "react";

export const useUnMount = (fn: () => any): void => {
  const fnRef = useRef(fn);
  fnRef.current = fn; //拿到实时的fn

  useEffect(() => () => fnRef.current(), []);
};
```

再来测试一下：

![ydyrt-tt93d.gif](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/57eee8daa5e64baa87d13cb6a77ebd9e~tplv-k3u1fbpfcp-watermark.image?)
这样就解决了闭包导致的问题，好啦，继续下一个 👇。

### useUpdateEffect

在部分场景下，我们想要忽略首次执行，只需在依赖项发生变化时去执行某些逻辑。`通常的做法是定义一个isFirstMount的变量来判断`，像这样：

```js
const isFirstMountRef = useRef(false); //用来判断是否是初次渲染

useEffect(() => {
  isFirstMountRef.current = true;
}, []);

useEffect(() => {
  if (isFirstMountRef.current) {
    return;
  }

  //执行二次渲染时的逻辑
  xxx;
}, [deps]);
```

同样的，这段代码看起来很不优雅，`我们用了一大段代码来制造一个只在依赖更新时才运行的环境`。 这个时候我们需要封装一个`hook: useUpdateEffect`，它需要忽略首次渲染，只有当依赖发生变化时才会执行，用法应与`useEffect`相同。

期望用法：

```js
const UseUpdateEffectExample = () => {
  const [num, setNum] = useState(0);

  useUpdateEffect(() => {
    console.log(num, "num更新时的值");

    return () => {
      console.log("销毁之前num:", num);
    };
  }, [num]);

  return (
    <div>
      {num}
      <button onClick={() => setNum(num + 1)}>add</button>
    </div>
  );
};
```

useUpdateEffect 具体实现：

```js
import { useEffect } from "react";
import { useFirstMount } from "./useFirstMount";

export const useUpdateEffect: typeof useEffect = (effect, deps) => {
  const isFirstMount = useFirstMount(); //判断是否是初次渲染

  useEffect(() => {
    if (!isFirstMount) {
      return effect(); //二次渲染才执行
    }
  }, deps);
};
```

效果：可以看到，首次渲染没有执行，只有当重新渲染时才会打印。

![hho5a-qxilf.gif](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/65b24a6871a24a5a928709d1ebd713bd~tplv-k3u1fbpfcp-watermark.image?)
在实现过程中，我们封装了另外一个`hook: useFirstMount`，它用来判断是否为首次渲染，实现起来比较简单，我们直接开干。

### useFirstMount

用来判读是否是首次渲染：

```js
import { useRef } from "react";

export function useFirstMount(): boolean {
  const isFirst = useRef(true);

  //如果是初次渲染
  if (isFirst.current) {
    isFirst.current = false;

    return true;
  }

  return isFirst.current;
}
```

### useDebounceState

场景：现有如下表格，表格数据的获取依赖两个参数：

- 搜索框中搜索参数：keyword
- 表格底部的分页器参数：page/pageSize

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8f31a8b58cef4671a2b0e593731ba87e~tplv-k3u1fbpfcp-watermark.image?)

为了防止 api 接口频繁请求，之前我们大概率会这么做：给输入框的`onChange事件`和分页器的`onPageChange事件`都加上防抖函数。但是经验教训告诉我，当表单的筛选条件过多或后续加更多的条件时，很容易遗漏掉部分条件的防抖。

这个时候希望封装一个`hook:useDebounceState`，它能够对 state 进行防抖，我们通过这个防抖之后的值再去请求 api，这样就能达到一样的效果，并且当后续表格中加更多条件时，我们只需要在 state 中处理即可。

期望用法：

```js
const [state, setState] = useState({
  keyword: "",
  page: 1,
  pageSize: 10,
}); //定义表格api的params
const debounceParams = useDebounceState(state, 1000); //拿到防抖state

useEffect(() => {
  //请求api
}, [debounceParams]);
```

useDebounceState 具体实现：

```js
function useDebounceState<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState < T > value;
  useEffect(() => {
    // 在delay时间后更新debouncedValue
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handle); //当传入的value变化时，清除之前的定时器
  }, [value, delay]);
  return debouncedValue;
}
```

效果：
![wp9ru-3elh2.gif](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/298992d4db49464cbefdd990e8bc5e90~tplv-k3u1fbpfcp-watermark.image?)

### useDebounceEffect

上面场景我们通过`useDebounceState`返回了一个 debounceParams，以此来达到了防抖的目的。但是它并不是该场景的最优解，最重要的是`产生一个额外的变量debounceParams`，那我们能不能再优化一下？变成这样：

```js
const [state, setState] = useState({
  keyword: "",
  page: 1,
  pageSize: 10,
}); //定义表格api的params

useDebounceEffect(
  () => {
    //api请求
  },
  [state],
  1000
);
```

将`useEffect => useDebounceEffect`,这么做能够达到相同的效果，并且可以让代码看起来更加简洁优雅。

useDebounceEffect 具体实现：

```js
import { useState,DependencyList,EffectCallback,useEffect,useRef } from "react";
import { useUnMount } from "./useUnMount";
import { useUpdateEffect } from "./useUpdateEffect";

export const useDebounceEffect = (
  effect: EffectCallback,
  deps: DependencyList,
  delay = 1000
) => {
  const timeoufRef = useRef<ReturnType<typeof setTimeout>>();
  const [refreshFlag, setRefreshFlag] = useState(true); //用于更新effect

  useEffect(() => {
    timeoufRef.current = setTimeout(() => {
      setRefreshFlag(!refreshFlag);
    }, delay);

    return () => timeoufRef.current && clearTimeout(timeoufRef.current);
  }, [...deps, delay]);

  //只有当依赖refreshFlag变化时,才执行传入的effect
  useUpdateEffect(effect, [refreshFlag]);

  //当页面销毁时，及时清除定时器
  useUnMount(
    () => () => timeoufRef.current && clearTimeout(timeoufRef.current)
  );
};
```

`核心原理其实与useDebounceState相同，唯一不同的是这里需要通过一个标志refreshFlag去控制effect的执行`。至于为什么要这样，不这样做会有什么坑？这里先留个思考题给大家思考，到时候评论区里看答案 😜。

### useThrottleState

useThrottleState 是节流函数的 hooks 版本，主要用在下拉加载、上拉刷新等场景，用法与我们前面写的 useDebounceState 相同，也是返回一个节流函数处理过的值 throttleValue。

useThrottleState 具体实现:

```js
import { useRef, useState } from "react";
import { useUnMount } from "./useUnMount";
import { useUpdateEffect } from "./useUpdateEffect";

export const useThrottleState = <T>(initialState: T, delay = 5000) => {
  const [state, setState] = useState<T>(initialState);
  const timeout = useRef<ReturnType<typeof setTimeout>>();
  const nextValue = useRef(null) as any;
  const hasNextValue = useRef(false);

  useUpdateEffect(() => {
    if (timeout.current) {
      nextValue.current = initialState;
      hasNextValue.current = true;
    } else {
      setState(initialState);
      const timeoutCallback = () => {
        if (hasNextValue.current) {
          setState(nextValue.current);
          hasNextValue.current = false;
        }
        timeout.current = undefined;
      };
      timeout.current = setTimeout(timeoutCallback, delay);
    }
  }, [initialState]);

  useUnMount(() => {
    timeout.current && clearTimeout(timeout.current);
  });

  return state;
};
```

### useThrottleEffect

useThrottleEffect 为  `useEffect`  增加节流的能力，有些场景下使用 useThrottleEffect 会比使用 useThrottleState 代码更加简洁。

useThrottleEffect 具体实现：

```js
import { useEffect, useRef, useState } from "react";
import { useUnMount } from "./useUnMount";

export const useThrottleEffect = <T, U extends any[]>(
  fn: (...args: U) => T,
  args: U,
  delay = 200
) => {
  const [state, setState] = useState<T | null>(null);
  const timeout = useRef<ReturnType<typeof setTimeout>>();
  const nextArgs = useRef<U>();

  useEffect(() => {
    if (timeout.current) {
      //如果有正在进行中的
      nextArgs.current = args;
    } else {
      setState(fn(...args));
      const timeoutCallback = () => {
        if (nextArgs.current) {
          setState(fn(...nextArgs.current));
          nextArgs.current = undefined;
        }
        timeout.current = undefined;
      };
      timeout.current = setTimeout(timeoutCallback, delay);
    }
  }, args);

  useUnMount(() => {
    timeout.current && clearTimeout(timeout.current);
  });

  return state;
};
```

### useDeepCompareEffect

由于 useEffect 中的浅比较机制，导致了一些很让人头疼的问题。比如我们在最开始的例子中：

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8f31a8b58cef4671a2b0e593731ba87e~tplv-k3u1fbpfcp-watermark.image?)

分页器这块，我们可能会这么去编码：

```js
const [pagination, setPagination] = useState({
  page: 1,
  page_size: 10,
});

//当触发分页器时执行
const onPageChange = (page, page_size) => {
  setPagination({
    page,
    page_size,
  });
};

//当分页器触发时重新请求接口：
useEffect(() => {
  //请求数据
}, [pagination]);
```

这就导致了一个问题，`当用户选择了相同的page或page_size时，依然会触发useEffect`，这样会导致重新请求一遍相同的数据，这是我们不希望看到的。

这个时候就需要封装一个 `hook: useDeepCompareEffect`来解决这个问题，我们可以对 deps 进行深度比较，只有当深比较后前后不一致才会触发渲染，用法与 useEffect 相同。

期望用法：

```js
const UseDeepCompareEffectDemo = () => {
  const [obj, setObj] = useState({ a: "1" });

  useDeepCompareEffect(() => {
    console.log("渲染");
  }, [obj]);

  return (
    <div>
      UseDeepCompareEffectDemo:
      <button onClick={() => setObj({ a: "2" })}>setObj</button>
    </div>
  );
};
```

useDeepCompareEffect 具体实现：

```js
import isEqual from 'lodash/isEqual';
import { useEffect, useRef } from 'react';
import type { DependencyList, EffectCallback } from 'react';

const depsEqual = (aDeps: DependencyList, bDeps: DependencyList = []) => {
  return isEqual(aDeps, bDeps);
};

const useDeepCompareEffect = (effect: EffectCallback, deps: DependencyList) => {
  const ref = useRef<DependencyList>();
  const signalRef = useRef<number>(0);

  if (!depsEqual(deps, ref.current)) {
    ref.current = deps;
    signalRef.current += 1;
  }

  useEffect(effect, [signalRef.current]);
};

export default useDeepCompareEffect;
```

效果：

![wilyr-1azcq.gif](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ff0ae5cf328f45649f0c90f0c2243515~tplv-k3u1fbpfcp-watermark.image?)

### useSetState

依旧拿之前的表格来举例子，在上面触发分页器的事件中，我们是这么做的：

```js
const [state, setState] = useState({
  keyword: "",
  page: 1,
  pageSize: 10,
}); //定义表格api的params

//分页器事件
const onPageChange = (page, page_size) => {
  setState({
    ...state,
    page,
    page_size,
  });
};
```

那有没有办法让我们拥有与 class 组件中的 setState 一样的能力呢？比如，我只需要修改 state 中的 page 属性时，直接这么做就可以，其他参数不受影响：

```js
setPagination({ page });
```

自定义 `hook:useSetState` 就可以帮助我们解决这个问题，具体实现：

```js
import { useState } from "react";

export const useSetState = <T extends object>(initialState: T | (() => T)) => {
  const [state, setState] = useState<T>(initialState);

  const set = (value: Partial<T> | ((preState: T) => Partial<T>)): void => {
    setState({
      ...state,
      ...(value instanceof Function ? value(state) : value),
    });
  };

  return [state, set] as const;
};
```

### useLatest

在实现 useUnMount 的过程中，我们提到过 useEffect 的闭包问题，我们的解决方式是通过 useRef 去更新状态，为了解决这一类的问题，我们可以封装成 `hook:useLatest` 来保证我们能够始终拿到最新的值。

useLatest 具体实现：

```js
import { useRef } from "react";

export const useLatest = <T>(value: T): { current: T } => {
  const ref = useRef(value);
  ref.current = value;
  return ref;
};
```

用法：

```js
const latestStateRef = useLatest(state); //拿到最新的state
```

### useCountdown

最后一个，大家再坚持一下就完啦 😄！

倒计时的场景，相信在不少业务中大家都遇到过，简简单单封装成一个 hook，提高摸鱼效率。

期望用法：

```js
const UseCountDownDemo = () => {
  const [timestamp, { days, hours, minutes, seconds }] = useCountdown({
    targetDate: "2022-12-31 24:00:00",
  });
  return (
    <div>
      UseCountDownDemo
      <br />
      倒计时:{days}-{hours}-{minutes}-{seconds}
    </div>
  );
};
```

useCountdown 具体代码实现：

```js
import dayjs from "dayjs";
import { useEffect, useMemo, useState } from "react";
import { useLatestState } from "./useLatestState";

export type TDate = Date | number | string | undefined;

export type Options = {
  targetDate?: TDate;
  interval?: number;
  onEnd?: () => void;
};

export interface FormattedRes {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
}

const calcLeft = (t?: TDate) => {
  if (!t) {
    return 0;
  }
  // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
  const left = dayjs(t).valueOf() - new Date().getTime();
  if (left < 0) {
    return 0;
  }
  return left;
};

const parseMs = (milliseconds: number): FormattedRes => {
  return {
    days: Math.floor(milliseconds / 86400000),
    hours: Math.floor(milliseconds / 3600000) % 24,
    minutes: Math.floor(milliseconds / 60000) % 60,
    seconds: Math.floor(milliseconds / 1000) % 60,
    milliseconds: Math.floor(milliseconds) % 1000,
  };
};

export const useCountdown = (options?: Options) => {
  const { targetDate, interval = 1000, onEnd } = options || {};

  const [timeLeft, setTimeLeft] = useState(() => calcLeft(targetDate));

  const onEndRef = useLatestState(onEnd);

  useEffect(() => {
    if (!targetDate) {
      // for stop
      setTimeLeft(0);
      return;
    }

    // 立即执行一次
    setTimeLeft(calcLeft(targetDate));

    const timer = setInterval(() => {
      const targetLeft = calcLeft(targetDate);
      setTimeLeft(targetLeft);
      if (targetLeft === 0) {
        clearInterval(timer);
        onEndRef.current?.();
      }
    }, interval);

    return () => clearInterval(timer);
  }, [targetDate, interval]);

  const formattedRes = useMemo(() => {
    return parseMs(timeLeft);
  }, [timeLeft]);

  return [timeLeft, formattedRes] as const;
};
```

效果：

![mpa6m-wf2mk.gif](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e3cbe715543449de8c2428ffc27fb77c~tplv-k3u1fbpfcp-watermark.image?)

## 总结

其实这些自定义`hooks`也并不需要我们手写，github 中就有不少优秀的 hooks 库：[ahooks](https://github.com/alibaba/hooks)、[react-use](https://github.com/streamich/react-use)、[useHooks](https://github.com/uidotdev/usehooks) 等，其中 [react-use](https://github.com/streamich/react-use) 在 github 上最受欢迎，star 数达到了 29k，大家直接安装使用即可。

笔者也只是读了一部分库的源码，发现一些 hooks 其实是能够帮助我们大大提高效率的，在此进行分享。如果能够帮助到你，不妨帮忙点个赞 ♥️♥️♥️。

## 推荐阅读

1. [从零到亿系统性的建立前端构建知识体系 ✨](https://juejin.cn/post/7145855619096903717)
2. [我是如何带领团队从零到一建立前端规范的？🎉🎉🎉](https://juejin.cn/post/7085257325165936648)
3. [【Webpack Plugin】写了个插件跟喜欢的女生表白，结果......😭😭😭](https://juejin.cn/post/7160467329334607908)
4. [前端工程化基石 -- AST（抽象语法树）以及 AST 的广泛应用 🔥](https://juejin.cn/post/7155151377013047304)
5. [浅析前端异常及降级处理](https://juejin.cn/post/6979564690787532814)
6. [前端重新部署后，领导跟我说页面崩溃了...](https://juejin.cn/post/6981718762483679239)
7. [前端场景下的搜索框，你真的理解了吗？](https://juejin.cn/post/7042332309449605127)
8. [手把手教你实现 React 数据持久化机制](https://juejin.cn/post/7072761358277672974)
9. [面试官：你确定多窗口之间 sessionStorage 不能共享状态吗？？？🤔](https://juejin.cn/post/7076767687828832286)
