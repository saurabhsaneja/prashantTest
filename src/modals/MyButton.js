import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { getFont } from '../helpers'

const MyButton = ({ title, onPress, style, textStyle }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]} >
      <Text style={[styles.title, textStyle]}>{title}</Text>
    </TouchableOpacity>
  )
}

export default MyButton

const styles = StyleSheet.create({
  button: {
    width: '100%',
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: "center"
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontFamily: getFont('R')
  }
})