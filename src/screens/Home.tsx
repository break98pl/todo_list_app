import AsyncStorage from '@react-native-async-storage/async-storage';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useEffect, useRef, useState} from 'react';
import {Alert, StyleSheet, TextInput, TextInputProps} from 'react-native';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
const Tab = createBottomTabNavigator();

type Note = {
  content: string;
  date: string;
}

const Home = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [inputNote, setInputNote] = useState<string>('');

  const handleChangeNote = (value: string) => {
    setInputNote(value);
  };

  const handleSaveNote = () =>{
    const newNote = {
      content: inputNote,
      date: new Date().toJSON()
    }
    setNotes([...notes, newNote])
  }

  const handleSaveToStorage = async() =>{
    try {
      if(notes.length > 0){
        await AsyncStorage.setItem('notes', JSON.stringify(notes))
        setInputNote('');
        Alert.alert('Save storage successs');
      }
    } catch (error) {
      console.log({error});
      Alert.alert('Save storage error');
    }
  }

  const handleGetNoteStorage = async() =>{
    try {
      const notesString = await AsyncStorage.getItem('notes') || '';
      setNotes(JSON.parse(notesString as string));
    } catch (error) {
      console.log({error});
    }
  }

  useEffect(() =>{
    handleGetNoteStorage()
  }, [])

  useEffect(() =>{
    handleSaveToStorage()
  }, [notes])

  return (
    <View>
      <View style={styles.contentContainer}>
        {notes.map((item) =>
          <Text style={styles.textContent}>{item.content}</Text>
        )}
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          value={inputNote}
          onChangeText={handleChangeNote}
          style={styles.noteInput}
          // ref={inputNoteRef}
        />
        <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleSaveNote} style={styles.buttonSave}>
          <Text style={styles.buttonText}>Save</Text>
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
    borderColor: 'black',
    borderRadius: 6,
    height: 30,
    marginTop: 20,
    paddingHorizontal: 10,
    fontSize: 18,
  },
  inputContainer: {
    paddingHorizontal: 10,
  },
  buttonSave:{
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: 'blue'
  },
  buttonContainer:{
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
  buttonText:{
    color: 'white',
    fontSize: 18
  },
  contentContainer:{
    marginVertical: 10
  },
  textContent:{
    marginVertical: 10,
    fontSize: 18
  }
});
