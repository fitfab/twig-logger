import styled from "styled-components";

export const Header = styled.header`
  color: #fff;
  background: #666;
  padding: 10px 5vw;
  display: flex;
  font-size: 16px;
  border-bottom: 1px solid #222;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 900;

  h1 {
    margin: 0;
    display: block;
    font-size: inherit;
    padding: 2px 0;
    font-weight: 100;
  }
  b {
    color: #fff;
    background: #fc4700;
    border-radius: 100px;
    display: block;
    font-size: inherit;
    height: 18px;
    width: 18px;
    text-align: center;
    line-height: 1;
    margin: 2px 0;
    font-weight: 100;
  }
  span {
    padding: 2px 0 2px 1px;
    display: block;
    font-size: inherit;
  }
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
  border-bottom: 1px solid #777;
  background: #fafafa;
  &:first-of-type {
    background: #f0f8ff;
    padding: 20px 10px;
    margin-top: 42px;
  }
  a {
    display: block;
    text-decoration: none;
    color: #0099f2;
  }
`;
