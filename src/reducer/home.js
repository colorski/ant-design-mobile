import { combineReducers } from 'redux'
//import _ from 'underscore'
import cr from '../utils/cr'
import {
  GET_STORAGE_BRIEFING_DATA,
  GET_STORAGE_INDICATORS_DATA,
  GET_INDEX_ECHARTS_DATA,
  GET_INDEX_COLLECTION_DATA,
  GET_CITY_DATA
} from '../actions/home'

export default combineReducers({
  briefing: cr(null,{
    [GET_STORAGE_BRIEFING_DATA]({data}){
      return data
    }
  }),
  indicators: cr(null,{
    [GET_STORAGE_INDICATORS_DATA]({data}){
      return data
    }
  }),
  echarts: cr(null,{
    [GET_INDEX_ECHARTS_DATA]({data}){
      return data
    }
  }),
  collection: cr(null,{
    [GET_INDEX_COLLECTION_DATA]({data}){
      return data
    }
  }),
  cityData: cr(null,{
    [GET_CITY_DATA]({data}){
      return data
    }
  }),
})

