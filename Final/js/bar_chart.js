var height = 800;
var width = 1200;
var padding = 50;

var svg4 = d3.select("#bar_chart").append("svg").attr("height", height).attr(
    "width", width).attr("class", "svg").append("g");

svg4.append("text").attr("x", width / 2).attr("y", 80).attr("base-alignment",
    "middle").attr("text-anchor", "middle").text("The Color Used In Different Continent and Religion")
    .attr("class","title");
svg4.append("text").attr("x", width / 2).attr("y", 750).attr("base-alignment",
    "middle").attr("text-anchor", "middle").text("Note: We show the top 4 colors used in each continent and each religion. And the line between the continent and religion mean the top 3 religions in this continent.")
    .attr("class","note");

var conti_reli_dataset = []
var obj = {};

// continent vs color bar chart in left side

var Dic_cont_color_array = [];
for (var i = 0; i < contColor.length; i++) {
  var Dic_cont_color = new Object();
  var Dic_cont_color_top4 = new Object();
  Dic_cont_color.keys = [];
  Dic_cont_color.count = [];

  contColor[i].color.forEach(function(p) {
    if (Dic_cont_color.keys.indexOf(p) == -1) {
      Dic_cont_color.keys.push(p);
      Dic_cont_color.count[Dic_cont_color.keys.indexOf(p)] = 1;
    } else {
      Dic_cont_color.count[Dic_cont_color.keys.indexOf(p)]++;
    }

  });
  var tempArray = Dic_cont_color.count;
  Dic_cont_color.count.sort(function(a, b) {
    return b - a
  });
  Dic_cont_color_top4.count = [ Dic_cont_color.count[0],
      Dic_cont_color.count[1], Dic_cont_color.count[2],
      Dic_cont_color.count[3] ];
  Dic_cont_color_top4.keys = [
      Dic_cont_color.keys[tempArray.indexOf(Dic_cont_color_top4.count[0])],
      Dic_cont_color.keys[tempArray.indexOf(Dic_cont_color_top4.count[1])],
      Dic_cont_color.keys[tempArray.indexOf(Dic_cont_color_top4.count[2])],
      Dic_cont_color.keys[tempArray.indexOf(Dic_cont_color_top4.count[3])] ];
  for (var j = 0; j < 3; j++) {
    if (Dic_cont_color_top4.keys[j] == Dic_cont_color_top4.keys[j + 1]) {
      Dic_cont_color_top4.keys[j + 1] = Dic_cont_color.keys[tempArray
          .lastIndexOf(Dic_cont_color_top4.count[j + 1])];
    }
  }
  Dic_cont_color_array.push(Dic_cont_color_top4);

}
// make dataset for continent_color bar chart
var dataset1 = [];
for (var i = 0; i < contColor.length; i++) {

  obj = {
    continent : contColor[i].name,
    count : Dic_cont_color_array[i].count,
    keys : Dic_cont_color_array[i].keys
  };
  dataset1.push(obj);
}

var yScale1 = d3.scale.linear().domain([ 0, 5 ]).range([ 100, height - 120 ]);

var yAxis1 = d3.svg.axis().scale(yScale1).orient("left").ticks(6).tickSize(3)
    .tickFormat('');

svg4.append("g").attr("transform", "translate(" + 280 + ",20)").attr("class",
    "axis").call(yAxis1).attr("fill", "white");

var xScale1 = d3.scale.linear().domain([ 0, 50 ]).range([ width / 4, 0 ]);

for (var i = 0; i < contColor.length; i++) {

  var ybars = d3.scale.ordinal().domain(dataset1[i].keys).rangePoints(
      [ 100 + 600 / 6 * (6 - i - 1), 100 + 600 / 6 * (6 - i) ], 3.0); 
  // first node and the last node

  var ybarss = d3.scale.ordinal().domain(dataset1[i].keys).rangeRoundBands(
      [ 100 + 600 / 6 * (6 - i - 1), 100 + 600 / 6 * (6 - i) ], 0.3); 
  // interval of two nodes

  // for continent text
  svg4.append("text").attr("x", xScale1(0) + 18).attr("y",
      100 + 600 / 6 * (6 - 0.5 - i) + 10)
      .attr("base-alignment", "middle").attr("text-anchor", "middle")
      .text(contColor[i].name).style("font-size", 15).attr("fill",
          "white");

  // for each bar
  for (var j = 0; j < 4; j++) {
    svg4.append("rect").attr("x", xScale1(dataset1[i].count[j]) - 25).attr(
        "y", ybars(dataset1[i].keys[j])).attr("height",
        ybarss.rangeBand(j)).attr("width",
        xScale1(0) - xScale1(dataset1[i].count[j])).attr("fill",
        dataset1[i].keys[j]);

    svg4.append("text").attr("x", xScale1(dataset1[i].count[j]) - 42).attr(
        "y", ybars(dataset1[i].keys[j]) + 12)
        .text(dataset1[i].count[j]).style("font-size", 10).attr("fill",
            "white").style("font-weight", "bold");

  }
}

