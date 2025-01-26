const tabsContainer = document.getElementById("tabs-container");
const iframeViewer = document.getElementById("iframe-viewer");
const newTabForm = document.getElementById("new-tab-form");
const urlInput = document.getElementById("url-input");

let tabs = [];
let activeTab = null;

function createTab(url) {
  const tabId = tabs.length;
  const tab = { id: tabId, url };

  tabs.push(tab);

  const tabButton = document.createElement("div");
  tabButton.className = "tab";
  tabButton.textContent = `Tab ${tabId + 1}`;
  tabButton.dataset.id = tabId;
  tabButton.addEventListener("click", () => activateTab(tabId));
  tabsContainer.appendChild(tabButton);

  activateTab(tabId);
}

function activateTab(tabId) {
  activeTab = tabId;
  const tab = tabs[tabId];

  document.querySelectorAll(".tab").forEach((tabButton) => {
    tabButton.classList.toggle("active", tabButton.dataset.id == tabId);
  });

  iframeViewer.src = tab.url.startsWith("http") ? tab.url : `https://${tab.url}`;
}

newTabForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const url = urlInput.value.trim();
  if (url) {
    createTab(url);
    urlInput.value = "";
  }
});
