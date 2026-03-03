'use client';

import {
  Badge,
  Button,
  Calendar,
  CalendarTime,
  DateRange,
  Input,
  MotionSlot,
  Popover,
  Separator,
  Skeleton,
  Tabs,
  type TabItemType,
} from '@common/ui';
import { useLayoutEffect, useState } from 'react';
import { PlayIcon, StarIcon } from '@common/ui/icons';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { cn } from '@common/ui/lib/utils';
import MotionWrapper from '../components/motion/MotionWrapper';
import { AnimatePresence, type MotionProps } from 'framer-motion';

export default function TabsPage() {
  function ScenarioList(props: { scenarioId: number }) {
    const [date, setDate] = useState<Date | undefined>(undefined);
    const [open, setOpen] = useState(false);

    const [dateRange, setDateRange] = useState<DateRange | undefined>({
      from: new Date(2025, 5, 8),
      to: new Date(2025, 6, 19),
    });

    const [confirmationRequest, setConfirmationRequest] = useState<Date | null>(null);

    const handleSelect = (selectedDate: Date | undefined) => {
      if (selectedDate) {
        const needsConfirmation = selectedDate < new Date();

        if (needsConfirmation) {
          setConfirmationRequest(selectedDate);
        } else {
          setDate(selectedDate);
          setConfirmationRequest(null);
        }
      }
    };

    const handleConfirm = () => {
      if (confirmationRequest) {
        setDate(confirmationRequest);
        setConfirmationRequest(null);
      }
    };

    const handleCancel = () => {
      setConfirmationRequest(null);
    };

    const [dateTime, setDateTime] = useState<Date | undefined>(undefined);

    useLayoutEffect(() => {
      if (dateTime) {
        console.warn(dateTime);
      }
    }, [dateTime]);

    return (
      <div className="bg-juiBackground-paper w-full p-4 overflow-auto">
        <h1 className="text-4xl font-bold">TABS LAYOUT</h1>
        <div className="flex flex-col gap-4">
          <Input underline="secondary" className="w-50" placeholder="text" />
          <CalendarTime
            selected={dateTime}
            onSelect={setDateTime}
            className="rounded-lg border shadow-sm"
            captionLayout="dropdown-months"
            // numberOfMonths={2}
          />

          <Calendar
            mode="single"
            selected={date}
            defaultMonth={date}
            numberOfMonths={2}
            className="rounded-lg border shadow-sm"
            showOutsideDays={false}
            onSelect={handleSelect}
            dialogOpen={confirmationRequest !== null}
            onDialogConfirm={handleConfirm}
            onDialogCancel={handleCancel}
            dialogContent="과거 날짜를 선택하셨습니다."
            components={{
              Chevron: ({ className: chevronClassName, orientation, ...restChevron }) => {
                if (orientation === 'left') {
                  return <StarIcon className={cn('size-4', chevronClassName)} {...restChevron} />;
                }

                if (orientation === 'right') {
                  return <StarIcon className={cn('size-4', chevronClassName)} {...restChevron} />;
                }

                return <StarIcon className={cn('size-4', chevronClassName)} {...restChevron} />;
              },
            }}
          />
          <Calendar
            mode="single"
            selected={date}
            defaultMonth={date}
            numberOfMonths={2}
            onSelect={setDate}
            disabled={[{ before: new Date(2025, 6, 1), after: new Date(2025, 6, 10) }]}
            className="rounded-lg border shadow-sm"
            captionLayout="dropdown-months"
          />
          <Calendar
            mode="single"
            selected={date}
            defaultMonth={date}
            onSelect={setDate}
            className="rounded-lg border shadow-sm"
            captionLayout="dropdown-years"
          />
          <Calendar
            mode="range"
            defaultMonth={dateRange?.from}
            selected={dateRange}
            onSelect={setDateRange}
            numberOfMonths={2}
            className="rounded-lg border shadow-sm min-w"
            captionLayout="dropdown"
          />
          <div className="w-48">
            <Popover
              open={open}
              onOpenChange={setOpen}
              align="start"
              trigger={
                <Input
                  type="date"
                  value={date ? format(date, 'yyyy-MM-dd') : ''}
                  onChange={(e) => {
                    const value = e.target.value;

                    setDate(value ? new Date(value + 'T00:00:00') : undefined);
                  }}
                  className="[&::-webkit-calendar-picker-indicator]:hidden"
                />
              }>
              <Calendar
                mode="single"
                selected={date}
                defaultMonth={date}
                onSelect={(selectDate) => {
                  setDate(selectDate);

                  if (selectDate) {
                    setOpen(false);
                  }
                }}
                className="rounded-md shadow-sm"
                captionLayout="dropdown"
              />
            </Popover>
          </div>
        </div>
        Scenario {props.scenarioId}
      </div>
    );
  }

  type ComplexScenarioProps = {
    name: string;
  };

  function ComplexScenario(props: ComplexScenarioProps) {
    const [isEnd, setIsEnd] = useState(false);
    const [open, setIsOpen] = useState(false);

    const motionProps: MotionProps = {
      initial: { opacity: 0, y: -100 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -100 },
      transition: { duration: 0.5 },
    };

    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.2, // 각 항목이 0.2초 간격으로 등장
        },
      },
    };

    const itemVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];

    return (
      <div className="flex flex-col gap-4">
        <div className="bg-juiBackground-paper w-full p-4">Complex {props.name}</div>
        <Button onClick={() => setIsOpen(!open)}>aa</Button>
        <MotionSlot
          childrenMode="wrap"
          as="ul"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="flex flex-col gap-7">
          {items.map((item, index) => (
            <MotionSlot key={index} variants={itemVariants}>
              <li className="p-4 rounded border-2 border-juiBorder-primary">{item}</li>
            </MotionSlot>
          ))}
        </MotionSlot>
        <AnimatePresence>
          <MotionSlot key="1" {...motionProps}>
            <div>Complex {props.name}</div>
          </MotionSlot>
          <MotionSlot key="99" {...motionProps}>
            <>Complex {props.name}222</>
          </MotionSlot>

          {isEnd && (
            <MotionSlot key="4" {...motionProps}>
              <Badge>open</Badge>
            </MotionSlot>
          )}

          {open && (
            <MotionSlot
              key="3"
              {...motionProps}
              childrenMode="wrap"
              as="button"
              className="flex text-juiScore-extra bg-juiError p-2">
              <div>aaaa</div>
            </MotionSlot>
          )}

          <MotionWrapper key="2" {...motionProps} onAnimationComplete={() => setIsEnd(true)}>
            <div>Complex 3</div>
          </MotionWrapper>
        </AnimatePresence>
      </div>
    );
  }

  const [acitveTab, setActiveTab] = useState('');

  const tabsArray: TabItemType<typeof ScenarioList | typeof ComplexScenario> = [
    {
      value: 'scenario',
      label: 'Scenario',
      component: ScenarioList,
      props: { scenarioId: 1 },
    },
    {
      value: 'complex',
      label: 'Complex',
      component: ComplexScenario,
      props: { name: 'Test' },
    },
    {
      value: 'exception',
      label: 'Exception',
    },
    {
      value: 'target',
      label: 'Targetㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁ',
    },
    {
      value: 'tab4',
      label: '탭 4',
      content: <div className="bg-juiBackground-paper w-full p-4">탭 4 컨텐츠</div>,
    },
    {
      value: 'tab5',
      disabled: true,
      label: (
        <div className="flex gap-1">
          <PlayIcon />탭 5
        </div>
      ),
      content: <ScenarioList scenarioId={3} />,
    },
  ];

  return (
    <div className="relative">
      <Tabs
        // defaultValue="target"
        // align="center"
        // size="small"
        // variant="secondary"
        // shape="text"
        // shape="folder"
        tabs={tabsArray}
        restScreenHeight={120}
        // maxWidth={100}
        // align="full"
        onValueChange={(val) => setActiveTab(val)}
      />
      {acitveTab === 'exception' && (
        <div className="max-h-[calc(100svh-120px)] overflow-auto bg-juiBackground-paper w-full p-4">
          <div className="h-[2000px]">Exception</div>
        </div>
      )}
      {acitveTab === 'target' && (
        <div className="h-[2000px] bg-juiBackground-paper w-full p-4">
          Target
          <Separator orientation="horizontal" />
          <div className="flex flex-col gap-2">
            <Button onClick={() => toast('Event has been created')}>Show Toast</Button>
            <Skeleton className="w-20 h-3" />
            <Skeleton className="w-16 h-3" />
            <Skeleton className="w-full h-3" />
            <Skeleton className="w-full h-72" />
          </div>
        </div>
      )}
    </div>
  );
}
