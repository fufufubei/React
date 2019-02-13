<template>
  <transition name="uu-dialog-fade">
    <uu-popup type="dialog" :mask="true" :center="true" v-show="isVisible" :isVisible="isVisible">
      <div class="uu-dialog-main fadeIn">
        <span class="uu-dialog-close" v-show="showClose" @click="close"><i class="uuic-close"></i></span>
        <div :class="containerClass">
          <p class="uu-dialog-icon" v-if="icon"><i :class="icon"></i></p>
          <h2 v-if="title || $slots.title" class="uu-dialog-title">
            <slot name="title">
              <p class="uu-dialog-title-def">{{title}}</p>
            </slot>
          </h2>
          <div class="uu-dialog-content">
            <slot name="content">
              <div class="uu-dialog-content-def">
                <p v-html="content"></p>
              </div>
            </slot>
          </div>
          <div class="uu-dialog-btns" :class="{'border-right-1px': isConfirm}">
            <slot name="btns">
              <a :href="_cancelBtn.href" class="uu-dialog-btn border-top-1px" :class="{'uu-dialog-btn_highlight': _cancelBtn.active, 'uu-dialog-btn_disabled': _cancelBtn.disabled}" v-if="isConfirm" @click="cancel">{{_cancelBtn.text}}</a>
              <a :href="_confirmBtn.href" class="uu-dialog-btn border-top-1px" :class="{'uu-dialog-btn_highlight': _confirmBtn.active, 'uu-dialog-btn_disabled': _confirmBtn.disabled}" @click="confirm">{{_confirmBtn.text}}</a>
            </slot>
          </div>
        </div>
      </div>
    </uu-popup>
  </transition>
</template>

<script>
  import uuPopup from './pop.vue'
  import apiMixin from './mixins/api'

  const COMPONENT_NAME = 'uu-dialog'
  const EVENT_CONFIRM = 'confirm'
  const EVENT_CANCEL = 'cancel'
  const EVENT_CLOSE = 'close'

  const defHref = 'javascript:;'
  const defConfirmBtn = {
    text: '确定',
    active: true,
    disabled: false,
    href: defHref
  }
  const defCancelBtn = {
    text: '取消',
    active: false,
    disabled: false,
    href: defHref
  }
  const parseBtn = (btn, defBtn) => {
    if (typeof btn === 'string') {
      btn = {
        text: btn
      }
    }
    return Object.assign({}, defBtn, btn)
  }

  export default {
    name: COMPONENT_NAME,
    mixins: [apiMixin],
    props: {
      type: {
        type: String,
        default: 'alert'
      },
      icon: {
        type: String,
        default: ''
      },
      title: {
        type: String,
        default: ''
      },
      content: {
        type: String,
        default: ''
      },
      showClose: {
        type: Boolean,
        default: false
      },
      confirmBtn: {
        type: [Object, String],
        default() {
          return {
            ...defConfirmBtn
          }
        }
      },
      cancelBtn: {
        type: [Object, String],
        default() {
          return {
            ...defCancelBtn
          }
        }
      }
    },
    mounted(){
    },
    data() {
      return {
        defHref,
        isVisible:false
      }
    },
    computed: {
      _confirmBtn() {
        return parseBtn(this.confirmBtn, defConfirmBtn)
      },
      _cancelBtn() {
        return parseBtn(this.cancelBtn, defCancelBtn)
      },
      isConfirm() {
        return this.type === 'confirm'
      },
      containerClass() {
        return `uu-dialog-${this.type}`
      }
    },
    methods: {
      confirm(e) {
        if (this._confirmBtn.disabled) {
          return
        }
        this.hide()
        this.$emit(EVENT_CONFIRM, e);
        this.isVisible=false;
      },
      cancel(e) {
        if (this._cancelBtn.disabled) {
          return
        }
        this.hide()
        this.$emit(EVENT_CANCEL, e);
             this.isVisible=false;
      },
      close(e) {
        this.hide()
        this.isVisible=false;
        this.$emit(EVENT_CLOSE, e)
      }
    },
    components: {
      uuPopup
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @require "../assets/stylus/variable.styl"
  @require "../assets/stylus/mixin.styl"

      
  .uu-dialog-main
    width: 270px*2
    padding: 0
    text-align: center
    overflow: hidden
    border-radius: 2px*2
    background-color: $dialog-bgc
    animation: dialog-zoom .4s
  .uu-dialog-confirm, .uu-dialog-alert
    position: relative
    overflow: hidden
  .uu-dialog-icon
    margin-top: 20px*2
    margin-bottom: 16px*2
    line-height: 1
    color: $dialog-icon-color
    font-size: $fontsize-large-xxxx
    i
      display: inline-block
      width: 30px*2
      height: 30px*2
      padding: 10px*2
      border-radius: 50%
      background-color: $dialog-icon-bgc
    +
      .uu-dialog-title
        .uu-dialog-title-def
          margin-top: 0
    +
      .uu-dialog-content
        margin-top: -4px*2
  .uu-dialog-title
    color: $dialog-title-color
    font-size: $fontsize-large
    line-height: 1
    +
      .uu-dialog-content
        margin-top: 12px*2
  .uu-dialog-title-def
    margin: 30px*2 16px*2 0
    overflow: hidden
    white-space: nowrap
  .uu-dialog-content
    margin: 16px*2 0
    text-align: left
    color: $dialog-color
    font-size: $fontsize-medium
    line-height: 22px*2
  .uu-dialog-content-def
    padding: 0 16px*2
    > p
      display: table
      margin: auto
  .uu-dialog-confirm
    .uu-dialog-btns
      .uu-dialog-btn
        width: 50%
        // float: left
      &.border-right-1px
        &::after
          right: 50%
          border-color: $dialog-btns-split-color
  .uu-dialog-close
    display: flex
    align-items: center
    justify-content: center
    z-index: 1
    position: absolute
    top: 0
    right: 0
    width: 32px*2
    height: 32px*2
    color: $dialog-close-color
    font-size: $fontsize-large-x
  .uu-dialog-btns
    width: 100%
    font-size: 0
  .uu-dialog-btn
    display: inline-block
    width: 100%
    padding: 17px*2 10px*2
    margin: 0
    font-size: $fontsize-large
    line-height: 1
    text-align: center
    text-decoration: none
    color: $dialog-btn-color
    background-color: $dialog-btn-bgc
    background-clip: padding-box
    box-sizing: border-box
    &:active
      background-color: $dialog-btn-active-bgc
  .uu-dialog-btn_highlight
    color: $dialog-btn-highlight-color
    &:active
      background-color: $dialog-btn-highlight-active-bgc
  .uu-dialog-btn_disabled
    color: $dialog-btn-disabled-color
    &:active
      background-color: $dialog-btn-disabled-active-bgc

  .uu-dialog-fade-enter-active
    animation: dialog-fadein .4s


  @keyframes dialog-fadein
    0%
      opacity: 0
    100%
      opacity: 1
  @keyframes dialog-zoom
    0%
      transform: scale(0)
    50%
      transform: scale(1.1)
    100%
      transform: scale(1)
 
</style>
