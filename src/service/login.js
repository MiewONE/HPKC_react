import {useState, useRef} from "react";
import { useSelector,useDispatch } from "react-redux";
import { login,logout } from "../store/modules/user";
import axios from "axios";

function Login() 
{
    const userEmail = useRef();
    const userPwd = useRef();
    const [loginInfo,setLoginInfo] = useState({
        userEmail : "",
        password:"",
      });
    const [_whoami,setWhoami] = useState()

    const state_login = useSelector(state => state.user);
    const state_token = useSelector(state => state.token);
    const dispatch = useDispatch();

    const whoami = () => {
    axios.get("/whoami").then((res) => {
            setWhoami(JSON.stringify(res.data))
        }).catch((err) => {
        return err;
        })
    }
    const event_login = () => {
        setLoginInfo({
            userEmail : userEmail.current.value,
            password : userPwd.current.value
        });
        axios.post("/oauth/logins",loginInfo).then( (res) => {
            dispatch(login(res))
            console.log(res);
        }).catch((err) => {
            console.log(err);
            if(err)
            {
                alert("로그인에 실패 하였습니다.");
            }
        })
    }
      
    return (
        <>
            {
                (state_login.user.name === "") &&
                <div>
                    <div className="Login">
                    <input type="text" placeholder="이메일을 입력하세요" ref={userEmail}/>
                    <input type="password" placeholder="비밀번호를 입력하세요" ref={userPwd}/>
                    </div>
                    <button onClick={event_login}>로그인</button>
                    <a href="/oauth/kakao">카톡 로그인</a>
                    <button onClick={whoami}>나는 누구?</button>
                    <hr/>
                    <span>{_whoami}</span>
                </div>
                
            }
            
            {
                (state_login.user.name !== "") && <span>test</span>
            }
        </>
    )
}

export default Login;