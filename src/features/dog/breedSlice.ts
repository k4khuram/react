import {  createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface breedState {
    images: [],
    errorMessage: string,
    status: string
  }
  
  const initialState: breedState = {
    images: [],
    status: 'idle',
    errorMessage: ''
  };


export const breedSlice = createSlice({
    name: 'breedStore',
    initialState,
    
    reducers: {
        resetState: (state) => {
          state.images = [],
          state.status = 'idle',
          state.errorMessage = ''
          return state;
          },   
          
          setImages(state, action: PayloadAction<[]>){
            state.images = action.payload
            state.status = 'isSuceeded';
          },
          setStatus(state, action: PayloadAction<string>){
            state.status = action.payload;
          }
    },
    
  });

  export const {resetState,setImages,setStatus} = breedSlice.actions;
  export default breedSlice.reducer;