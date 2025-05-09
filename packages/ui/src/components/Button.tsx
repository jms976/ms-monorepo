'use client';

import { PropsWithChildren, MouseEventHandler, AriaRole, ButtonHTMLAttributes, Ref } from 'react';
import { palette, space } from '@common/styles';

type AriaButtonProps = Partial<Pick<HTMLButtonElement, 'type' | 'disabled' | 'tabIndex'>>;

export type ButtonProps = PropsWithChildren<{
  content?: string;
  role?: AriaRole;
  color?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  ref?: Ref<HTMLButtonElement>; // ref를 명시적으로 props로 받음
}> &
  AriaButtonProps &
  ButtonHTMLAttributes<HTMLButtonElement>;

// 화살표 함수로 컴포넌트 정의 (React.FC 없이)
const Button = ({ content, color = palette.blue[9], ref, ...rest }: ButtonProps) => {
  return (
    <button
      ref={ref}
      style={{
        background: color,
        color: palette.blue[5],
        padding: `${space.space.md} ${space.space.sm}`,
        border: 'none',
      }}
      {...rest}>
      {content}
    </button>
  );
};

export default Button;
