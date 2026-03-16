import NetInfo from "@react-native-community/netinfo";
import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, BackHandler, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";

export default function HomeScreen() {
  const webRef = useRef<WebView>(null);

  const [canGoBack, setCanGoBack] = useState(false);
  const [isOffline, setIsOffline] = useState(false);

  /* ---------------- INTERNET DETECTION ---------------- */

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsOffline(!state.isConnected);
    });

    return unsubscribe;
  }, []);

  /* ---------------- ANDROID BACK BUTTON ---------------- */

  useEffect(() => {
    const onBackPress = () => {
      if (canGoBack && webRef.current) {
        webRef.current.goBack();
        return true;
      }

      return false;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      onBackPress,
    );

    return () => backHandler.remove();
  }, [canGoBack]);

  /* ---------------- OFFLINE SCREEN ---------------- */

  if (isOffline) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" color="#00c4cc" />
      </SafeAreaView>
    );
  }

  /* ---------------- MAIN WEBVIEW ---------------- */

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <WebView
        ref={webRef}
        source={{ uri: "https://venkktech.com/Other/Inspire_serve/" }}
        style={styles.webview}
        javaScriptEnabled
        domStorageEnabled
        cacheEnabled
        cacheMode="LOAD_DEFAULT"
        allowsInlineMediaPlayback
        allowsFullscreenVideo
        mediaPlaybackRequiresUserAction={false}
        sharedCookiesEnabled={true}
        allowsBackForwardNavigationGestures={true}
        setSupportMultipleWindows={false}
        overScrollMode="never"
        startInLoadingState={false}
        onNavigationStateChange={(navState) => {
          setCanGoBack(navState.canGoBack);
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingBottom: 10,
  },

  webview: {
    flex: 1,
    backgroundColor: "#000",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
});
