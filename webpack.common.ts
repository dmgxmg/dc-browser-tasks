import webpack from "webpack";
import path from "path";
import { WebpackManifestPlugin } from "webpack-manifest-plugin";
import taskManifest from "./src/task-manifest.json";
import glob from "glob";
import {
  PageTask,
  PageTaskId,
  TaskGroup,
  TaskGroupId,
  TaskManifest,
} from "./types";

function uniqueIntersection<T>(arr1: T[], arr2: T[]) {
  const set2 = new Set(arr2);

  return [...new Set(arr1)].filter((x) => set2.has(x));
}

export function manifestPlugin(space?: number) {
  return new WebpackManifestPlugin({
    fileName: "task-manifest.json",
    serialize(jsUrlMap: Record<string, string>) {
      const { taskMap, groupMap } = <TaskManifest>taskManifest;

      Object.entries(taskMap).forEach(([id, task]: [PageTaskId, PageTask]) => {
        const jsUrl = jsUrlMap[(task.refId || id) + ".js"];

        task.id = id;
        task.jsName = jsUrl.split("/").pop();
        task.jsUrl = jsUrl;
      });

      const allTaskIds = Object.keys(taskMap) as PageTaskId[];

      Object.entries(groupMap).forEach(
        ([id, group]: [TaskGroupId, TaskGroup]) => {
          group.id = id;
          group.taskIds = uniqueIntersection(group.taskIds, allTaskIds);
        }
      );

      return JSON.stringify(taskManifest, null, space);
    },
  });
}

function globEntryMap(globString: string) {
  return glob.sync(globString).reduce((o, filePath) => {
    o[path.parse(filePath).name] = filePath;
    return o;
  }, {});
}

export const webpackCommonConfig: webpack.Configuration = {
  devtool: false,
  entry: globEntryMap("./src/task/*.ts"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash:8].js",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js", ".tsx"],
  },
};
