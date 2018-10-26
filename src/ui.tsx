import styled from "styled-components";

export const Header = styled.header`
  color: #fff;
  background: #fc4700;
  padding: 10px;
`;
export const Wrapper = styled.div`
  background: #efefef;
  width: 90vw;
  height: 100vh;
  margin: 0 auto;
`;

export const Log = styled.div`
  padding: 10px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #fff;
  &:first-of-type {
    background: #fff;
    padding: 20px 10px;
    border-bottom: 1px solid #666;
  }
  h4 {
    font-weight: 100;
    margin: 0 0 10px 0;
  }
`;
