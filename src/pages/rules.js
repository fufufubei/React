import React,{Component} from 'react';
import Counter from '../component/counter';
import Summary from '../component/summary';
const style={
    margin:'20px'
}
class ControlPanel extends Component{
    render(){
        return (
            <div style={style}>
                <Counter caption="First" />
                <Counter caption="Second" />
                <Counter caption="Third" />
                <hr/>
                <Summary/>
            </div>
        )
    }
}
export default ControlPanel