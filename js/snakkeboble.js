
var oppdaterSnakkeboble = function (datasett) {
	var boble = d3.select("#snakkeboble")
		.selectAll("div")
		.data([datasett[0]])
		.enter()
		.append("div")
		.text(function (d) {
			return "Det var " + d.fagområde + "folk som var raskest til å svare på denne undersøkelsen";
		});
};

var sorterDataOgOppdaterSnakkeboble = function (data) {
	// her grupperer vi data etter fagområde
	var fagområder = d3.nest()
    	.key(function (d) { return d.Fagområde; })
    	.map(data);

    var gjennomsnittstider = [];
    var timeFormat = d3.time.format("%d.%m.%Y kl. %H.%M.%S");

    // lag liste over gjennomsnittlige svartider
    for (var fag in fagområder) {
    	if (fagområder.hasOwnProperty(fag)) {
    		var obj = {};
    		obj.fagområde = fag;
    		obj.tid = d3.mean(fagområder[fag], function (d) { 
    			var dateObject = timeFormat.parse(d.Tidsmerke);
    			return dateObject.getTime(); 
    		});
    		gjennomsnittstider.push(obj);
    	}
    }
    gjennomsnittstider.sort(function (a, b) {
    	return a.tid - b.tid;
    });

    // og oppdaterer snakkeboblen
    oppdaterSnakkeboble(gjennomsnittstider);
};

// henter kommaseparerte data fra regnearket, gjør det om til json-data og måker det inn i funksjonen sorterEtterFagområde
d3.csv("https://docs.google.com/spreadsheet/pub?key=0AmIZ0GqXTrZYdFJzUWlTajQzOGpzS3lCWjdUU0FMRHc&single=true&gid=0&output=csv", sorterDataOgOppdaterSnakkeboble);
