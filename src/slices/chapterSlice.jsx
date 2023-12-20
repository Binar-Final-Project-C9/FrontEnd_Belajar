import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  item: {},
};

const chapterSlice = createSlice({
  name: "chapter",
  initialState,
  reducers: {
    setChapter(state, action) {
      state.items = action.payload.data.chapters;
    },
    addChapter(state, action) {
      state.items.push(action.payload.data.newChapter);
    },
    setChapterById(state, action) {
      state.item = action.payload.data.chapter;
    },
    updateChapter(state, action) {
      const { id, updatedChapter } = action.payload;
      const chapterIndex = state.items.findIndex(
        (chapter) => chapter.id === id
      );
      if (chapterIndex !== -1) {
        state.items[chapterIndex] = {
          ...state.items[chapterIndex],
          ...updatedChapter,
        };
      }
    },
    removeChapter(state, action) {
      const chapterId = action.payload;
      state.items = state.items.filter((chapter) => chapter.id !== chapterId);
    },
  },
});

export const {
  setChapter,
  setChapterById,
  addChapter,
  updateChapter,
  removeChapter,
} = chapterSlice.actions;
export default chapterSlice.reducer;
