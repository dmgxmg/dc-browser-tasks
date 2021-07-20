import { pageFlow } from "../flow/page";
import { clickIfVisibleStep, waitClickStep } from "../flow/element";
import { flowDelay } from "../flow/flow";
import { elementExists, elementText } from "../util/element";
import { taskSuccessAction } from "../util/notification";

pageFlow(
  async function* () {
    while (true) {
      if (yield clickIfVisibleStep(".yllBtn", "浏览")) {
        return;
      }
      yield clickIfVisibleStep(".common-dialog-close", "关闭Dialog");
      yield waitClickStep(".bottom-btn-wrapper", "摇一摇");

      yield flowDelay(1000);

      if (
        !elementText(".bottom-btn-times") &&
        elementExists(".llBtn") &&
        !elementExists(".yllBtn")
      ) {
        return taskSuccessAction();
      }
    }
  },
  {
    urls: "https://spa.jd.com/home",
  }
);
