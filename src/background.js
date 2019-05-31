
/*
  Read whatever you have copied to your clipboard
  Plop it into the configured URL and open in a new tab

  To get to the console logging you need your browser console
  Open that with ctrl + shift + j
*/
function openPage() {
  var promiseUrl = Promise.resolve(browser.storage.sync.get("userUrl"));
  var promiseClipboard = Promise.resolve(navigator.clipboard.readText());

  // we need both items of information loaded before we can begin
  Promise.all([promiseUrl, promiseClipboard]).then(
    function(values) {
      var userUrl = values[0].userUrl;
      var clipboardContents = values[1];

      console.log("userUrl =", userUrl);
      console.log("clipboardContents =", clipboardContents);

      var newUrl = userUrl.replace("{}", clipboardContents);

      console.log("Navigating to", newUrl);
      browser.tabs.create({"url": newUrl});
    }
  ).catch((e) => {
      console.log("Error retrieving stored settings and clipboard:", e);
    }
  );
}

/*
  Add openPage() as a listener to clicks on our shiny browser button.
*/
browser.browserAction.onClicked.addListener(openPage);
