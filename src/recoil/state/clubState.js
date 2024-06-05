import { atom } from "recoil";

export const clubIdState = atom({
    key:"clubIdState",
    default:[]
})

export const clubListState = atom({
    key:"clubListState",
    default:[]
})  

export const contentsState = atom({
    key:"contentsState",
    default:''
})
export const titleState = atom({
    key:"titleState",
    default:'',
})
export const photoFileState = atom({
    key: 'photoFileState',
    default: null,
  });

export const fileState = atom({
    key:"fileState",
    default:[]
})
export const fileIdState = atom({
    key:"fileIdState",
    default:null
})