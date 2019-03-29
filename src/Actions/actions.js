export const updateCurrentUser= (json)=> {
    return {
      type:'updateCurrentUser'
      json:json
    }
  }

  export const clearCurrentUser= ()=> {return {type:'clearCurrentUser'}}

  export const viewPhoto=(id,history)=> {
    history.push('/photo');
    return {type:'viewPhoto', id:id}
  }

  export const setViewingUser= (user)=>{
    return { type: 'setViewingUser', user: user}
  }

  export const editPhoto=(id) =>{
    return {
      type: 'editPhoto'
      id: id
    }
  }

  export const setProfilePhoto= (id,history) =>{
    history.push('/profile/photo');
    return {type='setProfilePhoto', id: id}
  }

  export const deSelectProfilePhoto=(photo_id)=>{
    return {type:'deSelectProfilePhoto'}
  }

  export const getSpinoffs=()=> {
    return {type: 'getSpinoffs'}
  }

  export const getPspinoffs= () => {
    return {type: 'getPspinoffs'}
  }

  export const getEditingPhoto = () => {
    return {type='getEditingPhoto'}
  }
  export const addPhoto= ()=> {
    return { type:'addPhoto'}
  }

  export const clearEditingPhoto=()=> {
    return {type: 'clearEditingPhoto'}
  }

  const setPhotos = (photos)=> {
    return {type: 'setPhotos', photos}
  }
