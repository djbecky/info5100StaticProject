var height = 400;
var width = 1120;

var svgstrip = d3.select("#strip_flag").append("svg").attr("height", height)
		.attr("width", width).attr("class", "svgstrip");

svgstrip.append("text").text(
		"Percentage of the colors used in the countries worldwide").attr(
		"class", "title");

var colorset1 = [];
var height2 = 0;
d3.json("data/ctry_color_list.json", function(error, data) {

	if (error) {
		console.log(error);
	}

	data.forEach(function(d) {
		colorset1.push(d);

	});

	var color = d3.scale.ordinal().domain([ 0, 1, 2, 3, 4, 5, 6, 7 ]).range(
			[ "#FF3333", "#FFFFFF", "#0000ff", "#00FF00", "#FFFF33", "#000000",
					"#FF8C00" ]);

	// Loop over all the colors on the countries to show the percentage
	for (var t1 = 0; t1 < colorset1.length; t1++) {
		svgstrip.append("rect").attr("x", 100).attr("y", 20 + height2).attr(
				"height", colorset1[t1].value / 2).attr("width", 900).style(
				"fill", color(t1));

		var percent = Math.floor((colorset1[t1].value / 194) * 100);
		var fontsize = colorset1[t1].value / 4 + "px";

		svgstrip.append("text").text(percent).attr("x", 20).attr(
				"y",
				15 + height2 + colorset1[t1].value / 2 - colorset1[t1].value
						/ 10).attr("fill", "white")
				.style("font-size", fontsize);

		svgstrip.append("text").text("%").attr("x", 60).attr(
				"y",
				15 + height2 + colorset1[t1].value / 2 - colorset1[t1].value
						/ 10).attr("fill", "white")
				.style("font-size", fontsize);

		height2 = height2 + colorset1[t1].value / 2;
	}
});