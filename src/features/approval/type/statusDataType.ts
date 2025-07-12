import { StatusType } from "@/types/statusType";

export type StatusDataType = {
  id: string;
  statusCode: StatusType;
  statusName: string;
  description?: string;
};
