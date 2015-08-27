var fs = require('fs');

function Mandado(){
	
	this.suffix = '.mandado';

	Mandado.prototype.render = function(name,data){
	  var templateParsed;
	  var templateName = __dirname+'/'+ name+this.suffix;
	  
	  fs.readFile(templateName,function(err, template){
	   	var template = new Template(template.toString(),data);
	   	templateParsed = template.parseVariables();
	  	
	  	console.log(templateParsed);
	  	return templateParsed;
	  });
	}

}

function Template(template,data){
	var self = this;
	this.template = template;
	this.dataTemplate = data;

	Template.prototype.parseVariables = function(){
		  var keysData = Object.keys(this.dataTemplate);
		  var templateParsed; 

		  keysData.forEach(function(name){
		  	 var regex = new RegExp('\\[='+name+'\\]','g');
		  			
		  	 if(!templateParsed){
		 	 	templateParsed = self.template.replace(regex,self.dataTemplate[name]);
		  	 }

		  	 templateParsed = templateParsed.replace(regex,self.dataTemplate[name]);
		  });

		  return templateParsed;
	};


}
var mandado = new Mandado();
mandado.render('index',{ name : 'jorge', eat : 'chocolate', animal : 'dogs', shoes : 'nikes', games : ['cs:Go','need for'] });
