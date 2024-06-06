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
export const clubJoinListState = atom({
    key:"clubJoinListState",
    default:[]
})
export const clubJoinIdState = atom({
    key:"clubJoinIdState",
    default:[]
})
export const clubApplicationListState = atom({
    key:"clubApplicationListState",
    default:[]
})
export const clubApplicationIdState = atom({
    key:"clubApplicationIdState",
    default:[]
})