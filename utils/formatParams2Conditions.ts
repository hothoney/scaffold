export enum ConditionTypeEnum {
  Equals = 0,
  Like = 1,
  // greaterThan = 2,
  // lessthan = 3,
}
const formatParams2Conditions = (params: Record<string, any>) => {
  return Object.entries(params).map(([key, value]) => ({
    name: key,
    value,
    conditionType: ConditionTypeEnum.Like,
  }));
};

export default formatParams2Conditions;
