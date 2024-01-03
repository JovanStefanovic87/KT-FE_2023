'use client';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detectDevice } from '@/app/globalRedux/features/device/deviceSlice';
import { selectIsMobile } from '@/app/globalRedux/selectors';
import ClientCalendar from '../../calendar/ClientCalendar';
import ClientCalendarDayView from '../../calendar/ClientCalendarDayView';

const YourComponent: React.FC = () => {
  const dispatch = useDispatch();
  const isMobile = useSelector(selectIsMobile);

  useEffect(() => {
    dispatch(detectDevice() as any);
  }, [dispatch]);

  return <>{isMobile ? <ClientCalendarDayView /> : <ClientCalendar />}</>;
};

export default YourComponent;
