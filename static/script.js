import {PageGenerator} from "./page_generator.js"

let pg = new PageGenerator()
let pyo = null

let market = ""
let amount = 0

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
	pg.addVBox("trade_form")
	pg.addTextInput("market", "enter market name", () => {market = document.getElementById("market").value})
	pg.selectById("trade_form")
	pg.addNumberInput("amount", "enter amount", () => {amount = document.getElementById("amount").value})
	pg.selectById("trade_form")
	pg.addButton("Buy", "buy", () => buy(market, amount))
	pg.selectById("trade_form")
	pg.addButton("Sell", "sell", () => sell(market, amount))
	step()
	port()
}

async function step(){
	let data = await fetch("/step");
	let text = await data.json();
	document.getElementById("markets").innerText = JSON.stringify(text);
	port()
	setTimeout(step, 1000)	
}

async function port(){
	let data = await fetch("/port");
	let text = await data.text();
	document.getElementById("portfolio").innerText = text;	
}

async function buy(market, amount) {
	let form = new FormData();
	form.append("market", market)
	form.append("amount", amount)
	console.log(form)
   	let req = await fetch("/buy", {
	   method:"POST",
	   body: form
	});
	port()
}
async function sell(market, amount) {
	let form = new FormData();
	form.append("market", market)
	form.append("amount", amount)
	console.log(form)
   	let req = await fetch("/sell", {
	   method:"POST",
	   body: form
	})
	port()
}

