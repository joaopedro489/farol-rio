export const stringToArrayTransformer = (obj: any, inst?: (v: any) => any) =>
  (obj.value instanceof Array ? obj.value : obj?.value?.split(',')).map((v) =>
    inst ? inst(v) : v,
  )
