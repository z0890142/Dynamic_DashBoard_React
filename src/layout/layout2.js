import React from 'react';
import GeneralDivContainers from "../containers/GeneralDivContainers"

var layoutHeight
class Layout2 extends React.Component {
    
    constructor(props) {
        super(props);
        this.props.setLayout("layout2")
        this.myRef = React.createRef();
        if (this.props.isDesigner){
            this.layoutHeight="90vh"
        }else{
            this.layoutHeight="100vh"

        }
    }

    render() {

        return (
            <div id="test">
                <GeneralDivContainers height={this.layoutHeight} id={"layout2_div1"} key={"layout2_div1"}  />
            </div>

        )
    }

}
export default (Layout2);