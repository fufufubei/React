<template>
  <div class="picker" :class="{ 'picker-3d': rotateEffect }" v-show="show">
    <div class="picker-toolbar" v-if="showToolbar">
      <slot></slot>
    </div>
    <div class="tools" v-if="!showToolbar">
      <span class="cancel" @click="show=false;$emit('cancle')">取消</span>
      <span class="confirm" @click="confirm">确认</span>
    </div>
    <div class="picker-items">
      <picker-slot v-for="slot,$index in slots" :key="$index" :valueKey="valueKey" :values="slot.values || []" :text-align="slot.textAlign || 'center'" :visible-item-count="visibleItemCount" :class-name="slot.className" :flex="slot.flex" v-model="values[slot.valueIndex]" :rotate-effect="rotateEffect"
        :divider="slot.divider" :content="slot.content" :itemHeight="itemHeight" :default-index="slot.defaultIndex"></picker-slot>
      <div class="picker-center-highlight" :style="{ height: itemHeight + 'px', marginTop: -itemHeight / 2 + 'px' }"></div>
    </div>
  </div>
</template>
<script type="text/babel">
  export default {
    name: 'mt-picker',
    componentName: 'picker',
    data(){
      return{
        show:true
      }
    },
    props: {
      slots: {
        type: Array
      },
      showToolbar: {
        type: Boolean,
        default: false
      },
      visibleItemCount: {
        type: Number,
        default: 5
      },
      valueKey: String,
      rotateEffect: {
        type: Boolean,
        default: false
      },
      itemHeight: {
        type: Number,
        default: 30
      }
    },
    created() {
      this.$on('slotValueChange', this.slotValueChange);
      var slots = this.slots || [];
      var values = [];
      var valueIndexCount = 0;
      slots.forEach(slot => {
        if (!slot.divider) {
          slot.valueIndex = valueIndexCount++;
          values[slot.valueIndex] = (slot.values || [])[slot.defaultIndex || 0];
          this.slotValueChange();
        }
      });
    },
    methods: {
      slotValueChange() {
        this.$emit('change', this, this.values);
      },
      getSlot(slotIndex) {
        var slots = this.slots || [];
        var count = 0;
        var target;
        var children = this.$children.filter(child => child.$options.name === 'picker-slot');
        slots.forEach(function(slot, index) {
          if (!slot.divider) {
            if (slotIndex === count) {
              target = children[index];
            }
            count++;
          }
        });
        return target;
      },
      getSlotValue(index) {
        var slot = this.getSlot(index);
        if (slot) {
          return slot.value;
        }
        return null;
      },
      setSlotValue(index, value) {
        var slot = this.getSlot(index);
        if (slot) {
          slot.currentValue = value;
        }
      },
      getSlotValues(index) {
        var slot = this.getSlot(index);
        if (slot) {
          return slot.mutatingValues;
        }
        return null;
      },
      setSlotValues(index, values) {
        var slot = this.getSlot(index);
        if (slot) {
          slot.mutatingValues = values;
        }
      },
      getValues() {
        return this.values;
      },
      setValues(values) {
        var slotCount = this.slotCount;
        values = values || [];
        if (slotCount !== values.length) {
          throw new Error('values length is not equal slot count.');
        }
        values.forEach((value, index) => {
          this.setSlotValue(index, value);
        });
      },
      confirm(){
        console.log(this.values);
        // this.$emit("confirm",this.values);
      },
    },
    computed: {
      values() {
        var slots = this.slots || [];
        var values = [];
        slots.forEach(function(slot) {
          if (!slot.divider) values.push(slot.value);
        });
        return values;
      },
      slotCount() {
        var slots = this.slots || [];
        var result = 0;
        slots.forEach(function(slot) {
          if (!slot.divider) result++;
        });
        return result;
      }
    },
    components: {
      PickerSlot: require('./picker-slot.vue')
    }
  };
</script>
<style lang="less">
  .picker {
    overflow: hidden;
    position:fixed;
    width:100%;
    bottom:0;
    left:0;
    background:#fff;
    padding-bottom:30px;
    z-index:889;
    .modal{
    }
    .tools {
      margin-bottom:30px;
      width: 100%;
      height: 40px;
      position: relative;
      border-bottom:1px solid #f1f1f1;
      &:after {
        content: "";
        display: block;
        clear: both;
      }
      .cancel {
        float: left;
        display: inline-block;
        width: 60px;
        text-align: center;
        font-size: 14px;
        line-height: 40px;
        color: #3aa5ff;
      }
      .confirm {
        float: right;
        display: inline-block;
        width: 60px;
        text-align: center;
        font-size: 14px;
        line-height: 40px;
        color: #3aa5ff;
      }
    }
  }
  .picker-toolbar {
    height: 40px;
  }
  .picker-items {
    display: flex;
    justify-content: center;
    padding: 0;
    text-align: right;
    font-size: 24px;
    position: relative;
  }
  .picker-center-highlight {
    box-sizing: border-box;
    position: absolute;
    left: 0;
    width: 100%;
    top: 50%;
    margin-top: -18px;
    pointer-events: none
  }
  .picker-center-highlight:before,
  .picker-center-highlight:after {
    content: '';
    position: absolute;
    height: 1px;
    width: 100%;
    background-color: #eaeaea;
    display: block;
    z-index: 15;
    transform: scaleY(0.5);
  }
  .picker-center-highlight:before {
    left: 0;
    top: 0;
    bottom: auto;
    right: auto;
  }
  .picker-center-highlight:after {
    left: 0;
    bottom: 0;
    right: auto;
    top: auto;
  }
</style>