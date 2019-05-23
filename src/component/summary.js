import React,{Component} from 'react';
import {connect} from 'react-redux';
// function Summary({value}){
//     return(
//         <div>Total Count:{value}</div>
//     )
// }
class Summary extends Component{
    render(){
        return(
            <div>Total Count:{this.props.value}</div>
        )
    }
}
function mapState(state){
    let sum=0;
    for(const key in state){
        if(state.hasOwnProperty(key)){
            sum+=state[key];

        }

    }
    return{value:sum}

}
export default connect(mapState)(Summary)