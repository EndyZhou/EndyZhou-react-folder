import styled from "styled-components";
export const InputWrap = styled.div`
  position: relative;

`;
export const StyledInput = styled.input`
  outline: none;
  border: 1px solid ${({ warn }) => (warn ? "#edac51" : "#c4c2c2")};
`;
export const WranBox = styled.div`
  position: fixed;
  width: 230px;
  padding: 5px;
  border: 2px solid #fd9400;
  background:#8a5b19;
  color: #fff;
  font-size: 12px;
  z-index: 10;
`;
