import { Alert, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { getFont, getUserImage } from '../helpers'
import { AntDesign } from '../global/MyIcon'
import useFeedStore from '../store/feedStore'

const Feed = () => {
  const { feedData, changeLike, changeFollow } = useFeedStore()
  console.log('feedData', feedData);
  const Item = ({ item }) => {
    const unFollow = (id) => {
      Alert.alert('Unfollow', 'Are you sure you want to unfollow?', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK', onPress: () => {
            console.log('OK Pressed')
            changeFollow(id)
          }
        }
      ]
      )
    }
    console.log('item', item);
    return (
      <View style={styles.item}>
        <Text style={styles.username}>{item.userName}</Text>
        <Text style={styles.username}>{item.postDate}</Text>
        <TouchableOpacity onPress={() => changeLike(item?.id)} >
          <AntDesign name={item.isLiked ? 'heart' : 'hearto'} color='black' size={20} />
        </TouchableOpacity>
        <Image source={{ uri: getUserImage(item?.userName) }} style={styles.avatar} />
        <TouchableOpacity onPress={() => unFollow(item?.id)} >
          <AntDesign name='check' color='black' size={20} />
        </TouchableOpacity>
      </View>
    )
  }
  return (
    <FlatList
      data={feedData?.filter(el => el?.userName !== 'user1')?.filter(el => el?.isFollowing)}
      contentContainerStyle={styles.container}
      renderItem={({ item }) => <Item item={item} />}
      keyExtractor={(item, index) => index}
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
  username: {
    fontSize: 20,
    color: 'black',
    fontFamily: getFont('M')
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
  }
})