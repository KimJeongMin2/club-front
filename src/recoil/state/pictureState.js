import { atom } from "recoil";

export const pictureDataState = atom({
    key: "pictureDataState",
    default: null,
  });
  
  export const imageDataState = atom({
    key: "imageDataState",
    default: null,
  });
  
  export const pictureListState = atom({
    key: "pictureListState",
    default: [],
  });