import React from 'react';
import { RNCamera } from 'react-native-camera';
import { Overlay } from 'react-native-elements';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Slider,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';

const flashModeOrder = {
  off: 'on',
  on: 'auto',
  auto: 'torch',
  torch: 'off',
};

const wbOrder = {
  auto: 'sunny',
  sunny: 'cloudy',
  cloudy: 'shadow',
  shadow: 'fluorescent',
  fluorescent: 'incandescent',
  incandescent: 'auto',
};

const landmarkSize = 2;

export default class CameraScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      flash: 'on',
      zoom: 0,
      autoFocus: 'on',
      autoFocusPoint: {
        normalized: { x: 0.5, y: 0.5 }, // normalized values required for autoFocusPointOfInterest
        drawRectPosition: {
          x: Dimensions.get('window').width * 0.5 - 32,
          y: Dimensions.get('window').height * 0.5 - 32,
        },
      },
      overlay: false,
      depth: 0,
      type: 'back',
      whiteBalance: 'auto',
      ratio: '16:9',
      canDetectText: true,
      textBlocks: [],
    };
  }

  toggleFacing() {
    this.setState({
      type: this.state.type === 'back' ? 'front' : 'back',
    });
  }

  toggleFlash() {
    this.setState({
      flash: flashModeOrder[this.state.flash],
    });
  }

  toggleWB() {
    this.setState({
      whiteBalance: wbOrder[this.state.whiteBalance],
    });
  }

  toggleFocus() {
    this.setState({
      autoFocus: this.state.autoFocus === 'on' ? 'off' : 'on',
    });
  }

  touchToFocus(event) {
    const { pageX, pageY } = event.nativeEvent;
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;
    const isPortrait = screenHeight > screenWidth;

    let x = pageX / screenWidth;
    let y = pageY / screenHeight;
    // Coordinate transform for portrait. See autoFocusPointOfInterest in docs for more info
    if (isPortrait) {
      x = pageY / screenHeight;
      y = -(pageX / screenWidth) + 1;
    }

    this.setState({
      autoFocusPoint: {
        normalized: { x, y },
        drawRectPosition: { x: pageX, y: pageY },
      },
    });
  }

  zoomOut() {
    this.setState({
      zoom: this.state.zoom - 0.1 < 0 ? 0 : this.state.zoom - 0.1,
    });
  }

  zoomIn() {
    this.setState({
      zoom: this.state.zoom + 0.1 > 1 ? 1 : this.state.zoom + 0.1,
    });
  }

  setFocusDepth(depth) {
    this.setState({
      depth,
    });
  }

  takePicture = async function() {
    if (this.camera) {
      //Camera options for quality
      const options = {
        quality: 0.8,
        base64: true,
        skipProcessing: true,
      };

      // Take the picture
      try {
        const { uri } = await this.camera.takePictureAsync(options);

        if (this.state.textBlocks.length > 0) {
          this.props.navigation.navigate('ReviewPage', {items: this.state.textBlocks});
        }
        else {
          //TODO: overlay asking for new takePicture
          this.setState({ overlay: true })
        }

      } catch (e) {
        console.warn(e);
      }


      //TODO: remove me, old tesseract code
      // console.warn('Data Path', data.uri);
      // //TODO call tesseract here to deciper image
      // const tessOptions = {
      //   whitelist: null,
      //   blacklist: '1234567890\'!"#$%&/()={}[]+*-_:;<>'
      // };
      // RNTesseractOcr.recognize(data.uri.replace('file://',''),'LANG_ENGLISH', tessOptions)
      // .then((result) => {
      //     console.log("I'm Done");
      //     this.setState({ ocrResult: result });
      //     console.log("OCR Result: ", result);
      //   })
      //   .catch((err) => {
      //     console.log("OCR Error: ", err);
      //   })
      //   .done();
    }
  };

  toggle = value => () => this.setState(prevState => ({ [value]: !prevState[value] }));

  textRecognized = object => {
    const { textBlocks } = object;
    this.setState({ textBlocks });
  };

  renderCamera() {
    const {canDetectText} = this.state;

    const drawFocusRingPosition = {
      top: this.state.autoFocusPoint.drawRectPosition.y - 32,
      left: this.state.autoFocusPoint.drawRectPosition.x - 32,
    };
    return (
      <RNCamera
        ref={ref => {
          this.camera = ref;
        }}
        style={{
          flex: 1,
          justifyContent: 'space-between',
        }}
        type={this.state.type}
        flashMode={this.state.flash}
        autoFocus={this.state.autoFocus}
        autoFocusPointOfInterest={this.state.autoFocusPoint.normalized}
        zoom={this.state.zoom}
        whiteBalance={this.state.whiteBalance}
        ratio={this.state.ratio}
        focusDepth={this.state.depth}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        onTextRecognized={canDetectText ? this.textRecognized : null}
      >
        <View style={StyleSheet.absoluteFill}>
          <View style={[styles.autoFocusBox, drawFocusRingPosition]} />
          <TouchableWithoutFeedback onPress={this.touchToFocus.bind(this)}>
            <View style={{ flex: 1 }} />
          </TouchableWithoutFeedback>
        </View>
        <View
          style={{
            flex: 0.5,
            height: 72,
            backgroundColor: 'transparent',
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}
        >
          <View
            style={{
              backgroundColor: 'transparent',
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}
          >
            <TouchableOpacity style={styles.flipButton} onPress={this.toggleFlash.bind(this)}>
              <Text style={styles.flipText}> FLASH: {this.state.flash} </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ bottom: 0 }}>
          <View
            style={{
              height: 20,
              backgroundColor: 'transparent',
              flexDirection: 'row',
              alignSelf: 'flex-end',
            }}
          >
            <Slider
              style={{ width: 150, marginTop: 15, alignSelf: 'flex-end' }}
              onValueChange={this.setFocusDepth.bind(this)}
              step={0.1}
              disabled={this.state.autoFocus === 'on'}
            />
          </View>
          {this.state.zoom !== 0 && (
            <Text style={[styles.flipText, styles.zoomText]}>Zoom: {this.state.zoom}</Text>
          )}
          <View
            style={{
              height: 56,
              backgroundColor: 'transparent',
              flexDirection: 'row',
              alignSelf: 'flex-end',
            }}
          >
            <TouchableOpacity
              style={[styles.flipButton, { flex: 0.1, alignSelf: 'flex-end' }]}
              onPress={this.zoomIn.bind(this)}
            >
              <Text style={styles.flipText}> + </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.flipButton, { flex: 0.1, alignSelf: 'flex-end' }]}
              onPress={this.zoomOut.bind(this)}
            >
              <Text style={styles.flipText}> - </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.flipButton, { flex: 0.25, alignSelf: 'flex-end' }]}
              onPress={this.toggleFocus.bind(this)}
            >
              <Text style={styles.flipText}> AF : {this.state.autoFocus} </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.flipButton, styles.picButton, { flex: 0.3, alignSelf: 'flex-end' }]}
              onPress={this.takePicture.bind(this)}
            >
              <Text style={styles.flipText}> SNAP </Text>
            </TouchableOpacity>
          </View>
          <Overlay isVisible={this.state.overlay} onBackdropPress={() => this.setState({ overlay: false })}>
            <Text>Invalid Reciept, please try again.</Text>
          </Overlay>
        </View>
      </RNCamera>

    );
  }

  render() {
    return <View style={styles.container}>{this.renderCamera()}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: '#000',
  },
  flipButton: {
    flex: 0.3,
    height: 40,
    marginHorizontal: 2,
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 8,
    borderColor: 'white',
    borderWidth: 1,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  autoFocusBox: {
    position: 'absolute',
    height: 64,
    width: 64,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'white',
    opacity: 0.4,
  },
  flipText: {
    color: 'white',
    fontSize: 15,
  },
  zoomText: {
    position: 'absolute',
    bottom: 70,
    zIndex: 2,
    left: 2,
  },
  picButton: {
    backgroundColor: 'darkseagreen',
  },
  facesContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    top: 0,
  },
  face: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 2,
    position: 'absolute',
    borderColor: '#FFD700',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  landmark: {
    width: landmarkSize,
    height: landmarkSize,
    position: 'absolute',
    backgroundColor: 'red',
  },
  faceText: {
    color: '#FFD700',
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
    backgroundColor: 'transparent',
  },
  text: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 2,
    position: 'absolute',
    borderColor: '#F00',
    justifyContent: 'center',
  },
  textBlock: {
    color: '#F00',
    position: 'absolute',
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
});
