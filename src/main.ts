import './style.css'
import { editor, languages } from 'monaco-editor';

let diffApp = document.getElementById('diff-app')!;

let leftModel = editor.createModel("{\n\"left\":\"page\"\n}",  "json");
let rightModel = editor.createModel("{\n\"right\":\"page\"\n}", "json");
let diffModel = editor.createDiffEditor(diffApp, {originalEditable:true});

let langChoices = languages.getLanguages();
let langSelector = <HTMLSelectElement>(document.getElementById("langSelector"));
let themeSelector = <HTMLSelectElement>(document.getElementById("themeSelector"));
editor.setTheme(themeSelector.value);

for (let e of langChoices){
	let opt = document.createElement("option");
	opt.value = e.id;
	opt.innerHTML = e.id;
	langSelector?.appendChild(opt);
}

langSelector.value = "json";

langSelector?.addEventListener("change", (_)=>{
	editor.setModelLanguage(leftModel, langSelector.value);
	editor.setModelLanguage(rightModel, langSelector.value);
}, false)

themeSelector?.addEventListener("change", (_)=>{
	editor.setTheme(themeSelector.value);
}, false)

diffModel.setModel({
	original: leftModel,
	modified: rightModel,
});
