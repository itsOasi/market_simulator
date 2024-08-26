import {PageGenerator} from "./page_generator.js"

let pg = new PageGenerator()
let pyo = null

document.body.onload = function(){
	pg.addTitle("Asset Manager Simulator")
	pg.goHome()
	pg.addPara("Clients", "client_title")
	pg.goHome()
	pg.addPara("", "clients")
	pg.goHome()
	pg.addPara("Markets", "market_title")
	pg.goHome()
	pg.addPara("", "markets")
	pg.goHome()
	pg.addPara("Portfolio", "portfolio_title")
	pg.goHome()
	pg.addPara("", "portfolio")
	pg.goHome()
	pg.addForm("buy_form", "/buy")
	pg.addTextInput("market", "enter market name")
	pg.selectById("buy_form")
	pg.addNumberInput("amount", "enter amount")
	pg.selectById("buy_form")
	pg.addButton("Buy", "buy")
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

async function buy(market, amount) {
   let data = await fetch("/port", {
	   method:"POST",
	   body: {
		   "market":market,
		   "amount":amount
	   }
	})
	port()
}

