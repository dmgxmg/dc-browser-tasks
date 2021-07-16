import taskManifest from "./src/task-manifest.json";
const { taskMap, groupMap } = taskManifest;

export type PageTaskId = keyof typeof taskMap;
export type TaskGroupId = keyof typeof groupMap;

export type PageTask = {
  id: PageTaskId;
  pageName: string;
  pageUrl: string;
  jsName: string;
  jsUrl: string;
  dailyOnce?: boolean;
  refId?: string;
};

export type TaskGroup = {
  id: TaskGroupId;
  groupName: string;
  taskIds: PageTaskId[];
};

export type TaskManifest = {
  taskMap: {
    [key in PageTaskId]: PageTask;
  };
  groupMap: {
    [key in TaskGroupId]: TaskGroup;
  };
};
