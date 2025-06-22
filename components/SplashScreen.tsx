import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, Animated, Easing, I18nManager } from 'react-native';

interface SplashScreenProps {
    onFinish: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.5)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                easing: Easing.out(Easing.ease),
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 4,
                tension: 60,
                useNativeDriver: true,
            }),
        ]).start();

        const timer = setTimeout(() => {
            onFinish();
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={styles.container}>
            <Animated.View
                style={[
                    styles.content,
                    {
                        opacity: fadeAnim,
                        transform: [{ scale: scaleAnim }],
                    },
                ]}
            >
                <Image
                    source={require('../assets/Ar.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
                {/* <Text style={styles.appName}>سمساري</Text>
                <Text style={styles.tagline}>تجربتك العقارية تبدأ من هنا</Text> */}
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f7fa',
        justifyContent: 'center',
        alignItems: 'center',
        direction: I18nManager.isRTL ? 'rtl' : 'ltr',
    },
    content: {
        alignItems: 'center',
    },
    logo: {
        width: 150,
        height: 150,
        marginBottom: 25,
    },
    appName: {
        fontSize: 34,
        fontWeight: 'bold',
        fontFamily: 'Tajawal',
        color: '#1e1e1e',
        marginBottom: 10,
    },
    tagline: {
        fontSize: 18,
        fontFamily: 'Tajawal',
        color: '#555',
        fontStyle: 'italic',
    },
});

export default SplashScreen;
