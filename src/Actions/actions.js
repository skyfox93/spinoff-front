export const updateCurrentUser= (json)=> {
    return {
      type:'updateCurrentUser'
      json:json
    }
  }

  export const clearCurrentUser= ()=> {return {type:'clearCurrentUser'}}

  export const viewPhoto=(id)=> {
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

  export const setProfilePhoto= (id) =>{
    return {type='setProfilePhoto', id: id}
  }

  export const deSelectProfilePhoto=(photo_id)=>{
    return {type:'deSelectProfilePhoto'}
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
