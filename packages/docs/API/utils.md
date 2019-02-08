---
sidebarDepth: 3
---

# 实用工具

有一些工具与我们的 STG 引擎内核无关, 但也同样非常重要. 我将这些工具存放在了官方库 @stg/utils 中, 同时完整的 web-stg 包也直接提供了这其中的全部 API.

## 数学 (math)

`stg.math` 的用法基本与 JavaScript 的全局变量 Math 相同, 不过对其中的部分函数使用了 lru-cache 处理, 多次连续调用会自动从缓存中获取. 因此使用这其中的函数有助于提高性能. 此外, math 对象增加了下面的属性:

- `math.twoPI`: 2π
- `math.halfPI`: 0.5π

## 随机化 (random)

我们提供了一些用于随机化的函数, 你可以通过 `stg.random` 来使用它们.

### random.pm1()

返回一个随机的 ±1. 概率均为 0.5.

### random.real(start, end)

生成一个置于 [start, end) 区间内的随机实数.

### random.int(start, end)

生成一个置于 [start, end) 区间内的随机整数.

### random.transfer(init, start, end, min, max)

使一个处于`init`位置的数在范围`[start, end]`之间做随机的转移. 移动距离至少为`min`, 最大为`max`. 这个函数基本就是为了东方游戏的 boss 设计的 (笑).

<stg-demo src="demo-1" :height="400" :width="200" auto-run/>

## 颜色 (color)

我们提供了一系列与颜色相关的函数, 你可以通过 `stg.color` 来使用它们的. 值得一提的是, 由这个库中的函数返回的实例可以直接在其他 API 的颜色接口中使用.

### color.builtin

包含了全体 [CSS 颜色](https://developer.mozilla.org/zh-CN/docs/Web/CSS/color_value)的一个对象. 你可以使用诸如 `color.builtin.blue` 来获得一个蓝色实例.

### color.transparent

一个透明色 `#0000` 实例.

### color.rgb(r, g, b, a?)
### color.hsl(h, s, l, a?)
### color.hsv(h, s, v, a?)

通过 RGBA / HSLA / HSVA 构造一个颜色实例.

### color.hex(hexString)

通过十六进制字符构造一个颜色实例. `hexString` 的开头可以有一个 `#` 也可以没有, 包含的十六进制字符数可以是 3, 4, 6 或者 8.

