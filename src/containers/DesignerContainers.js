import { connect } from 'react-redux'
import Designer from '../components/Designer'
import { modify_Params,setLayout,reset,setIsDesigner,deleteModifyTarget } from '../actions'


    
const mapStateToProps = (state) => {
  var data=[]
    
  //篩選出需要修改的元件
  if(state.motifyTarget.length>0){
    let componentId=state.motifyTarget[0].componentId
    let targetType=state.motifyTarget[0].type
    data=state[targetType].filter(target=>target.componentId===componentId)
  }
  return {
    layout:state.layout,
    MotifyTarget: data
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    modifyParams:(component)=>{
      dispatch(modify_Params(component))
    },
    setLayout:(layout)=>{
      dispatch(reset())
      var layoutName=layout.split('/')[1].split(".")[0]
      dispatch(setLayout(layoutName))
    },
    setIsDesigner:(isDesigner)=>{
      dispatch(setIsDesigner(isDesigner))
    },
    deleteModifyTarget:(deleteTarget)=>{
      dispatch(deleteModifyTarget(deleteTarget))
    }
  }
}
    
    const DesignerContainers = connect(
        mapStateToProps,mapDispatchToProps
    )(Designer)
    
    export default DesignerContainers