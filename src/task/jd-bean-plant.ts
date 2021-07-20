import { pageFlow } from "../flow/page";
import {
  clickIfVisibleStep,
  clickWhileVisibleStep,
  waitClickStep,
} from "../flow/element";
import { flowDelay } from "../flow/flow";
import { elementExists } from "../util/element";
import { taskSuccessAction } from "../util/notification";

pageFlow(
  async function* () {
    if (
      yield clickIfVisibleStep(
        '//*[@id="hello"]/div/div/div/div/div[2]/div[2]/div/div/div/div/img[1]',
        "周一瓜分京豆"
      )
    ) {
      yield waitClickStep(
        '//*[@id="hello"]/div/div/div/div/div[2]/div[2]/div[3]/div[1]/div/div',
        "收下京豆"
      );
    }

    yield clickWhileVisibleStep(
      '//div[contains(@class, "NutrientsWorking")]//span[contains(text(), "x") and not(contains(text(), "x0"))]',
      "领取营养液"
    );

    yield waitClickStep(
      '//*[@id="hello"]/div/div/div/div/div/div/div[2]/div[6]/div[2]/div[2]/div[5]/div',
      "更多任务"
    );

    yield flowDelay();

    if (
      yield clickIfVisibleStep(
        '//*[@id="hello"]/div/div/div/div/div[2]/div[2]/div[3]/div/div[not(contains(., "关注")) and not(contains(., "已完成"))]',
        "去逛逛"
      )
    ) {
      return;
    }

    if (
      elementExists(
        '//*[@id="hello"]/div/div/div/div/div[2]/div[2]/div[3]/div/div[contains(., "已完成")]'
      )
    ) {
      return taskSuccessAction();
    }
  },
  {
    urls: "https://bean.m.jd.com/plantBean/index",
    touchClick: true,
  }
);
