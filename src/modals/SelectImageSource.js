import React, { useRef, useState } from 'react';
import { View, Text, Modal, TouchableOpacity, TextInput, Keyboard, StyleSheet } from 'react-native';
import { getFont } from '../helpers';
import { MyIcon } from '../global/Index';

const SelectImageSource = ({ visible, setVisibility, openLibrary, openCamera }) => {
  //function : modal function
  const closeModal = () => {
    setVisibility(false);
  };

  return (
    <Modal
      visible={visible}
      onRequestClose={closeModal}
      animationType="fade"
      transparent
    >
      <View
        style={{
          position: 'absolute',
          height: '100%',
          width: '100%',
          zIndex: 100,
          backgroundColor: 'rgba(0,0,0,0.15)',
        }}>
        <TouchableOpacity onPress={closeModal} style={{ flex: 1 }} />
        <View
          style={{
            backgroundColor: 'white',
            padding: 20,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 10,
            }}>
            <Text style={styles.choose}>Choose From</Text>
            {/* <MyText
              text={'Choose from '}
              fontFamily="medium"
              textAlign="center"
              fontSize={18}
            /> */}
            <TouchableOpacity
              onPress={closeModal}
              hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}>
              <MyIcon.AntDesign name="closecircleo" size={24} />
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              marginVertical: 20,
            }}>
            <OptionButton
              IconName={'camerao'}
              Title="Camera"
              onPress={openCamera}
            />
            <OptionButton
              IconName={'picture'}
              Title="Gallery"
              onPress={openLibrary}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default SelectImageSource;

const OptionButton = ({ IconName, Title, onPress = () => { } }) => {
  return (
    <TouchableOpacity onPress={onPress} style={{ alignItems: 'center' }}>
      <View
        style={{ backgroundColor: 'pink', padding: 10, borderRadius: 100 }}>
        <MyIcon.AntDesign name={IconName} size={30} />
      </View>
      <Text style={styles.title}>{Title}</Text>
      {/* <MyText text={Title} fontFamily="medium" marginVertical={10} /> */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  choose: {
    fontSize: 18,
    fontFamily: getFont('M'),
    textAlign: 'center',
    color: 'black'
  },
  title: {
    fontSize: 18,
    fontFamily: getFont('M'),
    // textAlign: 'center',
    marginVertical: 10,
    color: 'black'
  }
})