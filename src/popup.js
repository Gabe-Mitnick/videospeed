document.addEventListener("DOMContentLoaded", function () {
	document.getElementById("version").innerText =
		"v" + chrome.runtime.getManifest().version

	document.querySelector("#config").addEventListener("click", function () {
		window.open(chrome.runtime.getURL("options.html"))
	})

	document.querySelector("#about").addEventListener("click", function () {
		window.open(chrome.runtime.getManifest().homepage_url)
	})

	document.querySelector("#feedback").addEventListener("click", function () {
		window.open(chrome.runtime.getManifest().homepage_url + "/issues")
	})

	document.querySelector("#enable").addEventListener("click", function () {
		toggleEnabled(true, settingsSavedReloadMessage)
	})

	document.querySelector("#disable").addEventListener("click", function () {
		toggleEnabled(false, settingsSavedReloadMessage)
	})

	// TODO make the buttons actually change things on the page
	document.querySelector("reset").addEventListener("click", function () {
		const tabId = chrome.tabs.tabId
		chrome.tabs.executeScript(
			() => {alert('test')}
		)
	})

	chrome.storage.sync.get({ enabled: true }, function (storage) {
		toggleEnabledUI(storage.enabled)
	})

	function toggleEnabled(enabled, callback) {
		chrome.storage.sync.set(
			{
				enabled: enabled
			},
			function () {
				toggleEnabledUI(enabled)
				if (callback) callback(enabled)
			}
		)
	}

	function toggleEnabledUI(enabled) {
		document.querySelector("#enable").classList.toggle("hide", enabled)
		document.querySelector("#disable").classList.toggle("hide", !enabled)

		const suffix = `${enabled ? "" : "_disabled"}.png`
		chrome.browserAction.setIcon({
			path: {
				19: "icons/icon19" + suffix,
				38: "icons/icon38" + suffix,
				48: "icons/icon48" + suffix
			}
		})
	}

	function settingsSavedReloadMessage(enabled) {
		setStatusMessage(
			`${enabled ? "Enabled" : "Disabled"}. Reload page to see changes`
		)
	}

	function setStatusMessage(str) {
		const status_element = document.getElementById("status")
		status_element.classList.toggle("hide", false)
		status_element.innerText = str
	}
})
