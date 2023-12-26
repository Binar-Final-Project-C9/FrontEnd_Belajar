import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  item: {},
};

const moduleSlice = createSlice({
  name: "module",
  initialState,
  reducers: {
    setModule(state, action) {
      state.items = action.payload.data.modules;
    },
    addModule(state, action) {
      state.items.push(action.payload.data.newModule);
    },
    setModuleById(state, action) {
      state.item = action.payload.data.module;
    },
    updateModule(state, action) {
      const { id, updatedModule } = action.payload;
      const moduleIndex = state.items.findIndex((module) => module.id === id);
      if (moduleIndex !== -1) {
        state.items[moduleIndex] = {
          ...state.items[moduleIndex],
          ...updatedModule,
        };
      }
    },
    removeModule(state, action) {
      const moduleId = action.payload;
      state.items = state.items.filter((module) => module.id !== moduleId);
    },
  },
});

export const {
  setModule,
  setModuleById,
  addModule,
  updateModule,
  removeModule,
} = moduleSlice.actions;
export default moduleSlice.reducer;
