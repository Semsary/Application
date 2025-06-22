import React, { useState, useRef } from "react";
import { WebView } from "react-native-webview";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const { width } = Dimensions.get("window");

const MyWebScreen = () => {
  const [currentUrl, setCurrentUrl] = useState("https://semsary.site");
  const [activeTab, setActiveTab] = useState("home");
  const webViewRef = useRef(null);

  // Animation values for each button
  const animatedValues = useRef({
    back: new Animated.Value(1),
    home: new Animated.Value(1),
    wallet: new Animated.Value(1),
    profile: new Animated.Value(1),
    notifications: new Animated.Value(1),
  }).current;

  const navigateToPage = (path, tabName) => {
    setCurrentUrl(`https://semsary.site${path}`);
    setActiveTab(tabName);
  };

  const goBack = () => {
    if (webViewRef.current) {
      webViewRef.current.goBack();
    }
  };

  const handlePressIn = (buttonName) => {
    Animated.spring(animatedValues[buttonName], {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = (buttonName) => {
    Animated.spring(animatedValues[buttonName], {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const NavButton = ({
    iconName,
    label,
    onPress,
    buttonKey,
    isActive = false,
    hasNotification = false,
  }) => (
    <Animated.View
      style={[
        styles.navButtonContainer,
        { transform: [{ scale: animatedValues[buttonKey] }] },
      ]}
    >
      <TouchableOpacity
        style={[styles.navButton, isActive && styles.activeNavButton]}
        onPress={onPress}
        onPressIn={() => handlePressIn(buttonKey)}
        onPressOut={() => handlePressOut(buttonKey)}
        activeOpacity={0.7}
      >
        <View style={styles.iconContainer}>
          <Icon
            name={iconName}
            size={22}
            color={isActive ? "#ffffff" : "#64748b"}
            style={styles.icon}
          />
          {hasNotification && (
            <View style={styles.notificationDot}>
              <View style={styles.notificationInner} />
            </View>
          )}
        </View>

        <Text
          style={[styles.buttonLabel, isActive && styles.activeButtonLabel]}
        >
          {label}
        </Text>

        {isActive && <View style={styles.activeIndicator} />}
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <View style={{ flex: 1 }}>
      <WebView
        ref={webViewRef}
        source={{ uri: currentUrl }}
        style={{ flex: 1, marginTop: 40, marginBottom: 0 }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        scalesPageToFit={true}
        onLoadStart={() => console.log("WebView started loading")}
        onLoadEnd={() => console.log("WebView finished loading")}
      />

      {/* Enhanced Navigation Button Bar */}
      <View style={styles.navigationWrapper}>
        <View style={styles.buttonBar}>
          <View style={styles.navContent}>
            <NavButton
              iconName="arrow-back"
              label="Back"
              onPress={goBack}
              buttonKey="back"
            />


            <NavButton
              iconName="account-balance-wallet"
              label="Wallet"
              onPress={() => navigateToPage("/wallet", "wallet")}
              buttonKey="wallet"
              isActive={activeTab === "wallet"}
            />
            <NavButton
              iconName="home"
              label="Home"
              onPress={() => navigateToPage("/", "home")}
              buttonKey="home"
              isActive={activeTab === "home"}
            />

            <NavButton
              iconName="person"
              label="Profile"
              onPress={() => navigateToPage("/profile", "profile")}
              buttonKey="profile"
              isActive={activeTab === "profile"}
            />

            <NavButton
              iconName="notifications"
              label="alert"
              onPress={() => navigateToPage("/notifications", "notifications")}
              buttonKey="notifications"
              isActive={activeTab === "notifications"}
              hasNotification={true}
            />
          </View>

          {/* Floating Action Accent */}
          <View style={styles.floatingAccent} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navigationWrapper: {
    position: "relative",
  },
  buttonBar: {
    backgroundColor: "#ffffff",
    paddingTop: 8,
    paddingBottom: 12,
    paddingHorizontal: 12,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  navContent: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  navButtonContainer: {
    flex: 1,
    alignItems: "center",
  },
  navButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 16,
    minHeight: 56,
    position: "relative",
    overflow: "hidden",
  },
  activeNavButton: {
    backgroundColor: "#144aea",
    transform: [{ translateY: -2 }],
    shadowColor: "#144aea",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  iconContainer: {
    position: "relative",
    marginBottom: 4,
  },
  icon: {
    textShadowColor: "rgba(0, 0, 0, 0.1)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  notificationDot: {
    position: "absolute",
    top: -2,
    right: -2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ef4444",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#ef4444",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  notificationInner: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#ffffff",
  },
  buttonLabel: {
    fontSize: 11,
    color: "#64748b",
    fontWeight: "600",
    letterSpacing: 0.3,
    textAlign: "center",
  },
  activeButtonLabel: {
    color: "#ffffff",
    fontWeight: "700",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  activeIndicator: {
    position: "absolute",
    bottom: -2,
    width: 24,
    height: 3,
    backgroundColor: "#ffffff",
    borderRadius: 2,
    shadowColor: "#ffffff",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  floatingAccent: {
    position: "absolute",
    top: -1,
    left: "50%",
    marginLeft: -20,
    width: 40,
    height: 4,
    backgroundColor: "#e2e8f0",
    borderRadius: 2,
    opacity: 0.6,
  },
});

export default MyWebScreen;
