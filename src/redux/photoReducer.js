import { createSlice } from '@reduxjs/toolkit';

export const photoSlice = createSlice({
  name: 'photos',
  initialState: {
    photos: [],
    page: 1,
  },
  reducers: {
    getPhotos: (state, data) => {
      state.photos = state.photos.concat(data.payload)
      state.page++
    },
    // searchPhoto: (state, id) => {
    //   state.singlePhoto = state.photos.filter(() => state.photos.id === id.payload)
    // }

  }
})
export const { getPhotos, searchPhoto } = photoSlice.actions;
export const selectPage = state => state.photos.page;
export const selectPhotos = state => state.photos.photos;

export default photoSlice.reducer;