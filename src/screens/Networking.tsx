import { NavigationProp } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type NetworkingProps = {};

type Movie = {
  id: string;
  releaseYear: string;
  title: string;
};

type MovieData = {
  description: string;
  movies: Movie[];
  title: string;
};

const Networking = (props: NetworkingProps) => {
  const [movieData, setMovieData] = useState<MovieData>({} as MovieData);
  const [loading, setLoading] = useState(true);

  const callApi = () => {
    try {
      setTimeout(async() =>{
        const response = await fetch("https://reactnative.dev/movies.json");
        const responseJson = await response.json();
        setMovieData(responseJson);
        setLoading(false);
      }, 2000)
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    callApi();
  }, []);

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
