
  var height = 510;
  var width = 1120;

  var svg2 = d3.select("#donut_chart").append("svg")
  .attr("height", height).attr("width", width).attr("class","svgdonut");

  var radius = Math.min(width, height) / 5.5;

  var totalcountry = 194;

  //headline here:
  svg2.append("text")
  .text("Prefered number of colors used by countries:")
  .attr("transform","translate(20 ,80)")
  .attr("class","title");
  
  //draw the arrow here:
  svg2.append("line")
      .attr("x1", 20)
      .attr("y1",200)
      .attr("x2", width - 100)
      .attr("y2",200)
      .style("stroke","#fff")
      .style("stroke-width","2px");
      
  svg2.append("path")
    .attr("d","M0,0 L0,6 L9,3 z") 
    .attr("transform","translate(" + (width - 100) +  ",197)")
    .style("fill", "#fff");

  svg2.append("text")
  .text("number of")
  .style("fill","white")
  .attr("transform","translate(" + (width - 100) +  ",215)");


  svg2.append("text")
  .text("colors used")
  .style("fill","white")
  .attr("transform","translate(" + (width - 100) +  ",230)");

  //import the relative data here;
  var colorset = [];
  d3.json("data/num_color_ctry.json", function(error, data) {

      if (error) {console.log(error);}

      data.forEach(function(d){
        colorset.push(d);
      });
 

  var color = d3.scale.ordinal()
    .domain([1,2,3,4,5,6,7,8,9])
    .range(["#bdbdbd", "#000000", "#000000","#000000","#000000","#000000", "#000000", "#000000", "#000000"]);

  var arc = d3.svg.arc()
    .outerRadius(radius - 40)
    .innerRadius(radius - 65);


  for(var t1 = 0; t1 < colorset.length; t1++){
  var pie = d3.layout.pie();
  var piedata = pie(colorset[t1].n_ctry);

    var arcs = svg2.selectAll("g.arc")  
    .data(piedata)
    .enter()
    .append("g")
    .attr("transform","translate("+ ((width/10) + t1*120) +","+ (200) +")");

    arcs.append("path")
    .attr("fill",function(d,i){
        if(i == 0) {         
          return color(t1 + 2);
        }
        else return color(i);
    })
    .attr("d",function(d){
        return arc(d);   
    });

    // add text to the center
    arcs.append("text")
    .attr("transform","translate(-5,6)")
    .text(t1+1)
    .style("font-weight","bold")
    .style("fill","white")
    .style("font-size","20px");

    // text on the chart
    arcs.append("text")
    .attr("transform",function(d){
        return "translate(" + arc.centroid(d) + ")";
    })
    .attr("text-anchor","middle")
    .style("fill","white")
    .style("font-weight","bold")
    .text(function(d){
      if(d.data == totalcountry) return "";
      else return d.data;
    });
}
  });


// draw arrow here:
  svg2.append("line")
      .attr("x1", 20)
      .attr("y1",450)
      .attr("x2", width - 100)
      .attr("y2",450)
      .style("stroke","#fff")
      .style("fill","#ffffff")
      .style("stroke-width","2px");

  svg2.append("path")
  .attr("d","M0,0 L0,6 L9,3 z") 
  .attr("transform","translate(" + (width - 100) +  ",447)")
  .style("fill", "#ffffff");


  svg2.append("text")
  .text("number of")
  .style("fill","white")
  .attr("transform","translate(" + (width - 100) +  ",465)");


  svg2.append("text")
  .text("shape used")
  .style("fill","white")
  .attr("transform","translate(" + (width - 100) +  ",480)");


  svg2.append("text")
  .text("Prefered of number of shape used by countries:")
  .attr("transform","translate(20 ,330)")
  .attr("class","title")
  .style("margin","10px");

// data import for the second graph here;  
  var shapeset = [];

  d3.json("data/num_ctry_shape.json", function(error, data) {
  
      if (error) {console.log(error);}

      data.forEach(function(d){
        shapeset.push(d);
      
      });

  var color2 = d3.scale.ordinal()
    .domain([1,2,3,4,5,6,7,8,9])
    .range(["#bdbdbd", "#000000", "#000000","#000000","#000000","#000000", "#000000", "#000000", "#000000"]);


  var arc = d3.svg.arc()
    .outerRadius(radius - 40)
    .innerRadius(radius - 65);


  for(var t2 = 0; t2 < shapeset.length-2; t2++){
  var pie = d3.layout.pie();
  var piedata = pie(shapeset[t2].n_ctry);

    var arcs = svg2.selectAll("g.arc")  
    .data(piedata)
    .enter()
    .append("g")
    .attr("transform","translate("+ ((width/10) + t2*120) +","+ (450) +")");

    arcs.append("path")
    .attr("fill",function(d,i){
        if( i == 0) {
          return color2(t2 + 2);
        }
        else return color2(i);
    })
    .attr("d",function(d){
        return arc(d);   
    });

    // add text to the chart;
    arcs.append("text")
    .attr("transform",function(d){
        return "translate(" + arc.centroid(d) + ")";
    })
    .attr("text-anchor","middle")
    .style("fill","white")
    .style("font-weight","bold")
    .text(function(d){
      if(d.data == totalcountry) return " ";
      else return d.data;
    });

    //center text
    if(t2<7){
    arcs.append("text")
    .attr("transform","translate(-5,6)")
    .text(t2+1)
    .style("font-size","20px")
    .style("font-weight","bold")
    .style("fill","white");
  }else{
    arcs.append("text")
    .attr("transform","translate(-20,6)")
    .text(">=8")
    .style("font-size","20px")
    .style("font-weight","bold")
    .style("fill","white");
  }
}

// data imprort end here;
});

