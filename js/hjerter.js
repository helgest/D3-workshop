
var fagområder;
var valgtFagområdeHjerter = '';

var heartPositions = [[13,14],[60,32],[7,61],[56,79],[99,103],[107,46],[19,118],[140,80],[64,143],[268,138],[191,90],[158,130],[158,22],[240,102],[213,150],[114,150],[213,150],[114,191],[108,1],[168,187],[267,148],[62,187],[250,57]];

// accessor function 
var favorittfarge = function(d) { return ("#" + d.Favorittfarge); };


var visHjerter = function (datasett) {

	var hjerteSvg = d3.select('#hjerter'); // finner svg-elementet
	var hjerter = hjerteSvg.selectAll('.hjerte').data(datasett);  

	hjerter.enter()
		.append('svg')
			.attr('class', 'hjerte')
			.attr('x', function(d, i) { 
				x = 210;
				if (i < 20) {
					x = heartPositions[i][0];
				}
				return x;
			})
			.attr('y', function(d, i2) { 
				y = 43;
				if (i2 < 20) {
					y = heartPositions[i2][1];
				}
				return y;
			})
		.append('path')
			.attr('d', 'm 32.531026,17.799328 c 0,0 -4.637983,-16.0650504 -17.602652,-7.62571 -14.37144748,9.35509 0.767872,21.80895 15.449079,37.84081 C 52.15572,34.397988 59.12315,14.088358 47.72347,8.0985676 37.076354,2.5041876 32.531026,17.799328 32.531026,17.799328 z')
			.attr('fill', favorittfarge);

	hjerter.exit().remove();

};

var velgHjertefolk = function (fag) {
	valgtFagområdeHjerter = fag || this.value;
	visHjerter([]);	
	visHjerter(fagområder[valgtFagområdeHjerter]);
};

var oppdaterHjertevelger = function () {
	hjertevelger = d3.select("#hjertevelger")               // finn riktig element
		.on("change", velgHjertefolk)                       // lytt til change-event
		.selectAll("option.fag").data(d3.keys(fagområder)); // velger hvilke elementer som skal oppdateres

	hjertevelger.enter()                              // for hvert nye element i datasettet:
		.append("option")                             // legg til et option-element
			.attr("class", "fag")
			.attr("value", function (d) {return d;} ) // sett value lik dataelementet
			.text(function (d) {return d;});          // sett tekstinnhold også lik dataelementet

	hjertevelger.exit()      // for hvert element som fjernes fra datasettet:
		.remove();           // fjern det tilhørende option-elementet
};


var sorterDataOgOppdater = function (data) {

	// her grupperer vi data etter fagområde
	fagområder = d3.nest()
    	.key(function (d) { return d.Fagområde; })
    	.map(data);

    // og oppdaterer nedtrekkslisten
    oppdaterHjertevelger();
    if (valgtFagområdeHjerter === '') {
    	valgtFagområdeHjerter = d3.keys(fagområder)[0];
    }
    velgHjertefolk(valgtFagområdeHjerter);
};

// henter kommaseparerte data fra regnearket, gjør det om til json-data og måker det inn i funksjonen sorterEtterFagområde
d3.csv("https://docs.google.com/spreadsheet/pub?key=0AmIZ0GqXTrZYdFJzUWlTajQzOGpzS3lCWjdUU0FMRHc&single=true&gid=0&output=csv", sorterDataOgOppdater);
