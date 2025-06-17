export type AttendanceType = {
  id: string;
  userId: string;
  workDate: Date;
  startTime?: number;
  endTime?: number;
  breakTime?: number;
  attendanceCategoryId: string;
  createdAt: Date;
  updatedAt: Date;
};
