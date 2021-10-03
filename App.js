import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import React from "react";
import firebase from "firebase/app";
import { ThemeProvider } from "styled-components/native";

import {
  useFonts as useOswald,
  Oswald_400Regular,
} from "@expo-google-fonts/oswald";
import { useFonts as useLato, Lato_400Regular } from "@expo-google-fonts/lato";

import { theme } from "./src/infrastructure/theme";

import { Navigation } from "./src/infrastructure/navigation";
import { AuthenticationContextProvider } from "./src/services/authentication/authentication.context";
const firebaseConfig = {
  apiKey: "AIzaSyABmvWG46zx7qPeCWKA5G463N8qtXQ6Q64",
  authDomain: "mealstogo-b8941.firebaseapp.com",
  projectId: "mealstogo-b8941",
  storageBucket: "mealstogo-b8941.appspot.com",
  messagingSenderId: "891654569475",
  appId: "1:891654569475:web:d0d1c56f478ae880461836",
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export default function App() {
  const [oswaldLoaded] = useOswald({
    Oswald_400Regular,
  });

  const [latoLoaded] = useLato({
    Lato_400Regular,
  });

  if (!oswaldLoaded || !latoLoaded) {
    return null;
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <AuthenticationContextProvider>
          <Navigation />
        </AuthenticationContextProvider>
      </ThemeProvider>
      <ExpoStatusBar style="auto" />
    </>
  );
}