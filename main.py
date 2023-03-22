import classes
import menu


eco = classes.GlobalEconomy()

def run_sim():
	eco.run()

def buy(market_name, amount):
        eco.buy_at(market_name, amount)

def sell(asset_name, amount):
        eco.sell(asset_name, amount)
