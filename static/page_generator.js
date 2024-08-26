export class PageGenerator{ 
         constructor(){ 
                 this._home = document.body; 
                 this._curr = document.body; 
                 this._ids = [] 
         } 
     // functions for adding elements 
     addBox(id){ 
         let container = document.createElement("div"); 
         container.id = id; 
         this.insert(container); 
         this.addClass(id, "box"); 
     } 
     addHBox(id){ 
         let container = document.createElement("div"); 
         container.id = id; 
                 console.log(this._home); 
         this.insert(container); 
         this.addClass(id, "hbox"); 
     } 
     addVBox(id){ 
         let container = document.createElement("div"); 
         container.id = id; 
         this._curr.append(container) 
         this.insert(container);; 
         this.addClass(id, "vbox"); 
     } 
     addPara(text, id){ 
         console.log(this._curr); 
         let node = document.createElement("p"); 
         node.innerText = text; 
         node.id = id; 
         this._curr.append(node) 
         this.insert(node) 
         this.addClass(id, "para"); 
     } 
     addTitle(text, id){ 
         console.log(this._curr); 
         let node = document.createElement("h1"); 
         node.innerText = text; 
         node.id = id; 
         this._curr.append(node) 
         this.insert(node) 
         this.addClass(id, "title"); 
     } 
     addButton(text, id, callback){ 
         let button = document.createElement("button"); 
         button.id = id; 
         button.innerText = text; 
         button.onclick = callback; 
         this.insert(button); 
         this.addClass(id, "button"); 
     } 
     addLink(text, id, href, callback){ 
         let button = document.createElement("p"); 
         button.id = id; 
         button.innerText = text; 
         button.onclick = callback; 
         button.src = href; 
         // add .link 
         this.insert(button); 
         this.addClass(id, "link"); 
     } 
     addImage(link, id, callback, alt){ 
         let img = document.createElement("img"); 
         img.id = id; 
         img.src = link; 
         img.onclick = callback; 
         img.alt = alt; 
         this.insert(img); 
     } 
     addTextInput(id, placeholder, callback){ 
         // add a text input element 
         let input = document.createElement("input"); 
         input.type = "text" 
         input.id = id 
         input.placeholder = placeholder 
         input.onclick = callback 
         this.insert(input); 
     } 
     addNumberInput(id, callback){ 
         // add a number input element 
         input.type = "number" 
         input.id = id 
         let input = document.createElement("input"); 
         input.onclick = callback 
         this.insert(input); 
     } 
     addCustomHTML(id, path){ 
         // grabs content from path and adds it to page 
         let node = document.createElement("div"); 
         node.id = id; 
         fetch(`${path}`) // grab from path 
         .then(response=> response.text()) // get text data 
         .then(text=> node.innerHTML = text); // insert text data into node 
          
         this.insert(node); 
         this.addClass(id, "box"); 
     } 
     addSpacer(id){ 
                 // adds an empty div 
         let node = document.createElement("div"); 
         node.id = id; 
         this.insert(node) 
         this.addClass(id, "spacer"); 
     } 
  
     // pointer control 
     insert(node){ 
         this._curr.appendChild(node); // adds node to document 
                 this.select(node); // and selects it 
     } 
     goHome(){ 
         this._curr = this._home; // sets document body as the current node 
     } 
     setHome(id){ 
         this._home = document.getElementById(id); 
         this.goHome(); 
     } 
     select(node){ 
         this._curr = node; // sets node as the current node  
     } 
     selectById(id){ 
         this._curr = document.getElementById(id); // selects a node by id, useful for adding content to containers 
     } 
         clearPage(){ 
                 this._home.replaceChildren(""); 
                 console.log(this._home) 
         } 
     // page styling 
     setBackgroundColor(value){ 
         document.body.style.setProperty(`--background`, value)  
     } 
     setBackgroundImage(value){ 
         docment.body.style.setProperty(`background-image`, `url(${value})`) 
     } 
     setNeutralColor(value){ 
         document.body.style.setProperty(`--neutral`, value) 
     } 
     setPrimaryColor(value){ 
         document.body.style.setProperty(`--primary`, value) 
     } 
     setSecondaryColor(value){ 
         document.body.style.setProperty(`--secondary`, value) 
     } 
     setTextColor(value){ 
         document.body.style.setProperty(`--text`, value) 
     } 
  
     // modifying elements by given id 
     setStyle(id, prop, value){ 
         let el = document.getElementById(id); 
         el.style.setProperty(`${prop}`, value); 
          
     } 
     addClass(id, name){ 
         let node = document.getElementById(id); 
         node.classList.add(name); 
     } 
     update(id, prop, value){ 
         let el = document.getElementById(id); 
         el.setAttribute(`${prop}`, value); 
  
     } 
 } 
  
 export const ContextMenu = { 
     _menu: "", 
     _id: "", 
     new: function(node, id){ // creates a context menu for the given node with the given links 
         node.addEventListener('contextmenu', event => { 
             event.preventDefault(); 
             try{ 
                 this.removeContextMenu(); 
             } 
             finally{ 
                 this.spawnContextMenu(event.pageX, event.pageY, links); 
             } 
         }); 
     }, 
     removeContextMenu:function (){ 
         document.getElementById("exit_context").remove(); 
         document.getElementById("context").remove(); 
     }, 
  
     spawnContextMenu: function(x, y){ 
          
         console.log("spawning context menu") 
         PageGenerator.goHome(); // go back to body 
         PageGenerator.addBox("exit_context"); 
         PageGenerator.goHome(); 
         PageGenerator.addVBox("context"); // create menu area 
         this._menu = document.getElementById("context"); 
          
         document.getElementById("exit_context").onclick = this.removeContextMenu; 
  
         PageGenerator.setStyle("exit_context", "height", `100vh`) 
         PageGenerator.setStyle("exit_context", "width", `100vw`) 
         // style content 
         PageGenerator.setStyle("context", "top", `${y}px`) 
         PageGenerator.setStyle("context", "left", `${x}px`) 
         PageGenerator.setStyle("context", "transform", "translate(-100%, -100%)"); 
         PageGenerator.setStyle("context", "background-color", "var(--neutral)"); 
         PageGenerator.setStyle("context", "min-width", "10em"); 
         PageGenerator.setStyle("context", "max-width", "20em"); 
         PageGenerator.setStyle("context", "border-radius", "var(--corner-radius)"); 
     }, 
  
     addOption: function (text, id, href, callback){ 
         PageGenerator.selectById("context"); 
         PageGenerator.addLink(text, id, href, callback); 
     } 
 }