import random
import os, time

class Client:
	def __init__(self, principle, profit, reward, deadline):
		self.principle = principle
		self.profit_amount = profit
		self.target = self.calc_target()
		self.deadline = deadline
		self.reward = reward
		self.__ready_to_collect = False
	
	def update(self):
		self.deadline -= 1
		if self.deadline <= 0:
			self.__ready_to_collect = True
			
	def is_ready_to_collect(self):
		return self.__ready_to_collect
	
	def calc_target(self):
		return self.principle + (self.principle * self.profit_amount)
	
	def __repr__(self):
		return f"${self.target} time: {self.deadline}\n"
	
class Player:
	def __init__(self):
		self.__rep = 100
		self.__cash = 10000
		self.__clients = []
		self.__portfolio = Portfolio()
	
	def update(self):
		self.__update_portfolio()
		self.__update_clients()

	def __update_clients(self):
		for client in self.__clients:
			client.update()
			if client.is_ready_to_collect():
				if self.__cash <= client.target:
					self.__rep -= client.reward * .5
				else:
					self.__rep += client.reward
				self.__clients.remove(client)
					
	def __update_portfolio(self):
		self.__cash += self.__portfolio.update_balances()
	
	def add_to_portfolio(self, market_name, transaction):
		self.__portfolio.add_transaction(market_name, transaction)

	def accept_client(self, client):
		self.__clients.append(client)
		self.__cash += client.principle
	
	def view_clients(self):
		return self.__clients
	
	def calc_target_value(self):
		target = 0
		for client in self.__clients:
			target += client.calc_target()
		return target
	
	def view_rep(self):
		return self.__rep
	
	def __repr__(self):
		return f"rep points: {self.__rep}\nclients: {self.__clients}\nport: {self.__portfolio}"
		

class Portfolio:
	def __init__(self):
		print("setting up portfolio")
		self.__asset_classes = {}
		self.__asset_value = 0
	
	def update_balances(self):
		self.__asset_value = 0
		cash = 0
		for name, ac in self.__asset_classes:
			cash += ac.update_transactions()
			self.__asset_value += ac.get_asset_value()
		return cash
	
	def get_asset_value(self):
		return self.__asset_value
	
	def add_asset(self, asset_name):
		self.__asset_classes[asset_name] = Asset(asset_name)
	
	def add_transaction(self, asset_name, transaction):
		if not asset_name in self.__asset_classes:
			self.add_asset(asset_name)
		self.__asset_classes[asset_name].add_transaction(transaction)
	
	def __repr__(self):
		return f"assets: {self.__asset_classes} value: {self.get_asset_value()}"

class Asset:
	def __init__(self, name):
		self.__name = name
		self.__quantity = 0
		self.__transactions = []
		
	def update_transactions(self):
		cash = 0
		self.__quantity = 0
		for trans in self.__transactions:
			trans.update()
			if not trans.is_closed():
				continue
			if trans.get_direction() == "buy":
				cash -= trans.get_value()
				self.__quantity += trans.get_quantity()
			if trans.get_direction() == "sell":
				cash += trans.get_value()
				self.__quantity -= trans.get_quantity()
		return cash
	
	def get_asset_value(self):
		value = 0
		for trans in self.__transactions:
			if trans.is_closed and trans.get_direction() == "buy":
				value += trans.get_value()
		return value
	
	def get_name(self):
		return self.__name
		
	def get_quantity(self):
		return self.__quantity
		
	def add_transaction(self, trans):
		self.__transactions.append(trans)

class Transaction:
	def __init__(self, quantity, unit_price, direction, time):
		self.__quantity = quantity
		self.__unit_price = unit_price
		self.__direction = direction
		self.__time_until_closed = time
		self.__state = "open"
	
	def update(self):
		self.__time_until_closed -= 1
		if self.__time_until_closed <= 0:
			self.__close()
	
	def __close(self):
		self.__state = "closed"
	
	def cancel(self):
		self.__state = "canceled"
	
	def is_closed(self):
		return self.__state == "closed"
	
	def get_direction(self):
		return self.__direction
	
	def get_quantity(self):
		return self.__quantity
	
	def get_unit_price(self):
		return self.__unit_price
	
	def get_value(self):
		return self.__quantity * self.__unit_price

class Market:
	def __init__(self, name, starting_value, volatility, liquidity):
		print(f"creating {name} market")
		self.name = name
		self.starting_value = starting_value
		self.last_value = self.starting_value
		self.curr_value = self.starting_value
		self.volatility = volatility
		self.liquidity = liquidity
	
	def calculate_price(self, growth):
		self.curr_value = round((self.last_value * growth) + random.randrange(int(-self.volatility*.5), self.volatility), 2)
		
	def get_price(self):
		return self.curr_value
		
	def calculate_overall_growth(self):
		return (self.curr_value / self.starting_value) * 100
	
	def buy(self, qty):
		return Transaction(qty, self.get_price(), "buy", self.liquidity)
	
	def sell(self, qty):
		return Transaction(qty, self.calculate_price, "sell", self.liquidity)
		
	def __repr__(self):
		return f"{self.name}: {self.get_price()}"
	

class GlobalEconomy:
	def __init__(self):
		print("setting up Global Economy")
		self.__player = Player()
		self.__markets = self.__set_up_markets()
		self.__growth = 1 # a value between 2 and 0 percent
		self.is_running = True
		
	def __set_up_markets(self):
		markets = {
			"stonks":Market("stonks", 50, 5, 100),
			"crypto":Market("crypto", 1000, 5, 50),
			"rlestate":Market("rlestate", 250000, 5, 10),
		}
		return markets
	
	def run(self):
		while True:
			os.system("clear")
			self.process()
			time.sleep(1)
	
	def process(self):
		# calculate global economic growth
		self.__growth = self.__calculate_growth()
		# calculate per market growth
		for _, market in self.view_markets().items():
			market.calculate_price(self.__growth)
		# update portfolio
		self.__player.update()
		self.__find_a_client()
		print(f"{list(self.view_markets().values())}\n{self.__player}")
		print(f"'b'+market name to buy\n's'+market name to sell")

	def __calculate_growth(self):
		return round(random.uniform(0, 50), 2)

	def view_markets(self):
		return self.__markets
	
	def view_growth(self):
		return self.__growth
	
	def buy_at(self, market_name, amount):
		self.__player.add_to_portfolio(market_name, self.__markets[market_name].buy(amount))
	
	def sell(self, asset_name, amount):
		self.__player.add_to_portfolio(asset_name, self.__markets[asset_name].sell(amount))
	
	def __find_a_client(self):
		chance = random.randint(0, 1000)
		print(chance)
		if chance <= self.__player.view_rep():
			c = Client(random.randrange(100, 100000), random.random(), random.randrange(1, 100), random.randrange(1, 100))
			self.__player.accept_client(c)
