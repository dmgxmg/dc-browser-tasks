import {
  notify,
  notifyTaskDelay,
  notifyTaskEnd,
  notifyTaskError,
  notifyTaskStart,
  notifyTaskStepEnd,
  notifyTaskStepStart,
  notifyTaskSuccess,
  taskResultAction,
  taskSuccessAction,
} from "../util/notification";
import { sleep } from "../util/time";
import { ConditionFunction, PromiseFunction, TaskActions } from "../types";

type TaskReturn = TaskActions | void;
type TaskGenerator = AsyncGenerator<any, TaskReturn>;
export type TaskGeneratorFunction = () => TaskGenerator;

export type FlowOptions = {
  waitTimeout: number;
  defaultDelayTime: number;
  successWhen: ConditionFunction;
};

let flowOptions: FlowOptions = {
  waitTimeout: 5000,
  defaultDelayTime: 500,
  successWhen: () => false,
};
let it: TaskGenerator;

export function flowConfigure(options: Partial<FlowOptions>) {
  flowOptions = {
    ...flowOptions,
    ...options,
  };
}

export async function flow(
  gen: TaskGeneratorFunction,
  options?: Partial<FlowOptions>
) {
  try {
    notifyTaskStart();
    flowConfigure(options);
    it = gen();
    let value = undefined;

    if (flowOptions.successWhen()) {
      return notifyTaskSuccess();
    }

    while (true) {
      const result = await it.next(value);
      value = result.value;

      if (result.done) {
        flowOptions.successWhen()
          ? notifyTaskSuccess()
          : result.value
          ? notify(result.value)
          : notifyTaskEnd();
        break;
      }
    }
  } catch (e) {
    notifyTaskError(e);
  }
}

export function flowThrow(message: string) {
  return it.throw(message);
}

export function flowReturn(action: TaskActions) {
  return it.return(action);
}

export function flowReturnSuccess() {
  return it.return(taskSuccessAction());
}

export function flowReturnResult(result: string) {
  return it.return(taskResultAction(result));
}

export async function flowStep<T>(
  promiseFunc: PromiseFunction<T>,
  name: string
): Promise<T> {
  notifyTaskStepStart(name);
  const result = await promiseFunc();
  notifyTaskStepEnd(name);
  return result;
}

export async function flowDelay(ms = flowOptions.defaultDelayTime) {
  notifyTaskDelay(ms);
  await sleep(ms);
}

export async function flowWait(until: ConditionFunction) {
  const startTime = Date.now();

  while (true) {
    if (until()) {
      break;
    }

    if (Date.now() - startTime > flowOptions.waitTimeout) {
      await it.throw("Wait Timeout");
      break;
    }

    await flowDelay();
  }
}
