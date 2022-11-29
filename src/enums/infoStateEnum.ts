const stateMap = new Map<number, string>();
stateMap.set(0, '待老师审核');
stateMap.set(1, '待学生重新提交');
stateMap.set(2, '审核通过');
stateMap.set(3, '老师终止流程');
stateMap.set(4, '学生撤回上传信息');
export { stateMap };
