import { combineReducers } from 'redux'
import textLables from './textLables'
import images from './images'
import gis from './gis'
import iframe from './iframe'
import motifyTarget from './motifyTarget'
import {layout,isDesigner}  from './layout'

const todoApp = combineReducers({
    textLables,
    images,
    gis,
    layout,
    motifyTarget,
    iframe,
    isDesigner
    
})

export default todoApp