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
import {
  setMode,
  deleteIssue,
  setTarget,
} from "../../redux/slice/issue/issueSlice";

function IssueItem({ name, uid, state, openModal, setUid }) {
  const handleDrag = (e) => {
    console.log("drag start");
  };

  const dispatch = useDispatch();

  return (
    <ItemContainer draggable="true" onDragStart={handleDrag}>
      <Label>{name}</Label>
      <FlexRow>
        <CreateButton
          onClick={() => {
            dispatch(setMode(UPDATE));
            setUid(uid);
            dispatch(setTarget(state));
            openModal();
          }}
        >
          수정
        </CreateButton>
        <DeleteButton
          onClick={() => {
            dispatch(deleteIssue({ uid, state }));
          }}
        >
          삭제
        </DeleteButton>
      </FlexRow>
    </ItemContainer>
  );
}

export default IssueItem;
