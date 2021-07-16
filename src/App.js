import {useState,useEffect, useRef} from "react";
import axios from "axios";
import "./App.css";
function App() {
  const [loginInfo,setLoginInfo] = useState({
    userId : "",
    userPassword:"",
  });
  
  const userId = useRef();
  const userPwd = useRef();
  return (
    <div className="main">
      <div className="Login">
        <input type="text" placeholder="아이디를 입력하세요" ref={userId}/>
        <input type="password" placeholder="비밀번호를 입력하세요" ref={userPwd}/>
      </div>
      <button>로그인</button>
    </div>
  );
}

export default App;
