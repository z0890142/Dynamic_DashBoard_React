import { combineReducers } from 'redux'
import textLables from './textLables'
import images from './images'
import gis from './gis'
import motifyTarget from './motifyTarget'
import {layout,isDesigner}  from './layout'

const todoApp = combineReducers({
    textLables,
    images,
    gis,
    layout,
    motifyTarget,
    isDesigner
    
})

export default todoApp