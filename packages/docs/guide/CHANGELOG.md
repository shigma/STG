# 更新日志

## v0.3.1

### 新特性

- **core:** 新增 `loadImages` 和 `loadAssets` 方法, 用于加载全局资源.

### 修复与其他

打包时将生成多个入口文件:

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
- **core:** 新增 `core.config.angleUnit`, 用于配置采用的角度单位, 默认为 `Math.PI`.
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

