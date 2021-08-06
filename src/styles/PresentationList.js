import styled from 'styled-components';

export const Presentation = styled.div`
    display: flex;
    justify-content: space-evenly;
    padding: 10px 0px;
    width: 100%;
    border-bottom: 5px solid #aedcaf;
    & div {
        text-align: center;
    }
    & div:nth-child(1) {
        width: 40%;
    }
    & div:nth-child(2) {
        width: 10%;
    }
    & div:nth-child(3) {
        width: 20%;
    }
    & div:nth-child(4) {
        width: 30%;
    }
`;
