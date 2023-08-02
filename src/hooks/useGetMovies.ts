import { useEffect, useState } from "react";
import { MovieData } from "../screens/Networking";

export default function useGetMovies(){
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

    return {
        movieData,
        loading
    }
}