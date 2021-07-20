import { Browser, devices, launch } from "puppeteer";
import { resolve } from "path";
import { PageTask, TaskManifest } from "../types";
import { readFile } from "fs/promises";
import { DateTime } from "../src/model/DateTime";

const tasksPageUrl = "https://puppeteer.locahost/";
const distPath = "../dist/";
const taskManifestJsonPath = distPath + "task-manifest.json";
const userDataDir = "user-data";
const windowJsPath = "window.js";
const indexHtmlPath = "index.html";

let browser: Browser;

function timeFormat() {
  return DateTime.of().format("HH:mm:ss.SSS");
}

function log(...args: any[]) {
  console.log(timeFormat(), ...args);
}

function absolutePath(relativePath: string) {
  return resolve(__dirname, relativePath);
}

async function getFileContent(relativePath: string) {
  return await readFile(absolutePath(relativePath), "utf8");
}

async function launchBrowser() {
  browser = await launch({
    headless: false,
    devtools: true,
    userDataDir: absolutePath(userDataDir),
  });
}

async function openNewPage() {
  const page = await browser.newPage();
  await page.emulate(devices["iPhone 6"]);
  await page.exposeFunction("PuppeteerLog", (message: string) => {
    log(message);
  });

  return page;
}

async function loadTaskManifest(): Promise<TaskManifest> {
  const text = await getFileContent(taskManifestJsonPath);
  return JSON.parse(text);
}

async function openTasksPage() {
  const page = await openNewPage();

  await page.exposeFunction("PuppeteerRunPageTask", runPageTask);
  await page.setRequestInterception(true);
  page.on("request", async (request) => {
    if (request.url() !== tasksPageUrl) {
      return request.continue();
    }

    log("request", request.url());

    const taskManifest = await loadTaskManifest();
    const tasks = Object.values(taskManifest.taskMap);
    let html = await getFileContent(indexHtmlPath);
    html = html.replace("[0]", JSON.stringify(tasks));

    return request.respond({
      status: 200,
      contentType: "text/html",
      body: html,
    });
  });

  await page.goto(tasksPageUrl);
}

async function runPageTask(id: string) {
  const taskManifest = await loadTaskManifest();
  const { pageUrl, jsName }: PageTask = taskManifest.taskMap[id];
  const content = await getFileContent(distPath + jsName);
  const windowJs = await getFileContent(windowJsPath);

  const page = await openNewPage();

  page.on("load", async () => {
    log("load", page.url());

    if (page.url().startsWith(pageUrl)) {
      await page.waitForTimeout(1000);
      await page.addScriptTag({ content });
      await page.addScriptTag({ content: windowJs });
    } else {
      await page.goto(pageUrl);
    }
  });

  await page.goto(pageUrl);
}

(async () => {
  await launchBrowser();
  await openTasksPage();
})();
