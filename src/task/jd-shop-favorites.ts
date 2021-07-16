import { PageFlow } from "../model/PageFlow";
import { elementText } from "../util/element";
import { FlowBuilder } from "../model/FlowBuilder";

PageFlow.of("https://wqs.jd.com/my/fav/shop_fav.shtml")
  .loopStep(
    () => Number(elementText("#shoplist_count")) > 0,
    FlowBuilder.of()
      .waitClickStep("#shoplist_edit", "点击编辑")
      .waitClickStep("#selectAllBtn", "击全选")
      .waitClickStep("#multiCancle", "点击取消收藏")
      .waitClickStep("#ui_btn_confirm", "点击确认取消收藏")
      .build()
  )
  .execute()
  .then();
