import React, { useState } from "react";
import { Button, Text, TextInput } from "react-native-paper";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import * as SecureStore from "expo-secure-store";

export default function Login({ navigation }) {

    const [errorMessage, setErrorMessage] = useState("");

  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const onChangeHandler = (field, text) => {
    setSignupData(() => {
      return { ...signupData, [field]: text };
    });
  };
  const clearFormFields = () => {

    setSignupData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      
    });};

  const saveSecureDataToStorage = () => {
    try {
      const formDataJSON = JSON.stringify(signupData);

      SecureStore.setItemAsync("signupData", formDataJSON);
      console.log(
        "form DAta Saved to Secure Storage Successfully:",
        formDataJSON
      );
      clearFormFields();
     
    } catch (error) {
      console.error("Error saving form data to SecureStore:", error);
    }
  };
  const handleSignUpPress = () => {
    if (signupData.password && signupData.email && signupData.username){ 

        if(signupData.password === signupData.confirmPassword){
            saveSecureDataToStorage();
            navigation.navigate("Login");
        }
        else{
            alert("Password mismatch")
        }
      
      
    } else {
     
      alert("Please fill in all fields and ensure passwords match.");
    }
  };

  const validateEmail = (text) => {
    const trimmedEmail = text.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(trimmedEmail)) {
      setErrorMessage("Invalid email");
    } 
    else {
      setErrorMessage("");
    }
  };


  return (
    <View style={styles.container}>
      <View style={styles.smallContainer}>
        <TextInput
          style={styles.inputStyle}
          label="Username"
          value={signupData.username}
          onChangeText={(text) => {
            onChangeHandler("username", text);
          }}
          mode="outlined"
        />
        <TextInput
          style={styles.inputStyle}
          label="Email"
          value={signupData.email}
          onChangeText={(text) => {
            onChangeHandler("email", text);
            validateEmail(text);
          }}
          mode="outlined"
        />
        {errorMessage ? (
        <Text style={{ color: "red" }}>{errorMessage}</Text>
      ) : null}

        <TextInput
          style={styles.inputStyle}
          label="Password"
          value={signupData.password}
          onChangeText={(text) => {
            onChangeHandler("password", text);
          }}
          mode="outlined"
        />
        <TextInput
          style={styles.inputStyle}
          label="Confirm Password"
          value={signupData.confirmPassword}
          onChangeText={(text) => {
            onChangeHandler("confirmPassword", text);
          }}
          mode="outlined"
        />

        <Button
          style={{ backgroundColor: "#042d5b", marginTop: 30, width: 230 }}
          onPress={handleSignUpPress}
        >
          Sign UP
        </Button>

        <Text style={{ paddingTop: 20, color: "#071C348E" }}>
          Already have an account{" "}
          <Text
            style={{ color: "#071C34", fontWeight: "bold" }}
            onPress={() => navigation.navigate("Login")}
          >
            Login
          </Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#175296",
    justifyContent: "center",
    alignItems: "center",
  },
  smallContainer: {
    height: 470,
    width: 280,
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#092443C4",
    shadowOpacity: 0.1,
    padding: 30,
    shadowOffset: {
      height: 2,
      width: 3,
    },
  },
  inputStyle: {
    height: 45,
    width: 230,
    marginTop: 20,
  },
});
