import CalendarDetailForm from '@/features/attendance/calendar/edit/components/CalendarDetailForm';

const CalendarDetail = async ({ params }: { params: Promise<{ date: string }> }) => {
  const dateString = (await params).date;
  return <CalendarDetailForm dateString={dateString} />;
};

export default CalendarDetail;
