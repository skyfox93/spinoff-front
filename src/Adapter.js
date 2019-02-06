
function Adapter(baseUrl){

  function getFeed(userId){return fetch(`${baseUrl}/users/${userId}/feed`)
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

    })
    .then(resp=> resp.ok ? resp.json(): Promise.reject(resp.json()))

  }
  function search (userId,query){
  return fetch(`${baseUrl}/search?id=${userId}&name=${query}`)
  .then(resp=>resp.json())
  }

  function requestFollow (followerId,followeeId){
      return fetch(`${baseUrl}/friendships`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "accepts": "application/json"
        },
        body: JSON.stringify({friendship:{follower_id: followerId, followee_id: followeeId}})
      }
    )
    .then(resp=>resp.json())
  }

  function acceptFollow (userId,followerId){
      return fetch(`${baseUrl}/users/${userId}/accept`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "accepts": "application/json"
        },
        body: JSON.stringify({
          friendship:{accepted:true,follower_id:followerId}
        })
      }
    )
    .then(resp=>resp.json())
  }

  function getRequests(userId){
    return fetch(`${baseUrl}/users/${userId}/requests`)
    .then(resp=> resp.json())
  }

  function getProfile(userId){
    return fetch(`${baseUrl}/users/${userId}/profile_photos`)
    .then(resp=> resp.json())
  }



 return{
   getProfile: getProfile,
   postPhoto:postPhoto,
   getFeed: getFeed,
   search: search,
   requestFollow: requestFollow,
   acceptFollow: acceptFollow,
   getRequests: getRequests
 }

}
const baseUrl='http://localhost:3000/api/v1'
export default Adapter(baseUrl)
