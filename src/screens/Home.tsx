import AsyncStorage from "@react-native-async-storage/async-storage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useEffect, useRef, useState } from "react";
import { Alert, StyleSheet, TextInput, TextInputProps } from "react-native";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { useGetStorage } from "../hooks/useGetStorage";
import useGetMovies from "../hooks/useGetMovies";
const Tab = createBottomTabNavigator();

type Note = {
  content: string;
  date: string;
};

type HomeProps = {
  navigation:{
    navigate: (screenName: string) => void
  }
}

const Home = (props: HomeProps) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [inputNote, setInputNote] = useState<string>("");

  const notesStorage = useGetStorage('notes', true)

  const noteIndexRef = useRef(-1)

  const handleChangeNote = (value: string) => {
    setInputNote(value);
  };

  const handleSaveNote = () => {
    if(noteIndexRef.current >= 0){
      const newNotes = notes.map((item, index) =>{
        if(index === noteIndexRef.current){
          return{
            ...item,
            content: inputNote
          }
        }
        return item
      })
      noteIndexRef.current = -1
      setNotes(newNotes)
    }
    else{
      const newNote = {
        content: inputNote,
        date: new Date().toJSON(),
      };
      setNotes([...notes, newNote]);
    }
  };

  const handleSaveToStorage = async () => {
    try {
      if (notes.length > 0) {
        const noteSave = JSON.stringify(notes);
        const notesStorage = (await AsyncStorage.getItem("notes")) || "";
        if (noteSave !== notesStorage) {
          await AsyncStorage.setItem("notes", JSON.stringify(notes));
          setInputNote("");
          Alert.alert("Save storage successs");
        }
      }
    } catch (error) {
      console.log({ error });
      Alert.alert("Save storage error");
    }
  };

  const handleGetNoteStorage = async () => {
    try {
      const notesString = (await AsyncStorage.getItem("notes")) || "";
      setNotes(JSON.parse(notesString as string));
    } catch (error) {
      console.log({ error });
    }
  };

  const handleDeleteNote = (indexNote: number) =>{
    setNotes(
      notes.filter((_, index) => index !== indexNote)
    )
  }

  const handleUpdateNote = (noteData: Note, index: number) =>{
    setInputNote(noteData.content);
    noteIndexRef.current = index;
  }

  // useEffect(() => {
  //   handleGetNoteStorage();
  // }, []);

  // useEffect(() => {
  //   handleSaveToStorage();
  // }, [notes]);

  return (
    <View>
      <View style={styles.contentContainer}>
        {notes.map((item, index) => (
          <View style={styles.noteContainer} key={index}>
            <Text style={styles.textContent}>
              {item.content}
            </Text>
            <View style={styles.actionContainer}>
              <TouchableOpacity style={styles.action} onPress={() => handleUpdateNote(item, index)}>
                <Text>Cập nhật</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.action} onPress={() => handleDeleteNote(index)}>
                <Text>Xoá</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          value={inputNote}
          onChangeText={(value) => handleChangeNote(value)}
          style={styles.noteInput}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleSaveNote} style={styles.buttonSave}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => props.navigation.navigate('Networking')} style={styles.buttonSave}>
            <Text style={styles.buttonText}>Navigate Networking</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  noteInput: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 6,
    height: 30,
    marginTop: 20,
    paddingHorizontal: 10,
    fontSize: 18,
  },
  inputContainer: {
    paddingHorizontal: 10,
  },
  buttonSave: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: "blue",
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
  contentContainer: {
    marginVertical: 10,
  },
  textContent: {
    marginVertical: 10,
    fontSize: 18,
  },
  noteContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  action:{
    marginHorizontal: 10
  },
  actionContainer:{
    flexDirection: 'row',
  }
});
