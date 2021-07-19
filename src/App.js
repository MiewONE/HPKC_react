import Login from "./service/login";
import "./styles/app.scss";
import Vote from "./service/Vote";
import { useSelector,useDispatch } from "react-redux";
import { login,logout } from "./store/modules/user";

import TeamList from "./service/TeamList";
function App() {
  const state_login = useSelector(state => state.user);
  return (
    <div className="main">
      {!state_login.user.name && <Login/>}
      {
        state_login.user.name && 
        <div>
          <span>팀 내역</span>
          <TeamList/>
        </div>

      }
      {/* <Vote/> */}
    </div>
  );
}

export default App;
