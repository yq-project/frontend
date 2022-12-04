const stateMap = new Map<number, string>();
stateMap.set(0, '待老师审核');
stateMap.set(1, '待学生重新提交');
stateMap.set(2, '审核通过');
stateMap.set(3, '老师终止流程');
stateMap.set(4, '学生撤回上传信息');

const commentTaskStateMap = new Map<number, string>();
commentTaskStateMap.set(0, '反馈中');
commentTaskStateMap.set(1, '完成反馈');
export { stateMap, commentTaskStateMap };
