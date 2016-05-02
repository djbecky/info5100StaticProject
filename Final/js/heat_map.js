var margin = {
  top : 150,
  right : 0,
  bottom : 100,
  left : 350
};
var width = 1100 - margin.left - margin.right;
var height = 650 - margin.top - margin.bottom;
var gridSize = Math.floor(width / 12);

var legendElementWidth = gridSize * 1.6;
var buckets = 5;
var colors = [ "#f7fbff", "#deebf7", "#c6dbef", "#9ecae1", "#6baed6" ];
var religion = [ "Catholic", "Other Christian", "Ethnic", "Marxist", "Muslim",
    "Others" ];
var shapes = [ "sunstars", "circles", "crosses", "triangle", "saltires",
    "crescent", "quarters", "stripes" ];

var svg5 = d3.select("#heat_map").append("svg").attr("width",
    width + margin.left + margin.right).attr("height",
    height + margin.top + margin.bottom).append("g").style(
    "background-color", "rgb(105, 105, 105)").attr("transform",
    "translate(" + margin.left + "," + margin.top  + ")")
    .attr("class", "svgstrip");

    svg5.append("text").attr("x", width / 3).attr("y", -120).attr("base-alignment",
    "middle").attr("text-anchor", "middle").text("Religion vs Element")
    .attr("class","title");


var relLabels = svg5
    .selectAll(".relLabel")
    .data(religion)
    .enter()
    .append("text")
    .text(function(d) {
      return d;
    })
    .attr("x", 0)
    .attr("y", function(d, i) {
      return i * gridSize;
    })
    .style("text-anchor", "end")
    .style("fill", "white")
    .style("font-size", 25)
    .attr("transform", "translate(-6," + gridSize / 1.5 + ")")
    .attr(
        "class",
        function(d, i) {
          return ((i >= 0 && i <= 5) ? "relLabel mono axis axis-workweek"
              : "relLabel mono axis");
        });

svg5.append("image").attr("x", 0).attr("y", 0).attr("xlink:href", "data/shapes.png")
    .attr("height", gridSize).attr("width", gridSize * shapes.length).attr(
        "transform", "translate(0, -70)");

// Load the data from the tsv file
d3.tsv("data/rel_shapes_tsv.tsv", function(d) {
  return {
    religion : d.religion,
    element : d.element,
    percentage : d.percentage
  };
}, function(error, data) {

  if (error)
    throw error;

  var max_domain = d3.max(data, function(d) {
    return d.percentage;
  });

  max_domain = 75

  var colorScale = d3.scale.quantile().domain([ 0, buckets - 1, max_domain ])
      .range(colors);

  var cards = svg5.selectAll(".flagGrid").data(data, function(d) {
    return d.religion + ':' + d.element;
  });

  cards.append("title");

  // plot the grids for heat map
  cards.enter().append("rect").attr("x", function(d) {
    return (d.element - 1) * gridSize;
  }).attr("y", function(d) {
    return (d.religion - 1) * gridSize;
  }).attr("rx", 4).attr("ry", 4).attr("class", "flagGrid bordered").attr(
      "width", gridSize).attr("height", gridSize)
      .style("fill", colors[0]).style("stroke", "#000032").style(
          "stroke-width", 2);

  cards.transition().duration(1000).style("fill", function(d) {
    return colorScale(d.percentage);
  });

  cards.select("title").text(function(d) {
    return d.percentage;
  });

  cards.exit().remove();

  var legend = svg5.selectAll(".legend").data(
      [ 0 ].concat(colorScale.quantiles()), function(d) {
        return d;
      });

  //Add a legend to show the gradient of the colors used
  legend.enter().append("g").attr("class", "legend");

  legend.append("rect").attr("x", function(d, i) {
    return legendElementWidth * i;
  }).attr("y", height - 170).attr("width", legendElementWidth).attr("height",
      gridSize / 3).style("fill", function(d, i) {
    return colors[i];
  });

  legend.append("text").attr("class", "mono").text(function(d) {
    return " >= " + Math.round(d);
  }).attr("x", function(d, i) {
    return legendElementWidth * i;
  }).attr("y", height + gridSize - 200).style("fill", "white");
  legend.exit().remove();
});
