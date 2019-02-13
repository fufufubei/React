import React,{Component} from 'react';
import {HashRouter,Router,Route,Link} from "react-router-dom";
import Rules from '../pages/rules';
import Util from 'public/util'
import uPop from 'public/uPop'
import echarts from 'echarts'

function setTime(timeStr){
    timeObj.year = parseInt(timeStr / (60 * 60 * 24 * 365));
    timeObj.day = parseInt(timeStr % (60 * 60 * 24 * 365) / (60 * 60 * 24));
    timeObj.hour = parseInt(timeStr % (60 * 60 * 24 * 365) % (60 * 60 * 24) / (60 * 60));
    timeObj.min = parseInt(timeStr % (60 * 60 * 24 * 365) % (60 * 60 * 24) % (60 * 60) / 60);
    timeObj.sec = parseInt(timeStr % (60 * 60 * 24 * 365) % (60 * 60 * 24) % (60 * 60) % 60);
    for (let v in timeObj) {
        timeObj[v] = timeObj[v] < 10 && timeObj[v] >= 0 ? '0' + String(timeObj[v]) : String(timeObj[v]);
    };
   
}
function TimeSpan(props){
    if(parseInt(props.time)<=0&&(props.txt=='年'||props.txt=='秒')){
        return '';
    }
    let spantxt=String(props.time).split('').map((i,index)=>{
        return (<span className="time" key={index}>{i}</span>)
    })
    let timeTxt=<span className="text" key={props.txt}>{props.txt}</span>;
    spantxt.push(timeTxt)
    return (
        spantxt
    );
}

function TimeModule (props){
    if(props.timeStr>0){
        return(
            <div className="main-time">
            <div className="title">UU为您节省了生命中</div>
            <div className="time-list">
                <TimeSpan time={props.timeObj.year} txt='年'/>
                <TimeSpan time={props.timeObj.day} txt='天' />
                <TimeSpan time={props.timeObj.hour} txt='时' />
                <TimeSpan time={props.timeObj.min} txt='分' />
                <TimeSpan time={props.timeObj.sec} txt='秒' />
            </div>
        </div>
        )
    }
    return (
        <div className="main-time-other">
            <h2>您还没有开启UU里程</h2>
            <p>全国已有约一千一百万用户在用UU节省时间</p>
        </div>
    )
}
function MyEchart(props){
    if(props.echartOption.series[0].data.length>0){
        return (
            <div className="myEchart">
                <div id="myEchart"></div>
                <div className="count">
                    <div className="num">{props.orderCount}</div>
                    <p>总计(单)</p>
                </div>
            </div> 
        )
    }
    return (
        <div className="no-data" >
            <img src={require("../assets/images/nodata.png")} alt="" />
            <p>您还没有下过单哦，赶快开启省时生活吧！<br />帮您送，帮您取，包办您生活的一切难题~</p>
        </div>
    )
    
}

