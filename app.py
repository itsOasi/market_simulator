import classes, menu


eco = classes.GlobalEconomy()
port = eco.get_player().get_portfolio()

def step():
        return eco.step()

def portfolio():
        return str(port)

def buy(market_name, amount):
        eco.buy_at(market_name, amount)
        return {"success": True}

def sell(asset_name, amount):
		eco.sell(asset_name, amount)
		return {"success": True}

if __name__ == "__main__":
		def console_buy():
			market_name = input("Which market do you want to buy from? ")
			amount = int(input("How much do you want to buy? "))
			buy(market_name, amount)
    
		def console_sell():
			asset_name = input("Which asset do you want to sell? ")
			amount = int(input("How much do you want to sell? "))
			sell(asset_name, amount)

		menu_items = [
            menu.MenuItem("Buy", console_buy),
			menu.MenuItem("Sell", console_sell)
        ]

		while True:
			eco.step()
			str(port)
			menu.Menu(menu_items).prompt("What do you want to do?")