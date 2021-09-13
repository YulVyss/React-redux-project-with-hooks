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
    likePhoto: (state, id) => {
      state.photos.map((photo) => {
        if (photo.id === id.payload) {
          photo.liked_by_user = true
          photo.likes++
          return photo
        }
        return photo
      })
    },
    unLikePhoto: (state, id) => {
      state.photos.map((photo) => {
        if (photo.id === id.payload) {
          photo.liked_by_user = false
          photo.likes--
          return photo
        }
        return photo
      })
    }
  }
})
export const { getPhotos, likePhoto, unLikePhoto } = photoSlice.actions;
export const selectPage = state => state.photos.page;
export const selectPhotos = state => state.photos.photos;

export default photoSlice.reducer;