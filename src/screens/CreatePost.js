import React, { useEffect, useState } from 'react'
import { View, Text, Modal, TouchableOpacity, StyleSheet, TextInput, ScrollView, useWindowDimensions } from 'react-native';
import { currentUser, getFont, getFormattedCurrentDate, isImage } from '../helpers';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Toast from 'react-native-simple-toast'
import SelectImageSource from '../modals/SelectImageSource';
import MyButton from '../modals/MyButton';
import { AntDesign, Feather, Fontisto } from '../global/MyIcon';
import useFeedStore from '../store/feedStore';
import Header from '../components/Header'
import Recording from '../components/Recording'
import Video from 'react-native-video';
import { ImageSlider } from '@pembajak/react-native-image-slider-banner';

export default function CreatePost({ navigation, route }) {
  const { user } = route?.params
  const { width, height } = useWindowDimensions()
  const { addToFeedData } = useFeedStore()
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [media, setMedia] = useState(null)
  const [showImageSourceModal, setShowImageSourceModal] = useState(false);
  const [videoModeSelected, setVideoModeSelected] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  useEffect(() => {
    console.log('media changed', typeof media, media);
  }, [media])
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
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };
  //function : imp function
  const openCamera = () => {
    setShowCamera(true)
    setShowImageSourceModal(false)
  };
  const validation = () => {
    if (title?.trim()?.length === 0) {
      Toast.show('Please enter Title')
      return false
    } else if (desc?.trim()?.length === 0) {
      Toast.show('Please enter Description')
      return false
    } else if (!(typeof media == 'string' || (Array.isArray(media) && media?.length > 0))) {
      Toast.show('Please select media')
      return false
    }
    return true
  }
  const onSubmit = () => {
    if (!validation()) {
      return
    }
    console.log('seleted media', media);
    // return
    const isTypeImage = typeof media !== 'string'
    const uploads = {}
    if (isTypeImage) {
      uploads.images = media?.map(el => el?.uri)
    } else {
      uploads.video = media
    }
    addToFeedData({
      // id: '6',
      // userName: currentUser,
      userName: user,
      // images: media?.map(el => el?.uri),
      ...uploads,
      desc: desc,
      title: title,
      isLiked: false,
      isPlaying: false,
      postDate: getFormattedCurrentDate(),
    },)
    Toast.show('Media uploaded sucessfully')
    navigation.goBack()
  }
  return (
    <View style={styles.container}>
      <ScrollView>
        <Header screenname='Create Post' />
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
        {/* <View style={styles.row}>
          <TouchableOpacity onPress={() => setVideoModeSelected(!videoModeSelected)} >
            <Fontisto name={videoModeSelected ? 'checkbox-active' : 'checkbox-passive'} color='black' size={20} />
          </TouchableOpacity>
          <Text style={[styles.text, { marginLeft: 5 }]}>Select video from camera</Text>
        </View> */}
        <MyButton title='Add Media' onPress={() => setShowImageSourceModal(true)} style={styles.addMedia} textStyle={{ color: 'black' }} />
        <MyButton title='Submit' onPress={onSubmit} style={{ marginTop: 10 }} />
        {showCamera && typeof media !== 'string' ?
          <Recording setVideoPath={setMedia} />
          : null}
        {typeof media === 'string' ?
          <View style={styles.video}>
            <Video source={{ uri: media }} paused={!isPlaying} onEnd={togglePlayPause} style={styles.video} />
            <TouchableOpacity onPress={togglePlayPause} style={styles.controlButton}>
              {isPlaying ?
                <AntDesign name='pause' color='red' size={20} />
                :
                <Feather name='play' color='red' size={20} />
              }
            </TouchableOpacity>
          </View>
          :
          Array.isArray(media) ?
            <ImageSlider
              data={media?.map(el => el?.uri)?.map(el => ({ img: el }))}
              autoPlay={true}
              // onItemChanged={(item) => console.log("item", item)}
              closeIconColor="#fff"
              caroselImageContainerStyle={{ width: (width - 40), height: (width - 40) }}
            />
            : null}
      </ScrollView>
      <SelectImageSource
        visible={showImageSourceModal}
        setVisibility={setShowImageSourceModal}
        openLibrary={openLibrary}
        openCamera={openCamera}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
    ,
    padding: 20
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
  video: {
    height: 260,
    width: '92%',
  },
  controlButton: {
    position: 'absolute',
    left: '46%',
    bottom: 20
  },
})