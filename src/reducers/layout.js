const layout = (state = "layout2", action) => {
    switch (action.type) {

      case "SET_Layout":{
        return action.Layout
        
      }
      
      default:
        return state
    }
  }



  const isDesigner = (state=false, action) => {
    switch (action.type) {

      case "Set_IsDesigner":{
        return action.IsDesigner
      }
      
      default:
        return state
    }
  }
  
  export  {layout,isDesigner}