// VideoUpload.js

import React, { useState } from 'react';
import { View, Button, Text, Platform } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker'; // Video seçimi için
import storage from '@react-native-firebase/storage'; // Firebase Storage
import { showMessage } from 'react-native-flash-message'; // Hata ve başarı mesajları için

const VideoUpload = () => {
  const [videoUri, setVideoUri] = useState(null);
  const [loading, setLoading] = useState(false);

  // Video seçmek için
  const pickVideo = () => {
    launchImageLibrary(
      { mediaType: 'video' },
      response => {
        if (response.assets) {
          setVideoUri(response.assets[0].uri);
        }
      }
    );
  };

  // Video yüklemek için
  const uploadVideo = async () => {
    if (!videoUri) {
      showMessage({
        message: 'Lütfen bir video seçin!',
        type: 'danger',
      });
      return;
    }

    setLoading(true);
    const fileName = videoUri.split('/').pop(); // Dosya ismini almak
    const reference = storage().ref(fileName); // Firebase Storage referansı

    try {
      // Video dosyasını yükle
      await reference.putFile(videoUri);
      const videoUrl = await reference.getDownloadURL(); // Yüklenen videonun URL'si

      showMessage({
        message: 'Video başarıyla yüklendi!',
        type: 'success',
      });

      console.log('Video URL:', videoUrl);
    } catch (error) {
      showMessage({
        message: `Video yüklenirken bir hata oluştu: ${error.message}`,
        type: 'danger',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Video Seç" onPress={pickVideo} />
      {videoUri && (
        <Text style={{ marginTop: 20, textAlign: 'center' }}>
          Video seçildi: {videoUri.split('/').pop()}
        </Text>
      )}
      <Button
        title={loading ? 'Yükleniyor...' : 'Videoyu Yükle'}
        onPress={uploadVideo}
        disabled={loading}
      />
    </View>
  );
};

export default VideoUpload;
