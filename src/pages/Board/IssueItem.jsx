import React from "react";
import { useDispatch } from "react-redux";
import {
  ItemContainer,
  Label,
  CreateButton,
  DeleteButton,
  FlexRow,
} from "../../styles";
import { UPDATE } from "../../enums/formType";
import { setMode, deleteIssue } from "../../redux/slice/issue/issueSlice";

function IssueItem({
  index,
  title,
  uid,
  status,
  openModal,
  setUid,
  dragStartHandler,
  dragOverHandler,
  dragDropHandler,
}) {
  const dispatch = useDispatch();

  return (
    <ItemContainer
      draggable="true"
      onDragStart={(e) => dragStartHandler(e, index)}
      onDragEnter={(e) => dragOverHandler(e, index, status)}
      onDragEnd={(e) => dragDropHandler(e, index)}
    >
      <Label>{title}</Label>
      <FlexRow>
        <CreateButton
          onClick={() => {
            dispatch(setMode(UPDATE));
            setUid(uid);
            openModal();
          }}
        >
          수정
        </CreateButton>
        <DeleteButton
          onClick={() => {
            dispatch(deleteIssue({ uid, status }));
          }}
        >
          삭제
        </DeleteButton>
      </FlexRow>
    </ItemContainer>
  );
}

export default IssueItem;
