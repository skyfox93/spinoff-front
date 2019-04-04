export const updateCurrentUser= (json)=> {
  //sessionStorage.setItem('token',token)
  //sessionStorage.setItem('user', JSON.stringify(json.user))
    return {
      type:'setCurrentUser',
      payload:{
        user: json.user,
        token:json.token
      }
    }
  }
  export const clearCurrentUser= ()=> {return {type:'clearCurrentUser'}}

  export const selectPhoto=(id)=> {
    return {type:'selectPhoto', id:id}
  }

  export const setViewingUser= (user)=>{
    return { type: 'setViewingUser', user: user}
  }

  export const editPhoto=(id) =>{
    return {
      type: 'editPhoto',
      id: id
    }
  }

  export const selectProfilePhoto= (id) =>{
    return {type:'selectProfilePhoto', id: id}
  }

  export const deSelectProfilePhoto=(photo_id)=>{
    return {type:'deSelectProfilePhoto'}
  }

  export const addPhoto= ()=> {
    return {type:'addPhoto'}
  }

  export const clearEditingPhoto=()=> {
    return {type: 'clearEditingPhoto'}
  }

  export const setPhotos = (photos)=> {
    return {type: 'setPhotos', photos}
  }
