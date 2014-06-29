function setup_nbody(nbody_output, color_map, r) {
  // Loading main data from server
  nbody_output = nbody_output || 'data/nbody_output.json';
  //var nbody_output = 'data/nb/Library/WebServer/Documentsody_output_600_ref_req=0.005.json';
  // var nbody_output = 'data/nbody_output.json';
  colors_map = color_map || "data/author_colors.json"
  r = r || 1
  // d3.json("data/user_map.json", function(error, data) {
  //   document.user_map = data;
  //   d3.select("#search_term").attr("placeholder", "Type author names seperated by comma...");
  // });

document.details = null;

d3.json('data/ddetails.json', function (error, json) {
  if (error) {
    console.log("Error while loading details: " + error);
      return;
  }
  document.details = json;
  // d3.select("#search_term").attr("placeholder", "Type here your search request...");
});

  var margin = {
    top: 10,
    bottom: 10,
    right: 300,
    left: 10
  };

  d3.json(nbody_output, function (error, json) {
    if (error) {
      console.log("Error while loading Nbody output data: " + error);
      return;
    }
    d3.json(colors_map, function (error, colors) {
      for (var i in json) {
        json[i].push(colors[json[i][0]]);
      }
      document.color_map = colors;

      function zoomed() {
          svg.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
      }

      var zoom = d3.behavior.zoom().scaleExtent([0., 10]).on("zoom", zoomed);
       
      var width = $(document).width() - margin.right - margin.left,
        height = $(document).height() - margin.top - margin.bottom;


      outersvg = d3.select("#svg-container").append("svg")
        .attr("width", "100%")
        .attr("height", "100%")
        .append("g")
        .call(zoom)
        .attr("clip-path", "url(#clip)");

      outersvg.append("defs").append("clipPath")
        .attr("id", "clip")
        .append("rect")
        .attr("width", "100%")
        .attr("height", "100%");

      outersvg.append("rect")
        .attr("class", "overlay")
        .attr("width", "100%")
        .attr("height", "100%");

      svg = outersvg.append("g");
      zoom.translate([width/2, height/2]).scale(1);
      svg.transition()
        .duration(2500)
        .attr("transform", "translate(" + zoom.translate() +")scale(" + zoom.scale() + ")");

      svg.selectAll("circle")
        .data(json)
        .enter().append("circle")
      // basic parameters
      .attr("r", function (d) {
        return d[3] * 2 * r
      })
      .attr("transform", function (d) {
        return "translate(" + d[1] + ", " + d[2] + ")";
      })
      .attr("id", function (d) {
        return "E" + d[0];
      })
      .style('fill-opacity', 0.6)
      .style('fill', function (d) {
        return d[4];
      })
      .on("mouseover", function () {
        /* Here dirty hack #1.p1 */
        // document.scope.node_id = parseInt(d3.event.target.id);
        // document.scope.update();
      })
      .on("click", function(d) {
        if (document.details) {
          var dd = document.details[d[0]];
          var result = '<table class="table table-condensed" width="300px"><tr><td><div class="tweet-color-pic" style="background-color: ' + dd.color + ';"></div></td></tr><tr class="tweet-field-name"><td>Text</td></tr><tr class="tweet-field-value"><td>' + dd.text + '</td></tr><tr><td><b>Date:</b> ' + dd.date + '</td></tr><tr><td><b>Retweets:</b> ' + dd.retweets + '</td></tr>';
          if (dd.concepts.length) {
            result += '<tr class="tweet-field-name"><td>Ontology concepts</td></tr><tr><td><table class="table table-condensed"><thead><tr><th>#</th><th>Name</th><th>Frequency</th></tr></thead><tbody>';
            for (i = 0; i < dd.concepts.length && i < 5; ++i) {
              result += '<tr><td>' + dd.concepts[i][0] + '</td><td>' + dd.concepts[i][1] + '</td><td>' + dd.concepts[i][2] + '</td></tr>';
            }
            result += '</tbody></table></td></tr>';
          }
          if (dd.kpex.length) {
            result += '<tr class="tweet-field-name"><td>KPEX terms</td></tr><tr><td><table class="table table-condensed"><thead><tr><th>Name</th><th>Score</th><th>Frequency</th></tr></thead><tbody>';
            for (i = 0; i < dd.kpex.length && i < 5; ++i) {
              result += '<tr><td>' + dd.kpex[i][0] + '</td><td>' + dd.kpex[i][1] + '</td><td>' + dd.kpex[i][2] + '</td></tr>';
            }
            result += '</tbody></table></td></tr>';
          }
          result += '</table>';
          $('#svg-detaild').html(result);
          // console.log(document.details[d[0]]);
        } else {
          $('#svg-detaild').html('Details not loaded yet...');  
        }
      });

//      svg.selectAll("text")
//        .data(json).enter()
//        .append("text")
//        .text(function (d) {
//          return "#" + d[0];
//        })
//        .attr('x', function (d) {
//          return parseInt(d[1]);
//        })
//        .attr('y', function (d) {
//          return parseInt(d[2]);
//        })
//        .attr('id', function (d) {
//          return "E" + d[0] + "-t";
//        })
//        .style('font-size', '10px')
//        .style('fill', 'black')
//        .style('fill-opacity', 0.8);
    //            function zoom() {
    //                svg.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
      //            }
    });
  });
}
