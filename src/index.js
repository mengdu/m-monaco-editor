import MMonacoEditor from './monaco-editor'

MMonacoEditor.install = function (Vue) {
  Vue.component(MMonacoEditor.name, MMonacoEditor)
}

export {
  MMonacoEditor as default,
  MMonacoEditor
}
