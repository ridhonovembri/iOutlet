import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../constants/index";

const SettingScreen = () => {

  const navigation = useNavigation()
  return (
    <SafeAreaView>
      <View style={{backgroundColor: COLORS.tertiary}}>
        <Text style={{fontFamily:'bold'}}>SettingScreenx</Text>
        <Pressable onPress={()=> navigation.navigate('Sandbox')}>
          <Text>Go to Sandbox</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default SettingScreen;

