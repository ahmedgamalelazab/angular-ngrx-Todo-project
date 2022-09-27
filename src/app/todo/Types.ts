export interface Todo {
  id: number;
  description: string;
  hasFinished: boolean;
  totalHrs?: number;
  createdAt?: Date | null;
  UpdatedAt?: Date | null;
  delayedToDate?: Date | null;
  finishedAt?: Date | null;
  isRunning: boolean;
  runningObjRef: any | null;
}
