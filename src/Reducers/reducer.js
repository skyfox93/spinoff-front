const initial={
  photos: [],
  selPhotoId:null,
  editPhotoId:null,
  selProfPhotoId:null,
  createNewPhoto: false,

  currentUser:null,
  userViewed: null;
}
const reducer = (state=initial,action) =>{
  switch (action.type){
    case: 'setPhotos':
      return {...state, photos:action.photos};
    case: 'viewPhoto':
      return {...state, selPhotoId:action.id}
    case: 'editPhoto':
      return {..state,editPhotoId:action.id};
    case: 'setProfilePhoto'
      return {...state, selProfPhotoId: action.id}
    case: 'deSelectProfilePhoto'
      return {...state, selProfPhotoId: null}
    case: 'clearEditingPhoto'
      return {...state, editingPhotoid: null}
    case: 'updateCurrentUser': 
      return {...state, currentUser:user}
    case: 'clearCurrentUser':
      return {...state,currentUser=null}
    default:
      return state
  }
}
