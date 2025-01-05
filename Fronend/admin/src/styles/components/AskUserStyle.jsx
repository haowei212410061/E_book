import styled from "styled-components";

export const button = styled.button`
  width: 100px;
  height: 30px;
  background-color: rgb(230, 230, 230);
  border-radius: 7px 7px 7px 7px;
  border: none;
  &:hover {
    cursor: pointer;
    color: white;
    background-color: rgb(68, 68, 68);
  }
`;

export const AskUserContainer = styled.div`
  display: "grid";
`;
