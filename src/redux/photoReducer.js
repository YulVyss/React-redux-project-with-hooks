import { createSlice } from '@reduxjs/toolkit';

export const photoSlice = createSlice({
  name: 'photos',
  initialState: {
    photos: [],
    page: 1,
    token: ''
  },
  reducers: {
    setToken: (state, token) => {
      state.token = token.payload
    },
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
export const { getPhotos, likePhoto, unLikePhoto, setToken } = photoSlice.actions;
export const selectPage = state => state.photos.page;
export const selectPhotos = state => state.photos.photos;
export const selectToken = state => state.photos.token;

export default photoSlice.reducer;