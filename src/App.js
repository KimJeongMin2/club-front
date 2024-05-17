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
import CreateClub from "./club/master/CreateClub"; // 경로에 맞게 수정


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage/>}></Route>
        <Route path="/clubNotice" element={<CreateNotice/>}></Route>
        <Route path="/MemberRecruitment" element={<MemberRecruitment/>}></Route>
        <Route path="/MemberRecruitmentDetail/:id" element={<MemberRecruitmentDetail />} />
        <Route path="/CreateClub" element={<CreateClub/>} /> {/* 경로 확인 */}
      </Routes>
    </Router>
  );
}

export default App;
