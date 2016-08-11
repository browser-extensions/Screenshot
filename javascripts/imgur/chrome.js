/*!
 * v1.0.5
 * Date: Thurs Aug 16 15:25:32 2012 0000
 */

		function uploadToMyPix(ctx) {
			var baseUrl="http://smrtshot.com/api/1/upload/?key=4355a79a868879822b0c324f0400388a&source="+ctx.srcUrl+"&format=redirect";
			uploadImage(baseUrl);
		}
		

		
		function uploadImage(imgUrl) {
			var behaviour = window.localStorage.behaviour;
				if (behaviour == "new_unfocused") {
					chrome.tabs.create({
					url: url,
					selected: false
					});
				} else if (behaviour == "new") {
					chrome.tabs.create({
					url: imgUrl,
					selected: true
					});
				} else if (behaviour == "new_window") {
					chrome.windows.create({
					url: imgUrl,
					});
				} else {
					chrome.tabs.create({
					url: imgUrl,
					});
				}		
		}
		
		chrome.contextMenus.create({title: chrome.i18n.getMessage("ctxMenuStringMyPix"), contexts:["image"], onclick: uploadToMyPix});
