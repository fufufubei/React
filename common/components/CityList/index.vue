<template >
  <div class="city" v-if="show">
    <div id="allmap" style="display: none"></div>
<template v-if="locFlag">
  <div class="currentCity" @click="locFilter()">当前：<span :class="{on:locFlag}">{{city}}</span></div>
</template>
<template v-else>
  <div class="currentCity">当前：<span :class="{on:locFlag}">{{city}}</span></div>
</template>
<div class="opendCity">已开通城市</div>
<mt-index-list>
  <mt-index-section :index="item.FirstZm" v-for="(item,index) in cityData" :key="index">
    <mt-cell :title="res.CityName" v-for="res,ind in item.CityOpenInfo" @click.native="drag(res.CityName,res.CityId)" :key="ind"></mt-cell>
  </mt-index-section>
  <div class="info">未开通城市，敬请期待</div>
</mt-index-list>
</div>
</template>
<script>
  import Vue from 'vue'

  import { Cell, IndexList, IndexSection } from 'mint-ui';
  Vue.component(Cell.name, Cell);
  Vue.component(IndexList.name, IndexList);
  Vue.component(IndexSection.name, IndexSection);
  import Util from "public/util.js"
  export default {
    name: 'city',
    data() {
      return {
        city: '定位中....',//当前定位城市
        locFlag: false,
        cityData: [],
        show:true
      }
    },
    methods: {
      init() {
        var that = this;
        // this.ajax.get(ACTIVITYWEBURL + '/Handler/Common.ashx?action=citylist1',{},function (res) {
        //   that.cityData = res;
        // })
        Util.get({
          url:"http://192.168.6.2:9205"+'/Handler/Common.ashx?action=citylist1',
          success:function(res){
              that.cityData = res;
          }
        })
      },
      drag(title, id) {
        this.$emit("success", { CityName: title, CityId: id });
        console.log({ CityName: title, CityId: id })
        this.show=false;
      },
      getLocation() {
        var that = this;
        var map = new BMap.Map("allmap");
        var point = new BMap.Point(116.331398, 39.897445);
        map.centerAndZoom(point, 12);
        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function (r) {
          if (this.getStatus() == BMAP_STATUS_SUCCESS) {
            var mk = new BMap.Marker(r.point);
            map.addOverlay(mk);
            map.panTo(r.point);
            that.city = r.address.city;
            that.locFlag = true;
          }
          else {
            that.city = "定位失败";
            that.locFlag = false;
          }
        }, { enableHighAccuracy: true })
        //关于状态码
        //BMAP_STATUS_SUCCESS	检索成功。对应数值“0”。
        //BMAP_STATUS_CITY_LIST	城市列表。对应数值“1”。
        //BMAP_STATUS_UNKNOWN_LOCATION	位置结果未知。对应数值“2”。
        //BMAP_STATUS_UNKNOWN_ROUTE	导航结果未知。对应数值“3”。
        //BMAP_STATUS_INVALID_KEY	非法密钥。对应数值“4”。
        //BMAP_STATUS_INVALID_REQUEST	非法请求。对应数值“5”。
        //BMAP_STATUS_PERMISSION_DENIED	没有权限。对应数值“6”。(自 1.1 新增)
        //BMAP_STATUS_SERVICE_UNAVAILABLE	服务不可用。对应数值“7”。(自 1.1 新增)
        //BMAP_STATUS_TIMEOUT	超时。对应数值“8”。(自 1.1 新增)
      },
      locFilter: function () {
        var result = this.cityData.forEach((item, index) => {
          item.CityOpenInfo.forEach((node) => {
            if (node.CityName.indexOf(this.city) > -1) {
              this.drag(node.CityName,node.CityId);
            }
          });

        });

      }
    },
    mounted() {
      var that = this;
      this.$nextTick(function () {
        that.init();
        that.getLocation();
        // var a = document.getElementsByClassName('mint-indexlist-nav')[0].children[0];
        // a.addEventListener( "click",function(){},false );
      })
    },
  }
</script>


<style lang="less">
  @rem:75rem;
  .city{
    font-size:24/@rem;
    background-color: #fff;
    position: absolute;
    height: 100%;
    width: 100%;
    overflow:hidden;
    .currentCity{
      line-height: 80/@rem;
      height: 80/@rem;
      padding-left: 20/@rem;
      position:absolute;
      width: 100%;
      top:0;
      span.on{
        color: red;
      }
    }
    .opendCity{
      padding-left: 20/@rem;
      line-height: 80/@rem;
      height: 80/@rem;
      color: #c1c1c1;
      position:absolute;
      width: 100%;
      top:80/@rem;
      background-color: #eeeeee;
      &:after{
      content:"";
      display:block;
      position:absolute;
      bottom:0;
      left:0;
      width:100%;
      height:1px;
      -webkit-transform-origin: 0 100%;
      transform-origin: 0 100%;
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
      border-bottom:1px solid #ddd;
      }
    }
    .mint-indexlist{
      position:absolute;
      /*top:0;*/
      /*bottom:0;*/
      /*left:0;*/
      /*right:0;*/
      margin-top:160/@rem;
      .mint-indexlist-content{
        width: 100%;
        .mint-indexsection{
          .mint-indexsection-index{
            padding:0 0 0 20/@rem;
            background-color: #eeeeee;
            color: #c1c1c1;
            line-height: 40/@rem;
          }
          .mint-cell{
            background-image: -webkit-linear-gradient(bottom, #d9d9d9, #d9d9d9 50%, transparent 50%);
            background-image: linear-gradient(0deg, #d9d9d9, #d9d9d9 50%, transparent 50%);
            background-size: 100% 1px;
            background-repeat: no-repeat;
            background-position: bottom;
            margin-left: 20/@rem;
            min-height: 90/@rem;
            .mint-cell-wrapper{
              background-size: 0;
              padding: 0;
              font-size:24/@rem;
            }
            &:last-child{
               background-size: 0;
             }
          }
        }
      }
      .mint-indexlist-nav{
        right: 20/@rem;
        border: none;
        background-color: transparent;
        top:0;
        color: #fff;
        bottom: 0;
        .mint-indexlist-navlist{
          background-color: rgba(190,190, 190, 0.7);
          border-radius: 100/@rem;
          padding: 0 5/@rem;
          .mint-indexlist-navitem{
            font-size:24/@rem;
            border-radius: 50%;
          }
        }
      }
    }
    .info{
      text-align: center;
      font-size:24/@rem;
      background-color: #eeeeee;
      padding: 10/@rem 0 40/@rem;
    }
  }
</style>