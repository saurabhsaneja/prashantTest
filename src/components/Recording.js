import React, { useEffect, useRef, useState } from 'react';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getFont } from '../helpers';
import Video from 'react-native-video';
import { AntDesign, Feather } from '../global/MyIcon';

const CameraComponent = () => {
  const camera = useRef(null);
  const [cameraPermission, setCameraPermission] = useState(null);
  const [microphonePermission, setMicrophonePermission] = useState(null);
  const [videoPath, setVideoPath] = useState();
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const devices = useCameraDevices();
  const backCamera = devices?.find(device => device.position === 'back');

  // Check for permissions on mount
  useEffect(() => {
    const checkPermissions = async () => {
      const cameraStatus = await Camera.getCameraPermissionStatus();
      const microphoneStatus = await Camera.getMicrophonePermissionStatus();

      setCameraPermission(cameraStatus === 'authorized' || cameraStatus === 'granted');
      setMicrophonePermission(microphoneStatus === 'authorized' || microphoneStatus === 'granted');
    };

    checkPermissions();
  }, []);

  // Request permissions if not granted
  useEffect(() => {
    if (!cameraPermission) {
      Camera.requestCameraPermission();
    }
    if (!microphonePermission) {
      Camera.requestMicrophonePermission();
    }
  }, [cameraPermission, microphonePermission]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  if (!backCamera) {
    return <Text style={styles.text}>Loading camera...</Text>;  // Fallback UI while loading camera
  }

  const handleRecordVideo = async () => {
    try {
      camera.current.startRecording({
        // flash: 'on',
        flash: backCamera.hasFlash ? 'on' : '˝',
        onRecordingFinished: video => setVideoPath(video.path),
        onRecordingError: error => console.error(error),
      });
      setIsRecording(true)
    } catch (e) {
      console.log(e);
    }
  };

  const handleStopVideo = async () => {
    try {
      await camera.current.stopRecording();
      setIsRecording(false)
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container} >
      <Camera
        ref={camera}
        style={[styles.camera, styles.photoAndVideoCamera]}
        device={backCamera}
        isActive={true}
        video={true}
        audio={true}
      />
      <View style={styles.btnGroup}>
        <TouchableOpacity disabled={isRecording} style={[styles.btn, isRecording ? { backgroundColor: 'grey' } : null]} onPress={handleRecordVideo}>
          <Text style={styles.btnText}>Record Video</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ ...styles.btn }} onPress={handleStopVideo}>
          <Text style={styles.btnText}>Stop Video</Text>
        </TouchableOpacity>
      </View>
      {videoPath && (
        <View style={styles.video}>
          <Video source={{ uri: videoPath }} paused={!isPlaying} onEnd={togglePlayPause} style={styles.video} />
          <TouchableOpacity onPress={togglePlayPause} style={styles.controlButton}>
            {isPlaying ?
              <AntDesign name='pause' color='red' size={20} />
              :
              <Feather name='play' color='red' size={20} />
            }
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

export default CameraComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  text: {
    fontsize: 20,
    color: 'black',
    fontFamily: getFont('R')
  },
  camera: {
    height: 460,
    width: '92%',
    alignSelf: 'center',
  },
  photoAndVideoCamera: {
    height: 360,
  },
  btnGroup: {
    margin: 16,
    flexDirection: 'row',
    alignItems: 'center'
  },
  btn: {
    backgroundColor: '#63995f',
    margin: 13,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 8,
  },
  btnText: {
    color: '#ffffff',
    fontSize: 20,
    textAlign: 'center',
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