import React from 'react';
import TextLable from './subComponents/TextLable';
import Image from './subComponents/Image';
import Gis from './subComponents/Gis';

import {withStyles} from '@material-ui/core/styles';
import ReactResizeDetector from 'react-resize-detector';

const styles = theme => ({
tableContainer: {
        height: 320,
        borderStyle: 'dashed',
        borderWidth:"1px",
        borderCollapse:"collapse"
    }
});
class GeneralDiv extends React.Component {
    constructor() {
        super();
        this.onResize=this.onResize.bind(this)
        this.myInput = React.createRef()

    }

    onResize(width,height) {
        var div_size={width:width+6,height:height+6} //ReactResizeDetector的height跟width都比div少6
        this.setState({div_size:div_size})
    }

    render() {
        return(
            <div id={this.props.id} style={{
                height: this.props.height,
                borderStyle: 'dashed',
                borderWidth:"1px",
                borderCollapse:"collapse"
            }} ref={this.myInput}>

            <ReactResizeDetector handleWidth handleHeight onResize={this.onResize} />    {/*用來偵測div的大小 */}

            {this
                .props
                .TextLable
                .filter(TextLable => TextLable.divName===this.props.id.split("_")[1])
                .map((item, index) => (<TextLable key={index} isDesigner={this.props.IsDesigner} div_size={this.state.div_size} data={item} getDivName={this.props.getDivName} modifyParams={this.props.modifyParams}  setModifyTarget={this.props.setModifyTarget} index={index}/>))
            }
            
            {this
                .props
                .Image
                .filter(Image => Image.divName===this.props.id.split("_")[1])
                .map((item, index) => (<Image key={index} isDesigner={this.props.IsDesigner} div_size={this.state.div_size} data={item} getDivName={this.props.getDivName}  modifyParams={this.props.modifyParams}  setModifyTarget={this.props.setModifyTarget} index={index}/>))
            } 
            {this
                .props
                .Gis
                .filter(Gis => Gis.divName===this.props.id.split("_")[1])
                .map((item, index) => (<Gis key={index} isDesigner={this.props.IsDesigner} div_size={this.state.div_size} data={item} getDivName={this.props.getDivName}  modifyParams={this.props.modifyParams}  setModifyTarget={this.props.setModifyTarget} index={index}/>))
            } 

            </div>
        );
    }

}
export default withStyles(styles)(GeneralDiv);