import { atom } from "recoil";

export const contentsState = atom({
    key:"contentsState",
    default:''
})
export const titleState = atom({
    key:"titleState",
    default:'',
})
export const videoFileState = atom({
    key: 'videoFileState',
    default: null,
  });
export const videoListState = atom({
    key:"videoListState",
    default:[]
})  