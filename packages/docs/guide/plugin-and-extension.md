---
sidebarDepth: 3
---

# 插件与扩展

我们的核心库 @stg/core 并不会提供任何的子弹模型和人物贴图, 你在游戏看到的和听到的一切资源实际上都需要预先导入整个系统. 尽管我们已经提供了一些用于扩展的函数, 但每次都写上一段导入音乐和贴图的代码未免缺乏复用性. 插件的功能便是封装好一部分资源, 并可以简单快捷地进行安装.

## 插件的使用

使用 `stg.use` 函数可以安装一个插件. 比如这样:

```js
stg.use(stg.plugins.graze) // 实现擦弹, 当然这是我编的
```

一些资源性插件可能要求你传入一个字符串或对象作为资源文件的地址:

```js
stg.use(stg.touhou.th15, {
  hakurei_reimu: 'player/hakurei_reimu.png', // 使用这个地址作为素材
})
```

一般来说同一个插件我们只会安装一次, 但如果你希望重复安装某个插件, 可以在安装时传入第三个参数:

```js
stg.use(stg.touhou.th15, {
  kirisame_marisa: 'player/kirisame_marisa.png',
}, false) // false 表示这个插件不标记为已安装
```

## 插件的定义

一个插件可以是一个函数, 其第一个参数是 stg, 第二个参数是传入的 options:

```js
const myPlugin = function(stg, options) {
  stg.loadImages(options.foo)
}

stg.use(myPlugin, { foo: 'bar' })
```

或者是一个含有 `install` 方法的对象:


```js
const myPlugin = {
  install(stg, options) {
    stg.loadImages(options.foo)
  }
}
```

事实上, BarrageOptions 和 PlayerOptions 中的 before 钩子函数本身也是一个插件.

## 官方插件

@stg/touhou 包含了一些官方的插件.
