
import { transitions, positions, types } from 'react-alert'


export const options = {
    position: positions.BOTTOM_RIGHT,
    type: types.SUCCESS,
    timeout: 5000,
    offset: '200px',
    transition: transitions.SCALE,
    containerStyle: {}
  }

  export const AlertTemplate = ({message}) => (
    <div style={{ zIndex:5000 ,backgroundColor:"#24a319",color:'#fff'}}>
      <div style={{ padding:'10px',fontSize:14 }}>{message}</div>
    </div>
  )