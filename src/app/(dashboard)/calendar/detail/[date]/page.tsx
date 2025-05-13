import CalendarDetailForm from '@/features/calendar/detail/components/CalendarDetailForm';

const CalendarDetail = ({ params }: { params: { date: string } }) => {
  return <CalendarDetailForm dateString={params.date} />;
};

export default CalendarDetail;
