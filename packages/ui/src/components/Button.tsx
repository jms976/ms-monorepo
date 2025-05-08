import { forwardRef, Ref, PropsWithChildren, MouseEventHandler, AriaRole, ButtonHTMLAttributes } from 'react';
import { palette, space } from '@common/styles';

type AriaButtonProps = Partial<Pick<HTMLButtonElement, 'type' | 'disabled' | 'tabIndex'>>;

export type ButtonProps = PropsWithChildren<{
  content?: string;
  role?: AriaRole;
  color?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}> &
  AriaButtonProps &
  ButtonHTMLAttributes<HTMLButtonElement>;

const Button = forwardRef((props: ButtonProps, ref: Ref<HTMLButtonElement>) => {
  const { content, color = palette.blue[9], ...rest } = props;

  return (
    <button
      ref={ref}
      style={{
        background: color,
        color: palette.gray[0],
        padding: `${space.md} ${space.sm}`,
        border: 'none',
      }}
      {...rest}>
      {content}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
