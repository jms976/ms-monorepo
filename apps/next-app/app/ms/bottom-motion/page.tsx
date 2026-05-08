'use client';

import * as Dialog from '@radix-ui/react-dialog';
import styled from '@emotion/styled';
import { AnimatePresence, motion, MotionProps } from 'framer-motion';
import { ReactNode, useEffect, useRef, useState } from 'react';

interface BottomSheetProps {
  open: boolean;

  onOpenChange: (open: boolean) => void;

  children: (expanded: boolean) => ReactNode;
}

function BottomSheet({ open, onOpenChange, children }: BottomSheetProps) {
  const [expanded, setExpanded] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);

  const [contentHeight, setContentHeight] = useState<number | 'auto'>('auto');

  useEffect(() => {
    if (!open) return;

    const frame = requestAnimationFrame(() => {
      measureHeight();
    });

    return () => cancelAnimationFrame(frame);
  }, [open, expanded]);

  const measureHeight = () => {
    if (!contentRef.current) return;

    setContentHeight(contentRef.current.scrollHeight);
  };

  const motionProps: MotionProps = {
    initial: { y: '100%', opacity: 0 },
    animate: { y: open ? 0 : '100%', opacity: open ? 1 : 0 },
    exit: { y: '100%', opacity: 0 },
    transition: { duration: 0.5, ease: 'easeInOut' },
  };

  const contentMotionProps: MotionProps = {
    initial: false,
    animate: { height: contentHeight },
    transition: { duration: 0.3, ease: 'easeInOut' },
  };

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(nextOpen) => {
        onOpenChange(nextOpen);
      }}>
      <AnimatePresence
        onExitComplete={() => {
          setExpanded(false);
          setContentHeight('auto');
        }}>
        {open && (
          <Dialog.Portal forceMount>
            {/* overlay */}
            <Overlay
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              transition={{
                duration: 0.2,
              }}
              onClick={() => onOpenChange(false)}
            />

            {/* sheet */}
            <Sheet {...motionProps}>
              <Header>
                <button onClick={() => setExpanded((value: boolean) => !value)}>{expanded ? '접기' : '더보기'}</button>
              </Header>

              {/* content height */}
              <AnimatedContent {...contentMotionProps}>
                <ContentInner ref={contentRef}>{children(expanded)}</ContentInner>
              </AnimatedContent>

              <BottomArea>
                <ActionButton>확인</ActionButton>
              </BottomArea>
            </Sheet>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}

export default function Example() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Item onClick={() => setOpen(true)}>리스트 아이템</Item>

      <BottomSheet open={open} onOpenChange={setOpen}>
        {(expanded: boolean) =>
          expanded ? (
            <ExpandedBox>
              {Array.from({
                length: 50,
              }).map((_, index) => (
                <Line key={index}>긴 컨텐츠 {index + 1}</Line>
              ))}
            </ExpandedBox>
          ) : (
            <CollapsedBox>짧은 요약</CollapsedBox>
          )
        }
      </BottomSheet>
    </>
  );
}

/* styles */

const Overlay = styled(motion.div)`
  position: fixed;

  inset: 0;

  background: rgba(0, 0, 0, 0.4);
`;

const Sheet = styled(motion.div)`
  position: fixed;

  left: 0;
  right: 0;
  bottom: 0;

  background: white;

  border-top-left-radius: 24px;
  border-top-right-radius: 24px;

  overflow: hidden;

  display: flex;
  flex-direction: column;

  max-height: 85dvh;
  z-index: 1000;
`;

const Header = styled.div`
  padding: 16px;

  display: flex;
  justify-content: flex-end;

  flex-shrink: 0;
`;

const AnimatedContent = styled(motion.div)`
  overflow: hidden;

  min-height: 0;
`;

const ContentInner = styled.div`
  padding: 16px;

  overflow-y: auto;

  max-height: 85dvh;

  min-height: 0;
`;

const BottomArea = styled.div`
  padding: 16px;

  flex-shrink: 0;
`;

const Item = styled.button`
  margin: 40px;
`;

const ActionButton = styled.button`
  width: 100%;

  height: 52px;

  border: 0;

  border-radius: 12px;

  background: royalblue;

  color: white;
`;

const ExpandedBox = styled.div`
  display: flex;

  flex-direction: column;

  gap: 10px;
`;

const CollapsedBox = styled.div``;

const Line = styled.div`
  line-height: 1.6;
`;
