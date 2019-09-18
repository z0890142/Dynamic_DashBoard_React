import { connect } from 'react-redux'
import Deploy from '../components/Deploy'
import { modify_Params,setLayout,reset,loadPage,setIsDesigner } from '../actions'


    
const mapStateToProps = (state) => {
    return {
        layout:state.layout,
      }
    }

const mapDispatchToProps = (dispatch) => {
  return {
    modifyParams:(component)=>{
      dispatch(modify_Params(component))
    },
    loadPage:(Page)=>{
      dispatch(loadPage(Page))
    },
    setLayout:(layout)=>{
      dispatch(reset())
      var layoutName=layout.split('/')[1].split(".")[0]
      dispatch(setLayout(layoutName))
    },
    setIsDesigner:(isDesigner)=>{
      dispatch(setIsDesigner(isDesigner))
    }
  }
}
    
    const DeployContainers = connect(
        mapStateToProps,mapDispatchToProps
    )(Deploy)
    
    export default DeployContainers