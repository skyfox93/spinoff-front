function Adapter(baseUrl){
  function getPhotos(userId){
  return fetch(`${baseUrl}/users/${userId}/photos`)
    .then(resp=> resp.json())
  }

 return{
   getPhotos: getPhotos

 }

}
export default Adapter
