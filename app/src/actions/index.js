/**************
** Constants **
**************/
export const SET_TREE_VIEW_TAB = 'SET_TREE_VIEW_TAB'
export const SET_DOC_VIEW_TAB = 'SET_DOC_VIEW_TAB'
export const MOVE_NODE = 'MOVE_NODE'
export const TOGGLE_NODE = 'TOGGLE_NODE'
export const LOAD_PROJECT = 'LOAD_PROJECT'

/****************
** Clicks Tabs **
****************/
export function setTreeViewTab(index) {
  return { type: SET_TREE_VIEW_TAB, index }
}
export function setDocViewTab(index) {
  return { type: SET_DOC_VIEW_TAB, index }
}

/********************
** TreeView Clicks **
********************/
export function moveNode(sourceNodeID, sourceParentID, targetNodeID, targetParentID) {
  return { type: MOVE_NODE, sourceNodeID, sourceParentID, targetNodeID, targetParentID }
}
export function toggleNode(nodeID) {
  return { type: TOGGLE_NODE, nodeID}
}

/******************
** Open projects **
******************/
export function loadProject(payload) {
  return { type: LOAD_PROJECT, payload }
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
