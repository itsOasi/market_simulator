class MenuItem:
	def __init__(self, name, callback, kwargs=None):
		self._name = name
		self._callback = callback
		self._kwargs = kwargs
		
	def check_select(self, inp):
		if inp.lower() == self._name.lower():
			if self._kwargs == None:
				self._callback()
				return
			self._callback(**self._kwargs)

class Menu:
	def __init__(self, items):
		self._items = items
	
	def prompt(self, msg):
		for item in self._items:
			print(item._name)
		res = input(msg)
		for item in self._items:
			item.check_select(res)
			