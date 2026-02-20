import { Fragment, isValidElement, useMemo } from 'react';
import { motion } from 'framer-motion';

import type { ElementType, ExoticComponent, ReactElement, ReactNode } from 'react';
import type { HTMLMotionProps } from 'framer-motion';

type MotionTag = keyof HTMLElementTagNameMap;

type NonFragmentElement = ReactElement<{ children?: ReactNode }> & {
  type: Exclude<ElementType, ExoticComponent<object>>;
};

type ChildTag<C extends NonFragmentElement> = C['type'] extends MotionTag ? C['type'] : 'div';

type AsChildTrueProps<C extends NonFragmentElement> = {
  asChild: true;
  as?: never;
  children: ReactElement;
} & HTMLMotionProps<ChildTag<C>>;

type AsChildFalseProps<T extends MotionTag = 'div'> = {
  asChild: false;
  as?: T;
  children?: ReactElement;
} & HTMLMotionProps<T>;

type DefaultProps = {
  asChild?: never;
  as?: never;
  children?: ReactElement;
} & HTMLMotionProps<'div'>;

type MotionWrapperProps<C extends NonFragmentElement, T extends MotionTag = 'div'> =
  | AsChildTrueProps<C>
  | AsChildFalseProps<T>
  | DefaultProps;

const MotionWrapper = <C extends NonFragmentElement, T extends MotionTag = 'div'>(props: MotionWrapperProps<C, T>) => {
  const { asChild = true, as = 'div', children, ...rest } = props;

  const child = asChild && isValidElement(children) ? (children as C) : null;
  const childType = child?.type;

  const MotionComponent = useMemo(() => {
    if (!asChild) return motion[as as MotionTag] as ElementType;
    if (typeof childType === 'string') return motion[childType as MotionTag] as ElementType;

    return motion(childType as ElementType);
  }, [asChild, as, childType]);

  if (asChild) {
    if (!child) {
      console.warn('[MotionWrapper] children은 유효한 ReactElement여야 합니다.');

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

export default MotionWrapper;