// ///////////////////////////////////////////
// religion vs color bar chart in right side

var Dic_reli_color_array = [];
for (var i = 0; i < reliColor.length; i++) {
  var Dic_reli_color = new Object();
  var Dic_reli_color_top4 = new Object();
  Dic_reli_color.keys = [];
  Dic_reli_color.count = [];

  reliColor[i].color.forEach(function(p) {
    if (Dic_reli_color.keys.indexOf(p) == -1) {
      Dic_reli_color.keys.push(p);
      Dic_reli_color.count[Dic_reli_color.keys.indexOf(p)] = 1;
    } else {
      Dic_reli_color.count[Dic_reli_color.keys.indexOf(p)]++;
    }

  });
  var tempArray = Dic_reli_color.count;
  Dic_reli_color.count.sort(function(a, b) {
    return b - a
  });
  Dic_reli_color_top4.count = [ Dic_reli_color.count[0],
      Dic_reli_color.count[1], Dic_reli_color.count[2],
      Dic_reli_color.count[3] ];
  Dic_reli_color_top4.keys = [
      Dic_reli_color.keys[tempArray.indexOf(Dic_reli_color_top4.count[0])],
      Dic_reli_color.keys[tempArray.indexOf(Dic_reli_color_top4.count[1])],
      Dic_reli_color.keys[tempArray.indexOf(Dic_reli_color_top4.count[2])],
      Dic_reli_color.keys[tempArray.indexOf(Dic_reli_color_top4.count[3])] ];
  for (var j = 0; j < 3; j++) {
    if (Dic_reli_color_top4.keys[j] == Dic_reli_color_top4.keys[j + 1]) {
      Dic_reli_color_top4.keys[j + 1] = Dic_reli_color.keys[tempArray
          .lastIndexOf(Dic_reli_color_top4.count[j + 1])];
    }
  }
  Dic_reli_color_array.push(Dic_reli_color_top4);

}
// make dataset for continent_color bar chart
var dataset2 = [];
for (var i = 0; i < reliColor.length; i++) {

  obj = {
    religion : reliColor[i].religion,
    count : Dic_reli_color_array[i].count,
    keys : Dic_reli_color_array[i].keys
  };
  dataset2.push(obj);
}

var yScale2 = d3.scale.linear().domain([ 0, 5 ]).range([ 100, height - 120 ]);

var yAxis2 = d3.svg.axis().scale(yScale2).orient("left").ticks(6).tickSize(3)
    .tickFormat('');

svg4.append("g").attr("transform", "translate(" + 873 + ",20)").attr("class",
    "axis").call(yAxis2).attr("fill", "white");

var xScale2 = d3.scale.linear().domain([ 0, 50 ]).range(
    [ width * 3 / 4, width ]);

for (var i = 0; i < reliColor.length; i++) {

  var ybars = d3.scale.ordinal().domain(dataset2[i].keys).rangePoints(
    //first node and the last node
      [ 100 + 600 / 6 * (6 - i - 1), 100 + 600 / 6 * (6 - i) ], 3.0); 

  var ybarss = d3.scale.ordinal().domain(dataset2[i].keys).rangeRoundBands(
    // interval of two nodes
      [ 100 + 600 / 6 * (6 - i - 1), 100 + 600 / 6 * (6 - i) ], 0.3); 

  // for religion text
  svg4.append("text").attr("x", xScale2(0) - 85).attr("y",
      100 + 600 / 6 * (6 - 0.5 - i) + 10)
      .attr("base-alignment", "middle").attr("text-anchor", "middle")
      .text(reliColor[i].religion).style("font-size", 15).attr("fill",
          "white");

  // for each bar
  for (var j = 0; j < 4; j++) {
    svg4.append("rect").attr("x", xScale2(0) - 25).attr("y",
        ybars(dataset2[i].keys[j])).attr("height", ybarss.rangeBand(j))
        .attr("width", xScale2(dataset2[i].count[j]) - xScale2(0))
        .attr("fill", dataset2[i].keys[j]);

    svg4.append("text").attr("x", xScale2(dataset2[i].count[j]) - 20).attr(
        "y", ybars(dataset2[i].keys[j]) + 12)
        .text(dataset2[i].count[j]).style("font-size", 10).attr("fill",
            "white").style("font-weight", "bold");

  }
}

