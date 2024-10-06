import { create } from 'zustand'
import Toast from 'react-native-simple-toast'

const useFeedStore = create((set) => ({
  feedData: [
    {
      id: '1',
      userName: 'user1',
      images: [],
      desc: 'Descrption 1',
      isLiked: true,
      postDate: 'Oct 6, 2024',
    },
    {
      id: '2',
      userName: 'user1',
      images: [],
      desc: 'Descrption 2',
      isLiked: false,
      postDate: 'Oct 6, 2024',
    },
    {
      id: '3',
      userName: 'user2',
      images: [],
      desc: 'Descrption 1',
      isLiked: false,
      postDate: 'Oct 6, 2024',
    },
    {
      id: '4',
      userName: 'user2',
      images: [],
      desc: 'Descrption 2',
      isLiked: false,
      postDate: 'Oct 6, 2024',
    },
    // 
    {
      id: '5',
      userName: 'user3',
      images: [],
      desc: 'Descrption 1',
      isLiked: false,
      postDate: 'Oct 6, 2024',
    },
    {
      id: '6',
      userName: 'user3',
      images: [],
      desc: 'Descrption 2',
      isLiked: false,
      postDate: 'Oct 6, 2024',
    },
  ],
  addToFeedData: (data) => set((state) => {
    return { feedData: [...state.feedData, ...data] }
  }),
  changeLike: (id) => set((state) => {
    console.log('id', id);
    let updatedData = [...state.feedData]
    const status = !updatedData?.find(el => el?.id === id)?.isLiked
    updatedData = updatedData?.map(el => el?.id === id ? {...el, isLiked: !el?.isLiked} : el)
    console.log('updatedData', updatedData[0]);
    Toast.show(`${status ? 'Liked' : 'Unliked'} successfuly`, Toast.SHORT)
    return { feedData: updatedData }
  }),
  changeFollow: (id) => set((state) => {
    console.log('id', id);
    let updatedData = [...state.feedData]
    const userName = updatedData?.find(el => el?.id === id)?.userName
    updatedData = updatedData?.map(el => el?.userName === userName ? {...el, isFollowing: !el?.isFollowing} : el)
    console.log('updatedData', updatedData[0]);
    return { feedData: updatedData }
  }),
}))

export default useFeedStore;