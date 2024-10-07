import { FlatList, StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React, { useState } from 'react'
import Header from '../components/Header'
import useFollowingStore from '../store/followingStore'
import { currentUser, getFont } from '../helpers'
import useFeedStore from '../store/feedStore'
import { ImageSlider } from '@pembajak/react-native-image-slider-banner';
import MyButton from '../modals/MyButton'
import CreatePost from '../modals/CreatePost'

const Profile = ({ navigation }) => {
  const { followingData } = useFollowingStore()
  const { feedData } = useFeedStore()
  const { width, height } = useWindowDimensions()
  const [showModal, setShowModal] = useState(false)

  const openModal = () => {
    setShowModal(true)
  }
  const getNumFollowers = () => {
    const restOfUsers = Object.keys(followingData)?.filter(el => el !== currentUser)
    let count = 0
    restOfUsers?.forEach(el => {
      if (followingData[el]?.includes(currentUser)) {
        count++
      }
    });
    return count
  }
  const renderItem = ({ item, index }) => {
    return (
      <View style={[styles.item, { width: (width - 40 - 40) / 3 }, index % 3 === 0 ? { marginRight: 20 } : null, index % 3 === 2 ? { marginLeft: 20 } : null]}>
        <ImageSlider
          data={item?.images?.map(el => ({ img: el }))}
          autoPlay={true}
          // onItemChanged={(item) => console.log("item", item)}
          closeIconColor="#fff"
          caroselImageContainerStyle={{ width: (width - 40 - 40) / 3, height: (width - 40 - 40) / 3 }}
        />
      </View>
    )
  }
  const ListHeaderComponent = () => (
    <View style={{ marginBottom: 20 }}>
      <Header />
      <Text style={styles.text}>Followers {getNumFollowers()}</Text>
      <Text style={styles.text}>Following {followingData[currentUser]?.length}</Text>
      <MyButton title='Create Post' onPress={openModal} style={{ marginTop: 10 }} />
    </View>
  )
  return (
    <FlatList
      data={feedData?.filter(el => el?.userName == currentUser)}
      numColumns={3}
      contentContainerStyle={styles.container}
      // renderItem={({ item }) => <Item item={item} />}
      renderItem={renderItem}
      keyExtractor={(item, index) => index}
      ListHeaderComponent={ListHeaderComponent}
      ListFooterComponent={showModal ? <CreatePost visible={showModal} setVisibility={setShowModal} /> : null}
    />
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white'
  },
  text: {
    fontSize: 20,
    color: 'black',
    fontFamily: getFont('R')
  },
  item: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
})