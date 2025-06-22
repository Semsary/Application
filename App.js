import React, { useState } from "react";
import SplashScreen from "./components/SplashScreen";
import MyWebScreen from "./components/MyWebScreen";
import "./components/FontConfig";
import { View, Text } from "react-native";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  if (showSplash) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  return (
    <>
    <MyWebScreen />
   

    </>
    // <MyWebScreen/>
  );
}
