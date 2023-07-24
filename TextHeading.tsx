import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';

type Props = {
  count: number;
  handleCount: () => void;
};

const TextHeadding = (props: Props) => {
  console.log(props);

  return (
    <View>
      <Text style={styles.count}>{props.count}</Text>
      <TouchableOpacity onPress={props.handleCount}>
        <Text style={styles.button}>Tăng</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TextHeadding;