class Index extends Component{
    constructor(props){
        super(props);
        this.state={
            info: {
                LevelItems: {},
                UserInfo: {},
                UserOrderInfo: {},
            },
            timeObj: {
                year: '',
                day: '',
                min: '',
                sec: ''
            },
            isLoading: true,
            levelInfo: {
                GradeIcon:'',
            }, //当前等级信息
            lastLevelInfo: {}, //下一等级
            preLevelInfo: {}, //上一等级信息
            echartOption: {
                color: ['#fcc878', '#ffac2c', '#ff8200', '#f56600', '#ffac2c', ],
                series: [{
                    type: 'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: true,
                    label: {
                        normal: {
                            show: true,
                            position: 'outside',
                            color: '#1a1a1a',
                            fontSize: 11,
                            // formatter(v){
                            //     let text=v.name;
                            //     return text.length<8?text:text.slice(0,3)+'\n'+text.slice(3)
                            // }
                        },
                    },
                    labelLine: {
                        normal: {
                            show: true,
                            lineStyle: {
                                color: '#ccc'
                            },
                            length2: 10
                        },
                    },
                    silent: true,
                    data: []
                }]
            },
            width: 0,
            orderCount: 0, //订单总数
        }
    }
    setEcharts(){
        let orderData = [];
        for (let v in this.state.info.UserOrderInfo) {
            let text = '';
            switch (v) {
                case 'BuyOrderCount':
                    text = '帮我买';
                    break;
                case 'HelpOrderCount':
                    text = 'UU帮帮';
                    break;
                case 'QueueOrderCount':
                    text = '代排队';
                    break;
                case 'SendOrderCount':
                    text = '帮我送';
                    break;
                case 'TakeOrderCount':
                    text = '帮我取';
                    break;
            }
            this.state.orderCount += this.state.info.UserOrderInfo[v];
            if (this.state.info.UserOrderInfo[v] > 0) {
                orderData.push({
                    value: this.state.info.UserOrderInfo[v],
                    name: text + this.state.info.UserOrderInfo[v] + '单'
                })
            }
        };
        this.state.echartOption.series[0].data.push(...orderData);
        this.setState({
            echartOption:this.state.echartOption,
            orderCount:this.state.orderCount
        })
        if (this.state.echartOption.series[0].data.length > 0) {
            setTimeout(() => {
                var myChart = echarts.init(document.getElementById('myEchart'));
                myChart.setOption(this.state.echartOption);
            }, 200)
        };
    }
    setTime(){
        let timeStr=this.state.info.UserInfo.TotalSavingTime;
        this.state.timeObj.year = parseInt(timeStr / (60 * 60 * 24 * 365));
        this.state.timeObj.day = parseInt(timeStr % (60 * 60 * 24 * 365) / (60 * 60 * 24));
        this.state.timeObj.hour = parseInt(timeStr % (60 * 60 * 24 * 365) % (60 * 60 * 24) / (60 * 60));
        this.state.timeObj.min = parseInt(timeStr % (60 * 60 * 24 * 365) % (60 * 60 * 24) % (60 * 60) / 60);
        this.state.timeObj.sec = parseInt(timeStr % (60 * 60 * 24 * 365) % (60 * 60 * 24) % (60 * 60) % 60);
        for (let v in this.state.timeObj) {
            this.state.timeObj[v] = this.state.timeObj[v] < 10 && this.state.timeObj[v] >= 0 ? '0' + String(this.state.timeObj[v]) : String(this.state.timeObj[v]);
        };
        this.setState({
            timeObj:this.state.timeObj
        })
    }
    componentDidMount(){
        Util.post({
            // url: 'http://192.168.6.3:9202/pagesv2/user/userhierarchy/detail.action',
            url: 'http://appweb.uupt.com/pagesv2/user/userhierarchy/detail.action',
            data: {
                t: Util.VueRequest('t') || Util.Request('t') || ''
            },
            success: (res) => {
                if (res.IsError) {
                    uPop.msg(res.Msg)
                } else {
                    if (res.State == 1) {
                        // setTimeout(() => {
                        //     pageData.isLoading = false;
                        // }, 500)
                        this.state.info = res.Body;
                        setTimeout(()=>{
                            this.setState({
                                isLoading:false,
                            })
                        },500)
                        //等级信息处理
                        // this.state.info.LevelItems = this.state.info.LevelItems.sort(this.state.levelSort('Level'));
                        for (let i = 0; i < this.state.info.LevelItems.length; i++) {
                            if (this.state.info.UserInfo.UserLevelId == this.state.info.LevelItems[i].LevelId) {
                                this.state.levelInfo = this.state.info.LevelItems[i];
                                if (i == this.state.info.LevelItems.length - 1) {
                                    //最大等级：‘下级’显示当前等级，‘上级’显示前一等级，进度条宽度100%；
                                    this.state.lastLevelInfo = this.state.info.LevelItems[i];
                                    this.state.preLevelInfo = this.state.info.LevelItems[i - 1];
                                } else {
                                    this.state.preLevelInfo = this.state.info.LevelItems[i];
                                    this.state.lastLevelInfo = this.state.info.LevelItems[i + 1];
                                }
                            }
                        }
                        
                        //进度条设置
                        let width = 0;
                        if (this.state.levelInfo.Level == this.state.info.LevelItems[this.state.info.LevelItems.length - 1].Level) {
                            width = 100;
                        } else {
                            width = (this.state.info.UserInfo.UserScore - this.state.preLevelInfo.StartScore) / (this.state.lastLevelInfo.StartScore - this.state.preLevelInfo.StartScore) * 100;
                        }
                        var timer = setInterval(()=> {
                            if (this.state.width < width) {
                                this.state.width++;
                            } else {
                                this.state.width = width;
                                clearInterval(timer);
                            }
                            this.setState({
                                width:this.state.width,
                            })
                           
                        }, 10)

                        this.setTime()
                        this.setState({
                            info:this.state.info,
                            levelInfo:this.state.levelInfo,
                            preLevelInfo:this.state.preLevelInfo,
                            lastLevelInfo:this.state.lastLevelInfo,
                        })
                        setTimeout(()=>{
                            this.setEcharts()
                        },500)
                    } else {
                        if (Object.prototype.toString.call(res) === "[object String]") {
                            uPop.msg(res)
                        } else {
                            uPop.msg(res.Msg)
                        }
                    }
                }
            },
            noLoad: true,
            error: (err) => {}
        })
    }
    render(){
        const pageData=this.state;
        if(pageData.isLoading){
            return (
                <div className="new-loading">
                    <div className="loading-con">
                        <img src={require('../assets/images/smile.gif')} alt="" />
                        <div className="text">努力加载中...</div>
                    </div>
                </div>
            )
        }else{
            return(
                // <div classNameName="page-index">
                //     <div classNameName="title">首页</div>
                //     <Link to='/rules'>规则</Link>
                //     <Link to='/rulesOne'>规则one</Link>
                // </div>
                <div className="page-index" >
                    <div className="banner">
                    <img src={pageData.levelInfo.GradeIcon} className="rank-icon" alt="" />
                        <div className="rank-text">Lv.{pageData.levelInfo.Level}{pageData.levelInfo.LevelName}</div>
                        <div className="rank-tip">您和UU已经相识{pageData.info.UserInfo.RegisterDays}天了</div>
                        <div className="progress-bar um-flex um-between um-ver">
                            <div className="left">
                                <div className="line">
                                    <div className="cir"></div>
                                </div>
                                <p>Lv{pageData.preLevelInfo.Level}<br/>{pageData.preLevelInfo.StartScore}</p>
                            </div>
                            <div className="center um-flex-item">
                                <div className="line"  style={{width:pageData.width+'%'}}>
                                    <div className="tag">
                                        <span>{pageData.info.UserInfo.UserScore}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="right">
                                <div className="cir"></div>
                                <p>Lv{pageData.lastLevelInfo.Level}<br/>{pageData.lastLevelInfo.StartScore}</p>
                            </div>
                        </div>
                    </div>
                    <div className="main">
                        <TimeModule timeStr={pageData.info.UserInfo.TotalSavingTime} timeObj={pageData.timeObj} />
                        <div className="main-down">
                            <div className="btn" ></div>
                        </div>
                        <div className="main-count">
                            <div className="title">我的订单</div>
                            <MyEchart echartOption={pageData.echartOption} orderCount={pageData.orderCount}/>
                        </div>
                    </div>
                </div>
            )
        }
    }
}
export default Index;

