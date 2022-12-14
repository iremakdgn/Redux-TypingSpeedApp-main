import { createSlice } from "@reduxjs/toolkit";
import words from "../words.json";
import shuffle from "../shuffle";

export const typingSpeedSlice = createSlice({
  name: "typingSpeed",
  initialState: {
    words: shuffle(words.words),
    lang: ["turkishWord", "englishWord"],
    selectedLang: "",
    inputText: "",
    correctWord: 0,
    wrongWord: 0,
    wordIndex: 0,
    time: 60,
    start: false,
  },
  reducers: {
    setDecreaseTime: (state) => {
      state.time--;
    },
    setSelectedLang: (state, action) => {
      const langFind = state.lang.find((item) => item === action.payload);
      console.log("langFind", langFind);
      state.selectedLang = langFind;
    },
    setGameStart: (state) => {
      state.start = true;
    },
    //inputa yazı yazılmaya basladıgında çalısacak func.
    setInputText: (state, action) => {
      const text = action.payload.trim();
      if (text) {
        state.inputText = action.payload;
        console.log("inputText", state.inputText);
      } else {
        state.inputText = "";
      }
    },
    setKeyPress: (state) => {
      const currentText = state.words[state.wordIndex];

      if (
        state.inputText.trim() === currentText.turkishWord ||
        state.inputText.trim() === currentText.englishWord
      ) {
        state.correctWord++;
        currentText.status ="correct";
        console.log("correctWord ", state.correctWord);
      } else {
        state.wrongWord++;
        currentText.status="wrong";
        console.log("wrongword ", state.wrongWord);
      }
      state.wordIndex++;
      state.inputText = ""; //her bosluktan sonra inputu bosalt
    },
    setReplay: (state) => {
      state.inputText = "";
      state.correctWord = 0;
      state.wrongWord = 0;
      state.time = 60;
      state.words = shuffle(state.words);
      state.wordIndex = 0;
      state.start = false;
    },
  },
});

export const {
  setSelectedLang,
  setInputText,
  setKeyPress,
  setReplay,
  setDecreaseTime,
  setGameStart,
} = typingSpeedSlice.actions;
export default typingSpeedSlice.reducer;
