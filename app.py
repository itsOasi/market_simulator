import classes


eco = classes.GlobalEconomy()
port = eco.get_player().get_portfolio()

def step():
        return eco.step()

def portfolio():
        return str(port)

def buy(market_name, amount):
        eco.buy_at(market_name, amount)

def sell(asset_name, amount):
        eco.sell(asset_name, amount)
