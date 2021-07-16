declare global {
  interface Window {
    ReactNativeWebView: {
      postMessage: (message: string) => void;
    };
  }
}

type Action<T extends string, P = any> = {
  type: T;
  payload: P;
};

type TaskPayloadMap = {
  TaskStart: void;
  TaskEnd: void;
  TaskSuccess: void;
  TaskError: {
    message: string;
  };
  TaskResult: {
    message: string;
  };
  TaskStepStart: {
    stepName: string;
    index: number;
  };
  TaskStepEnd: {
    stepName: string;
    index: number;
  };
  TaskDelay: {
    delayTime: number;
  };
};

type TaskActionType = keyof TaskPayloadMap;

type TaskActionMap = {
  [key in TaskActionType]: Action<key, TaskPayloadMap[key]>;
};

type TaskAction = TaskActionMap[TaskActionType];

function inRNWebView() {
  return Boolean(
    window.ReactNativeWebView && window.ReactNativeWebView.postMessage
  );
}

function notifyWindow<T extends TaskActionType>(
  type: T,
  payload: TaskPayloadMap[T]
) {
  const action = {
    type,
    payload,
  } as TaskAction;

  console.log(action);

  switch (action.type) {
    case "TaskError":
    case "TaskResult":
      alert(action.payload.message);
      break;
    default:
  }
}

function notifyRNWebView<T extends TaskActionType>(
  type: T,
  payload: TaskPayloadMap[T]
) {
  window.ReactNativeWebView.postMessage(
    JSON.stringify(
      payload
        ? {
            type,
            payload,
          }
        : { type }
    )
  );
}

const notify = inRNWebView() ? notifyRNWebView : notifyWindow;

function makeNotifyDispatcher<T extends TaskActionType>(type: T) {
  return (payload: TaskPayloadMap[T]) => notify(type, payload);
}

export const notifyTaskStart = makeNotifyDispatcher("TaskStart");
export const notifyTaskEnd = makeNotifyDispatcher("TaskEnd");
export const notifyTaskSuccess = makeNotifyDispatcher("TaskSuccess");
export const notifyTaskError = makeNotifyDispatcher("TaskError");
export const notifyTaskResult = makeNotifyDispatcher("TaskResult");
export const notifyTaskStepStart = makeNotifyDispatcher("TaskStepStart");
export const notifyTaskStepEnd = makeNotifyDispatcher("TaskStepEnd");
export const notifyTaskDelay = makeNotifyDispatcher("TaskDelay");
