var a= [4,5,6,2];

function velgDokumentelementerOgBindDemTilData () {
	var elementerMedData = d3.select('#binding').selectAll('p').data(a, String);

	// dette skal skje når det dukker opp nye elementer i datasettet:
	elementerMedData.enter()
		.append('p')
			.text(function(d){ return "her er " + d});

	// dette skal skje når elementer forsvinner fra datasettet:
	elementerMedData.exit().remove();
}

velgDokumentelementerOgBindDemTilData();