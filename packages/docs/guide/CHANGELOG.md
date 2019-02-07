# 更新日志

## v0.3.1

### 新特性

- **core:** 新增 `loadImages`, `checkImages` 和 `loadAssets` 方法, 用于加载全局资源.
- **core:** config 新增 `publicPath`, `defaultColor`, `showWarning` 三个属性.
- **core:** Updater 新增 `$assets`, `$config` 属性, 它们是对应模块的引用.
- **core:** 子弹模板现在可以使用 Query 字符串, 运行时将使用类似 CSS 的优先级进行渲染.
- **core:** BulletOptions 中的 `judgeType` 和 `fieldType` 属性都允许传入函数.
- **core:** 新增了 `point.drawImage` 函数, 用于绘制来自资源文件的图形.
- **core:** 新增了 `use` 函数, 用于加载插件, 同时 bullets 模块也用插件的方式重新实现.
- **bullets:** 增加了对东方 Project 第二代引擎 (风神录后) 的部分弹型的支持.
- **bullets:** 新增了 `colorSeries` 对象, 包含了东方 Project 中默认的颜色系列.

### 重大变化

- **core:** 重写了 Template 模块, 实现了下面的函数:
  - `defineTemplate`: 加载子弹模板 (相当于过去的 `Bullet.install`).
  - `buildFromImages`: 从图片资源中直接生成子弹模板.
- **core:** 新的 BulletTemplate 仅支持 `applied` 和 `display` 两个钩子函数.
- **core:** BulletOptions 中的 `extends` 属性更名为 `display`, 同时允许传入函数.
- **bullets:** 将涉及场地和判定相关的函数从 bullets 模块放入 core 模块.

### 修复与其他

- 修复了 `$ref` 中默认包含 `base` 而非 `origin` 的问题.
- 移除了目前项目对 deepmerge 包的依赖.
- 打包时将生成多个入口文件:
  - stg.min.css: 所需的样式文件.
  - stg.common.js: 可直接在 NodeJS 环境下加载的模块.
  - stg.runtime.js: 应当在浏览器中加载使用的模块, 内置了所需的样式.

## v0.3

### 重大变化

- **core:** Looping 不再是 EventTarget 的子类, 对应的事件全部改用 `onPause` 等属性来实现.
- **core:** Looping 类的 onUpdate 事件更改为 onStats, 同时增加 `statsInterval` 属性用于控制其触发频率.
- **core:** 移除 `looping.resume()` 等方法中的 `slient` 参数.

### 新特性

- **core:** Looping 构造函数新增 `skipFrame` 参数, 可用于调整描画间隔.
- **core:** 新增 `looping.initialize()` 方法, 可以用于重新初始化实例.
- **core:** 新增 `config.angleUnit`, 用于配置采用的角度单位, 默认为 `Math.PI`.
- **core:** `looping.getStatus()` 返回对象新增 `frameRate` 属性, 表示当前物理帧数.

## v0.2.1

### 重大变化

- **core:** 移除 Bullet 构造函数的 `rel` 属性, 改为 `origin`, 同时支持传入 Point 类型.
- **utils:** 将库 utils.Random 更改为 random.

### 新特性

- **core:** 加入了默认的自机判定点颜色和大小.
- **core:** 当调用 `scene.setBarrage` 方法时会自动清屏.
- **utils:** 新增库 utils.color, 用于处理颜色.

## v0.2

### 新特性

- **core:** 支持无自机模式 (观赏模式). 当不涉及自机时, 子弹会跳过碰撞判定.
- **core:** 自机新增属性 `control`, 用来决定是鼠标操控还是键盘操控.
- **core:** 类 Field 的大部分功能由新类 Scene 完成, 前者保留对外层 DOM 的控制.
- **utils:** 将 math 和 memorize 相关函数转移到 @stg/utils 下.

### 修复和其他

- **core:** 修复了 `point.$coord` 不及时更新的问题.
- **bundle:** 生成了源代码的 source map.

