import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import {getDatabase} from "firebase/database";

import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyBHEpJ-cNBf9i7R1_a6tkd4077-IZ4-Tu8",
  authDomain: "eva1-b5054.firebaseapp.com",
  databaseURL: "https://eva1-b5054-default-rtdb.firebaseio.com",
  projectId: "eva1-b5054",
  storageBucket: "eva1-b5054.appspot.com",
  messagingSenderId: "177437644371",
  appId: "1:177437644371:web:3a7111cf73630af57058a6"
};

const app = initializeApp(firebaseConfig);

// export const auth = getAuth(app)

export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });

  export const storage = getStorage(app)
  export const db=getDatabase(app)