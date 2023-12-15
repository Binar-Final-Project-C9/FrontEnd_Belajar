import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  item: {},
};

const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    setCourse(state, action) {
      state.items = action.payload.data.courses;
    },
    addCourse(state, action) {
      state.items.push(action.payload.data.newCourse);
    },
    setCourseById(state, action) {
      state.item = action.payload.data.course;
    },
    updateCourse(state, action) {
      const { id, updatedCourse } = action.payload;
      const courseIndex = state.items.findIndex((course) => course.id === id);
      if (courseIndex !== -1) {
        state.items[courseIndex] = {
          ...state.items[courseIndex],
          ...updatedCourse,
        };
      }
    },
    removeCourse(state, action) {
      const courseId = action.payload;
      state.items = state.items.filter((course) => course.id !== courseId);
    },
  },
});

export const {
  setCourse,
  setCourseById,
  addCourse,
  updateCourse,
  removeCourse,
} = courseSlice.actions;
export default courseSlice.reducer;
