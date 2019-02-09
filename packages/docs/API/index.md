---
sidebarDepth: 3
---

# 全局 API

::: warning
目前这个库还不是稳定版本, 任何 API 都可能在未来的版本中更改, 请谨慎使用.
:::

## 全局属性

### stg.version

提供字符串形式的当前使用的 web-stg 的版本号.

### stg.assets
### stg.template

提供了当前的全局资源 / 模板. 参见资源与模板章节. 

注意: 这两个对象的方法许多被暴露为了[全局函数](#一些函数的简写形式), 因此一般没有必要直接访问它们.

### stg.touhou

提供了一些可供安装的东方 Project 数据. 只要提供相应的文件就可以通过类似下面的代码实现模板的注册:

```js
stg.use(stg.touhou.th15, {
  bullet1: 'bullet/bullet1.png',
  bullet2: 'bullet/bullet2.png',
  bullet3: 'bullet/bullet3.png',
  hakurei_reimu: 'player/hakurei_reimu.png',
  kirisame_marisa: 'player/kirisame_marisa.png',
}).then(() => {
  // next
})
```

## 全局配置

`stg.config` 是一个对象, 包含了所需的全局配置, 你可以在应用启动前修改这些配置.

### config.angleUnit

- 类型: `number`
- 默认值: `Math.PI`

这个属性决定了计算时使用的角度单位.

### config.defaultColor

- 类型: `string`
- 默认值: `'blue'`

当 CanvasPoint 实例初始化时, 如果没有指定其颜色, 将会使用该颜色作为默认值.

### config.publicPath

- 类型: `string`
- 默认值: `'/'`

这个属性决定了资源文件加载时的根目录.

### config.showWarning

- 类型: `boolean`
- 默认值: `true`

这个属性决定了当程序运行中触发警告时, 是否输出到控制台.

### config.scheduleLimit

- 类型: `number`
- 默认值: `256`

这个属性决定了 Updater 对象支持的最大任务数量, 当检测到任务数量超过这个值时将抛出 Error.

### config.maxBulletCount

- 类型: `number`
- 默认值: `4096`

这个属性决定了 Barrage 对象支持的最大子弹数量, 当检测到子弹数量超过这个值时将抛出 Error.

### config.grazeFilter

- 类型: `string`
- 默认值: `'sepia(0.6) saturate(4)'`

这个属性决定了默认的擦弹效果. 语法参见 [CSS 滤镜](https://developer.mozilla.org/zh-CN/docs/Web/CSS/filter).

## 全局函数

### stg.use(plugin, options?)

- plugin: `Object|Function` 要安装的插件.
- options: `Object` 安装插件时提供的参数.

安装一个插件. 如果插件是一个对象, 必须提供 `install` 方法. 如果插件是一个函数, 它会被作为 `install` 方法. `install` 方法可以有两个参数, 第一个是 stg 本体, 第二个是传入的 `options` 对象. 简单来说:

```js
stg.use(install, options) // 相当于 install(stg, options)
stg.use(plugin, options)  // 相当于 plugin.install(stg, options)
```

参见插件与扩展章节.

### 一些函数的简写形式

为了使用方便, 我们将一些常用的函数直接暴露在了 stg 上. 下面是这些函数和它们对应的原始位置:

| 函数名 | 原始位置 |
|:-:|:-:|
| `stg.loadImages` | `stg.assets.images.load` |
| `stg.defineTemplate` | `stg.template.display.define` |
| `stg.buildBullet` | `stg.template.display.buildBullet` |
| `stg.buildEmitter` | `stg.template.display.buildEmitter` |
