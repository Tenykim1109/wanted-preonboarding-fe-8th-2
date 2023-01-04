import { createSlice } from '@reduxjs/toolkit'
import { CREATE } from '../../../enums/formType';
import { TODO } from '../../../enums/issueType';

const initialState = {
  issueList: [],
  lastUid: 1,
  mode: CREATE,
  target: TODO,
}

export const issueSlice = createSlice({
    name: 'issueTrack',
    initialState,
    reducers: {
        createIssue: (state, action) => {
            const { payload } = action;
            const new_issue = {
                uid: payload.uid,
                title: payload.title,
                status: payload.status,
                manager: payload.manager,
                deadline: payload.deadline,
                content: payload.content,
            }

            state.issueList.push(new_issue);
            state.lastUid += 1; 
        },
        updateIssue: (state, action) => {
            const { payload } = action;
            state.issueList = state.issueList.map((val) => val.uid === payload.uid ? { ...val, 
                title: payload.title,
                status: payload.status,
                manager: payload.manager,
                deadline: payload.deadline,
                content: payload.content, } : val);
        },
        updateIssueByDnD: (state, action) => {
            state.issueList = action.payload;
        },
        deleteIssue: (state, action) => {
            state.issueList = state.issueList.filter((val) => val.uid !== action.payload.uid);
        },
        setMode: (state, action) => {
            state.mode = action.payload;
        },
        setTarget: (state, action) => {
            state.target = action.payload;
        }
    }
})

export const { createIssue, setMode, setTarget, updateIssue, updateIssueByDnD, deleteIssue } = issueSlice.actions;

export default issueSlice.reducer;