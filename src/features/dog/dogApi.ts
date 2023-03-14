import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const dogApi = createApi({
    reducerPath: 'dogApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://dog.ceo/api' }),
    
    endpoints: (builder) => ({
      getBreeds: builder.query({
        query: () => '/breeds/list/all',
      }),
      getSubBreeds:builder.query({

        query:(subBreed) => `/breed/${subBreed}/list`
      }),

      getBreedImages:builder.query({
        query:(params) =>{
          const {breed, number} = params; 
          return {url: `/breed/${breed}/images/random/${number}`}
        }
      }),

      getSubBreedImages:builder.query({
        query:(params) =>{
          const {breed, subBreed, number } = params; 
          return {url: `/breed/${breed}/${subBreed}/images/random/${number}`}
        }
      }),

    }),
  })

  export const {useGetBreedsQuery,useLazyGetSubBreedsQuery, useLazyGetSubBreedImagesQuery,
                useLazyGetBreedImagesQuery, useGetSubBreedImagesQuery} = dogApi