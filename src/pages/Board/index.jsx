import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CREATE } from "../../enums/formType";
import { setMode } from "../../redux/slice/issue/issueSlice";
import {
  Container,
  IssueContainer,
  CreateButton,
  FlexColumn,
  Label,
  Borderline,
} from "../../styles";
import IssueItem from "./IssueItem";
import IssueModal from "./IssueModal";

function BoardPage() {
  const [create, setCreate] = useState(false);
  const [uid, setUid] = useState(0);
  const issue = useSelector((state) => state.issueTrack.issue);

  const onClose = () => setCreate(false);
  const dispatch = useDispatch();

  return (
    <>
      <FlexColumn>
        <div style={{ textAlign: "center" }}>
          <CreateButton
            onClick={() => {
              dispatch(setMode(CREATE));
              setCreate(!create);
            }}
          >
            새로 만들기
          </CreateButton>
        </div>
        <Container>
          <IssueContainer
            onDragOver={(e) => {
              e.preventDefault();
            }}
            onDrop={() => {
              console.log("할 일");
            }}
          >
            <Label>할 일</Label>
            <Borderline />
            {issue.todo.map((val) => (
              <IssueItem
                key={val.uid}
                uid={val.uid}
                name={val.name}
                state={val.state}
                openModal={() => setCreate(!create)}
                setUid={setUid}
              />
            ))}
          </IssueContainer>
          <IssueContainer
            onDragOver={(e) => {
              e.preventDefault();
            }}
            onDrop={() => {
              console.log("진행중");
            }}
          >
            <Label>진행중</Label>
            <Borderline />
            {issue.inProgress.map((val) => (
              <IssueItem
                key={val.uid}
                uid={val.uid}
                name={val.name}
                state={val.state}
                openModal={() => setCreate(!create)}
                setUid={setUid}
              />
            ))}
          </IssueContainer>
          <IssueContainer
            onDragOver={(e) => {
              e.preventDefault();
            }}
            onDrop={() => {
              console.log("완료");
            }}
          >
            <Label>완료</Label>
            <Borderline />
            {issue.done.map((val) => (
              <IssueItem
                key={val.uid}
                uid={val.uid}
                name={val.name}
                state={val.state}
                openModal={() => setCreate(!create)}
                setUid={setUid}
              />
            ))}
          </IssueContainer>
        </Container>
      </FlexColumn>
      {create ? (
        <IssueModal visible={create} onClose={onClose} uid={uid} />
      ) : null}
    </>
  );
}

export default BoardPage;
