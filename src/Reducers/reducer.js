const initial={
  photos: [],
  selPhotoId:null,
  editPhotoId:null,
  selProfPhotoId:null,
  createNewPhoto: false,
  currentUser:null,
  viewingUser: null
}
 const reducer = (state=initial,action) =>{
  switch (action.type){
    case 'setPhotos':
      return {...state, photos:action.photos};
    case 'selectPhoto':
      return {...state, selPhotoId:action.id}
    case 'addPhoto':
      return {...state, createNew:true}
    case 'editPhoto':
      return {...state,editPhotoId:action.id};
    case 'selectProfilePhoto':
      return {...state, selProfPhotoId: action.id}
    case 'deSelectProfilePhoto':
      return {...state, selProfPhotoId: null}
    case 'clearEditingPhoto':
      return {...state, editingPhotoId: null}
    case 'setCurrentUser':
      return {...state, currentUser:action.payload.user, token: action.payload.token}
    case 'clearCurrentUser':
      return {...state,currentUser:null}
    case 'setViewingUser':
      return {...state, viewingUser: action.user }
    default:
      return state
  }
}
export default reducer
