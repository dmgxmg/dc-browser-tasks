declare global {
  interface Window {
    ReactNativeWebView: {
      postMessage: (message: string) => void;
    };
    PuppeteerLog: (message: string) => Promise<void>;
  }
}

type Action<T extends string, P> = P extends void
  ? { type: T }
  : { type: T; payload: P };

export type TaskPayloadMap = {
  TaskStart: void;
  TaskEnd: void;
  TaskSuccess: void;
  TaskError: string;
  TaskResult: string;
  TaskStepStart: string;
  TaskStepEnd: string;
  TaskDelay: number;
  TaskMessage: string;
};

export type TaskActionTypes = keyof TaskPayloadMap;

type TaskActionMap = {
  [T in TaskActionTypes]: Action<T, TaskPayloadMap[T]>;
};

export type TaskActions = TaskActionMap[TaskActionTypes];

export type ConditionFunction = () => boolean;
export type PromiseFunction<T = any> = () => Promise<T>;
