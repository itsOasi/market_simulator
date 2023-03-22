import {PageGenerator} from "./page_generator.js"

let pg = new PageGenerator()
let pyo = null

document.body.onload = function(){
	pg.addPara("hello", "world")
	pg.goHome()
	pg.addPara("checking if nav has service worker functionality")
	pg.goHome()
	if (window.Worker){
		pyo = new Worker("./py_worker.js")
		fetch("./classes.py")
		pyo.onmessage = (event) =>{
			pg.addPara(event.data);
			pg.goHome()
		}
		pg.addPara("loading web worker");
		pg.goHome()
		pg.addButton("click me", "clicky", greet);
		pg.goHome()
	}
	
}
function greet(){
	pyo.postMessage({"cmd":"run","message":"1+1"})
}