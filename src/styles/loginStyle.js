import styled from 'styled-components';

export const LoginMain = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    height: 40%;
    width: 18%;
    left: 38%;
    top: 17%;
    transform-style: preserve-3d;
    &::before {
        content: '';
        position: absolute;
        left: -14%;
        width: 124%;
        top: 44%;
        height: 100%;
        border: 1px solid black;
        border-radius: 6px;
        transition: transform 0.15s ease-out, box-shadow 0.15s ease-out;
        transform: translate3d(0, 0.75em, -3em);
    }
`;

export const ButtonLogin = styled.a`
    display: block;
    background: tomato;
    width: 100%;
    height: 52px;
    border-radius: 0.75em;
    line-height: 50px;
    font-size: 17px;
    font-weight: 500;
    text-align: center;
    &:hover {
        background-color: #ff7259;
        transition-duration: 0.1s;
    }
`;

export const Input = styled.input`
    height: 2em;
    width: 94%;
    border-radius: 5px;
    margin: 4px;
    padding: 6px;
    &:focus {
        outline: none;
        box-shadow: 0 0 0 2px #388bfd;
    }
`;

export const MainImg = styled.img`
    padding-bottom: 64px;
`;
