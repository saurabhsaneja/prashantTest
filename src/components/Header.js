import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { getFont, getUserImage } from '../helpers'
import { useNavigation } from '@react-navigation/native';
import { ScreenNames } from '../global/Index';

const Header = ({ screenname, canClick = true }) => {
  const navigation = useNavigation()
  const gotoProfile = () => navigation.navigate(ScreenNames.PROFILE)
  return (
    <>
      <Text style={[styles.username, { textAlign: 'center', fontSize: 24 }]}>{screenname}</Text>
      <TouchableOpacity disabled={!canClick} onPress={gotoProfile} style={styles.topRow}>
        <Image source={{ uri: getUserImage('user1') }} style={styles.avatar} />
        <Text style={[styles.username, { marginLeft: 5 }]}>user1</Text>
      </TouchableOpacity>
    </>
  )
}

export default Header

const styles = StyleSheet.create({
  topRow: {
    paddingVertical: 20,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
  },
  username: {
    fontSize: 20,
    color: 'black',
    fontFamily: getFont('M')
  },
  avatar: {
    width: 30,
    height: 30,
    // borderRadius: 30 / 2,
  },
})