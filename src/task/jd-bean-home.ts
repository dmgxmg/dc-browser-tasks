import { pageFlow } from "../flow/page";
import { clickIfVisibleStep } from "../flow/element";
import { elementExists } from "../util/element";

pageFlow(
  async function* () {
    if (
      yield clickIfVisibleStep(
        '//*[@id="hello"]/div/div/div[1]/div/div[1]/div[1]/div/div/div/div/div[1]/div[2]/div/div/div/div/div[2]',
        "签到领京豆"
      )
    ) {
      return;
    }
    if (
      yield clickIfVisibleStep(
        '//*[@id="hello"]/div/div/div[1]/div/div[1]/div[1]/div/div/div/div/div[3]/div[1]/div/div[1]/div/div/div//img[@src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAZiS0dEAP8A/wD/oL2nkwAAASFJREFUSMftl78LgkAYhiUpGgoiGsIgGoKmWqOxH0PRHJJrUVNLQ7WFDUVDBLlk/rH2nlxwfNUQeXcQHTyDCj56332vnmGQEYahBWzgAg8EMhCFJnCAL0v2JObSpQohFTsqpZGY19TXIbZVSx9iV5fY0yUOfkV8BXNQBWUV4huYgLwQSk3Z4h2oCcIEGPGHkSaegZQgzYDVNzXugx5Y8Lq9mtoBEPM+x9/+q8VVIjcck4Rrk69aARziWNVn0CA3r4AjGJLzbHr3cbYTm84OkaTJcRJsZPVx13gzcG0qM0BYbesvpC0VyXUCWbKYLqoic82SCRTB9v+R+ABPl9jVJbZ1iFlrWjrEzqMfVUrZpsFUKfb5psEUY09ay/BfZzuqKRl3oXnLzsjAPOEAAAAASUVORK5CYII="]',
        "完成任务"
      )
    ) {
      return;
    }

    yield clickIfVisibleStep(
      '//*[@id="hello"]/div/div/div[1]/div/div[1]/div[1]/div/div/div/div/div[2]/div',
      "领取京豆奖励"
    );
  },
  {
    urls: "https://h5.m.jd.com/rn/2E9A2bEeqQqBP9juVgPJvQQq6fJ/index.html",
    touchClick: true,
    successWhen: () =>
      !elementExists(
        '//*[@id="hello"]/div/div/div[1]/div/div[1]/div[1]/div/div/div/div/div[1]/div[2]/div/div/div/div/div[2]'
      ) &&
      elementExists(
        '//*[@id="hello"]/div/div/div[1]/div/div[1]/div[1]/div/div/div/div/div[2]/div/span[text()="成功领取京豆奖励"]'
      ),
  }
);
