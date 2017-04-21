/*
 * action types
 */

export const SET_TREE_VIEW_TAB = 'SET_TREE_VIEW_TAB'
export const SET_DOC_VIEW_TAB = 'SET_DOC_VIEW_TAB'
export const MOVE_NODE = 'MOVE_NODE'
export const TOGGLE_NODE = 'TOGGLE_NODE'
export const OPEN_PROJECT = 'OPEN_PROJECT'

/*
 * action creators
 */

export function setTreeViewTab(index) {
  return { type: SET_TREE_VIEW_TAB, index }
}

export function setDocViewTab(index) {
  return { type: SET_DOC_VIEW_TAB, index }
}

export function moveNode(sourceNodeID, sourceParentID, targetNodeID, targetParentID) {
  return { type: MOVE_NODE, sourceNodeID, sourceParentID, targetNodeID, targetParentID }
}
export function toggleNode(nodeID) {
  return { type: TOGGLE_NODE, nodeID}
}
export function openProject(projectPath) {
  return { type: OPEN_PROJECT, projectPath }
}

/*****************
** Open a modal **
*****************/
export const OPEN_MODAL = 'OPEN_MODAL'
export function openModal(modalName) {
  return { type: OPEN_MODAL, modalName }
}
