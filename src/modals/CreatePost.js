//react components
import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { getFont } from '../helpers';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import SelectImageSource from './SelectImageSource';
import MyButton from './MyButton';
import Toast from 'react-native-simple-toast'

const CreatePost = ({ visible, setVisibility, }) => {
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [media, setMedia] = useState({})
  const [showImageSourceModal, setShowImageSourceModal] = useState(false);
  //function : imp function
  const openLibrary = () => {
    let options = {
      title: 'Select Image',
      customButtons: [
        {
          name: 'customOptionKey',
          title: 'Choose Photo from Custom Option',
        },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        // Alert.alert('User cancelled camera picker');
        setShowImageSourceModal(false);
        // dispatch(showToast({ text: 'User cancelled picking image' }));

        Toast.show('User cancelled picking image');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        setShowImageSourceModal(false);
        // dispatch(showToast({ text: 'Camera not available on device' }));
        Toast.show('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        setShowImageSourceModal(false);
        // dispatch(showToast({ text: 'Permission not satisfied' }));
        Toast.show('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        setShowImageSourceModal(false);
        // dispatch(showToast({ text: response.errorMessage }));
        Toast.show(response.errorMessage);
        return;
      }
      console.log('Response = ', response.assets[0]);
      setMedia(response.assets[0]);
      setShowImageSourceModal(false);
    });
  };
  //function : imp function
  const openCamera = () => {
    const options = {
      width: 1080,
      height: 1080,
      cropping: true,
      mediaType: 'photo',
      compressImageQuality: 1,
      compressImageMaxHeight: 1080 / 2,
      compressImageMaxWidth: 1080 / 2,
    };
    launchCamera(options, response => {
      if (response.didCancel) {
        // Alert.alert('User cancelled camera picker');
        setShowImageSourceModal(false);
        dispatch(showToast({ text: 'User cancelled picking image' }));
        // Alert.alert('User cancelled picking image');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        setShowImageSourceModal(false);
        dispatch(showToast({ text: 'Camera not available on device' }));
        // Alert.alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        setShowImageSourceModal(false);
        dispatch(showToast({ text: 'Permission not satisfied' }));
        // Alert.alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        setShowImageSourceModal(false);
        dispatch(showToast({ text: response.errorMessage }));
        // Alert.alert(response.errorMessage);
        return;
      }
      console.log('Response = ', response.assets[0]);
      setMedia(response.assets[0]);
      setShowImageSourceModal(false);
    });
  };
  //function : modal function
  const closeModal = () => {
    setVisibility(false);
  };
  //UI
  return (
    <Modal
      visible={visible}
      onRequestClose={closeModal}
      animationType="fade"
      onShow={() => {
        setTitle('')
        setDesc('')
        setMedia({})
      }}
      transparent>
      <View style={styles.container}>
        <TouchableOpacity style={styles.blurView} onPress={closeModal} />
        <View style={styles.mainView}>
          <TextInput
            value={title}
            onChangeText={(t) => setTitle(t)}
            placeholder='Enter Title'
            placeholderTextColor='grey'
            style={styles.input}
          />
          <TextInput
            value={desc}
            onChangeText={(t) => setDesc(t)}
            placeholder='Enter Description'
            placeholderTextColor='grey'
            style={styles.input}
          />
          <MyButton title='Add Media' onPress={() => setShowImageSourceModal(true)} />
        </View>
      </View>
      <SelectImageSource
        visible={showImageSourceModal}
        setVisibility={setShowImageSourceModal}
        openLibrary={openLibrary}
        openCamera={openCamera}
      />
    </Modal>
  );
};
export default CreatePost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.15)',
  },
  blurView: {
    flex: 1,
  },
  mainView: {
    padding: 20,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
  },
  input: {
    height: 40,
    backgroundColor: 'white',
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 1,
    color: 'black',
    fontSize: 18,
    fontFamily: getFont('R'),
    marginBottom: 10,
    paddingLeft: 10
  }
})
