import { createSlice } from '@reduxjs/toolkit'
import { CREATE } from '../../../enums/formType';
import { TODO } from '../../../enums/issueType';

const initialState = {
  issue: {
    todo: [],
    inProgress: [],
    done: [],
  },
  lastUid: 1,
  mode: CREATE,
  target: TODO,
}

export const issueSlice = createSlice({
    name: 'issueTrack',
    initialState,
    reducers: {
        init: (state) => {
            state.issue.todo = localStorage.getItem('todo');
            state.issue.inProgress = localStorage.getItem('inProgress');
            state.issue.done = localStorage.getItem('done');
        },
        createIssue: (state, action) => {
            const { payload } = action;
            const new_issue = {
                uid: payload.uid,
                name: payload.name,
                state: payload.state,
                manager: payload.manager,
                deadline: payload.deadline,
                content: payload.content,
            }

            state.issue[action.payload.state] = [...state.issue[action.payload.state], new_issue];
            state.lastUid += 1; 
        },
        updateIssue: (state, action) => {
            const { payload } = action;

            if (payload.stateBeforeUpdate === payload.state) {
                state.issue[payload.state] = state.issue[payload.state].map((val) => val.uid === payload.uid ? { ...val, name: payload.name,
                    state: payload.state,
                    manager: payload.manager,
                    deadline: payload.deadline,
                    content: payload.content,} : val);
            } else {
                state.issue[payload.stateBeforeUpdate] = state.issue[payload.stateBeforeUpdate].filter((val) => val.uid !== payload.uid);
                state.issue[payload.state] = [...state.issue[payload.state], {
                    uid: payload.uid,
                    name: payload.name,
                    state: payload.state,
                    manager: payload.manager,
                    deadline: payload.deadline,
                    content: payload.content,}
                ]
            }
        },
        deleteIssue: (state, action) => {
            state.issue[action.payload.state] = state.issue[action.payload.state].filter((val) => val.uid !== action.payload.uid);
        },
        updateUid: (state) => {
            state.lastUid += 1;
        },
        setMode: (state, action) => {
            state.mode = action.payload;
        },
        setTarget: (state, action) => {
            state.target = action.payload;
        }
    }
})

export const { init, createIssue, setMode, setTarget, updateIssue, deleteIssue } = issueSlice.actions;

export default issueSlice.reducer;