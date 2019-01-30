---
sidebarDepth: 3
---

# 更新器与循环器

这个库中使用的最基本概念是更新器 (Updater). 一个更新器只需实现两个接口: `update` 和 `render`, 它们分别表示一个实例在更新和渲染时调用的钩子函数. 与更新器相对的另一个概念是循环器 (Looping), 它负责按照特定的顺序调用子实例的更新和渲染, 达到管理整个流程的目的. 可以说 Updater 管理了每一个对象的运动状态 (包括但不限于自机, 敌机, 子弹), 而 Looping 负责调控整体的运转和渲染的进行.

下面我们将分别介绍 Updater 和 Looping 两个基类.

### 关于更新策略

上面的基本概念意味着我们的更新和渲染流程是分离的. 为什么要这么做呢? 在过去的版本曾经尝试过更新和渲染绑定在同一个函数中的做法. 它的一个最显著的负面影响便是渲染性能会影响自身的重绘速率 (比如这一秒屏幕上只有 10 颗子弹, 下一秒突然变成了 100 颗, 导致程序回调性能发生变化). 而这又导致了更新会受到渲染的影响, 从而画不出完美的图形.

而如果我们将更新与渲染分离, 则主循环可以尽可能地与显示器实现垂直同步, 同时副循环负责按照固定的速率 (一般为 60 fps) 进行更新, 遇到掉帧现象时也可以稍微加快循环速度, 进行"补帧"处理. 这也是众多 STG 游戏都采取的策略.

## 更新器 (Updater)

### new Updater()

返回一个 Updater 实例.

### updater.setTask(callback, index?, preserve?)

- `callback`: 回调函数, 带有一个参数 `tick`, 表示回调进行时的刻数.
- `index`: 插入任务钩子的位置, 默认为 `Infinity`, 即全部任务的最后面.
- `preserve`: 执行完毕后是否保留这个任务, 默认为 `true`.
- 返回值: 一个正整数 `id`, 表示当前任务的序号, 可以用于 `updater.removeTask`.

### updater.removeTask(id?)

- `id`: 要移除的任务 `id`. 如果在某个钩子内部调用时, 此选项可以省略, 表示任务完成后移除这个任务本身.

### updater.setTimeout(ticks, callback)

- `ticks`: 执行该任务前要等待的刻数.
- `callback`: 回调函数, 带有一个参数 `tick`, 表示回调进行时的刻数.

### updater.setInterval(interval, times?, offset?, callback)

- `interval`: 两次执行间要等待的刻数.
- `times`: 一共要执行该任务的次数, 默认为 `Infinity`.
- `offset`: 执行第一次任务前要额外等待的刻数, 默认为 `0`.
- `callback`: 回调函数, 带有两个参数 `tick` 和 `wave`, 分别表示回调进行时的刻数和当前回调是第几次.

## 循环器 (Looping)

### new Looping(options?)

返回一个 Looping 实例. `options` 是一个对象, 可以包含下面的属性:

- `options.tickRate`: 更新执行的频率, 默认为 `60`.
- `options.tickStorage`: 存储更新数据的个数. 这决定了统计数据的样本大小, 默认为 `60`. (也就是说, 在默认的配置下, 统计得到的帧率和处理落率是由最近 1s 内的更新数据计算得到的.)
- `options.maxInterpolation`: 单次最大补帧数量. 当发生大量掉帧时 (这可能由于电脑性能过低, 更新或渲染负荷过大等原因), 将不会处理超过这个数量的补帧. 默认值为 `5`.

### looping.pause(slient?)
### looping.resume(slient?)
### looping.toggle(slient?)

停止 / 恢复 / 切换该实例下的更新和渲染.

- `slient`: 是否触发相应的 `pause` 或 `resume` 事件, 默认为 `false`.

### looping.getStatus()

获得当前的状态数据. 返回一个 `LoopingStatus` 对象, 包含下列属性:

- `stat.tickRate`: 当前帧率.
- `stat.dropRate`: 当前处理落率.
