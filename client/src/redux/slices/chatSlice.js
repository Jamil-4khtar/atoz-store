import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chatRooms: {},
    messageRecieved: false
  },
  reducers: {
    setRooms: (state, action) => {
      const {user, message} = action.payload;
      if (state.chatRooms[user]) {
        state.chatRooms[user].push({ client: message})
      } else {
        state.chatRooms[user] = [{ client: message }]
      }
    },
    addAdminMessage: (state, action) => {
      const { user, message } = action.payload;
      if (!state.chatRooms[user]) {
        state.chatRooms[user] = [];
      }
      state.chatRooms[user].push({ admin: message });
    },
    setMessageRecieved: (state, action) => {
      state.messageRecieved = action.payload
    },
    removeChatRoom: (state, action) => {
      delete state.chatRooms[action.payload]
    }
  }
})

export const { setRooms, addAdminMessage, setMessageRecieved, removeChatRoom } = chatSlice.actions;

const chatReducer = chatSlice.reducer;
export default chatReducer;

