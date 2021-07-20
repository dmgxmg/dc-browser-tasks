import { elementVisibleText } from "../util/element";
import { pageFlow } from "../flow/page";
import { waitClickStep } from "../flow/element";

pageFlow(
  async function* () {
    while (Number(elementVisibleText("#shoplist_count")) > 0) {
      yield waitClickStep("#shoplist_edit", "编辑");
      yield waitClickStep("#selectAllBtn", "全选");
      yield waitClickStep("#multiCancle", "取消收藏");
      yield waitClickStep("#ui_btn_confirm", "确认取消收藏");
    }
  },
  {
    urls: "https://wqs.jd.com/my/fav/shop_fav.shtml",
  }
);
