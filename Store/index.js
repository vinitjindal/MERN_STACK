import {configureStore, createSlice} from '@reduxjs/toolkit'
import jaipurPic from '../public/images/jaipur.jpg'
import goa from '../public/images/goa.jpeg'

export const places = [
    {
      id: 1,
      image: jaipurPic,
      imageAlt: 'Jaipur',
      title: 'Jiapur the Pink city',
      description: 'Excellent place to visit'
    },
    {
      id: 2,
      imageAlt: 'Goa',
      image: goa,
      title: 'Goa',
      description: 'Excellent place to visit'
    },
    {
      id: 3,
      image: jaipurPic,
      imageAlt: 'Jaipur',
      title: 'Jiapur the Pink city',
      description: 'Excellent place to visit'
    }
]
  

const favouritePlacesSlice = createSlice({
    name: 'FavouritePlaces',
    initialState:{
        favouritePlaces: []
    },
    reducers:{
        add: (state, action) =>{
            state.favouritePlaces.push(action.payload)
        },
        remove: (state, action) =>{
            let index = state.favouritePlaces.findIndex((val) => val === action.payload)
            if(index !== -1)
            {
                state.favouritePlaces.splice(index,1)
            }
        }
    }
})

const checkAuthentication = createSlice({
    name: 'Authentication',
    initialState:{
        isAuthenticated : false
    },
    reducers:{
        setAuth: (state,action) =>{
            state.isAuthenticated = action.payload
        }
    }
})

const store = configureStore({reducer: {favouritePlaces: favouritePlacesSlice.reducer, checkAuthentication: checkAuthentication.reducer}});

export const { add, remove } = favouritePlacesSlice.actions;
//export const {setAuth} = checkAuthentication.actions;

export default store;