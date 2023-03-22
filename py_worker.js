importScripts("https://cdn.jsdelivr.net/pyodide/v0.22.1/full/pyodide.js");
class PyWorker{
	constructor(){
		this.pyodide;
	}
	write_module(file_loc, file_data){ 
		// loads module
		pyodide.FS.writeFile(file_loc, file_data, { encoding: "utf8" });
	};

	async run_line(text){
		// runs the input text
		let res = await this.pyodide.runPython(text);
		console.log(res);
		return res
	}

	async init(){
		this.pyodide = await loadPyodide();
	}
}

let pyworker = new PyWorker();
pyworker.init()

let ecosim = {
	init: async function(){
		pyworker.load_module()
	},
	run_sim: async function(){
		pyworker.run_line()
	},
	get_output: async function(){
		return pyworker.run_line()
	},
	buy: async function(){
		pyworker.run_line()
	},
	sell: async function(){
		pyworker.run_line()
	}
}

onmessage = async function (event){
	switch (event.data["cmd"]){
		case "run":
			// run a given command
			ecosim.run_sim()
			break;
		case "load":
			// load a module from the server
			break;
	}
}; 