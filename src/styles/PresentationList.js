import styled from 'styled-components';

export const Presentation = styled.div`
    display: flex;
    justify-content: space-evenly;
    padding: 10px 0px;

    border-bottom: 1.5px solid transparent;
    border-image: linear-gradient(to right, #aedcaf, #78b27a);
    border-image-slice: 1;
    font-size: 1.2em;
    & div {
        text-align: center;
    }
    & > div {
        width: 20%;
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: center;
    }

    &:hover {
        color: white;
        //text-shadow: -3px 0 #6c986e, 0 3px #6c986e, 3px 0 #6c986e,0 -3px #6c986e;
        background-color: #78b27a;
        cursor: pointer;
    }
`;
