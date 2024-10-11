import { Alert, FlatList, Image, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native'
import React, { useState } from 'react'
import { currentUser, getFont, getUserImage } from '../helpers'
import { AntDesign } from '../global/MyIcon'
import useFeedStore from '../store/feedStore'
import Header from '../components/Header'
import useFollowingStore from '../store/followingStore'
import { ImageSlider } from '@pembajak/react-native-image-slider-banner';
import { ScreenNames } from '../global/Index'

const Feed = ({ navigation }) => {
  const { width, height } = useWindowDimensions()
  const { feedData, changeLike } = useFeedStore()
  const { followingData, updateFollowing } = useFollowingStore()
  const [imgStyle] = useState({ width: width * 0.8, height: width * 0.8 })

  const gotoProfile = (userName) => navigation.navigate(ScreenNames.PROFILE, { user: userName })
  // console.log('feedData', feedData);
  const unFollow = (user) => {
    Alert.alert('Unfollow', 'Are you sure you want to unfollow?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK', onPress: () => {
          console.log('OK Pressed')
          updateFollowing({ [currentUser]: { [user]: true } })
        }
      }
    ]
    )
  }
  const Item = ({ item }) => {
    // console.log('item', item?.images);
    return (
      <View style={styles.item}>
        <View style={styles.topRow}>
          <TouchableOpacity onPress={() => gotoProfile(item?.userName)} style={styles.topLeftRow}>
            <Image source={{ uri: getUserImage(item?.userName) }} style={styles.avatar} />
            <Text style={[styles.username, { marginLeft: 5 }]}>{item.userName}</Text>
            <Text style={[styles.date, { marginLeft: 5 }]}>{item.postDate}</Text>
          </TouchableOpacity>
          <View style={styles.topLeftRow}>
            <TouchableOpacity onPress={() => changeLike(item?.id)} style={{ marginRight: 5 }} >
              <AntDesign name={item.isLiked ? 'heart' : 'hearto'} color='black' size={20} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => unFollow(item?.userName)} >
              <AntDesign name='check' color='black' size={20} />
            </TouchableOpacity>
          </View>
        </View>
        <ImageSlider
          data={item?.images?.map(el => ({ img: el }))}
          autoPlay={true}
          // onItemChanged={(item) => console.log("item", item)}
          closeIconColor="#fff"
        />
        <Text style={styles.date}>{item.title}</Text>
        <Text style={styles.date}>{item.desc}</Text>
      </View>
    )
  }
  const getUpdatedFeedData = () => {
    // console.log('followingData[currentUser]', followingData[currentUser]);
    const updated = feedData?.filter(el => el?.userName !== currentUser)?.filter(el => followingData[currentUser]?.includes(el?.userName))
    // console.log('updated', updated);
    return updated
  }
  return (
    <FlatList
      // data={feedData?.filter(el => el?.userName !== currentUser)?.filter(el => el?.isFollowing)}
      data={getUpdatedFeedData()}
      contentContainerStyle={styles.container}
      renderItem={({ item }) => <Item item={item} />}
      keyExtractor={(item, index) => index}
      ListHeaderComponent={<Header screenname='Feed Screen' />}
    />
  )
}

export default Feed

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  item: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  topLeftRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  topRightRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  username: {
    fontSize: 20,
    color: 'black',
    fontFamily: getFont('M')
  },
  date: {
    fontSize: 20,
    color: 'grey',
    fontFamily: getFont('M')
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
  },
  slide1: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#9DD6EB'
  },
})