import { pageFlow } from "../flow/page";
import { flowDelay } from "../flow/flow";
import { waitClickStep } from "../flow/element";

pageFlow(
  async function* () {
    yield waitClickStep(".sign_btn", "立即翻牌");
    yield flowDelay(2000);
    yield waitClickStep(".pop_close_icon", "关闭Modal");
  },
  {
    urls: "https://prodev.m.jd.com/mall/active/",
    successElement: ".sign_btn_dis",
  }
);
