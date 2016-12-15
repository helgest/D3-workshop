(function() {

	var boxWidth = 400,
		boxHeight = 400,

		neckWidth = function(d) { console.log((d.Høyde-150)*4); return (d.Høyde-150)*4; },
		neckHeight =  function(d) { return (d.Høyde-150)*4; },
		neckX = function(d) { return 80 + bodyX - neckWidth(d); },
		neckY = function(d) { return 40 + bodyY - neckHeight(d); },

		faceWidth = 80,
		faceHeight = 80,
		faceX = function(d) { return neckX(d); },
		faceY = function(d) { return neckY(d) - (faceHeight/2); },

		hairX = function(d) { return faceX(d) + (faceWidth/2); },
		hairY = function(d) { return faceY(d) },

		bodyWidth = 140,
		bodyHeight = 140,
		bodyX = boxWidth - bodyWidth;
		bodyY = boxHeight - bodyHeight,

		hårfarge = function(d) { return ("#" + d.Hårfarge); },
		hårlengde = function(d) { return (d.Hårlengde*6); };

	var oppdatermikrofonsveis = function (data) {

		var sveisSvg = d3.select('#mikrofonsveis'); // finner svg-elementet
		var sveiser = sveisSvg.selectAll('.sveis').data(data);  

		var sveis = sveiser.enter()
			.append('svg')
				.attr('class', 'sveis')
				.attr('width', boxWidth)
				.attr('height', boxHeight)
				.attr('viewBox', '0 0 '+boxWidth+' '+boxHeight)
				.attr('class', 'sveis');

		sveis.append('image')
				.attr('x', bodyX)
				.attr('y', bodyY)
				.attr('width', bodyWidth)
				.attr('height', bodyHeight)
				.attr('xlink:href', 'img/sveis_body.svg');

		sveis.append('image')
				.attr('x', neckX)
				.attr('y', neckY)
				.attr('width', neckWidth)
				.attr('height', neckHeight)
				.attr('xlink:href', 'img/sveis_neck.svg');

		sveis.append('circle')
				 .attr('fill', hårfarge)
				 .attr('cx', hairX)
				 .attr('cy', hairY)
				 .attr('r', hårlengde);

		sveis.append('image')
				.attr('x', faceX)
				.attr('y', faceY)
				.attr('width', faceWidth)
				.attr('height', faceHeight)
				.attr('xlink:href', 'img/sveis_face.svg');

		sveiser.exit().remove();
	};

	// henter kommaseparerte data fra regnearket, gjør det om til json-data og måker det inn i funksjonen oppdatermikrofonsveis
	//d3.csv("https://docs.google.com/spreadsheet/pub?key=0AmIZ0GqXTrZYdFJzUWlTajQzOGpzS3lCWjdUU0FMRHc&single=true&gid=0&output=csv", oppdatermikrofonsveis);
	d3.csv("./data.csv", oppdatermikrofonsveis);

})();
