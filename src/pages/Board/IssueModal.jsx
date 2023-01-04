import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ModalFrame,
  ModalBody,
  Background,
  CreateButton,
  ButtonFrame,
} from "../../styles";
import { createIssue, updateIssue } from "../../redux/slice/issue/issueSlice";
import { TODO, IN_PROGRESS, DONE, ISSUE_MAP } from "../../enums/issueType";
import { UPDATE } from "../../enums/formType";

function IssueModal({ visible, onClose, uid }) {
  const [name, setName] = useState("");
  const [state, setState] = useState(TODO);
  const [manager, setManager] = useState("");
  const [content, setContent] = useState("");
  const [deadline, setDeadline] = useState("");
  const [loading, setLoading] = useState(false);
  const [stateBeforeUpdate, setStateBeforeUpdate] = useState("");

  const dispatch = useDispatch();
  const issue = useSelector((state) => state.issueTrack.issue);
  const lastUid = useSelector((state) => state.issueTrack.lastUid);
  const mode = useSelector((state) => state.issueTrack.mode);
  const target = useSelector((state) => state.issueTrack.target);

  const issueType = [TODO, IN_PROGRESS, DONE];

  useEffect(() => {
    setLoading(true);
    const getIssue = () => {
      if (mode === UPDATE) {
        const update_issue = issue[target].filter((val) => val.uid === uid)[0];

        setName(update_issue.name);
        setState(update_issue.state);
        setManager(update_issue.manager);
        setDeadline(update_issue.deadline);
        setContent(update_issue.content);
        setStateBeforeUpdate(update_issue.state);
      }
    };

    getIssue();
    setTimeout(() => setLoading(false), 500);
  }, []);

  return (
    <>
      <Background visible={visible} onClick={onClose} />
      <ModalFrame visible={visible}>
        <ModalBody>
          <div>안녕!</div>
          <input
            type="text"
            name="title"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="제목"
          />
          <select
            name="state"
            value={state}
            onChange={(e) => setState(e.target.value)}
          >
            {issueType.map((type) => (
              <option key={type} value={type}>
                {ISSUE_MAP[type]}
              </option>
            ))}
          </select>
          <input
            type="text"
            name="manager"
            value={manager}
            onChange={(e) => setManager(e.target.value)}
            placeholder="담당자"
          />
          <input
            type="datetime-local"
            name="deadline"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            placeholder="마감일"
          />
          <textarea
            placeholder="내용을 입력해주세요"
            name="contents"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <ButtonFrame>
            <CreateButton
              onClick={() => {
                if (mode === UPDATE) {
                  const new_issue = {
                    uid,
                    name,
                    state,
                    manager,
                    deadline,
                    content,
                    stateBeforeUpdate,
                  };
                  dispatch(updateIssue(new_issue));
                } else {
                  const new_issue = {
                    uid: lastUid,
                    name,
                    state,
                    manager,
                    deadline,
                    content,
                  };
                  dispatch(createIssue(new_issue));
                }
                onClose();
              }}
            >
              저장
            </CreateButton>
          </ButtonFrame>
        </ModalBody>
      </ModalFrame>
    </>
  );
}

export default IssueModal;
