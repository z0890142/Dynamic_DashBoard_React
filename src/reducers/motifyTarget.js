const motifyTarget = (state = [], action) => {
    switch (action.type) {

      case "Set_ModifyTarget":{
        return [action.MotifyTarget]

      }
      
      default:
        return state

    }
  }
  
  export default motifyTarget