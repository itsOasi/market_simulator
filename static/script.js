import {PageGenerator} from "./page_generator.js"

let pg = new PageGenerator()
let pyo = null

document.body.onload = function(){
	pg.addTitle("Asset Manager Simulator")
	pg.goHome()
	pg.addPara("", "markets")
	pg.goHome()
	pg.addPara("", "portfolio")
	pg.goHome()
	pg.addButton("update portfolio", "portfolio_button", ()=>{port()});
	pg.goHome()
	step()
	port()
}

async function step(){
	let data = await fetch("/step");
	let text = await data.json()
	// console.log(text);
	document.getElementById("markets").innerText = JSON.stringify(text);
	setTimeout(step, 1000)	
}

async function port(){
	let data = await fetch("/port");
	let text = await data.text()
	// console.log(text);
	document.getElementById("portfolio").innerText = text;	
}
