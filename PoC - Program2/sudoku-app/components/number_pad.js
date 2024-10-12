import { TouchableOpacity, Text, View } from "react-native";
import styles from "../styles/styles";

const NumberPad = ({ onNumberSelect }) => {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, "X"];
  return (
    <View style={styles.numberPad}>
      {numbers.map((number) => (
        <TouchableOpacity
          key={number}
          style={styles.numberButton}
          onPress={() => onNumberSelect(number)}
        >
          <Text style={styles.numberButtonText}>{number}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default NumberPad;
