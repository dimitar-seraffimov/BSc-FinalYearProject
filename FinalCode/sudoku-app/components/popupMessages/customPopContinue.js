import React from "react";
import { Modal, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import styles from "../../styles/popupStyles";

const CustomPopContinue = ({ visible, message, onDismiss }) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onDismiss}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{message}</Text>
          <TouchableOpacity
            style={[styles.button, styles.confirmButton]}
            onPress={onDismiss}
          >
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export { CustomPopContinue };
