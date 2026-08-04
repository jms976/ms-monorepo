'use client';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';

const Wrapper = styled.div<{ radius: string }>`
  position: relative;
  width: 420px;
  height: 240px;
  padding: 2px;
  overflow: hidden;

  border-radius: ${({ radius }) => radius};
`;

const RotatingBorder = styled(motion.div)<{
  gradient: string;
}>`
  position: absolute;
  inset: -100%;

  background: ${({ gradient }) => gradient};
`;

const Content = styled.div<{ radius: string }>`
  position: relative;
  z-index: 1;

  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: ${({ radius }) => radius};

  background: #1b1b1b;
  color: white;
`;

interface AnimatedBorderProps {
  children: React.ReactNode;
  radius?: string;
  duration?: number;
  gradient?: string;
}

export function AnimatedBorder({
  children,
  radius = '50px',
  duration = 3,
  gradient = `
    conic-gradient(
      from 0deg,
      #22c55e 20%,
      #06b6d4 45%,
      pink 90%,
      #22c55e 100%
    )
  `,
}: AnimatedBorderProps) {
  return (
    <Wrapper radius={radius}>
      <RotatingBorder
        gradient={gradient}
        animate={{
          rotate: 360,
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      <Content radius={`calc(${radius} - 2px)`}>{children}</Content>
    </Wrapper>
  );
}
