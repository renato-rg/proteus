/*
 * action types
 */

export const SET_TREE_VIEW_TAB = 'SET_TREE_VIEW_TAB'
export const SET_DOC_VIEW_TAB = 'SET_DOC_VIEW_TAB'
export const MOVE_NODE = 'MOVE_NODE'
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

export function moveNode(sourceDepth, targetDepth, sourceIndex, targetIndex, sourceIndexes, targetIndexes) {
  return { type: MOVE_NODE, sourceDepth, targetDepth, sourceIndex, targetIndex, sourceIndexes, targetIndexes }
}

export function openProject(projectPath) {
  return { type: OPEN_PROJECT, projectPath }
}
