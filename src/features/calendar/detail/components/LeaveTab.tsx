type LeaveTabProps = {
  dateString: string;
};

const LeaveTab = ({ dateString }: LeaveTabProps) => {
  return <div>{dateString}</div>;
};

export default LeaveTab;
