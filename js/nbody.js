function setup_nbody(nbody_output, color_map, r) {
  // Loading main data from server
  nbody_output = nbody_output || 'data/nbody_output.json';
  //var nbody_output = 'data/nbody_output_600_ref_req=0.005.json';
  // var nbody_output = 'data/nbody_output.json';
  colors_map = color_map || "data/author_colors.json"
  r = r || 1
  d3.json("data/user_map.json", function(error, data) {
    document.user_map = data;
    d3.select("#search_term").attr("placeholder", "Type author names seperated by comma...");
  });

  d3.json(nbody_output, function (error, json) {
    if (error) {
      console.log("Error while loading Nbody output data: " + error);
      return;
    }
    d3.json(colors_map, function (error, colors) {
      for (var i in json) {
        json[i].push(colors[json[i][0]]);
      }

      // Setup environment
//      var svg = null;
//      var zoomed = function () {
//        scale = d3.event.scale;
//        svg.attr("transform", "translate(" +
//          d3.event.translate.join(",") + ") scale(" + scale + ")");
//      }
//      var zoom = d3.behavior.zoom()
//        .on('zoom', zoomed, false)
//        .on('zoomstart', function () {
//          if (d3.event.sourceEvent.type != 'mousewheel') {
//            $('#drawing').css('pointer-events', 'none');
//          }
//        })
//        .on('zoomend', function () {
//          if (d3.event.sourceEvent != null) {
//            $('#drawing').css('pointer-events', 'all');
//          }
//        })

      function zoomed() {
          svg.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
      }

      var zoom = d3.behavior.zoom().scaleExtent([0., 10]).on("zoom", zoomed);
       
      var margin = {
        top: 10,
        bottom: 10,
        right: 10,
        left: 10
      };
      var width = $(document).width() - margin.right - margin.left,
        height = $(document).height() - margin.top - margin.bottom;
      svg = d3.select("#svg-container").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .call(zoom)
        .attr("transform", "translate(400, 300)scale(.1)")
        .append("g");

      svg.append("rect")
        .attr("class", "overlay")
        .attr("width", width)
      //.call(d3.behavior.zoom().scaleExtent([0., 1]).on("zoom", zoom))
      .attr("height", height);

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
        .style('fill-opacity', 1.)
        .style('fill', function (d) {
          return d[4];
        })
        .on("mouseover", function () {
          /* Here dirty hack #1.p1 */
          document.scope.node_id = parseInt(d3.event.target.id);
          document.scope.update();
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
