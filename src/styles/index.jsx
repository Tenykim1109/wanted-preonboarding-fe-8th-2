import styled, { css, keyframes } from "styled-components";

export const FlexRow = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
`;

export const IssueContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  padding: 16px;
  border: 1px solid;
  border-radius: 16px;
  margin: 8px;
`;

export const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px;
  border-radius: 16px;
  padding: 16px;
  box-shadow: 4px 4px 8px gray;
  margin-top: 8px;
  margin-bottom: 8px;
`;

export const Title = styled.h2``;

export const CreateButton = styled.button`
  margin-left: 8px;
  margin-right: 8px;
  background: #2383e2;
  color: white;
  font-size: medium;
  font-weight: bold;
  padding: 8px;
  border: none;
  border-radius: 4px;

  &:hover {
    background: #1b62a9;
  }
`;

export const DeleteButton = styled.button`
  margin-left: 8px;
  margin-right: 8px;
  background: #ff0000;
  color: white;
  font-size: medium;
  font-weight: bold;
  padding: 8px;
  border: none;
  border-radius: 4px;

  &:hover {
    background: #990000;
  }
`;

export const Label = styled.span`
  font-size: medium;
  font-weight: bold;
  margin: 16px;
`;

export const fadeIn = keyframes`
0% {
    opacity: 0;
}
100% {
    opacity: 1;
}`;

export const fadeOut = keyframes`
0% {
    opacity: 1;
}
100% {
    opacity: 0;
}`;

export const IconButton = styled.button`
  border: none;
  background-color: transparent;
  border-radius: 20px;
  &:hover {
    background-color: rgb(225, 225, 225);
  }
`;

const modalSettings = (visible) => css`
  visibility: ${visible ? "visible" : "hidden"};
  z-index: 15;
  animation: ${visible ? fadeIn : fadeOut} 0.15s ease-out;
  transition: visibility 0.15s ease-out;
`;

// modal 열었을 때 modal 외 다른 부분은 검게 처리
export const Background = styled.div`
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
  ${(props) => modalSettings(props.visible)}
`;

export const TitleDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: ;
`;

export const ModalFrame = styled.div`
  display: flex;
  overflow: hidden;
  width: 400px;
  min-height: 80vh;
  max-height: 80vh;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(255, 255, 255, 1);
  flex-direction: column;
  border-radius: 10px;
  ${(props) => modalSettings(props.visible)}
`;

export const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0px 0px 2rem;
  overflow: hidden auto;
  align-self: center;
  max-width: 420px;
  max-height: 80vh;
  min-height: 80vh;
  padding: 8px;
`;

export const GridFrame = styled.div`
  display: grid;
  grid-auto-rows: auto;
  row-gap: 12px;
`;

export const SearchDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;

export const SearchInput = styled.input`
  display: flex;
  align-items: center;
  width: 100%;
  outline: none;
  border: 1px solid rgb(225, 225, 225);
  border-radius: 16px;
  padding: 16px 16px 16px 40px;
`;

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
`;

export const Chip = styled.div`
  display: flex;
  border: 1px solid rgb(225, 225, 225);
  border-radius: 8px;
  align-items: center;
  cursor: pointer;
  padding: 8px;
  margin: 4px;
  &:hover {
    background-color: rgb(225, 225, 225);
  }
`;

export const Borderline = styled.div`
  width: 100%;
  height: 1px;
  background-color: rgb(225, 225, 225);
  margin: 0px 4px;
`;

export const SymbolFrame = styled.div`
  padding: 4px 20px;
  display: grid;
  grid-template-columns: auto minmax(auto, 1fr) auto minmax(0px, 72px);
  ${(props) =>
    !props.same &&
    css`
      cursor: pointer;
      &:hover {
        background-color: rgb(225, 225, 225);
      }
    `}
  gap: 16px;
  opacity: 1;
  height: 56px;
`;

export const ButtonFrame = styled.div`
  border-radius: 0px 0px 20px 20px;
  padding: 20px;
  border-top: 1px solid rgb(225, 225, 225);
`;

export const Button = styled.button`
  padding: 16px;
  width: 100%;
  outline: none;
  border: 1px solid transparent;
  text-align: center;
  border-radius: 10px;
`;
