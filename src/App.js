import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import MainPage from "./main/MainPage";
import CreateNotice from "./club/master/CreateNotice";
import MemberRecruitment from "./club/common/MemberRecruitment";
import MemberRecruitmentDetail from "./club/common/MemberRecruitmentDetail";
import CreateClub from "./club/master/CreateClub"; 
import NoticeList from "./club/common/noticeList";
import Notice from "./club/common/Notice";
import { RecoilRoot } from "recoil";
import NoticeDetail from "./club/master/NoticeDetail";
import Video from "./club/common/Video";
import CreateVideo from "./club/master/CreateVideo"; 
import VideoDetail from "./club/master/VideoDetail";
import ClubJoin from "./club/member/ClubJoin";
import MyClub from "./club/master/MyClub";
import MyClubList from "./club/master/MyClubList";
import ClubBaseInfoDetail from "./club/master/ClubBaseInfoDetail";
import ClubJoinList from "./club/master/ClubJoinList";
import MyPage from "./club/master/mypage/MyPage";
import ClubApplicationList from "./club/manager/ClubApplicationList";
import MyClubMember from "./club/master/MyClubMember";
import SignUp from "./main/SignUp"; 
import KakaoSignup from "./main/KakaoSignup"; 
import SignIn from "./main/SignIn"; 
import React, { useEffect } from 'react';
import ClubList from "./club/common/ClubList";
import Club from "./club/common/Club";
import ClubDetail from "./club/common/ClubDetail";
import Picture from "./club/common/Picture";


function App() {
  useEffect(() => {
    const initializeKakao = () => {
      if (window.Kakao && !window.Kakao.isInitialized()) {
        window.Kakao.init(process.env.REACT_APP_KAKAO_APP_KEY);
      }
    };

    initializeKakao();
  }, []);

  return (
    <RecoilRoot>
    <Router>
      <Routes>
        <Route path="/" element={<MainPage/>}></Route>
        {/* <Route path="/clubNotice" element={<CreateNotice/>}></Route> */}
        <Route path="/MemberRecruitment" element={<MemberRecruitment/>}></Route>
        <Route path="/MemberRecruitmentDetail/:id" element={<MemberRecruitmentDetail />} />
        <Route path="/CreateClub" element={<CreateClub/>} />
        <Route path="/Notice" element={<Notice />} />
        <Route path="/CreateNotice" element={<CreateNotice />} />
        <Route path="/UpdateNotice/:id" element={<CreateNotice />} />
        <Route path="/CreateMemberRecruitment" element={<CreateNotice />} />
        <Route path="/UpdateMemberRecruitment/:id" element={<CreateNotice />} />
        <Route path="/NoticeDetail/:id" element={<NoticeDetail />} />
        <Route path="/CreateVideo" element={<CreateVideo />} />
        <Route path="/Video" element={<Video />} />
        <Route path="/VideoDetail/:id" element={<VideoDetail />} />
        <Route path="/UpdateVideo/:id" element={<CreateVideo />} />
        <Route path="/ClubJoin/:id" element={<ClubJoin />} />
        <Route path="/MyClub" element={<MyClub />} />
        <Route path="/MyClubList" element={<MyClubList />} />
        <Route path="/ClubBaseInfoDetail/:id" element={<ClubBaseInfoDetail />} />
        <Route path="/ClubJoinList" element={<ClubJoinList />} />
        <Route path="/MyPage" element={<MyPage />} />
        <Route path="/ClubApplicationList" element={<ClubApplicationList />} />
        <Route path="/MyClubMember" element={<MyClubMember />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/KakaoSignup" element={<KakaoSignup />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/Club" element={<Club/>}></Route>
        <Route path="/ClubDetail/:id" element={<ClubDetail/>}></Route>
        <Route path="/Picture" element={<Picture/>}></Route>
      </Routes>
    </Router>
    </RecoilRoot>
  );
}

export default App;
