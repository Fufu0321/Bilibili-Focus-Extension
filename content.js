// 封装一个切换函数
function updateBodyClass(isEnabled) {
  if (isEnabled) {
    document.documentElement.setAttribute('data-focus-mode', 'on');
    console.log("B站专注模式：已开启");
  } else {
    document.documentElement.setAttribute('data-focus-mode', 'off');
    console.log("B站专注模式：已关闭");
  }
}

// 页面加载时立即检查状态
chrome.storage.local.get("isEnabled", (data) => {
  const isEnabled = data.isEnabled !== false; 
  updateBodyClass(isEnabled);
});

// 监听开关切换
chrome.runtime.onMessage.addListener((request) => {
  if (request.action === "toggle") {
    updateBodyClass(request.isEnabled);
  }
});