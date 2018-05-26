<template>
  <div ref="monaco-editor" class="m-monaco-editor"></div>
</template>
<script>
import {loader} from 'vue-m-loader'

export default {
  name: 'MMonacoEditor',
  props: {
    value: String,
    theme: String,
    mode: String,
    cdnUrl: {
      type: String,
      default: 'https://cdn.bootcss.com/monaco-editor/0.13.1/min/vs'
    },
    requireConfig: Object,
    // 是否同步input
    syncInput: Boolean,
    readOnly: Boolean,
    fontSize: Number,
    renderLineHighlight: {
      type: String,
      default: 'all'
    },
    showMinimap: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      editorDom: null,
      editor: null,
      monaco: null,
      buffer: ''
    }
  },
  computed: {
    loaderUrl () {
      let conf = this.requireConfig
      return ((conf && conf.paths && conf.paths.vs) ? conf.paths.vs : this.cdnUrl).replace(/\/$/, '')
    }
  },
  watch: {
    theme () {
      this.setTheme()
    },
    mode () {
      this.setMode()
    },
    value (val, old) {
      if (this.buffer.length !== val.length || this.buffer !== val) {
        this.buffer = val
        this.editor.setValue(val)
      }
    },
    readOnly (val) {
      this.editor.updateOptions({readOnly: val})
    },
    fontSize (val) {
      this.editor.updateOptions({fontSize: val})
    },
    renderLineHighlight (val) {
      this.editor.updateOptions({renderLineHighlight: val})
    },
    showMinimap (val) {
      this.editor.updateOptions({minimap: {enabled: val}})
    }
  },
  methods: {
    initEditor () {
      loader({
        url: `${this.loaderUrl}/loader.js`,
        library: 'require'
      }).then(library => {
        library.target.config(this.requireConfig || {paths: {vs: this.loaderUrl}})

        library.target(['vs/editor/editor.main'], () => {
          this.monaco = window.monaco
          this.editor = window.monaco.editor.create(this.editorDom, {
            value: this.value,
            language: this.mode,
            readOnly: this.readOnly,
            fontSize: this.fontSize,
            renderLineHighlight: this.renderLineHighlight,
            minimap: {
              enabled: this.showMinimap
            }
          })
          window.editor = this.editor
          this.$emit('init', this.editor, this.editorDom, window.monaco)
          this.setTheme()
          this.setMode()
          this.listen()
        })
      })
    },
    setTheme () {
      if (this.theme) {
        this.monaco.editor.setTheme(this.theme)
      }
    },
    setMode () {
      if (this.mode) {
        let oldModel = this.editor ? this.editor.getModel() : null
        let newModel = this.monaco.editor.createModel(this.value, this.mode)
        this.editor.setModel(newModel)
        if (oldModel) {
          oldModel.dispose()
        }
      }
    },
    listen () {
      let that = this
      this.editor.onDidBlurEditor(function () {
        that.$emit('blur')
      })
      this.editor.onDidFocusEditor(function () {
        that.$emit('focus')
      })
      this.editor.onDidLayoutChange(function () {
        that.$emit('layout-change')
      })
      if (this.syncInput) {
        this.editor.onDidChangeModelContent(function () {
          that.buffer = that.editor.getValue()
          that.$emit('input', that.buffer)
        })
      }
    },
    getValue () {
      return this.editor.getValue()
    }
  },
  mounted () {
    this.editorDom = this.$refs['monaco-editor']
    this.initEditor()
  }
}
</script>
<style>
  .m-monaco-editor{
    min-height: 350px;
    /*border: solid 1px #15A2E8;*/
    /*box-sizing: border-box;*/
  }
  .monaco-editor.vs .view-overlays .current-line,
  .monaco-editor.vs .margin-view-overlays .current-line-margin{
    background-color: #EEEEEE;
  }
  .monaco-editor.vs-dark .view-overlays .current-line,
  .monaco-editor.vs-dark .margin-view-overlays .current-line-margin{
    background-color: #282828;
  }
</style>
