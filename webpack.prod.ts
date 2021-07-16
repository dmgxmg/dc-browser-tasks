import { merge } from "webpack-merge";
import { manifestPlugin, webpackCommonConfig } from "./webpack.common";
import TerserPlugin from "terser-webpack-plugin";

export default merge(webpackCommonConfig, {
  mode: "production",
  output: {
    publicPath: "https://dmgxmg.github.io/dc-browser-tasks/",
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true,
          },
        },
      }),
    ],
  },
  plugins: [manifestPlugin()],
});
