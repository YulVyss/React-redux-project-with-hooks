import { configureStore } from '@reduxjs/toolkit';
import photoReducer from './photoReducer';


export default configureStore({
  reducer: {
    photos: photoReducer,
  },
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

})
