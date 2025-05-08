export type Nullable<T> = T | null;

export type NestedObject = { [K: string]: Nullable<string | NestedObject> };

type Join<K, P> = K extends string | number
  ? P extends string | number
    ? P extends 'DEFAULT'
      ? K
      : `${K}${'' extends P ? '' : '-'}${P}`
    : never
  : never;

type DepthList = [never, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, ...0[]];

// type Paths<T, D extends number = 2> = [D] extends [never]
//   ? never
//   : T extends object
//   ? {
//       [K in keyof T]-?: K extends string | number ? `${K}` | Join<K, Paths<T[K], DepthList[D]>> : never;
//     }[keyof T]
//   : '';

type Leaves<T, Depth extends number = 2> = [Depth] extends [never]
  ? never
  : T extends object
    ? { [K in keyof T]-?: Join<K, Leaves<T[K], DepthList[Depth]>> }[keyof T]
    : '';

const flatObject = <T extends NestedObject>(res: T, key: string, val: Nullable<string | NestedObject>, pre = ''): T => {
  const prefix = key === 'DEFAULT' ? pre : [pre, key].filter((v) => v).join('-');

  return typeof val === 'string' || val === null
    ? Object.assign(res, { [prefix]: val })
    : Object.keys(val).reduce((prev, curr) => flatObject(prev, curr, val[curr], prefix), res);
};

const tokenToVariants = <T extends NestedObject>(obj: T): { [K in Leaves<T>]: string } =>
  Object.keys(obj).reduce(
    (prev, curr: string) => flatObject(prev, curr, obj[curr]),
    {} as { [K in Leaves<T>]: string },
  );

export default tokenToVariants;
