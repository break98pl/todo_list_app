import { NavigationProp } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import useGetMovies from "../hooks/useGetMovies";

type NetworkingProps = {};

export type Movie = {
  id: string;
  releaseYear: string;
  title: string;
};

export type MovieData = {
  description: string;
  movies: Movie[];
  title: string;
};

const Networking = (props: NetworkingProps) => {
  const { movieData, loading } = useGetMovies();

  if(loading) return <ActivityIndicator color='red' />

  return (
    <View>
        <View>
          <Text>{movieData.title}</Text>
          <Text>{movieData.description}</Text>
          {movieData.movies?.map((item, index) => (
            <View key={index}>
              <Text>{item.title}</Text>
              <Text>{item.releaseYear}</Text>
            </View>
          ))}
        </View>
    </View>
  );
};

export default Networking;
