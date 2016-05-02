
var i = 0.8; // for height
var j = 1; // for width

var height = 720 * i;
var width = 960 * j;
var padding = 50;

var svg = d3.select("#color_flag").append("svg").attr("height", height).attr(
    "width", width).attr("class", "svgstrip");

svg.append("text").attr("x", 0).attr("y", 0).text(
    "How may shape can you put into a simple strip graph?");

var coordinate = {};
coordinate.x = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 365, 456, 547,
    638, 729, 810, 865, 365, 456, 547, 638, 729, 810, 865 ];
coordinate.y = [ 0, 0, 0, 0, 0, 0, 0, 0, 498, 533, 567, 601, 601, 635, 669,
    686, 0, 0, 0, 0, 0, 0, 0, 498, 533, 567, 607, 635, 669, 686 ];
coordinate.height = [ height / i, 442, 374, 306, 238, 170, 102, 68, 498,
    height / i - 533, height / i - 567, height / i - 601, height / i - 601,
    height / i - 635, height / i - 669, height / i - 686, 442, 374, 306,
    238, 170, 102, 68, height / i - 498, height / i - 533,
    height / i - 567, height / i - 607, height / i - 635, height / i - 669,
    height / i - 686 ];
coordinate.width = [ width / j, 293, 248, 203, 158, 113, 68, 45, 293, 248, 203,
    158, 158, 113, 68, 45, width / j - 365, width / j - 456,
    width / j - 547, width / j - 638, width / j - 729, width / j - 810,
    width / j - 865, width / j - 365, width / j - 456, width / j - 547,
    width / j - 638, width / j - 729, width / j - 810, width / j - 865 ];
coordinate.color = [ "blue", "white", "red", "gold", "green", "white", "blue",
    "red", "white", "red", "gold", "white", "green", "white", "blue",
    "red", "white", "red", "gold", "green", "white", "blue", "red",
    "white", "red", "gold", "green", "white", "blue", "red" ];

for (var t = 0; t < coordinate.x.length; t++) {
  svg.append("rect").attr("x", j * coordinate.x[t]).attr("y",
      i * coordinate.y[t]).attr("height", i * coordinate.height[t]).attr(
      "width", j * coordinate.width[t]).attr("fill", coordinate.color[t])
      .attr("class", "mulflag");
}

var countries = {};
countries.x = [113,5,5,113,203,248,293,560,670,456,826,580,560,810,68,668,638];
countries.y = [5,442,652,615,238,374,5,340,306,605,605,498,410,20,306,533,30];
countries.height = [101,125,652,101,329,159,190,68,192,115,81,69,68,41,70,100,68];
countries.width = [135,166,40,135,344,208,254,94,256,273,108,92,94,55,96,136,90];

        
    for (var t= 0; t < countries.x.length; t++) {
    svg.append("rect") 
    .attr("x", countries.x[t]*j)
    .attr("y", countries.y[t]*i)
    .attr("height", countries.height[t]*i)
    .attr("width", countries.width[t]*j)
    .attr("fill", "none")
    .attr("class","innerflag");
          
}
            svg.append("path")
    .attr("x","0")
    .attr("y","0")
    .attr("d","M10 1, L4 19, L19 7 L 1 7, L 17 20 Z")
    .attr("transform","translate(730,460)")
    .attr("fill","black");
            svg.append("path")
    .attr("x","0")
    .attr("y","0")
    .attr("d","M10 1, L4 19, L19 7 L 1 7, L 17 20 Z")
    .attr("transform","translate(105,260)")
    .attr("fill","yellow");
            svg.append("path")
    .attr("x","0")
    .attr("y","0")
    .attr("d","M10 1, L4 19, L19 7 L 1 7, L 17 20 Z")
    .attr("transform","translate(825,20)")
    .attr("fill","white");
           
svg.append("path")
    .attr("x","0")
    .attr("y","0")
    .attr("d","M10 1, L4 19, L19 7 L 1 7, L 17 20 Z")
    .attr("transform","translate(170,520)")
    .attr("fill","green");
        svg.append("rect") 
    .attr("x", 158*j)
    .attr("y", 150*i)
    .attr("height", 75*i)
    .attr("width", 110*j)
    .attr("fill", "none")
    .attr("class","innerflag")
    .attr("transform","rotate(40,169,120)");
svg.append("text").text("13 Gongo Brazzaville")
    .attr("x",158*j)
    .attr("y", 150*i)
    .attr("transform","rotate(40,169,120)");
            svg.append("text").text("18 Libya")
    .attr("x",638*j)
    .attr("y", 30*i);
            svg.append("text").text("5 Ghana")
    .attr("x",668*j)
    .attr("y", 533*i);
svg.append("text").text("17 Vietnam")
    .attr("x",68*j)
    .attr("y", 306*i);
            svg.append("text").text("16 Somalia")
    .attr("x",810*j)
    .attr("y", 10*i);
            svg.append("text").text("15 San Marino")
    .attr("x",560*j)
    .attr("y", 410*i);
            svg.append("text").text("14 Poland")
    .attr("x",580*j)
    .attr("y", 498*i);
            svg.append("text").text("12 Sierra Leone")
    .attr("x",826*j)
    .attr("y", 605*i);
            svg.append("text").text("11 Guinea")
    .attr("x",456*j)
    .attr("y", 601*i);
            svg.append("text").text("10 Netherland")
    .attr("x",670*j)
    .attr("y", 306*i);
            svg.append("text").text("9 Monaco/Indonesia")
    .attr("x",560*j)
    .attr("y", 340*i);
            svg.append("text").text("8 New-Caledonia / Saint - Barthelemy/ France")
    .attr("x",293*j)
    .attr("y", 25*i);
            svg.append("text").text("7 Finland")
    .attr("x",248*j)
    .attr("y", 374*i);
            svg.append("text").text("6 Norway")
    .attr("x",203*j)
    .attr("y", 238*i);
            svg.append("text").text("4 Senegal")
    .attr("x",113*j)
    .attr("y", 615*i);
            svg.append("text").text("3 Russa")
    .attr("x",5*j)
    .attr("y", 652*i);
            svg.append("text").text("2 Yugoslavia")
    .attr("x",5*j)
    .attr("y", 442*i);
            svg.append("text").text("1 Mali")
    .attr("x",113*j)
    .attr("y", 20*i);