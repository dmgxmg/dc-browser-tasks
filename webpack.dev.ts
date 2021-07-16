import { merge } from "webpack-merge";
import { manifestPlugin, webpackCommonConfig } from "./webpack.common";
import { networkInterfaces } from "os";

function getLanIP() {
  const nets = networkInterfaces();

  const result = Object.values(nets)
    .flatMap((x) => x)
    .filter((x) => x.family === "IPv4" && !x.internal);

  return result[0].address;
}

const ip = getLanIP();
const port = 5000;
const publicPath = `http://${ip}:${port}/`;

export default merge(webpackCommonConfig, {
  mode: "development",
  output: {
    publicPath,
  },
  plugins: [manifestPlugin(2)],
});
