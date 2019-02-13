<template>
  <transition name="uu-toast-fade">
    <uu-popup type="toast" :mask="mask" v-show="isVisible">
      <i v-show="!isLoading && type!='msg'" class="uu-toast-icon" :class="iconClass"></i>
      <uu-loading v-show="isLoading && type!='msg'"></uu-loading>
      <div v-show="txt" class="uu-toast-tip">{{txt}}</div>
    </uu-popup>
  </transition>
</template>
<script>
  import uuLoading from './loading.vue'
  import uuPopup from './pop.vue'
  import apiMixin from './mixins/api'
  const COMPONENT_NAME = 'uu-toast'
  export default {
    name: COMPONENT_NAME,
    mixins: [apiMixin],
    props: {
      type: {
        type: String,
        default: 'loading'
      },
      mask: {
        type: Boolean,
        default: false
      },
      txt: {
        type: String,
        default: ''
      },
      time: {
        type: Number,
        default: 3000
      }
    },
    computed: {
      iconClass() {
        const iconClass = {}
        const classMap = {
          correct: 'uuic-right',
          error: 'uuic-wrong',
          warn: 'uuic-warn'
        }
        const icon = classMap[this.type]
        if (icon) {
          iconClass[icon] = true
        }
        return iconClass
      },
      isLoading() {
        return this.type === 'loading'
      }
    },
    methods: {
      show() {
        this.isVisible = true
        this.clearTimer()
        this.$nextTick(() => {
          if (this.time !== 0) {
            this.timer = setTimeout(() => {
              this.hide()
            }, this.time)
          }
        })
      },
      hide() {
        this.isVisible = false
        this.clearTimer()
      },
      clearTimer() {
        clearTimeout(this.timer)
        this.timer = null
      }
    },
    components: {
      uuPopup,
      uuLoading
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @require "../assets/stylus/variable.styl"
  .uu-toast
    &.uu-popup
      z-index: 900
    .uu-popup-content
      display: flex
      align-items: center
      padding: 13px*2 16px*2
      color: $toast-color
      background-color: $toast-bgc
      border-radius: 2px*2
  .uu-toast-icon
    width: 24px*2
    height: 24px*2
    font-size: $fontsize-large-xxx
  .uu-toast-tip
    line-height: 20px*2
    font-size: $fontsize-medium
    max-width: 12em
    max-height: 40px*2
    overflow: hidden
    margin-left: 8px*2

  .uu-toast-fade-enter-active
    animation: toast-in .2s
  .uu-toast-fade-leave-active
    animation: toast-out .2s

  @keyframes toast-in
    0%
      opacity: 0
    100%
      opacity: 1

  @keyframes toast-out
    0%
      opacity: 1
    100%
      opacity: 0
</style>
