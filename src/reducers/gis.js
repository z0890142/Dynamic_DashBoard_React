const INITIAL_STATE = []

const gis = (state = [], action) => {
    switch (action.type) {
      case 'ADD_Gis':{
        return [
          ...state,
          action.Gis
        ]

      }
      case "Change_Div":{
        const target = state.filter(state => state === action.Component);
        if(action.dest!==""&&target.length!==0&&action.dest.indexOf('layout')>=0){
          var filterState=state.filter(state => state.componentId !== target[0].componentId)

          target[0].divName=action.dest.split("_")[1]
          var result=[...filterState,target[0]]
          return result
        }else{
          return state
        }
      }
      case "Modify_Params":{
        if(action.MotifyTarget.type==="gis"){
          var filterState=state.filter(state => state.componentId !== action.MotifyTarget.componentId)

          var test=[
            ...filterState            
            ,action.MotifyTarget
          ]
          return test
        }else{
          return state
        }
     }
     case "Delete_ModifyTarget":{
      if(action.MotifyTarget.type==="gis"){
        var filterState=state.filter(state => state.componentId !== action.MotifyTarget.componentId)
        var components=[
          ...filterState            
        ]
        return components
      }else{
        return state
      }
    }
     case 'Load_Page':{
      if(action.Page.gis.length===0){
        return state
      }else{
        return action.Page.gis
      }
    
      }
      case "Reset":{
        return INITIAL_STATE
      }
      default:
        return state
    }
  }
  
  export default gis