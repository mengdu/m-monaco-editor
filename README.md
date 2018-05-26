# m-monaco-editor

A monaco-editor component for vue.

npm
```ls
npm install -S vue-m-monaco-editor
```

use
```js
import MMonacoEditor from 'vue-m-monaco-editor'

Vue.use(MMonacoEditor) // 注册 m-monaco-editor 组件
```

```html
<m-monaco-editor v-model="code" :mode="mode" :theme="theme"></m-monaco-editor>
```

## MMonacoEditor Attributes

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| value     | 内容   | string    | — | —  |
| theme     | 主题   | string    | vs/vs-dark/hc-dark | vs  |
| mode     | 语言类型   | string    | [languages](https://microsoft.github.io/monaco-editor/api/modules/monaco.languages.html#getlanguages) | —  |
| cdnUrl     |  monaco-editor文件链接  | string    | — | https://cdn.bootcss.com/monaco-editor/0.13.1/min/vs  |
| requireConfig | monaco-editor loader.js 配置   | object | — | —  |
| syncInput     | 同步内容到value | boolean  | true/false | false  |
| readOnly     | 仅读   | boolean    | true/false | false  |
| fontSize     | 字体大小   | number    | —  | —   |
| renderLineHighlight     | 高亮当前行| string   | "none" | "gutter" | "line" | "all" | "all"  |


> 如果是内网的项目，请指定 `cdnUrl` 到内网可以访问的 `monaco-editor` 目录。


## MMonacoEditor Event

| 参数      | 说明    |参数   |
|---------- |-------- |----------|
| init     | 初始化   | editer,editorDom,monaco  |
| blur     | 失去焦点   | —  |
| focus     | 获取焦点   | —  |
| layout-change | 布局改变   | —  |



> 更多配置信息，可以在init事件后使用 [monaco-editor api](https://microsoft.github.io/monaco-editor/api)


## Other

[monaco-editor](https://microsoft.github.io)

[monaco-editor docs](https://microsoft.github.io/api)

