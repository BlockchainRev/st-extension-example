import { extension_settings, getContext, loadExtensionSettings } from "../../../extensions.js";
import { saveSettingsDebounced } from "../../../../script.js";

const extensionName = "custom-server-integration";
const extensionFolderPath = `scripts/extensions/third-party/${extensionName}`;
const extensionSettings = extension_settings[extensionName];
const defaultSettings = {};

// Load the extension settings or initialize them to defaults
async function loadSettings() {
  extension_settings[extensionName] = extension_settings[extensionName] || {};
  if (Object.keys(extension_settings[extensionName]).length === 0) {
    Object.assign(extension_settings[extensionName], defaultSettings);
  }
  $("#example_setting").prop("checked", extension_settings[extensionName].example_setting).trigger("input");
}

// Handle setting changes
function onExampleInput(event) {
  const value = Boolean($(event.target).prop("checked"));
  extension_settings[extensionName].example_setting = value;
  saveSettingsDebounced();
}

// Handle button click
function onButtonClick() {
  toastr.info(
    `The checkbox is ${extension_settings[extensionName].example_setting ? "checked" : "not checked"}`,
    "Custom server integration!"
  );
}

// Initialize the extension
jQuery(async () => {
  const settingsHtml = await $.get(`${extensionFolderPath}/example.html`);
  $("#extensions_settings").append(settingsHtml);

  $("#my_button").on("click", onButtonClick);
  $("#example_setting").on("input", onExampleInput);

  loadSettings();
});
