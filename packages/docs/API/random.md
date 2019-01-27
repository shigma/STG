# 随机化过程

```js
const { Random } = require('@stg/utils')
```

## Random.pm1()

返回一个随机的 ±1. 概率均为 0.5.

## Random.real(start, end)

生成一个置于 [start, end) 区间内的随机实数.

## Random.int(start, end)

生成一个置于 [start, end) 区间内的随机整数.

## Ramdom.transfer(init, start, end, min, max)

使一个处于`init`位置的数在范围`[start, end]`之间做随机的转移. 移动距离至少为`min`, 最大为`max`. 这个函数基本就是为了东方游戏的 boss 设计的 (笑).

