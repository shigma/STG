# 介绍

web-stg 是一个基于 JavaScript 的弹幕引擎. 它包含多个部分:

- @stg/core: 弹幕游戏的核心框架.
- @stg/utils: 弹幕游戏相关的实用工具.
- @stg/touhou: 常见弹型的插件支持.

而 web-stg 这个包是包含了上面的全部内容, 再额外封装了网页相关的一些命令后形成的. 我们希望做到即开即用, 你只需要用最少的命令就能实现你自己的弹幕效果:

```html
<div id="stg"><!-- 弹幕效果将出现在这里 --></div>
<script type="text/javascript" src="shigma.github.io/STG/stg.runtime.js"></script>
<script>
  (async () => {
    const field = new stg.Field(document.querySelector('#stg'))
    await field.setPlayer({ /* 玩家配置 */ })
    await field.setBarrage({ /* 弹幕配置 */ })
    field.toggle() // 开始游戏!
  })
</script>
```

## 特性

web-stg 的优点在于体积小, 使用方便. 每个人只需知道 JavaScript 的基本语法, 再引用大小不超过 60kb 的文件就可以开始做弹幕了. 我们未来也将致力于构建开源的弹幕编辑器和网上交流社区, 让每一个 STG 爱好者都能贡献自己的灵感.

