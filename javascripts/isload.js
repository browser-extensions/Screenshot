var isContentScriptLoaded;chrome.extension.sendRequest("undefined"==typeof isContentScriptLoaded?{action:"insert_script"}:{action:"script_running"});