import { FlatList, StyleSheet, Text, View, useWindowDimensions, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Header from '../components/Header'
import useFollowingStore from '../store/followingStore'
import { currentUser as user, getFont, currentUser } from '../helpers'
import useFeedStore from '../store/feedStore'
import { ImageSlider } from '@pembajak/react-native-image-slider-banner';
import MyButton from '../modals/MyButton'
import Recording from '../components/Recording'
import { ScreenNames } from '../global/Index'
import { AntDesign, Feather } from '../global/MyIcon'
import Video from 'react-native-video';

const Profile = ({ navigation, route }) => {
  const { user } = route?.params
  const { followingData } = useFollowingStore()
  const { feedData, changePlayPause } = useFeedStore()
  const { width, height } = useWindowDimensions()
  const [showModal, setShowModal] = useState(false)
  const [showRecordingComponent, setShowRecordingComponent] = useState(false)

  const gotoCreatePost = () => { navigation.navigate(ScreenNames.CREATE_POST, {user}) }
  const getNumFollowers = () => {
    const restOfUsers = Object.keys(followingData)?.filter(el => el !== user)
    let count = 0
    restOfUsers?.forEach(el => {
      if (followingData[el]?.includes(user)) {
        count++
      }
    });
    return count
  }
  const togglePlayPause = (id) => {
    changePlayPause(id)
  }
  const renderItem = ({ item, index }) => {
    return (
      <View style={[styles.item, { width: (width - 40) }]}>
        {item?.video ?
          <View style={styles.video}>
            <Video source={{ uri: item?.video }} paused={!item?.isPlaying} onEnd={() => togglePlayPause(item?.id)} style={styles.video} />
            <TouchableOpacity onPress={() => togglePlayPause(item?.id)} style={styles.controlButton}>
              {item?.isPlaying ?
                <AntDesign name='pause' color='red' size={20} />
                :
                <Feather name='play' color='red' size={20} />
              }
            </TouchableOpacity>
          </View>
          :
          <ImageSlider
            data={item?.images?.map(el => ({ img: el }))}
            autoPlay={true}
            // onItemChanged={(item) => console.log("item", item)}
            closeIconColor="#fff"
            caroselImageContainerStyle={{ width: (width - 40), height: (width - 40) }}
          />
        }
      </View>
    )
  }
  const ListHeaderComponent = () => (
    <View style={{ marginBottom: 20 }}>
      <Header screenname='Profile Screen' user={user} canClick={false} />
      <Text style={styles.text}>Followers {getNumFollowers()}</Text>
      <Text style={styles.text}>Following {followingData[user]?.length}</Text>
      <MyButton title='Create Post' onPress={gotoCreatePost} style={{ marginTop: 10 }} />
      {user !== currentUser ?
        <Text style={styles.option}>Create Post button is optionally available for non-logged in user so that if you want to experiment</Text>
        : null}
      {showRecordingComponent ?
        <Recording />
        : null}
    </View>
  )
  return (
    <FlatList
      data={feedData?.filter(el => el?.userName == user)}
      // numColumns={3}
      contentContainerStyle={styles.container}
      // renderItem={({ item }) => <Item item={item} />}
      renderItem={renderItem}
      keyExtractor={(item, index) => index}
      ListHeaderComponent={ListHeaderComponent}
    // ListFooterComponent={showModal ? <CreatePost visible={showModal} setVisibility={setShowModal} /> : null}
    />
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    // flex: 1,
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
  video: {
    height: 260,
    width: '92%',
  },
  controlButton: {
    position: 'absolute',
    left: '46%',
    bottom: 20
  },
  option: {
    fontSize: 20,
    color: 'red',
    fontFamily: getFont('R')
  },
})