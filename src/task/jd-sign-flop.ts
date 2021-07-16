import { PageFlow } from "../model/PageFlow";

PageFlow.of("https://prodev.m.jd.com/mall/active/")
  .successViewExists(".sign_btn_dis")
  .waitViewClickStep(".sign_btn", "立即翻牌")
  .delayStep(2000)
  .waitClickStep(".pop_close_icon", "关闭Modal")
  .execute()
  .then();
