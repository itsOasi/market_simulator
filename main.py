from flask import Flask, request, render_template
import app
flask_app = Flask(__name__)

@flask_app.route('/')
def index():
    return render_template('index.html')

@flask_app.route("/port")
def port():
    return app.portfolio()

@flask_app.route("/step")
def step():
    return app.step()

@flask_app.route("/buy", methods=["POST"])
def buy():
    print(request.form)
    market = request.form["market"]
    amount = request.form["amount"]
    print(market, amount)
    return app.buy(market, amount)

@flask_app.route("/sell", methods=["POST"])
def sell():
	print(request.form)
	market = request.form["market"]	
	amount = request.form["amount"]
	print(market, amount)
	return app.sell(market, amount)

if __name__ == '__main__':
    flask_app.run(debug=True)