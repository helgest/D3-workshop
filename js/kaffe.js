var oppdaterKaffe = function (datasett) {
	var kaffeoversikt = d3.select("#kaffe");
	var avdelinger = kaffeoversikt.selectAll(".fagomraade").data(d3.keys(datasett));

	var avd = avdelinger.enter()
		.append("div")
			.attr("class", "fagomraade");

		avd.append("span")
			.attr("class", "name")
			.text(function (d) {return d});

		avd.append("div")
				.attr("class", "forbruk")
			.append("span")
				.attr("class", "kaffebar")
				.attr("style", function (d) {
					return "width: " + d3.mean(datasett[d], function (d) { console.log(d.Kaffeforbruk);return d.Kaffeforbruk }) * 32 + "px";
				});
};

var sorterDataOgOppdaterKaffe = function (data) {
	// her grupperer vi data etter fagområde
	var fagområder = d3.nest()
    	.key(function (d) { return d.Fagområde; })
    	.map(data);

    // og oppdaterer nedtrekkslisten
    oppdaterKaffe(fagområder);
};

// henter kommaseparerte data fra regnearket, gjør det om til json-data og måker det inn i funksjonen sorterEtterFagområde
d3.csv("https://docs.google.com/spreadsheet/pub?key=0AmIZ0GqXTrZYdFJzUWlTajQzOGpzS3lCWjdUU0FMRHc&single=true&gid=0&output=csv", sorterDataOgOppdaterKaffe);
