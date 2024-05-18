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