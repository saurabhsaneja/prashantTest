import { create } from 'zustand'
import Toast from 'react-native-simple-toast'

const useFollowingStore = create((set) => ({
  followingData: {
    user1: ['user2', 'user3'],
    user2: ['user1', 'user3'],
    user3: ['user1', 'user2'],
  },
  updateFollowing: (data) => set((state) => {
    let updatedData = {...state.followingData}
    const user = Object.keys(data)[0]
    const user2 = Object.keys(data[user])[0]
    const value = !data[user][user2]
    // if includes
    const doesInclude = updatedData[user]?.includes(user2)
    if(doesInclude){
      const index = updatedData[user].indexOf(user2);
      updatedData[user].splice(index, 1)
    }
    // todo: if doesnt include
    return { followingData: updatedData }
  }),
}))

export default useFollowingStore;

// {
//   user1: {
//     user2: false
//   }
// }