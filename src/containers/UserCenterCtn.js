import { connect } from 'react-redux'
import UserCenter from '../components/UserCenter'
import { init, editBaseClick, submitBasicInfo, submitContact, editContactClick, handleImageUrl } from '../actions/user'

export default connect(function(state){
  const session = window.sessionStorage
  return {
    base: state.user.base,
    contact: state.user.contact,
    pictureUrl: state.user.pictureUrl,
    userName: state.login.userName || session.getItem('userName'),
    deptTree: state.global.deptTree,
    positionTree: state.global.positionTree,
    editBase: state.user.editBase,
    editContact: state.user.editContact,
  }
}, function(dispatch){
  return {
    onInit () {
      dispatch(init())
    },
    onEditBaseClick () {
      dispatch(editBaseClick())
    },
    onEditContactClick () {
      dispatch(editContactClick())
    },
    onSubmitBasicInfo (values) {
      dispatch(submitBasicInfo(values))
    },
    onSubmitContact (values) {
      dispatch(submitContact(values))
    },
    onHandleImageUrl (url) {
      dispatch(handleImageUrl(url))
    }
  }
})(UserCenter)
