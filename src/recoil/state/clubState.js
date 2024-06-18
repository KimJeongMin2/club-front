import { atom } from "recoil";

export const clubIdState = atom({
    key: "clubIdState",
    default: []
});

export const clubListState = atom({
    key: "clubListState",
    default: []
});

export const contentsState = atom({
    key: "clubContentsState",
    default: ''
});

export const titleState = atom({
    key: "clubTitleState",
    default: ''
});

export const photoFileState = atom({
    key: 'photoFileState',
    default: null,
});

export const fileState = atom({
    key: "clubFileState",
    default: []
});

export const fileIdState = atom({
    key: "clubFileIdState",
    default: null
});

export const clubJoinListState = atom({
    key: "clubJoinListState",
    default: []
});

export const clubJoinIdState = atom({
    key: "clubJoinIdState",
    default: []
});

export const memberRefuseReason = atom({
    key: "memberRefuseReasonState",
    default: []
});

export const myClubListState = atom({
    key: "myClubListState",
    default: []
});

export const clubApplicationListState = atom({
    key: "clubApplicationListState",
    default: []
});

export const clubApplicationIdState = atom({
    key: "clubApplicationIdState",
    default: []
});

export const clubJoinMemberState = atom({
    key: "clubJoinMemberState",
    default: []
});

export const clubRejectReasonState = atom({
    key: "clubRejectReasonState",
    default: {},
});

export const clubMyApplicationListState = atom({
    key: "clubMyApplicationListState",
    default: []
});

export const clubMyApplicationIdState = atom({
    key: "clubMyApplicationIdState",
    default: []
});