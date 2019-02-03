function Adapter(baseUrl){
  function getPhotos(userId){
  return fetch(`${baseUrl}/users/${userId}/photos`)
    .then(resp=> resp.ok ? resp.json(): Promise.reject(resp.json()))
  }
  function postPhoto(userId,data){
    return fetch(`${baseUrl}/users/${userId}/photos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "accepts": "application/json"
      },
      body: JSON.stringify(data)

    }).then(resp=> resp.ok ? resp.json(): Promise.reject(resp.json()))

  }

 return{
   getPhotos: getPhotos,
   postPhoto:postPhoto
 }

}
export default Adapter
