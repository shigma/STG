(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{128:function(t,a,s){"use strict";s.r(a);var e=s(2),n=Object(e.a)({},function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"全局-api"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#全局-api","aria-hidden":"true"}},[t._v("#")]),t._v(" 全局 API")]),t._v(" "),s("div",{staticClass:"warning custom-block"},[s("p",{staticClass:"custom-block-title"},[t._v("WARNING")]),t._v(" "),s("p",[t._v("目前这个库还不是稳定版本, 任何 API 都可能在未来的版本中更改, 请谨慎使用.")])]),t._v(" "),s("h2",{attrs:{id:"全局属性"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#全局属性","aria-hidden":"true"}},[t._v("#")]),t._v(" 全局属性")]),t._v(" "),s("h3",{attrs:{id:"stg-version"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#stg-version","aria-hidden":"true"}},[t._v("#")]),t._v(" stg.version")]),t._v(" "),s("p",[t._v("提供字符串形式的当前使用的 web-stg 的版本号.")]),t._v(" "),s("h3",{attrs:{id:"stg-assets"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#stg-assets","aria-hidden":"true"}},[t._v("#")]),t._v(" stg.assets")]),t._v(" "),s("h3",{attrs:{id:"stg-template"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#stg-template","aria-hidden":"true"}},[t._v("#")]),t._v(" stg.template")]),t._v(" "),s("p",[t._v("提供了当前的全局资源 / 模板. 参见资源与模板章节.")]),t._v(" "),s("p",[t._v("注意: 这两个对象的方法许多被暴露为了"),s("a",{attrs:{href:"#%E4%B8%80%E4%BA%9B%E5%87%BD%E6%95%B0%E7%9A%84%E7%AE%80%E5%86%99%E5%BD%A2%E5%BC%8F"}},[t._v("全局函数")]),t._v(", 因此一般没有必要直接访问它们.")]),t._v(" "),s("h3",{attrs:{id:"stg-touhou"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#stg-touhou","aria-hidden":"true"}},[t._v("#")]),t._v(" stg.touhou")]),t._v(" "),s("p",[t._v("提供了一些可供安装的东方 Project 数据. 只要提供相应的文件就可以通过类似下面的代码实现模板的注册:")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[t._v("stg"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("use")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("stg"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("touhou"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("th15"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  bullet1"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'bullet/bullet1.png'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  bullet2"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'bullet/bullet2.png'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  bullet3"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'bullet/bullet3.png'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  hakurei_reimu"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'player/hakurei_reimu.png'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  kirisame_marisa"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'player/kirisame_marisa.png'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("then")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// next")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),s("h2",{attrs:{id:"全局配置"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#全局配置","aria-hidden":"true"}},[t._v("#")]),t._v(" 全局配置")]),t._v(" "),s("p",[s("code",[t._v("stg.config")]),t._v(" 是一个对象, 包含了所需的全局配置, 你可以在应用启动前修改这些配置.")]),t._v(" "),s("h3",{attrs:{id:"config-angleunit"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#config-angleunit","aria-hidden":"true"}},[t._v("#")]),t._v(" config.angleUnit")]),t._v(" "),s("ul",[s("li",[t._v("类型: "),s("code",[t._v("number")])]),t._v(" "),s("li",[t._v("默认值: "),s("code",[t._v("Math.PI")])])]),t._v(" "),s("p",[t._v("这个属性决定了计算时使用的角度单位.")]),t._v(" "),s("h3",{attrs:{id:"config-defaultcolor"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#config-defaultcolor","aria-hidden":"true"}},[t._v("#")]),t._v(" config.defaultColor")]),t._v(" "),s("ul",[s("li",[t._v("类型: "),s("code",[t._v("string")])]),t._v(" "),s("li",[t._v("默认值: "),s("code",[t._v("'blue'")])])]),t._v(" "),s("p",[t._v("当 CanvasPoint 实例初始化时, 如果没有指定其颜色, 将会使用该颜色作为默认值.")]),t._v(" "),s("h3",{attrs:{id:"config-publicpath"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#config-publicpath","aria-hidden":"true"}},[t._v("#")]),t._v(" config.publicPath")]),t._v(" "),s("ul",[s("li",[t._v("类型: "),s("code",[t._v("string")])]),t._v(" "),s("li",[t._v("默认值: "),s("code",[t._v("'/'")])])]),t._v(" "),s("p",[t._v("这个属性决定了资源文件加载时的根目录.")]),t._v(" "),s("h3",{attrs:{id:"config-showwarning"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#config-showwarning","aria-hidden":"true"}},[t._v("#")]),t._v(" config.showWarning")]),t._v(" "),s("ul",[s("li",[t._v("类型: "),s("code",[t._v("boolean")])]),t._v(" "),s("li",[t._v("默认值: "),s("code",[t._v("true")])])]),t._v(" "),s("p",[t._v("这个属性决定了当程序运行中触发警告时, 是否输出到控制台.")]),t._v(" "),s("h3",{attrs:{id:"config-schedulelimit"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#config-schedulelimit","aria-hidden":"true"}},[t._v("#")]),t._v(" config.scheduleLimit")]),t._v(" "),s("ul",[s("li",[t._v("类型: "),s("code",[t._v("number")])]),t._v(" "),s("li",[t._v("默认值: "),s("code",[t._v("256")])])]),t._v(" "),s("p",[t._v("这个属性决定了 Updater 对象支持的最大任务数量, 当检测到任务数量超过这个值时将抛出 Error.")]),t._v(" "),s("h3",{attrs:{id:"config-maxbulletcount"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#config-maxbulletcount","aria-hidden":"true"}},[t._v("#")]),t._v(" config.maxBulletCount")]),t._v(" "),s("ul",[s("li",[t._v("类型: "),s("code",[t._v("number")])]),t._v(" "),s("li",[t._v("默认值: "),s("code",[t._v("4096")])])]),t._v(" "),s("p",[t._v("这个属性决定了 Barrage 对象支持的最大子弹数量, 当检测到子弹数量超过这个值时将抛出 Error.")]),t._v(" "),s("h3",{attrs:{id:"config-grazefilter"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#config-grazefilter","aria-hidden":"true"}},[t._v("#")]),t._v(" config.grazeFilter")]),t._v(" "),s("ul",[s("li",[t._v("类型: "),s("code",[t._v("string")])]),t._v(" "),s("li",[t._v("默认值: "),s("code",[t._v("'sepia(0.6) saturate(4)'")])])]),t._v(" "),s("p",[t._v("这个属性决定了默认的擦弹效果. 语法参见 "),s("a",{attrs:{href:"https://developer.mozilla.org/zh-CN/docs/Web/CSS/filter",target:"_blank",rel:"noopener noreferrer"}},[t._v("CSS 滤镜"),s("OutboundLink")],1),t._v(".")]),t._v(" "),s("h2",{attrs:{id:"全局函数"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#全局函数","aria-hidden":"true"}},[t._v("#")]),t._v(" 全局函数")]),t._v(" "),s("h3",{attrs:{id:"stg-use-plugin-options"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#stg-use-plugin-options","aria-hidden":"true"}},[t._v("#")]),t._v(" stg.use(plugin, options?)")]),t._v(" "),s("ul",[s("li",[t._v("plugin: "),s("code",[t._v("Object|Function")]),t._v(" 要安装的插件.")]),t._v(" "),s("li",[t._v("options: "),s("code",[t._v("Object")]),t._v(" 安装插件时提供的参数.")])]),t._v(" "),s("p",[t._v("安装一个插件. 如果插件是一个对象, 必须提供 "),s("code",[t._v("install")]),t._v(" 方法. 如果插件是一个函数, 它会被作为 "),s("code",[t._v("install")]),t._v(" 方法. "),s("code",[t._v("install")]),t._v(" 方法可以有两个参数, 第一个是 stg 本体, 第二个是传入的 "),s("code",[t._v("options")]),t._v(" 对象. 简单来说:")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[t._v("stg"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("use")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("install"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" options"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 相当于 install(stg, options)")]),t._v("\nstg"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("use")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("plugin"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" options"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("  "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 相当于 plugin.install(stg, options)")]),t._v("\n")])])]),s("p",[t._v("参见插件与扩展章节.")]),t._v(" "),s("h3",{attrs:{id:"一些函数的简写形式"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#一些函数的简写形式","aria-hidden":"true"}},[t._v("#")]),t._v(" 一些函数的简写形式")]),t._v(" "),s("p",[t._v("为了使用方便, 我们将一些常用的函数直接暴露在了 stg 上. 下面是这些函数和它们对应的原始位置:")]),t._v(" "),s("table",[s("thead",[s("tr",[s("th",{staticStyle:{"text-align":"center"}},[t._v("函数名")]),t._v(" "),s("th",{staticStyle:{"text-align":"center"}},[t._v("原始位置")])])]),t._v(" "),s("tbody",[s("tr",[s("td",{staticStyle:{"text-align":"center"}},[s("code",[t._v("stg.loadImages")])]),t._v(" "),s("td",{staticStyle:{"text-align":"center"}},[s("code",[t._v("stg.assets.images.load")])])]),t._v(" "),s("tr",[s("td",{staticStyle:{"text-align":"center"}},[s("code",[t._v("stg.defineTemplate")])]),t._v(" "),s("td",{staticStyle:{"text-align":"center"}},[s("code",[t._v("stg.template.display.define")])])]),t._v(" "),s("tr",[s("td",{staticStyle:{"text-align":"center"}},[s("code",[t._v("stg.buildBullet")])]),t._v(" "),s("td",{staticStyle:{"text-align":"center"}},[s("code",[t._v("stg.template.display.buildBullet")])])]),t._v(" "),s("tr",[s("td",{staticStyle:{"text-align":"center"}},[s("code",[t._v("stg.buildEmitter")])]),t._v(" "),s("td",{staticStyle:{"text-align":"center"}},[s("code",[t._v("stg.template.display.buildEmitter")])])])])])])},[],!1,null,null,null);a.default=n.exports}}]);