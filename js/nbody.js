function show_node_info(d) {
  if (document.details) {
    var dd = document.details[d[0]];
    var color = document.colormap.maps[document.colormap.current][d[0]];
    var result = '<table class="table table-condensed" width="300px">';
    result += '<tr><td><div class="tweet-color-pic" style="background-color: ' + color + ';"></div></td></tr>';
    result += '<tr class="tweet-field-name"><td>Text</td></tr><tr class="tweet-field-value"><td>' + dd.text + '</td></tr>';
    result += '<tr><td><b>Date:</b> ' + dd.date + '</td></tr>';
    result += '<tr><td><b>Retweets:</b> ' + dd.retweets + '</td></tr>';

    if (dd.concepts.length) {
      result += '<tr class="tweet-field-name"><td><i>cluster:</i> Ontology concepts</td></tr>';
      result += '<tr><td><table class="table table-condensed"><thead><tr><th>#</th><th>Name</th><th>Frequency</th></tr></thead>';
      result += '<tbody>';
      for (i = 0; i < dd.concepts.length && i < 5; ++i) {
        result += '<tr><td>' + dd.concepts[i][0] + '</td><td>' + dd.concepts[i][1] + '</td><td>' + dd.concepts[i][2] + '</td></tr>';
      }
      result += '</tbody></table></td></tr>';
    }
    
    if (dd.kpex.length) {
      result += '<tr class="tweet-field-name"><td><i>cluster:</i> KPEX terms</td></tr>';
      result += '<tr><td><table class="table table-condensed"><thead><tr><th>Name</th><th>Score</th><th>Frequency</th></tr></thead>';
      result += '<tbody>';
      for (i = 0; i < dd.kpex.length && i < 5; ++i) {
        result += '<tr><td>' + dd.kpex[i][0] + '</td><td>' + dd.kpex[i][1] + '</td><td>' + dd.kpex[i][2] + '</td></tr>';
      }
      result += '</tbody></table></td></tr>';
    }

    if (document.user_details) {
      user = document.user_details[d[0]]
      result += '<tr><td><b>User:</b> ' + user.name + '</td></tr>';
      if (user.description) {
        result += '<tr class="tweet-field-name"><td>Description</td></tr><tr class="tweet-field-value"><td>' + user.description + '</td></tr>';
      }
    }
    
    result += '</table>';
    $('#svg-detaild').html(result);
  } else {
    $('#svg-detaild').html('Details not loaded yet...');  
  }
}

document.details = null;
document.user_details = null;
document.colormap = {
  current: null,
  maps: {},
  load: function(filename) {
    // console.log('Loading ' + filename + '...');
    if (!document.colormap.maps.hasOwnProperty(filename)) {
      // console.log('Not loaded, retreaving data...');
      d3.json(filename, function (error, map) {
        if (error) {
          // console.log("Error while color map " + filename + ": " + error);
          return;
        }
        // console.log('Data retrieved for ' + filename);
        document.colormap.maps[filename] = map;
        document.colormap.load(filename);
      });
      return;
    }
    // console.log('Assign colors for ' + filename + ' map');
    svg.selectAll("circle").style('fill', function(d) {
      return document.colormap.maps[filename][d[0]];
    });
    // console.log('Assign current');
    document.colormap.current = filename;
  }
}

var margin = {
  top: 10,
  bottom: 10,
  right: 300,
  left: 10
};

d3.json('data/ddetails.json', function (error, json) {
  if (error) {
    console.log("Error while loading details: " + error);
    return;
  }
  document.details = json;
  d3.select("#search_term").attr("placeholder", "Type here your search request...");
});

d3.json('data/user_data.json', function (error, json) {
  if (error) {
    console.log("Error while loading user details: " + error);
    return;
  }
  document.user_details = json;
});

function setup_nbody(nbody_output, color_map, r) {

  nbody_output = nbody_output || 'data/nbody_output.json';
  colors_map = color_map || "data/author_colors.json"
  r = r || 1

  d3.json(nbody_output, function (error, json) {
    if (error) {
      console.log("Error while loading Nbody output data: " + error);
      return;
    }
    d3.json(colors_map, function (error, colors) {
      for (var i in json) {
        json[i].push(colors[json[i][0]]);
      }
      document.colormap.current = color_map;
      document.colormap.maps[color_map] = colors;

      function zoomed() {
          svg.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
      }

      var zoom = d3.behavior.zoom().scaleExtent([0., 10]).on("zoom", zoomed);
       
      var width = $(document).width() - margin.right - margin.left,
        height = $(document).height() - margin.top - margin.bottom;


      outersvg = d3.select("#svg-container").append("svg")
        .attr("width", width)
        .attr("height", height)
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
      .on("click", show_node_info);
    });
  });
}
