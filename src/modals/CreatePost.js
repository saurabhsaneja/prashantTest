//react components
import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { currentUser, getFont, getFormattedCurrentDate, isImage } from '../helpers';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import SelectImageSource from './SelectImageSource';
import MyButton from './MyButton';
import Toast from 'react-native-simple-toast'
import { Fontisto } from '../global/MyIcon';
import useFeedStore from '../store/feedStore';

const CreatePost = ({ visible, setVisibility, }) => {
  const { addToFeedData } = useFeedStore()
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [media, setMedia] = useState([])
  const [showImageSourceModal, setShowImageSourceModal] = useState(false);
  const [videoModeSelected, setVideoModeSelected] = useState(false);
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
      selectionLimit: 0,
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
      console.log('Response = ', response.assets);
      setMedia(response.assets);
      setShowImageSourceModal(false);
    });
  };
  //function : imp function
  const openCamera = () => {
    const options = {
      width: 1080,
      height: 1080,
      cropping: true,
      mediaType: videoModeSelected ? 'video' : 'photo',
      // mediaType: 'video',
      compressImageQuality: 1,
      compressImageMaxHeight: 1080 / 2,
      compressImageMaxWidth: 1080 / 2,
    };
    launchCamera(options, response => {
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
      console.log('Response = ', response.assets);
      setMedia(response.assets);
      setShowImageSourceModal(false);
    });
  };
  const validation = () => {
    if (title?.trim()?.length === 0) {
      Toast.show('Please enter Title')
      return false
    } else if (desc?.trim()?.length === 0) {
      Toast.show('Please enter Description')
      return false
    } else if (media?.length === 0) {
      Toast.show('Please select media')
      return false
    }
    return true
  }
  const onSubmit = () => {
    if (!validation()) {
      return
    }
    console.log('seleted images', media?.map(el => ({ img: el?.uri })));
    // return
    const isTypeImage = isImage(media[0]?.type)
    const uploads = {}
    if (isTypeImage) {
      uploads.images = media?.map(el => el?.uri)
    } else {
      uploads.video = media?.map(el => el?.uri)
    }
    addToFeedData({
      // id: '6',
      userName: currentUser,
      // images: media?.map(el => el?.uri),
      ...uploads,
      desc: desc,
      title: title,
      isLiked: false,
      postDate: getFormattedCurrentDate(),
    },)
    closeModal()
    Toast.show('Media uploaded sucessfully')
  }
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
        setMedia([])
      }}
      transparent>
      <View style={styles.container}>
        <TouchableOpacity style={styles.blurView} onPress={closeModal} />
        <View style={styles.mainView}>
          <Text style={styles.create}>Create Post</Text>
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
          <View style={styles.row}>
            <TouchableOpacity onPress={() => setVideoModeSelected(!videoModeSelected)} >
              <Fontisto name={videoModeSelected ? 'checkbox-active' : 'checkbox-passive'} color='black' size={20} />
            </TouchableOpacity>
            <Text style={[styles.text, { marginLeft: 5 }]}>Select video from camera</Text>
          </View>
          <MyButton title='Add Media' onPress={() => setShowImageSourceModal(true)} style={styles.addMedia} textStyle={{ color: 'black' }} />
          <MyButton title='Submit' onPress={onSubmit} style={{ marginTop: 10 }} />
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
    height: 50,
    backgroundColor: 'white',
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 1,
    color: 'black',
    fontSize: 18,
    fontFamily: getFont('R'),
    marginBottom: 10,
    paddingLeft: 10
  },
  text: {
    fontSize: 20,
    color: 'black',
    fontFamily: getFont('R')
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  create: {
    fontSize: 20,
    color: 'black',
    fontFamily: getFont('M'),
    textAlign: 'center',
    marginBottom: 10
  },
  addMedia: {
    backgroundColor: 'white',
    borderColor: 'grey',
    borderWidth: 1,
    marginTop: 10
  },
})
