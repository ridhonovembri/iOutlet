import { Text, View, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import AntDesign from "@expo/vector-icons/AntDesign";

import { COLORS, SIZES } from "../../constants/index";

import { useNavigation } from "@react-navigation/native";


const AreaScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{flex: 1}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View
              style={{
                marginHorizontal: 10,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <AntDesign name="back" size={24} color="black" />
              <Text
                style={{
                  marginLeft: 10,
                  fontFamily: "regular",
                  fontSize: SIZES.medium + 2,
                }}
              >
                Home
              </Text>
            </View>
          </TouchableOpacity>
          <View style={{ marginHorizontal: 10 }}>
            <Text>Area</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default AreaScreen;
