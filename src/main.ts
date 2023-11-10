import "./style.css";
import PageManager from "./pageManager";
// import { createHandlers } from "./testing/handlersSimulator";

const app = document.querySelector<HTMLDivElement>("#app")!;
app.style.width = "100vw";
app.style.height = "100vh";

window.oncontextmenu = function (event) {
  event.preventDefault();
  event.stopPropagation();
  return false;
};
// createHandlers();

// Wait for window.flutter_inappwebview to be defined as a function.
// (async () => {
//   await new Promise<void>(async (resolve) => {
//     while (
//       typeof (window as any).flutter_inappwebview?.callHandler !== "function"
//     ) {
//       await new Promise<void>((resolve) => setTimeout(resolve, 100));
//     }
//     resolve();
//   });

//   new PageManager(app);
// })();
// Wait for window.flutter_inappwebview to be defined as a function.
(async () => {
  const maxWaitTime = 5000; // Maximum wait time of 5 seconds
  const intervalTime = 500; // Check every 500 milliseconds
  let elapsedTime = 0;

  await new Promise<void>((resolve, reject) => {
    const interval = setInterval(async () => {
      if (typeof (window as any).flutter_inappwebview?.callHandler === "function") {
        clearInterval(interval);
        resolve();
      } else if (elapsedTime >= maxWaitTime) {
        clearInterval(interval);
        reject(new Error('Timeout waiting for flutter_inappwebview.callHandler to be defined'));
      } else {
        elapsedTime += intervalTime;
      }
    }, intervalTime);
  });

  new PageManager(app);
})();