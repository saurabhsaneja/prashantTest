import { create } from 'zustand'
import Toast from 'react-native-simple-toast'

const images = [
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5a5uCP-n4teeW2SApcIqUrcQApev8ZVCJkA&usqp=CAU',
  'https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg',
  'https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg',
]

const useFeedStore = create((set) => ({
  feedData: [
    {
      id: '1',
      userName: 'user1',
      images,
      desc: 'Descrption 1',
      title: 'Title 1',
      isLiked: true,
      postDate: 'Oct 6, 2024',
    },
    {
      id: '2',
      userName: 'user1',
      images,
      desc: 'Descrption 2',
      title: 'Title 2',
      isLiked: false,
      postDate: 'Oct 6, 2024',
    },
    {
      id: '3',
      userName: 'user1',
      images,
      desc: 'Descrption 3',
      title: 'Title 3',
      isLiked: false,
      postDate: 'Oct 6, 2024',
    },
    {
      id: '3',
      userName: 'user2',
      images,
      desc: 'Descrption 1',
      title: 'Title 1',
      isLiked: false,
      postDate: 'Oct 6, 2024',
    },
    {
      id: '4',
      userName: 'user2',
      images,
      desc: 'Descrption 2',
      title: 'Title 2',
      isLiked: false,
      postDate: 'Oct 6, 2024',
    },
    // 
    {
      id: '5',
      userName: 'user3',
      images,
      desc: 'Descrption 1',
      title: 'Title 1',
      isLiked: false,
      postDate: 'Oct 6, 2024',
    },
    {
      id: '6',
      userName: 'user3',
      images,
      desc: 'Descrption 2',
      title: 'Title 2',
      isLiked: false,
      postDate: 'Oct 6, 2024',
    },
  ],
  addToFeedData: (data) => set((state) => {
    console.log('addToFeedData', data);
    let updatedData = [...state.feedData]
    const maxId = Math.max(...updatedData?.map(el => Number(el?.id)))
    const dataCopy = { ...data, id: String(maxId + 1) }
    console.log('add to', dataCopy);
    return { feedData: [...state.feedData, dataCopy] }
  }),
  changePlayPause: (id) => set((state) => {
    let updatedData = [...state.feedData]
    // stop previously playing video
    updatedData = updatedData?.map(el => ({ ...el, isPlaying: false }))
    updatedData = updatedData?.map(el => el?.id === id ? { ...el, isPlaying: !el?.isPlaying } : el)
    return { feedData: updatedData }
  }),
  changeLike: (id) => set((state) => {
    console.log('id', id);
    let updatedData = [...state.feedData]
    updatedData = updatedData?.map(el => el?.id === id ? { ...el, isLiked: !el?.isLiked } : el)
    console.log('updatedData', updatedData[0]);
    Toast.show(`${status ? 'Liked' : 'Unliked'} successfuly`, Toast.SHORT)
    return { feedData: updatedData }
  }),
  changeFollow: (id) => set((state) => {
    console.log('id', id);
    let updatedData = [...state.feedData]
    const userName = updatedData?.find(el => el?.id === id)?.userName
    updatedData = updatedData?.map(el => el?.userName === userName ? { ...el, isFollowing: !el?.isFollowing } : el)
    console.log('updatedData', updatedData[0]);
    return { feedData: updatedData }
  }),
}))

export default useFeedStore;