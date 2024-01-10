import React, { useState, useEffect } from "react";
import { Button, Text, TextInput } from "react-native-paper";
import { View } from "react-native";
import { StyleSheet, Linking } from "react-native";
//import * as SecureStore from "expo-secure-store";
import axios from 'axios';

export default function Login({ navigation }) {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const [myData, setMyData] = useState();
  const [isError, setIsError] = useState("");

  const getMyPostData = async () => {
    const response = await axios
      .post("https://dummyjson.com/auth/login", {
        username: loginData.username,
        password: loginData.password,
      });
    if (response.data) {
      
      return response.data;
    }
  };

//   const tryingFetch=async()=>{
//     await fetch("https://dummyjson.com/auth/login", {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         username: loginData.username,
//         password: loginData.password,
//       }),
//     }).then((response)=>{
//         const data=  response.json();
//         setMyData(data);
//         console.log("myData :",myData);
//     }).catch((error)=>{
//         console.log(error);
//     })
// }
//  const handleSignInPress=()=>{
//     tryingFetch();
    
//   }

  // useEffect(() => {
  //   if (myData && myData.length > 0) {
  //     console.log("useEffect myData:", myData);
  //   }
  // }, [myData]);



  const onChangeHandler = (field, text) => {
    setLoginData(() => {
      return { ...loginData, [field]: text };
    });
  };

  

  const handleSignInPress = async () => {
    const fetchedData = await getMyPostData();
    if(fetchedData.username==loginData.username){
      navigation.navigate("LoginSuccess");
    }
    
  };

 



  return (
    <View style={styles.container}>
      <View style={styles.smallContainer}>
        <TextInput
          style={styles.inputStyle}
          label="Username"
          value={loginData.username}
          onChangeText={(text) => {
            onChangeHandler("username", text);
          }}
          mode="outlined"
        />
        <TextInput
          style={styles.inputStyle}
          label="Password"
          value={loginData.password}
          onChangeText={(text) => {
            onChangeHandler("password", text);
          }}
          mode="outlined"
        />
        <Text
          style={{
            fontSize: 13,
            color: "grey",
            paddingLeft: 105,
            paddingTop: 15,
          }}
          onPress={() => Linking.openURL("https://erclens.com/")}
        >
          Forgot Password ?
        </Text>

        <Button
          style={{ backgroundColor: "#042d5b", marginTop: 30, width: 230 }}
          onPress={handleSignInPress}
        >
          Sign In
        </Button>
        <Text style={{ paddingTop: 30, color: "#071C348E" }}>
          Don't have an account?{" "}
          <Text
            style={{ color: "#071C34", fontWeight: "bold" }}
            onPress={() => navigation.navigate("Signup")}
          >
            SignUp
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
    height: 350,
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
