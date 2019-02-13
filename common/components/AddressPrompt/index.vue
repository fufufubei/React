<template>
  <div class="baiduMap">
    <div id="i-map" style="display:none"></div>
    <div class="r-result"><input type="text" :placeholder="place" v-model="val" @input="changeValue" @blur="blur" /></div>
    <ul class="result" v-show="isShow">
      <li v-for="(item,index) in list" @click="chioce(index)">
        <p class="title">{{item.title}}</p>
        <p class="address">{{item.address}}</p>
      </li>
    </ul>
    <div class="noSearch" v-show="noData">
      <div class="noData">未搜索到数据，请重新输入</div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  export default {
    name: 'baiduMap',
    data() {
      return {
        list: [],
        val: '',
        isShow: false,
        noData: false
      }
    },
    props: {
      city: {
        type: String,
        default: "郑州市"
      },
      place: {
        type: String,
        default: "请输入地址信息"
      },
      value: {
        type: String,
        default: ""
      },
      clear: {
        type: Boolean,
        default: false
      }
    },
    watch: {
      "clear": function() {
        this.val = '';
      }
    },
    methods: {
      changeValue: function() {
        var that = this;
        var map = new BMap.Map("i-map");
        map.centerAndZoom(that.city, 12); // 初始化地图,设置城市和地图级别。
        var options = {
          onSearchComplete: function(results) {
            that.list = [];
            if (local.getStatus() == BMAP_STATUS_SUCCESS) {
              var num = results.getCurrentNumPois() > 10 ? 10 : results.getCurrentNumPois();
              var tags = "";
              for (var i = 0; i < num; i++) {
                if (results.getPoi(i).tags != undefined) {
                  tags = results.getPoi(i).tags.join(',');
                }
                if (tags.indexOf("道路") == -1 && tags.indexOf("行政地标") == -1) {
                  that.list.push({
                    title: results.getPoi(i).title,
                    address: results.getPoi(i).address,
                    lat: results.getPoi(i).point.lat,
                    lng: results.getPoi(i).point.lng
                  })
                  that.isShow = true;
                  that.noData = false
                }
              }
            } else {
              that.isShow = false;
              that.noData = true
            }
          }
        }
        var local = new BMap.LocalSearch(that.city, options);
        local.search(that.val);
        if (this.val == '') {
          this.isShow = false;
        }
      },
      chioce: function(index) {
        this.val = this.list[index].title;
        this.isShow = false;
        this.$emit("success", this.list[index]);
      },
      blur: function() {
        var that = this;
        // that.isShow=false;
        // that.noData=false;
        // setTimeout(function () {
        //   that.isShow = false;
        // }, 1000);
      }
    },
    mounted() {
      var that = this;
      this.$nextTick(function() {
        this.val = this.value;
      })
    },
  }
</script>


<style lang="less">
  @rem: 75rem;
  html {
    -webkit-user-select: auto !important;
  }
  .baiduMap {
    width: 100%;
    position: relative;
    #map {
      height: 0;
      display: none;
    }
    .noSearch {
      position: absolute;
      top: 100%;
      left: 0;
      width: 100%;
      margin-top: 10/@rem;
      box-sizing: border-box;
      -webkit-box-sizing: border-box;
      z-index: 100;
      margin-top: 10/@rem;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      .noData {
        left: 0;
        height: 150/@rem;
        text-align: center;
        background: #fff;
        font-size: 26/@rem;
        color: #333;
        line-height: 150/@rem;
        border: 1PX solid #f1f1f1;
      }
    }
    .r-result {
      position: relative; // border: 1px solid #f1f1f1;
      input {
        text-align: left;
        height: 60/@rem;
        line-height: 60/@rem;
        position: relative;
        z-index: 2;
        display: block;
        width: 100%; // padding-left: 20/@rem;
        box-sizing: border-box;
      }
    }
    .result {
      position: absolute;
      top: 100%;
      right: 0;
      left: 0;
      box-sizing: border-box;
      margin-top: 10/@rem;
      border: 1PX solid #f1f1f1;
      overflow-y: scroll;
      max-height: 500/@rem;
      z-index: 100;
      background: #fff;
      li {
        padding: 12/@rem 20/@rem;
        position: relative;
        z-index: 3;
        border-bottom: 1PX solid #f1f1f1;
        &:last-child {
          border: none;
        }
        .title {
          color: #2a2a2a;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          font-size: 26/@rem;
        }
        .address {
          color: #949494;
          margin-top: 6/@rem;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          font-size: 24/@rem;
        }
      }
    }
  }
</style>