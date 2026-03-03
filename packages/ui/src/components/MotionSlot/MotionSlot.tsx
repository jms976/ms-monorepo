'use client';

import { Fragment, isValidElement, useMemo } from 'react';
import type { ComponentType, ElementType, ReactElement, ReactNode } from 'react';

import { motion, type HTMLMotionProps } from 'framer-motion';

type MotionTag = keyof HTMLElementTagNameMap;

type NonFragmentElement = ReactElement<{ children?: ReactNode }, MotionTag>;

type ChildrenModeSlotProps<C extends NonFragmentElement> = {
  childrenMode: 'slot';
  as?: never;
  children: ReactElement;
  styleWrapper?: never;
} & HTMLMotionProps<C['type']>;

type ChildrenModeWrapProps<T extends MotionTag> = {
  childrenMode: 'wrap';
  as?: T;
  children?: ReactNode;
  styleWrapper?: ComponentType<{ children: ReactNode }>;
} & HTMLMotionProps<T>;

type DefaultProps<C extends NonFragmentElement> = {
  childrenMode?: never;
  as?: never;
  children?: ReactElement;
  styleWrapper?: never;
} & HTMLMotionProps<C['type']>;

export type MotionSlotProps<C extends NonFragmentElement, T extends MotionTag = 'div'> =
  | ChildrenModeSlotProps<C>
  | ChildrenModeWrapProps<T>
  | DefaultProps<C>;

const MotionSlot = <C extends NonFragmentElement, T extends MotionTag = 'div'>(props: MotionSlotProps<C, T>) => {
  const { childrenMode = 'slot', as = 'div', children, styleWrapper, ...rest } = props;

  const child = childrenMode === 'slot' && isValidElement(children) ? (children as C) : null;
  const childType = child?.type ?? Fragment;

  const MotionComponent = useMemo(() => {
    if (childrenMode === 'wrap')
      return styleWrapper ? motion.create(styleWrapper) : (motion[as as MotionTag] as ElementType);

    if (typeof childType === 'string') return motion[childType as MotionTag] as ElementType;

    return motion.create(childType);
  }, [childrenMode, as, styleWrapper, childType]);

  if (childrenMode === 'slot') {
    if (!child) {
      console.warn('[MotionSlot] children은 유효한 ReactElement여야 합니다.');

      return null;
    }

    if (childType === Fragment) {
      return <motion.div {...(rest as HTMLMotionProps<'div'>)}>{child.props.children}</motion.div>;
    }

    return (
      <MotionComponent {...rest} {...child.props}>
        {child.props.children}
      </MotionComponent>
    );
  }

  return <MotionComponent {...rest}>{children}</MotionComponent>;
};

MotionSlot.displayName = 'MotionSlot';
export default MotionSlot;
