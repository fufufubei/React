import React,{Component} from 'react';
import '../assets/css/index.css';
class Loading extends Component{
    render(){
        return(
            <div className="new-loading">
                <div className="loading-con">
                    <img src={require('../assets/images/smile.gif')} alt="" />
                    <div className="text">努力加载中...</div>
                </div>
            </div>
        )
    }
}
export default Loading;

