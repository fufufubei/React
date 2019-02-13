<template>
  <div class="addImages" :class="bigBox">
    <form name="addImgs" :id="outid">
      <div class="showImages">
        <ul>
          <li v-for="(item,index) in images" :class="contentBox">
            <img :src="(item.indexOf('com.oss-cn-beijing.aliyuncs.com')>-1 )&&(item.indexOf('?x-oss-process=style/200_200')==-1) ?item+'?x-oss-process=style/200_200':item" />
            <span class="delete" @click="remove(index)"></span>
          </li>
          <li class="upLoad" :class="contentBox" v-if="images.length<upNumber">
            <input name="selectImgs" type="file" :id="id" class="upLoad-button" v-if="!photoLoad" @change="up" @click="upLoad" accept="image/png,image/jpeg,image/jpg" />
            <input name="selectImgs" type="text" :id="id" class="upLoad-button" v-else @click="upLoad" accept="image/png,image/jpeg,image/jpg" />
            <img :src="url.indexOf('com.oss-cn-beijing.aliyuncs.com')>-1?url+'?x-oss-process=style/200_200':url" />
          </li>
        </ul>
      </div>
    </form>
  </div>
</template>

<script>
  import Vue from 'vue'
  import Lay from "public/lay"
  import Compress from "public/image"
  require("./webviewjavascriptbridge.js");
  export default {
    name: 'addImages',
    data() {
      return {
        url: require('./images/addImg.png'),
        images: [],
        lastModified: [],
        photoLoad: false,
      }
    },
    props: {
      size: {
        //设置缩略图的大小
        type: String,
        default: ''
      },
      dir: {
        //设置上传图片的的存储文件夹
        type: String,
        default: ''
      },
      bigBox: {
        //设置最外层DIV的样式
        type: String,
        default: ''
      },
      contentBox: {
        //设置图片所在li的样式
        type: String,
        default: ''
      },
      upNumber: {
        //设置上传图片数量
        type: String,
        default: '1'
      },
      clear: {
        //判断是否清空图片数组
        type: Boolean,
        default: false
      },
      imgarr: {
        type: Array,
        default: function() {
          return []
        }
      },
      //formid
      outid: {
        type: String,
        default: 'form-addImg'
      },
      //input id
      id: {
        type: String,
        default: 'fileImg'
      },
      //是否启用压缩
      isCompress: {
        type: Boolean,
        default: false
      }
    },
    //监听clear来清楚图片数组
    watch: {
      "clear": function() {
        this.images = [];
      }
    },
    methods: {
      //针对安卓4.4在内嵌app里不能调用图片上传方法的处理
      upLoad() {
        let that = this;
        var userAgent = navigator.userAgent;
        var index = userAgent.indexOf("Android")
        var androidVersion = userAgent.slice(index + 8);
        androidVersion = parseFloat(androidVersion.slice(0, 3));
        if (index >= 0) {
          if (androidVersion == 4.4) {
            var data = {
              method: 'selectFile',
              FileType: ''
            };
            window.WebViewJavascriptBridge.callHandler('uuptObjcCallback', data, function(res) {
              data = {
                method: 'uploadFile',
                params: {
                  url: 'https://files.uupt.com/u/fileupload.ashx?dir=tmall',
                  path: res
                }
              }
              Lay.loading.load("正在上传图片");
              window.WebViewJavascriptBridge.callHandler("uuptObjcCallback", data, function(res) {
                var obj = JSON.parse(res);
                if (obj.State == 1) {
                  var body = JSON.parse(obj.Msg);
                  if (body.State == 1) {
                    that.images.push(body.Body);
                  } else {
                    Lay.msg(body.Msg)
                  }
                } else {
                  Lay.msg(obj.Msg);
                }
                Lay.close();
              })
            });
          }
        }
      },
      async up() {
        var userAgent = navigator.userAgent;
        var index = userAgent.indexOf("Android")
        var androidVersion = userAgent.slice(index + 8);
        androidVersion = parseFloat(androidVersion.slice(0, 3));
        if (index > 0) {
          if (androidVersion == 4.4) {
            return;
          }
        }
        Lay.loading.load('正在上传图片');
        var that = this;
        var file = document.getElementById(this.id).files[0];
        var form = new FormData();
        if (this.isCompress) {
          await Compress(file, {
            compress: {
              width: 300,
              height: 300,
              quality: 0.8
            }
          }).then((data) => {
            var bytes = window.atob(data.base64.split(',')[1]);
            var ab = new ArrayBuffer(bytes.length);
            var ia = new Uint8Array(ab);
            for (var i = 0; i < bytes.length; i++) {
              ia[i] = bytes.charCodeAt(i); //这里有点疑惑，ia是怎么改变ab的？注：①
            }
            //Blob对象
            var blob = new Blob([ab], {
              type: file.type
            });
            form.append("file", blob, file.name);
          })
        } else {
          form.append("file", file);
        }
        //其他参数
        that.$ajax.post('https://files.uupt.com/u/fileupload.ashx', form, {
          method: 'post',
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then((res) => { //根据服务器返回进行处理
          if (res.data.IsError) {
            Lay.close();
            Lay.msg(res.data.Msg);
            return
          };
          that.images.push(res.data.Body);
          let arr = [];
          arr = this.images;
          if (arr.length) {
            arr.forEach((item, index) => {
              if (item.indexOf('?x-oss-process=style/200_200') > -1) {
                item = item.split("?x-oss")[0];
              }
            })
          };
          that.$emit("success", arr);
          Lay.close();
        }).catch((error) => {
          Lay.close();
          Lay.msg(error)
        });
        document.getElementById(this.outid).reset();
      },
      remove: function(index) {
        this.lastModified.splice(index, 1);
        this.images.splice(index, 1);
        this.$emit("success", this.images);
      },
    },
    mounted() {
      this.$nextTick(function() {
        var userAgent = navigator.userAgent;
        var index = userAgent.indexOf("Android")
        var androidVersion = userAgent.slice(index + 8);
        androidVersion = parseFloat(androidVersion.slice(0, 3));
        if (index >= 0) {
          if (androidVersion == 4.4) {
            this.photoLoad = true;
          }
        }
        if (this.imgarr.length > 0) {
          this.images = this.imgarr;
        }
      })
    },
  }
</script>


<style lang="less">
  @rem: 75rem;
  .addImages {
    padding: 20/@rem;
    .showImages {
      position: relative;
      ul {
        display: flex;
        display: -webkit-flex;
        display: -moz-flex;
        flex-direction: row;
        -webkit-flex-direction: row;
        flex-wrap: wrap;
        -webkit-flex-wrap: wrap;
        li {
          width: 196/@rem;
          height: 196/@rem;
          position: relative;
          margin-top: 30/@rem;
          &:nth-child(2) {
            margin: 0 28/@rem;
            margin-top: 30/@rem;
          }
          img {
            width: 100%;
            height: 100%;
            display: block;
          }
          .delete {
            width: 34/@rem;
            height: 34/@rem;
            position: absolute;
            right: -13/@rem;
            top: -15/@rem;
            background: url('./images/close.png') center no-repeat;
            background-size: 100%;
            z-index: 3;
          }
          &.upLoad {
            display: flex;
            display: -webkit-flex;
            display: -moz-flex;
            margin-right: 0;
            border: 1px dashed #ddd;
            .upLoad-button {
              position: absolute;
              width: 100%;
              height: 100%;
              z-index: 3;
              filter: alpha(opacity=0);
              opacity: 0;
            }
            img {
              margin: auto;
              width: 50%;
              height: 50%;
            }
          }
        }
      }
    }
  }
</style>