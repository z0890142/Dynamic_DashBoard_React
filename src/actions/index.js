export const setLayout = (Layout) => {
  return {
      type: 'SET_Layout',
      Layout
  }
}

export const addTextLabel = (TextLabel) => {
    return {
        type: 'ADD_TextLabel',
        TextLabel
    }
  }

export const addImage = (Image) => {
  return {
      type: 'ADD_Image',
      Image
  }
}

export const addGis = (Gis) => {
  return {
      type: 'ADD_Gis',
      Gis
  }
}
export const addIframe = (Iframe) => {
  return {
      type: 'ADD_Iframe',
      Iframe
  }
}
export const changeDiv = (Component,dest) => {
  return {
      type: 'Change_Div',
      Component,
      dest:dest
  }
}

export const setModifyTarget = (MotifyTarget) => {
  return {
      type: 'Set_ModifyTarget',
      MotifyTarget
  }
}

export const deleteModifyTarget = (MotifyTarget) => {
  return {
      type: 'Delete_ModifyTarget',
      MotifyTarget
  }
}


export const modify_Params = (MotifyTarget) => {
  return {
      type: 'Modify_Params',
      MotifyTarget
  }
}

export const loadPage = (Page) => {
  return {
      type: 'Load_Page',
      Page
  }
}

export const reset = () => {
  return {
      type: 'Reset'
  }
}

export const setIsDesigner = (IsDesigner ) => {
  return {
      type: 'Set_IsDesigner',
      IsDesigner 
  }
}

