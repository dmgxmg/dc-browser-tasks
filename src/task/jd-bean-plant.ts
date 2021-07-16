import { PageFlow } from "../model/PageFlow";
import { clickEvery } from "../util/flow";

PageFlow.of("https://bean.m.jd.com/plantBean/index")
  .useTouchClick()
  .step(
    () =>
      clickEvery(
        '//div[contains(@class, "NutrientsWorking")]//span[contains(text(), "x") and not(contains(text(), "x0"))]'
      ),
    "点击领取营养液"
  )
  .execute()
  .then();
