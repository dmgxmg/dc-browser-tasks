import { pageFlow } from "../flow/page";
import { clickIfVisibleStep, waitClickStep } from "../flow/element";
import { elementExists } from "../util/element";
import { flowDelay } from "../flow/flow";

pageFlow(
  async function* () {
    while (
      elementExists(
        '//*[@id="m_common_content"]/div/div/div/div/div[1]/div/div[2]/div[4]/span/span[2][text()>0]'
      )
    ) {
      yield waitClickStep(
        '//*[@id="m_common_content"]/div/div/div/div/div[1]/div/div[2]/div[3]/div[3]/div/img',
        "GO"
      );
      yield flowDelay(2000);
      yield clickIfVisibleStep(
        '//*[@id="m_common_content"]/div/div/div/div/div[3]/div/div/div[2]/div/img',
        "关闭Modal"
      );
    }
  },
  {
    urls: "https://turntable.m.jd.com/?actId=jgpqtzjhvaoym",
    successElement:
      '//*[@id="m_common_content"]/div/div/div/div/div[1]/div/div[2]/div[4]/span/span[2][text()=0]',
    touchClick: true,
  }
);
