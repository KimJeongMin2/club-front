import { atom } from "recoil";

export const videoContentsState = atom({
    key: "videoContentsState",
    default: ''
});

export const videoTitleState = atom({
    key: "videoTitleState",
    default: ''
});

export const videoFileState = atom({
    key: 'videoFileState',
    default: null,
});

export const videoListState = atom({
    key: "videoListState",
    default: []
});