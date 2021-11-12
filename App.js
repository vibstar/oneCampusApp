import * as React from 'react';
import { SafeAreaView, StyleSheet, Button, FlatList, View, Text, Image, Pressable, TextInput, ScrollView, Alert } from 'react-native';
import { useState, useEffect } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage'

const MENU = [
  {
    id: '1',
    title: "Macaroni and Cheese"
  },
  {
    id: '2',
    title: "Pizza"
  },
  {
    id: '3',
    title: "Noodles"
  },
  {
    id: '4',
    title: "French Fries"
  },
  {
    id: '5',
    title: "Falafel"
  },
  {
    id: '6',
    title: "Baked Ziti"
  },
  {
    id: '7',
    title: "Tonkatsu Ramen"
  },
  {
    id: '8',
    title: "Tom Yum Noodle Soup"
  },
  {
    id: '9',
    title: "Burrito"
  },
  {
    id: '10',
    title: "3 Tacos"
  },
  {
    id: '11',
    title: "Thai Basil Chow Fun"
  },
  {
    id: '12',
    title: "Eggplant Parmesean Sub"
  }
]

function HomeScreen({ navigation }) {
  return (

    <View style={(styles.homePage)}>
      <Image style={(styles.brandeisLogo)} source={require("./Brandeis_University_seal.svg.png")} />
      <ScrollView>
        <Text style={(styles.regularFont)}>Here is a short about page about the app creator</Text>
        <View style={(styles.navigationButtonStyle)}>
          <Pressable style={styles.navigationButtonStyle} onPress={() => navigation.navigate('About')}>
            <Text>Go to about page</Text>
          </Pressable>
        </View>
        <Text style={(styles.regularFont)}>You can order all sorts of food from the One Campus App</Text>
        <View style={(styles.navigationButtonStyle)}>
          <Pressable style={styles.navigationButtonStyle} onPress={() => navigation.navigate('Menu')}>
            <Text>Go to menu</Text>
          </Pressable>
        </View>
        <Text style={(styles.regularFont)}>You can access your COVID-19 campus passport from here as well</Text>
        <View style={(styles.navigationButtonStyle)}>
          <Pressable style={styles.navigationButtonStyle} onPress={() => navigation.navigate('Covid Login')}>
            <Text>Go to COVID-19 Campus Passport</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.regularFont}>{title}</Text>
  </View>
);

const renderItem = ({ item }) => (
  <Item title={item.title} />
);

function MenuScreen({ navigation }) {

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={MENU}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}

function AboutScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', marginTop: '5%' }}>
      <ScrollView style={styles.scrollView}>
        <Image style={(styles.vibhuPic)} source={require("./VibhuPicture.jpg")} />
        <Text style={styles.mediumFont}>
          {'\t'}This app is made by Vibhu Singh. He is a junior at Brandeis University studying
          computer science and economics. He is also working towards his minor in philosophy.
          He is 20 years old and is trying to figure out what he wants to do with his life.

        </Text>
        <Text style={styles.mediumFont}>
          {'\t'}The goal of this app is to consolidate all the Brandeis related apps into
          one app. This includes Bite, Get, the campus passport and so on.
        </Text>
      </ScrollView>
    </View>
  );
}



function CovidLoginScreen({ navigation }) {
  const [userID, setUserID] = useState('');
  const [password, setPassword] = useState('');
  const login = async () => {
    if (userID.length == 0) {
      Alert.alert('Warning!', 'You have to put in your username')
    } else if (password.length == 0) {
      Alert.alert('Warning!', 'You have to put in your password')
    } else {
      try {
        await AsyncStorage.setItem('Username', userID);
      } catch (error) {
        console.log(error);
      }
    }
    if (userID.length > 0 && password.length > 0) {
      navigation.navigate('Covid Passport')
    }

  }
  return (
    <View style={{ flex: 1, flexDirection: 'vertical', alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.mediumFont}>Username:</Text>
        <TextInput
          style={styles.loginBox}
          onChangeText={(val) => setUserID(val)}
        />
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.mediumFont}>Password:</Text>
        <TextInput
          style={styles.loginBox}
          onChangeText={(val) => setPassword(val)}
        />
      </View>
      <View style={(styles.navigationButtonStyle)}>
        <Pressable style={styles.navigationButtonStyle} onPress={login}>
          <Text>login</Text>
        </Pressable>
      </View>
      

    </View>
  );
}

function CovidPassportScreen({ navigation }) {
  const [username, setName] = useState('');
  const [date, setDate] = useState('')
  const getUsername = () => {
    try {
      AsyncStorage.getItem('Username')
        .then(value => {
          if (value != null) {
            setName(value);
          }
        })
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getUsername();
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    setDate(month + '/' + date + '/' + year)
  }, []);
  return (
    <View style={{ flex: 1, flexDirection: 'vertical', alignItems: 'center', justifyContent: 'center' }}>
        <Text style = {styles.passportPage}>Welcome {username}!</Text>
        <Text style = {styles.passportPage}>Today's date is {date}</Text>
        <Text style={[styles.passportPage, { color: '#39FF14' }]}>YOU HAVE A GREEN PASSPORT :)</Text>
        <View style={(styles.navigationButtonStyle)}>
          <Pressable style={styles.navigationButtonStyle} onPress={() => navigation.popToTop()}>
            <Text>Go to home</Text>
          </Pressable>
        </View>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function MyStack() {


  return (
    <Stack.Navigator>
      <Stack.Screen name="One Campus At Brandeis" component={HomeScreen} />
      <Stack.Screen name="About" component={AboutScreen} />
      <Stack.Screen name="Menu" component={MenuScreen} />
      <Stack.Screen name="Covid Login" component={CovidLoginScreen} />
      <Stack.Screen name="Covid Passport" component={CovidPassportScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  homePage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  navigationButtonStyle: {
    backgroundColor: 'orange',
    alignItems: 'center',
    padding: 2,
    marginVertical: 8,
    marginHorizontal: '20%',
    fontSize: 14,
  },
  brandeisLogo: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
  },
  item: {
    backgroundColor: 'orange',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  regularFont: {
    fontSize: 18,
  },
  homepageButtons: {
    fontSize: 12
  },
  scrollView: {
    marginHorizontal: '5%',
  },
  mediumFont: {
    fontSize: 24
  },
  vibhuPic: {
    alignItems: 'center',
    width: '95%',
    height: undefined,
    aspectRatio: 9 / 16
  },
  loginBox: {
    fontSize: 24,
    width: '70%',
    marginTop: 5,
    borderWidth: .5,
  },
  passportPage: {
    fontSize: 32
  }
})

