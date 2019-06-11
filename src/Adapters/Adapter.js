
function Adapter(baseUrl){
   function signup (user){
     return fetch(baseUrl+ '/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json',
      },
      body: JSON.stringify({user})
    })
  }
  function login(user){
    return fetch(baseUrl+'/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accepts: 'application/json',
      },
      body: JSON.stringify(user)
    })
  }
  function patchUser(user,userId,token){
    return fetch(baseUrl+`/users/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify(user)
    })
  }
  function getFeed(userId,token){
    return fetch(`${baseUrl}/users/${userId}/feed`,{
      headers: {'Authorization' : token}
    })
    .then(resp=> resp.ok ? resp.json(): Promise.reject(resp.json()))
  }

  function postPhoto(userId,data,token){
    return fetch(`${baseUrl}/users/${userId}/photos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "accepts": "application/json",
        'Authorization': token
      },
      body: JSON.stringify(data)

    })
    .then(resp=> resp.ok ? resp.json(): Promise.reject(resp.json()))

  }
  function search (userId,query,token){
  return fetch(`${baseUrl}/search?id=${userId}&name=${query}`,{
    headers: {'Authorization' : token}
})
  .then(resp=>resp.json())
  }

  function requestFollow (followerId,followeeId,token){
      return fetch(`${baseUrl}/friendships`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "accepts": "application/json",
          'Authorization': token
        },
        body: JSON.stringify({friendship:{follower_id: followerId, followee_id: followeeId}})
      }
    )
    .then(resp=>resp.json())
  }

  function acceptFollow (userId,followerId,token){
      return fetch(`${baseUrl}/users/${userId}/accept`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "accepts": "application/json",
          'Authorization': token
        },
        body: JSON.stringify({
          friendship:{accepted:true,follower_id:followerId}
        })
      }
    )
    .then(resp=>resp.json())
  }

  function getRequests(userId,token){
    return fetch(`${baseUrl}/users/${userId}/requests`,{
      headers: {'Authorization' : token}
  })
    .then(resp=> resp.json())
  }

  function getProfile(userId,token){
    return fetch(`${baseUrl}/users/${userId}/profile_photos`,{
      headers: {'Authorization' : token}
  }
    )
    .then(resp=> resp.json())
  }



 return{
   getProfile: getProfile,
   postPhoto:postPhoto,
   getFeed: getFeed,
   search: search,
   requestFollow: requestFollow,
   acceptFollow: acceptFollow,
   getRequests: getRequests,
   login: login,
   signup: signup,
   patchUser, patchUser

 }

}

const baseUrl='http://localhost:3002/spinoff/api/v1'

export default Adapter(baseUrl)
