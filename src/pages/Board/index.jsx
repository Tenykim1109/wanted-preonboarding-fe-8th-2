import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CREATE } from "../../enums/formType";
import { setMode, updateIssueByDnD } from "../../redux/slice/issue/issueSlice";
import { Container, CreateButton, FlexColumn } from "../../styles";
import IssueContainer from "./IssueContainer";
import IssueModal from "./IssueModal";
import { DONE, IN_PROGRESS, TODO } from "../../enums/issueType";

function BoardPage() {
  const [open, setOpen] = useState(false);
  const [uid, setUid] = useState(0);
  const issueList = useSelector((state) => state.issueTrack.issueList);

  const dispatch = useDispatch();

  const dragIssueCard = useRef();
  const dragOverItem = useRef();
  const dragEnterSection = useRef();

  const openModal = () => setOpen(!open);
  const closeModal = () => setOpen(false);

  const handleDragStart = (e, position) => {
    dragIssueCard.current = e.target.children[0].innerText;
  };

  const handleDragEnter = (e, position, status) => {
    e.stopPropagation();
    if (e.target.children[0]?.innerText !== undefined) {
      dragOverItem.current = e.target.children[0]?.innerText;
    }

    dragEnterSection.current = status;
  };

  const handleDragDrop = (e, position) => {
    const dragIssue = issueList.find(
      (el) => el.title === dragIssueCard.current
    );
    const overIssue = issueList.find((el) => el.title === dragOverItem.current);
    const startSection = dragIssue.status;

    console.log(dragIssue);
    console.log(overIssue);
    console.log(startSection);
    console.log(dragEnterSection.current);

    if (startSection === dragEnterSection.current) {
      const initCopyList = [
        ...issueList.filter((el) => el.uid !== dragIssue.uid),
      ];

      console.log("before", initCopyList);
      console.log(issueList);

      console.log(dragIssue.uid);
      console.log(overIssue.uid);
      if (
        issueList.findIndex((el) => el.uid === dragIssue.uid) <
        issueList.findIndex((el) => el.uid === overIssue.uid)
      ) {
        initCopyList.splice(
          initCopyList.findIndex((el) => el.uid === overIssue.uid) + 1,
          0,
          dragIssue
        );
      } else {
        initCopyList.splice(
          initCopyList.findIndex((el) => el.uid === overIssue.uid),
          0,
          dragIssue
        );
      }

      console.log("after", initCopyList);
      dispatch(updateIssueByDnD(initCopyList));
      console.log(initCopyList.findIndex((el) => el.uid === overIssue.uid));
      console.log("얍!");
      console.log(initCopyList);
    } else {
      // dragIssue.status = dragEnterSection.current;
      const res = [
        ...issueList.filter((el) => el.title !== dragIssueCard.current),
        { ...dragIssue, status: dragEnterSection.current },
      ];

      console.log(res);

      dispatch(
        updateIssueByDnD([
          ...issueList.filter((el) => el.title !== dragIssueCard.current),
          { ...dragIssue, status: dragEnterSection.current },
        ])
      );
      // setIssues([
      //   ...issues.filter((el) => el.title !== dragIssueCard.current),
      //   { ...dragIssue },
      // ]);
    }
  };

  return (
    <>
      <FlexColumn>
        <div style={{ textAlign: "center" }}>
          <CreateButton
            onClick={() => {
              dispatch(setMode(CREATE));
              openModal();
            }}
          >
            새로 만들기
          </CreateButton>
        </div>
        <Container>
          <IssueContainer
            issue={issueList.filter((issue) => issue.status === TODO)}
            setUid={setUid}
            openModal={openModal}
            status={TODO}
            dragStartHandler={handleDragStart}
            dragOverHandler={handleDragEnter}
            dragDropHandler={handleDragDrop}
          />
          <IssueContainer
            issue={issueList.filter((issue) => issue.status === IN_PROGRESS)}
            setUid={setUid}
            openModal={openModal}
            status={IN_PROGRESS}
            dragStartHandler={handleDragStart}
            dragOverHandler={handleDragEnter}
            dragDropHandler={handleDragDrop}
          />
          <IssueContainer
            issue={issueList.filter((issue) => issue.status === DONE)}
            setUid={setUid}
            openModal={openModal}
            status={DONE}
            dragStartHandler={handleDragStart}
            dragOverHandler={handleDragEnter}
            dragDropHandler={handleDragDrop}
          />
        </Container>
      </FlexColumn>
      {open ? (
        <IssueModal visible={open} onClose={closeModal} uid={uid} />
      ) : null}
    </>
  );
}

export default BoardPage;
