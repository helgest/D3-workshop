// DOM-elementer:
var container,  

// funksjoner:
	tegnUtData,
	finnHøyde,
	lagGriseteInlineStyling,
	klassifisér,
	klesdesign,
	oppdaterVeivere;

finnHøyde = function (d) {
	return d.Høyde;
};

lagGriseteInlineStyling =function (d) {
	var style = "";
	if (d.Fagområde.toLowerCase().indexOf('design') !== -1 ) {
		style += 'border-radius: 5px;'
	}
	style += "height:" + d.Høyde + "px; border: " + d.Frisørbudsjett + "px solid transparent; border-top:" + d.Hårlengde + "px solid #" + d.Hårfarge;
	return style;
};

klassifisér = function (d) {
	var classNames = "person ";
	classNames += d.Fagområde.toLowerCase().replace(/ /g, '-') + ' ';
	classNames += d.Pynt.toLowerCase().replace(/,/g, '');
	return classNames;
};

lagPassendeKlær = function(d) {
	return "background-color:#" + d.Favorittfarge + ";height: " + d.Klesbudsjett * 10 + "%; left: -" + d.Frisørbudsjett + "px;";
};


// legger til en div med klassen "veivere"
container = d3.select("body").append("div").attr("class", "veivere");


oppdaterVeivere = function (data) {
	// d3 velger alle .person-elementer (som i starten er ingen), og binder dette utvalget til arrayen alle 
	personer = container.selectAll(".person").data(data);

	// her sier vi hva som skal skje hvis det dukker opp data i arrayen som ikke allerede er bundet til noe element
	personer.enter()
		.append("div")
			.attr("title", finnHøyde)
			.attr("style", lagGriseteInlineStyling)
			.attr("class", klassifisér)
		.append("div")
			.attr("class", "antrekk")
			.attr("style", lagPassendeKlær);

	// her sier vi hva som skal skje hvis det forsvinner noe fra arrayen 
	personer.exit()
		.remove();
};

// henter kommaseparerte data fra regnearket, gjør det om til json-data og måker det inn i funksjonen oppdaterVeivere
d3.csv("https://docs.google.com/spreadsheet/pub?key=0AmIZ0GqXTrZYdFJzUWlTajQzOGpzS3lCWjdUU0FMRHc&single=true&gid=0&output=csv", oppdaterVeivere);
