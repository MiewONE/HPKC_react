import styled from 'styled-components';

export const Presentation = styled.div`
    display: flex;
    justify-content: space-evenly;
    padding: 10px 0px;
    width: 100%;
    border-bottom: 5px solid transparent;
    border-image: linear-gradient(to right, #aedcaf, #78b27a);
    border-image-slice: 1;
    font-size: 1.2em;
    & div {
        text-align: center;
    }
    & div:nth-child(2) {
        width: 40%;
    }
    & div:nth-child(3) {
        width: 10%;
    }
    & div:nth-child(4) {
        width: 20%;
    }
    & div:nth-child(5) {
        width: 30%;
    }

    &:hover {
        color: white;
        text-shadow: -3px 0 #6c986e, 0 3px #6c986e, 3px 0 #6c986e,
            0 -3px #6c986e;
        background-color: #78b27a;
        cursor: pointer;
    }
`;
