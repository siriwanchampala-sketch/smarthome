import React, { useState, useEffect } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';

export default function App() {
  const [light, setLight] = useState(false);
  const [torch, setTorch] = useState(false);
  const [ready, setReady] = useState(false); 

  const devices = useCameraDevices();
  const device = devices?.find(d => d.position === 'back');

  useEffect(() => {
  (async () => {
    const status = await Camera.requestCameraPermission();
    console.log('Camera permission:', status);
  })();
}, []);
  useEffect(() => {
    Camera.requestCameraPermission();
  }, []);

  const toggleLight = (value: boolean) => {
    setLight(value);

    // 🔥 เปิด torch ได้เมื่อ ready แล้วเท่านั้น
    if (ready) {
      setTorch(value);
    }
  };
  

  return (
    <View style={[
      styles.container,
      { backgroundColor: light ? '#FFF9C4' : '#1e1e1e' }
    ]}>

      {/* 🔦 Camera */}
      {device && (
        <Camera
          style={{ width: 1, height: 1 }}
          device={device}
          isActive={true}
          torch={torch ? 'on' : 'off'}
          onInitialized={() => setReady(true)} // 🔥 ตรงนี้สำคัญสุด
        />
      )}

      {/* UI */}
      <View style={[
        styles.lightBox,
        { backgroundColor: light ? '#FFF176' : '#333' }
      ]}>
        <Text style={{ color: light ? '#000' : '#fff', fontSize: 18 }}>
          {light ? '💡 Light ON' : '💡 Light OFF'}
        </Text>
      </View>

      <Text style={[
        styles.title,
        { color: light ? '#000' : '#fff' }
      ]}>
        🏠 Smart Home
      </Text>

      <View style={styles.card}>
        <Text style={styles.text}>💡 Light</Text>
        <Switch
          value={light}
          onValueChange={toggleLight}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    marginVertical: 10,
    backgroundColor: '#eee',
    borderRadius: 12,
  },
  text: {
    fontSize: 18,
  },
  lightBox: {
    height: 150,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
});