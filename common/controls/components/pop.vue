<template>
  <div class="uu-popup" :class="typeClass" v-show="isVisible">
    <div class="uu-popup-mask" v-show="mask" @click="maskClick">
      <slot name="mask"></slot>
    </div>
    <div class="uu-popup-container" :class="{'uu-popup-center': center}">
      <div class="uu-popup-content" v-if="$slots.default">
        <slot></slot>
      </div>
      <div class="uu-popup-content" v-else v-html="content">
      </div>
    </div>
  </div>
</template>

<script>
  import apiMixin from './mixins/api'
  const COMPONENT_NAME = 'uPop'
  const EVENT_MASK_CLICK = 'mask-click'
  export default {
    name: COMPONENT_NAME,
    mixins: [apiMixin],
    props: {
      type: {
        type: String,
        default: ''
      },
      isVisible: {
        type: Boolean,
        default: false
      },
      mask: {
        type: Boolean,
        default: true
      },
      content: {
        type: String,
        default: ''
      },
      center: {
        type: Boolean,
        default: true
      }
    },
    computed: {
      typeClass() {
        return this.type ? `uu-${this.type}` : ''
      }
    },
    mounted() {
      console.log()
    },
    methods: {
      maskClick(e) {
        this.$emit(EVENT_MASK_CLICK, e)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
 @require "../assets/stylus/variable.styl"
  .uu-popup
    position: fixed
    left: 0
    right:0
    top: 0
    bottom: 0
    z-index: 100
  .uu-popup-mask, .uu-popup-container
    position: absolute
    width: 100%
    height: 100%
  .uu-popup-mask
    overflow: hidden
    background-color: $popup-mask-bgc
    opacity: $popup-mask-opacity
    // fix some android webview opacity render bug
    &::before
      content: "."
      display: block
      width: 1px*2
      height: 1px*2
      background-color: rgba(0, 0, 0, .1)
      margin-left: -10px*2
  .uu-popup-container
    transform: translate(100%, 100%)
  .uu-popup-content
    position: absolute
    top: 0
    left: 0
    width: 100%
    box-sizing: border-box
    transform: translate(-100%, -100%)
  .uu-popup-center
    .uu-popup-content
      position: absolute
      top: -50%
      left: -50%
      width: auto
      max-width: 100%
      transform: translate(-50%, -50%)
</style>
