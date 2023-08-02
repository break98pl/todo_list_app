import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react"

export const useGetStorage = (storageKey: string, isJSON = false) =>{
    const [dataFromStorage, setDataFromStorage] = useState<any>({});

    const handleGetData = async() =>{
        const data = await AsyncStorage.getItem(storageKey) || ''
        setDataFromStorage(isJSON ? JSON.parse(data) : data);
    }

    useEffect(() =>{
        handleGetData();
    }, [])

    return dataFromStorage;
}
