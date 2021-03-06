import React from "react";
import styled from "styled-components";

export const Header = styled.header`
  color: #fff;
  background: #333;
  padding: 10px 5vw;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #222;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 900;

  h1 {
    margin: 0;
    display: block;
    font-size: 24px;
    font-weight: 700;
    text-transform: uppercase;
  }
`;
export const Wrapper = styled.div`
  background: #efefef;
  min-height: 100vh;
  margin: 0 auto;
`;

export const Log = styled.div`
  padding: 10px 5vw;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #777;
  background: #fafafa;
  overflow: hidden;
  height: 45px;
  transition: all;

  &:first-of-type {
    background: #fff;
    padding: 20px 5vw;
    margin-top: 42px;
    height: 100%;
  }
  &:hover {
    height: 100%;
  }
  a {
    display: block;
    text-decoration: none;
    color: #037dde;
  }
`;

export const PerfBlock = styled.div`
  min-width: 40vw;
`;

export const ErrorBlock = styled.div`
  background: #f0f8ff;
  padding: 20px;
  border: 1px solid red;

  b {
    color: red;
  }
  p {
    margin: 0;
  }
`;

const SVG = styled.svg`
  display: block;
  margin: ${p => p.margin};
`;

export const FingerPrint = ({
  width = 24,
  height = 33,
  color = "white",
  margin = "0 20px"
}) => (
  <SVG
    viewBox={`0 0 ${width} ${height}`}
    width={width}
    height={height}
    margin={margin}
  >
    <g fill={color} fillRule="nonzero">
      <path d="M1.029 7.966a.702.702 0 0 0-.263.704c.06.264.265.47.529.527.217.048.418.045 1.037-.43a5.66 5.66 0 0 0 1.056-1.063l.164-.218c1.404-1.868 4.692-6.241 9.441-6.004 3.917.286 6.694 3.244 8.029 8.554.045.18.073.291.104.376.204.869.546 1.95 1.04 2.307a.69.69 0 0 0 .965-.156.69.69 0 0 0-.125-.942c-.137-.176-.393-.915-.546-1.576a.667.667 0 0 0-.037-.115 12.079 12.079 0 0 1-.06-.231c-.212-.842-.774-3.078-2.137-5.18-1.762-2.716-4.163-4.202-7.14-4.417h-.015C7.585-.178 3.984 4.61 2.447 6.655l-.162.215c-.421.556-.918.902-1.09 1.003a.703.703 0 0 0-.166.093z" />
      <path d="M18.614 11.85c.521-1.305.534-2.651.034-3.696-.446-.932-1.277-1.607-2.403-1.952-1.654-.506-3.658.412-5.495 2.516-.024.026-2.638 2.776-5.383 4.456-.02.013-2.03 1.218-4.128 1.79a.69.69 0 1 0 .364 1.334c2.282-.622 4.39-1.886 4.483-1.942 2.978-1.823 5.679-4.697 5.702-4.724 1.114-1.277 2.764-2.502 4.051-2.108.757.232 1.283.645 1.561 1.227.334.697.308 1.638-.07 2.584-.705 1.76-2.899 3.887-6.178 5.986-1.645 1.054-5.784 3.64-8.708 4.89a.691.691 0 1 0 .543 1.27c3.02-1.29 7.237-3.923 8.911-4.995 2.49-1.594 5.676-4.04 6.716-6.637zM7.477 6.687c-.314.346-.595.716-.9 1.071-.396.465-.83.898-1.284 1.308-.466.42-.843.722-1.393 1.038a29.78 29.78 0 0 1-1.782.967 3.849 3.849 0 0 1-.62.238.7.7 0 0 0-.483.85c.097.357.489.592.85.483.707-.212 1.348-.576 1.987-.939.539-.306 1.074-.583 1.57-.96.966-.734 1.797-1.592 2.562-2.53A14.697 14.697 0 0 1 9.868 6.3l.164-.134c.015-.012.123-.097.15-.12.482-.368.994-.696 1.534-.973a6.24 6.24 0 0 1 1.642-.575c.206-.043.25-.047.405-.063.374-.039.691-.285.691-.691 0-.348-.316-.73-.691-.692-2.5.258-4.639 1.82-6.286 3.636z" />
      <path d="M2.096 19.927c1.502-.515 9.215-3.395 13.534-9.45a.69.69 0 1 0-1.125-.803c-4.074 5.71-11.427 8.454-12.859 8.946-.03.01-.049.016-.055.02a.692.692 0 0 0 .48 1.296l.025-.009zM20.912 24.044c-.958-.32-2.131-1.155-3.265-1.962-1.643-1.17-3.06-2.18-4.217-1.982-.868.15-2.385 1.12-4.78 2.699-1.727 1.138-3.683 2.428-4.535 2.657a.692.692 0 0 0 .36 1.336c1.066-.288 2.946-1.527 4.936-2.838 1.608-1.06 3.609-2.379 4.254-2.49.588-.1 2.025.922 3.18 1.745 1.217.866 2.475 1.763 3.63 2.148a.691.691 0 1 0 .437-1.313z" />
      <path d="M19.18 27.431c-.557-.201-1.463-.761-2.34-1.302-1.85-1.144-3.026-1.838-3.871-1.692-.855.147-2.65 1.368-5.665 3.569-.37.269-.688.502-.908.658a.69.69 0 1 0 .797 1.13c.23-.163.553-.399.926-.671 1.2-.876 4.387-3.203 5.078-3.322.431-.03 1.988.93 2.917 1.504.979.605 1.904 1.177 2.597 1.427a.691.691 0 1 0 .47-1.3z" />
      <path d="M16.845 30.87a31.946 31.946 0 0 1-1.091-.756c-1.134-.81-2.114-1.509-3.189-1.322-1.21.208-3.136 2.146-3.51 2.532a.691.691 0 0 0 .994.962c.925-.957 2.24-2.044 2.752-2.132.504-.086 1.267.457 2.15 1.086.34.243.726.518 1.139.788a.692.692 0 1 0 .755-1.159zM22.93 16.595c-.576-.243-1.179-.499-1.664-.903-.535-.444-.783-1.028-.894-1.701-.145-.879-1.477-.505-1.333.367.295 1.794 1.616 2.765 3.193 3.432.347.146.738.108.946-.248.172-.294.1-.8-.248-.947zM21.588 20.203c-.52-.16-.913-.363-1.463-.687-1.007-.595-1.925-1.457-2.37-2.557-.142-.349-.456-.592-.851-.483-.332.091-.625.5-.483.851.824 2.032 2.716 3.568 4.8 4.21.854.263 1.216-1.072.367-1.334z" />
      <path d="M-4.917.09h6.72V-.984H-5.99v7.791h1.072zM22.205-.983V.089h6.72v6.72h1.072V-.984zM-4.928 27.188H-6v7.792h7.791v-1.072h-6.719zM28.913 33.908h-6.72v1.072h7.793v-7.792h-1.073z" />
    </g>
  </SVG>
);
