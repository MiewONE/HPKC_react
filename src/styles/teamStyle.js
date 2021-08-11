import styled from 'styled-components';

export const TeamDiv = styled.div`
    display: flex;
    justify-content: space-evenly;
    margin: 10px;
`;

export const TeamDivList = styled.div`
    display: flex;

    justify-content: space-between;
    margin: 3%;
    border: 2px solid #78b27a;
    padding: 5%;
    border-radius: 24px;
    /* &::after {
        content: '';
    } */
    &:hover {
        color: white;
        //text-shadow: -3px 0 #6c986e, 0 3px #6c986e, 3px 0 #6c986e,
            0 -3px #6c986e;
        background-color: #78b27a;
        cursor: pointer;
    }
`;
