import React from 'react';
import GeneralDivContainers from "../containers/GeneralDivContainers"

var layoutHeight //依照designer或deploy有所改變
class Layout1 extends React.Component {
    constructor(props) {
        super(props);
        this.props.setLayout("layout1")
        this.myRef = React.createRef();
        if (this.props.isDesigner){
            this.layoutHeight="45vh"
        }else{
            this.layoutHeight="50vh"

        }
    }

    render() {

        return (
            <div id="test" >
                <GeneralDivContainers height={this.layoutHeight} id={"layout1_div1"} key={"layout1_div1"}  />
                <GeneralDivContainers height={this.layoutHeight} id={"layout1_div2"} key={"layout1_div2"}   />

            </div>

        )
    }

}
export default (Layout1);