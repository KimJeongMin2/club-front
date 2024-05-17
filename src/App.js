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


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage/>}></Route>
        <Route path="/clubNotice" element={<CreateNotice/>}></Route>
        <Route path="/MemberRecruitment" element={<MemberRecruitment/>}></Route>
        <Route path="/MemberRecruitmentDetail/:id" element={<MemberRecruitmentDetail />} />
        <Route path="/CreateClub" element={<CreateClub/>} />
      </Routes>
    </Router>
  );
}

export default App;
