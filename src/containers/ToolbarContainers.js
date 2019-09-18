import { connect } from 'react-redux'
import { addTextLabel,addImage,loadPage,addGis } from '../actions'
import Toolbar from '../components/Toolbar'
import PageList from '../components/funcComponent/PageList'

import { changeDiv,reset } from '../actions'


    
const mapStateToProps = (state) => {
    return {
      TextLable: state.textLables,
      Image:state.images,
      Gis:state.gis,
      State:state

      }
    }

    const mapDispatchToProps = (dispatch) => {
      return {
        addTextLabel: (TextLable) => {
          dispatch(addTextLabel(TextLable))
        },
        addImage: (Image) => {
            dispatch(addImage(Image))
          },
        addGis:(Gis)=>{
          dispatch(addGis(Gis))
        },
        changeDiv:(component)=>{
            dispatch(changeDiv(component))
        },
        loadPage:(Page)=>{
          dispatch(loadPage(Page))
        },
        resetState:()=>{
          dispatch(reset())
        }
      }
    }
    
    const ToolbarContainers = connect(
        mapStateToProps,
      mapDispatchToProps
    )(Toolbar)


    const ForLoadDialog = connect(
      null,
      mapDispatchToProps
    )(PageList)

    export {ForLoadDialog,ToolbarContainers} 
    
