chrome.action.onClicked.addListener(async (tab) => {
  // 获取当前状态
  const data = await chrome.storage.local.get("isEnabled");
  const newState = !data.isEnabled;
  
  // 保存新状态
  await chrome.storage.local.set({ isEnabled: newState });

  // 向当前标签页发送指令，并捕获可能的错误（比如页面没刷新）
  try {
    await chrome.tabs.sendMessage(tab.id, { action: "toggle", isEnabled: newState });
  } catch (e) {
    console.log("需要刷新页面才能应用更改");
  }
});