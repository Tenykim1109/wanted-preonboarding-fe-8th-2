import React from "react";
import { ISSUE_MAP } from "../../enums/issueType";
import { IssueWrapper, Label, Borderline } from "../../styles";
import IssueItem from "./IssueItem";

function IssueContainer({
  issue,
  openModal,
  setUid,
  status,
  dragStartHandler,
  dragOverHandler,
  dragDropHandler,
  setDestination,
}) {
  return (
    <IssueWrapper
      id={status}
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDrop={(e) => {
        console.log(ISSUE_MAP[status]);
        setDestination(status);
        console.log(e.dataTransfer.getData("itemId"));
      }}
    >
      <Label>{ISSUE_MAP[status]}</Label>
      <Borderline />
      {issue.map((val, index) => (
        <IssueItem
          key={val.uid}
          uid={val.uid}
          title={val.title}
          index={index}
          status={val.status}
          openModal={openModal}
          setUid={setUid}
          dragStartHandler={dragStartHandler}
          dragOverHandler={dragOverHandler}
          dragDropHandler={dragDropHandler}
        />
      ))}
    </IssueWrapper>
  );
}

export default IssueContainer;
