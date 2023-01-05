import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading";
import {
  ModalFrame,
  ModalBody,
  Background,
  CreateButton,
  ButtonFrame,
  DeleteButton,
} from "../../styles";
import { createIssue, updateIssue } from "../../redux/slice/issue/issueSlice";
import { TODO, IN_PROGRESS, DONE, ISSUE_MAP } from "../../enums/issueType";
import { UPDATE } from "../../enums/formType";

function IssueModal({ visible, onClose, uid }) {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState(TODO);
  const [manager, setManager] = useState("");
  const [content, setContent] = useState("");
  const [deadline, setDeadline] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const issue = useSelector((state) => state.issueTrack.issueList);
  const lastUid = useSelector((state) => state.issueTrack.lastUid);
  const mode = useSelector((state) => state.issueTrack.mode);

  const issueType = [TODO, IN_PROGRESS, DONE];

  useEffect(() => {
    setLoading(true);
    const getIssue = () => {
      if (mode === UPDATE) {
        const update_issue = issue.filter((val) => val.uid === uid)[0];

        setTitle(update_issue.title);
        setStatus(update_issue.status);
        setManager(update_issue.manager);
        setDeadline(update_issue.deadline);
        setContent(update_issue.content);
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
          {loading ? (
            <Loading />
          ) : (
            <>
              <div>안녕!</div>
              <input
                type="text"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="제목"
              />
              <select
                name="state"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
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
                <DeleteButton onClick={() => onClose()}>취소</DeleteButton>
                <CreateButton
                  onClick={() => {
                    if (mode === UPDATE) {
                      const new_issue = {
                        uid,
                        title,
                        status,
                        manager,
                        deadline,
                        content,
                      };
                      dispatch(updateIssue(new_issue));
                    } else {
                      const new_issue = {
                        uid: lastUid,
                        title,
                        status,
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
            </>
          )}
        </ModalBody>
      </ModalFrame>
    </>
  );
}

export default IssueModal;
