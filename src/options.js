
/*
  Save the configured URL to sync storage, which syncs across browsers if the user is logged in
*/
function saveOptions(event) {
  var userInput = document.querySelector("#user-url").value;
  browser.storage.sync.set({
    userUrl: userInput
  });
  event.preventDefault();
  restoreOptions(); // show the user what they just saved
}

/*
  Load from storage to show the user what they"ve configured.
  Populates an example below the input box.
*/
function restoreOptions() {
  var storageItemPromise = browser.storage.sync.get("userUrl");
  storageItemPromise.then((storageItem) => {
    console.log("storageItem =", storageItem);

    document.querySelector("#display-url").innerText = storageItem.userUrl.replace("{}", "my-clipboard-contents-here");
    document.querySelector("#user-url").value = storageItem.userUrl || "Nothing set";
  });
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);

