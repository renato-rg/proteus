/****************
** Tabs Clicks **
****************/
export const SET_TREE_VIEW_TAB = 'SET_TREE_VIEW_TAB'
export function setTreeViewTab(index) {
  return { type: SET_TREE_VIEW_TAB, index }
}

export const SET_DOC_VIEW_TAB = 'SET_DOC_VIEW_TAB'
export function setDocViewTab(index) {
  return { type: SET_DOC_VIEW_TAB, index }
}

/***************************
** TreeView Drag and Drop **
***************************/
export const MOVE_NODE = 'MOVE_NODE'
export function moveNode(sourceNodeID, sourceParentID, targetNodeID, targetParentID) {
  return { type: MOVE_NODE, sourceNodeID, sourceParentID, targetNodeID, targetParentID }
}

export const TOGGLE_NODE = 'TOGGLE_NODE'
export function toggleNode(nodeID) {
  return { type: TOGGLE_NODE, nodeID}
}

/***********************
** Project Management **
***********************/
export const LOAD_PROJECT = 'LOAD_PROJECT'
export function loadProject(payload) {
  return { type: LOAD_PROJECT, payload }
}

export const SET_PROJECT_PATH = 'SET_PROJECT_PATH'
export function setProjectPath(payload) {
  return { type: SET_PROJECT_PATH, payload }
}

export const SET_PROJECT_INFO = 'SET_PROJECT_INFO'
export function setProjectInfo(payload) {
  return { type: SET_PROJECT_INFO, payload }
}

/************************
** Notification System **
************************/
export const SHOW_NOTIFICATION = 'SHOW_NOTIFICATION'
export function showNotification(payload) {
  return { type: SHOW_NOTIFICATION, payload }
}

/************************
** Application's State **
************************/
export const APP_STATE = 'APP_STATE'
export function setAppStateTo(payload) {
  return { type: APP_STATE, payload }
}

/****************
** Open modals **
****************/
export const OPEN_MODAL = 'OPEN_MODAL'
export function openModal(modalName) {
  return { type: OPEN_MODAL, modalName }
}

/**************************
** Update Editable Field **
**************************/
export const UPDATE_EDITABLE_FIELD = 'UPDATE_EDITABLE_FIELD'
export function updateEditableField(nodeID, fieldPath, newValue) {
  return { type: UPDATE_EDITABLE_FIELD, nodeID, fieldPath, newValue }
}
