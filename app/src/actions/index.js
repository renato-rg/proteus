/*
 * action types
 */

export const SET_TREE_VIEW_TAB = 'SET_TREE_VIEW_TAB'
export const SET_DOC_VIEW_TAB = 'SET_DOC_VIEW_TAB'
export const MOVE_NODE = 'MOVE_NODE'

/*
 * action creators
 */

export function setTreeViewTab(index) {
  return { type: SET_TREE_VIEW_TAB, index }
}

export function setDocViewTab(index) {
  return { type: SET_DOC_VIEW_TAB, index }
}

export function moveNode(sourceDepth, targetDepth, sourceIndex, targetIndex, sourceIndexes, targetIndexes) {
  return { type: MOVE_NODE, sourceDepth, targetDepth, sourceIndex, targetIndex, sourceIndexes, targetIndexes }
}

/*****************
** Open a modal **
*****************/
export const OPEN_MODAL = 'OPEN_MODAL'
export function openModal(modalName) {
  return { type: OPEN_MODAL, modalName }
}


/*******************************************
** External actions triggered by Electron **
*******************************************/
export const OPEN_PROJECT = 'OPEN_PROJECT'
export const NEW_PROJECT = 'NEW_PROJECT'
export function openProject(arg) {
  return { type: OPEN_PROJECT, arg }
}
export function newProject(arg) {
  return { type: NEW_PROJECT, arg }
}
