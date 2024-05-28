import { atom } from "recoil";

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

export const noticeListState = atom({
    key:"noticeListState",
    default:[]
})  

export const recruitmentListState = atom({
    key:"recruitmentListState",
    default:[]
})  
export const fileState = atom({
    key:"fileState",
    default:[]
})
export const fileIdState = atom({
    key:"fileIdState",
    default:null
})