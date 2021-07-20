import { fetchJson } from "../util/fetch";
import { DateTime } from "../model/DateTime";
import { toUrlString } from "../util/url";
import { pageFlow } from "../flow/page";
import { taskResultAction } from "../util/notification";
import { flowStep } from "../flow/flow";
import { TaskActions } from "../types";

type BeanDetail = {
  amount: string;
  date: string;
  eventMassage: string;
};

type DcBeanDetail = {
  amount: number;
  date: string;
  eventMassage: string;
};

type ResponseData = {
  code: string;
  pin: string;
  success: boolean;
  jingDetailList: BeanDetail[];
};

type DayBalance = {
  date: string;
  inAmount: number;
  outAmount: number;
};

function defaultDayBalance(date: string): DayBalance {
  return { date, inAmount: 0, outAmount: 0 };
}

async function fetchBeanDetailList(days: number) {
  const today = DateTime.of();
  const startDate = today.subtractDays(days - 1).startOfDay();
  let page = 1;
  const beanDetailList: DcBeanDetail[] = [];
  outer: do {
    const url = toUrlString("https://bean.m.jd.com/beanDetail/detail.json", {
      page: page++,
    });
    const data: ResponseData = await fetchJson(url);
    const list = data.jingDetailList;

    for (const { amount, date, eventMassage } of list) {
      const dateObj = DateTime.of(date);
      if (dateObj.isBefore(startDate)) {
        break outer;
      }
      beanDetailList.push({
        amount: Number(amount),
        date: dateObj.dateFormat(),
        eventMassage,
      });
    }
  } while (true);

  console.log(beanDetailList);

  const dayBalanceMap = beanDetailList.reduce<Record<string, DayBalance>>(
    (o, { date, amount }) => {
      let item = o[date];
      if (!item) {
        o[date] = item = defaultDayBalance(date);
      }
      amount > 0 ? (item.inAmount += amount) : (item.outAmount += amount);
      return o;
    },
    {}
  );

  return Array.from<unknown, DayBalance>({ length: days }, (v, k) => {
    const date = today.subtractDays(k).dateFormat();
    return dayBalanceMap[date] || defaultDayBalance(date);
  });
}

pageFlow(
  async function* (): AsyncGenerator<any, TaskActions, DayBalance[]> {
    const dayBalanceList = yield flowStep(() => fetchBeanDetailList(2), "Main");

    const message = dayBalanceList
      .map(({ date, inAmount, outAmount }) => {
        return `[${date}] 加: ${inAmount} 减: ${-outAmount} 净: ${
          inAmount + outAmount
        }`;
      })
      .join("\n");

    return taskResultAction(message);
  },
  {
    urls: "https://bean.m.jd.com/beanDetail/index.action",
  }
);
