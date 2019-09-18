import { connect } from 'react-redux'
import Layout1 from '../layout/Layout1'
import Layout2 from '../layout/layout2'

import { setLayout } from '../actions'


    

const mapDispatchToProps = (dispatch) => {
  return {
    setLayout:(layout)=>{
      dispatch(setLayout(layout))
    },
  }
}
    
const ForLayout1 = connect(
  null,mapDispatchToProps
)(Layout1)
    

const ForLayout2 = connect(
  null,mapDispatchToProps
)(Layout2)
    
export  {ForLayout1,ForLayout2}
