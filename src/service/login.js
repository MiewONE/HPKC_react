import {useState, useRef,useEffect} from "react";
import { useSelector,useDispatch } from "react-redux";
import { login,logout } from "../store/modules/user";
import axios from "axios";
import "../styles/login.scss";
import styled from "styled-components";
import {LoginMain,ButtonLogin,Input,MainImg} from "../styles/loginStyle"
function Login() 
{
    
    useEffect( () => {
        if(!state_login.user.name){
            console.log("로그인 정보 가져오기");
            axios.get("/oauth/usr").then( (res) => {
                dispatch(login(res))
            }).catch( (err) => {
                console.log(err);
            })
        }
    },[])
    
    const userEmail = useRef();
    const userPwd = useRef();
    

    const state_login = useSelector(state => state.user);
    const state_token = useSelector(state => state.token);
    const dispatch = useDispatch();


    const event_login = () => {
        
        axios.post("/oauth/logins",{
            userEmail : userEmail.current.value,
            password : userPwd.current.value
        }).then( (res) => {
            dispatch(login(res))
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
                <LoginMain>
                    <MainImg src="/img/minions.jpg" alt="logo"/>
                    <div className="login">
                        <span>이메일</span>
                        <Input type="text" placeholder="이메일을 입력하세요" ref={userEmail}/>
                        <span>비밀번호</span>
                        <Input type="password" placeholder="비밀번호를 입력하세요" ref={userPwd}/>
                    </div>
                    <div>
                        <ButtonLogin onClick={event_login}>로그인</ButtonLogin>
                        {/* {<a href="https://accounts.kakao.com/login?continue=https%3A%2F%2Fkauth.kakao.com%2Foauth%2Fauthorize%3Fresponse_type%3Dcode%26redirect_uri%3Dhttp%253A%252F%252Flocalhost%253A3045%252Foauth%252Fkakao%252Fcallbak%26client_id%3D4a80f5bc42cf4ae3a4858a763df852df" >카톡 로그인</a>} */}
                        {<a href="http://localhost:3045/oauth/kakao" className="kakao" title="카카오계정으로 로그인">카카오계정으로 로그인</a>}
                    </div>
                        
                </LoginMain>
                
            }

            
        </>
    )
}

export default Login;