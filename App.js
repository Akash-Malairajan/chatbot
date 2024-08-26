import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';

export default function chatbotUI() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [suggestions, setSuggestions] = useState(['Suggestion 1', 'Suggestion 2', 'Suggestion 3', 'Suggestion 4', 'Suggestion 5']);
  const flatListRef = useRef(null); 

  const handleSend = () => {
    if (inputText.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: Date.now().toString(), text: inputText, isUser: true },
        { id: (Date.now() + 1).toString(), text: 'replied to user ', isUser: false },
      ]);
      setInputText('');
      setSuggestions([]);

      
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  const handleSuggestionTap = (suggestion) => {
    setInputText(suggestion);
    setSuggestions([]);
  };

  const renderItem = ({ item }) => (
    <View style={[styles.messageContainer, item.isUser ? styles.userMessage : styles.botMessage]}>
      <Text style={[styles.messageText, item.isUser ? styles.userMessageText : styles.botMessageText]}>{item.text}</Text>
    </View>
  );

  const renderSuggestion = ({ item }) => (
    <TouchableOpacity style={styles.suggestionItem} onPress={() => handleSuggestionTap(item)}>
      <Text style={styles.suggestionText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined} keyboardVerticalOffset={90}>
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.chatContainer}
      />

      <View>
        {suggestions.length > 0 && (
          <FlatList
            data={suggestions}
            renderItem={renderSuggestion}
            keyExtractor={(item, index) => index.toString()}
            style={styles.suggestionContainer}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        )}
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Type your message..."
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    marginTop: 30,
  },
  chatContainer: {
    paddingHorizontal: 8,
    paddingVertical: 10,
  },
  messageContainer: {
    marginVertical: 3,
    padding: 8,
    borderRadius: 8,
    maxWidth: '80%',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#0078fe',
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#708090',
  },
  messageText: {
    fontSize: 15,
  },
  userMessageText: {
    color: '#fff',
  },
  botMessageText: {
    color: 'white',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderTopWidth: 1,
    borderColor: '#ccc',
    marginBottom: 0,
  },
  textInput: {
    flex: 1,
    height: 36,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 18,
    paddingHorizontal: 12,
    backgroundColor: '#f5f5f5',
    marginRight: 8,
  },
  sendButton: {
    backgroundColor: '#0078fe',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 18,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  suggestionContainer: {
    paddingVertical: 0,
    paddingHorizontal: 8,
    borderBottomWidth: 0,
    marginBottom: 5,
  },
  suggestionItem: {
    backgroundColor: '#e5e5e5',
    padding: 6,
    borderRadius: 15,
    marginHorizontal: 4,
  },
  suggestionText: {
    color: 'green',
    fontWeight: 'bold',
  },
});