// ///////////////////////////////////////////
// continent vs religion bar chart in bottom side

var Dic_cont_reli_array = [];

for (var i = 0; i < contReli.length; i++) {
  var Dic_cont_reli = new Object();
  var Dic_cont_reli_top3 = new Object();
  Dic_cont_reli.keys = [];
  Dic_cont_reli.count = [];

  contReli[i].reli.forEach(function(p) {
    if (Dic_cont_reli.keys.indexOf(p) == -1) {
      Dic_cont_reli.keys.push(p);
      Dic_cont_reli.count[Dic_cont_reli.keys.indexOf(p)] = 1;
    } else {
      Dic_cont_reli.count[Dic_cont_reli.keys.indexOf(p)]++;
    }

  });
  var tempArray = Dic_cont_reli.count;
  Dic_cont_reli.count.sort(function(a, b) {
    return b - a
  });
  Dic_cont_reli_top3.count = [ Dic_cont_reli.count[0],
      Dic_cont_reli.count[1], Dic_cont_reli.count[2] ];
  Dic_cont_reli_top3.keys = [
      Dic_cont_reli.keys[tempArray.indexOf(Dic_cont_reli_top3.count[0])],
      Dic_cont_reli.keys[tempArray.indexOf(Dic_cont_reli_top3.count[1])],
      Dic_cont_reli.keys[tempArray.indexOf(Dic_cont_reli_top3.count[2])] ];
  for (var j = 0; j < 2; j++) {
    if (Dic_cont_reli_top3.keys[j + 1] == null) {
      Dic_cont_reli_top3.count[j + 1] = 0;
    }
    if (Dic_cont_reli_top3.keys[j] == Dic_cont_reli_top3.keys[j + 1]) {
      Dic_cont_reli_top3.keys[j + 1] = Dic_cont_reli.keys[tempArray
          .lastIndexOf(Dic_cont_reli_top3.count[j + 1])];
    }
  }
  Dic_cont_reli_array.push(Dic_cont_reli_top3);

}
// make dataset for continent_color bar chart
var dataset3 = [];
for (var i = 0; i < contReli.length; i++) {

  obj = {
    continent : contReli[i].name,
    count : Dic_cont_reli_array[i].count,
    keys : Dic_cont_reli_array[i].keys
  };
  dataset3.push(obj);
}

var points = [];
var points_index = [];
for (var i = 0; i < dataset1.length; i++) {
  svg4.append("circle").attr("cx", xScale1(0) + 100).attr("cy",
      105 + 600 / 6 * (6 - 0.5 - i)).attr("r", 4).style("fill", "orange");
  var pos = {
    name : dataset1[i].continent,
    x : xScale1(0) + 100,
    y : 105 + 600 / 6 * (6 - 0.5 - i)
  };
  points.push(pos);
  points_index.push(dataset1[i].continent);
}

for (var i = 0; i < dataset2.length; i++) {
  svg4.append("circle").attr("cx", xScale2(0) - 165).attr("cy",
      105 + 600 / 6 * (6 - 0.5 - i)).attr("r", 4).style("fill", "orange");
  var pos = {
    name : dataset2[i].religion,
    x : xScale2(0) - 165,
    y : 105 + 600 / 6 * (6 - 0.5 - i)
  };
  points.push(pos);
  points_index.push(dataset2[i].religion);
}

for (var i = 0; i < dataset1.length; i++) {
  for (var j = 0; j < dataset3[i].keys.length; j++) {
    svg4
        .append("line")
        .attr("x1",
            points[points_index.indexOf(dataset1[i].continent)].x)
        .attr("y1",
            points[points_index.indexOf(dataset1[i].continent)].y)
        .attr("x2", points[points_index.indexOf(dataset3[i].keys[j])].x)
        .attr("y2", points[points_index.indexOf(dataset3[i].keys[j])].y)
        .style("stroke-width", 6)
        .style("stroke", "white")
        .style(
            "opacity",
            dataset3[i].count[j]
                / (dataset3[i].count[0] + dataset3[i].count[1] + dataset3[i].count[2]));
  }
}
