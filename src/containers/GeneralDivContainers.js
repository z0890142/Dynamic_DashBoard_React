import { connect } from 'react-redux'
import { addTextLabel ,changeDiv,setModifyTarget,modify_Params} from '../actions'

import GeneralDiv from '../components/GeneralDiv'

const mapStateToProps = (state) => {
return {
  TextLable: state.textLables,
  Image:state.images,
  Gis:state.gis,
  IsDesigner:state.isDesigner
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: (id) => {
      dispatch(addTextLabel(id))
    },
    getDivName:(component,dest)=>{
      dispatch(changeDiv(component,dest))
    },
    setModifyTarget:(component)=>{
      dispatch(setModifyTarget(component))
    },
    modifyParams:(component)=>{
      dispatch(modify_Params(component))
    },
  }
}

const GeneralDivContainers = connect(
  mapStateToProps,
  mapDispatchToProps
)(GeneralDiv)

export default GeneralDivContainers