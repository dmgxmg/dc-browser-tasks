import { TaskActions, TaskActionTypes, TaskPayloadMap } from "../types";

function inRNWebView() {
  return Boolean(
    window.ReactNativeWebView && window.ReactNativeWebView.postMessage
  );
}

function inPuppeteer() {
  return Boolean(window.PuppeteerLog);
}

function notifyWindow(action: TaskActions) {
  console.log("[Action]", action);

  switch (action.type) {
    case "TaskResult":
    case "TaskError":
      alert(action.payload);
      break;
    default:
  }
}

function notifyPuppeteer(action: TaskActions) {
  window.PuppeteerLog(JSON.stringify(action)).then();
  notifyWindow(action);
}

function notifyRNWebView(action: TaskActions) {
  window.ReactNativeWebView.postMessage(JSON.stringify(action));
}

export const notify = inRNWebView()
  ? notifyRNWebView
  : inPuppeteer()
  ? notifyPuppeteer
  : notifyWindow;

function actionCreator<T extends TaskActionTypes>(
  type: T,
  payload: TaskPayloadMap[T]
) {
  return (payload ? { type, payload } : { type }) as TaskActions;
}

function makeActionCreator<T extends TaskActionTypes>(type: T) {
  return (payload: TaskPayloadMap[T]) => actionCreator(type, payload);
}

function makeActionNotifier<T extends TaskActionTypes>(type: T) {
  return (payload: TaskPayloadMap[T]) => notify(actionCreator(type, payload));
}

export const taskStartAction = makeActionCreator("TaskStart");
export const taskEndAction = makeActionCreator("TaskEnd");
export const taskSuccessAction = makeActionCreator("TaskSuccess");
export const taskErrorAction = makeActionCreator("TaskError");
export const taskResultAction = makeActionCreator("TaskResult");
export const taskStepStartAction = makeActionCreator("TaskStepStart");
export const taskStepEndAction = makeActionCreator("TaskStepEnd");
export const taskDelayAction = makeActionCreator("TaskDelay");
export const taskMessageAction = makeActionCreator("TaskMessage");

export const notifyTaskStart = makeActionNotifier("TaskStart");
export const notifyTaskEnd = makeActionNotifier("TaskEnd");
export const notifyTaskSuccess = makeActionNotifier("TaskSuccess");
export const notifyTaskError = makeActionNotifier("TaskError");
export const notifyTaskResult = makeActionNotifier("TaskResult");
export const notifyTaskStepStart = makeActionNotifier("TaskStepStart");
export const notifyTaskStepEnd = makeActionNotifier("TaskStepEnd");
export const notifyTaskDelay = makeActionNotifier("TaskDelay");
export const notifyTaskMessage = makeActionNotifier("TaskMessage");
