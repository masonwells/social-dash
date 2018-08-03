// const initialState = {
//   user: {}
// }

const initialState = {
  user: { id: 5, user_name: "Mason Brockbank", email: "masonbrockbank@gmail.com", auth_id: "google-oauth2|108178934457324039627", picture: "https://lh6.googleusercontent.com/-uPeL5-1RrGE/AAAAAAAAAAI/AAAAAAAAAI8/KLCKeKkMJCw/photo.jpg" }
}

const UPDATE_USER_DATA = 'UPDATE_USER_DATA'

export function updateUserData(user) {
  return {
    type: UPDATE_USER_DATA,
    payload: user
  }
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_USER_DATA:
      return Object.assign({}, state, { user: action.payload })

    default:
      return state
  }
}