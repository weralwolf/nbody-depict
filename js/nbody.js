function show_node_info(d) {
  if (document.details) {
    var dd = document.details[d[0]];
    var color = document.colormap.maps[document.colormap.current][d[0]];
    var result = '<table class="table table-condensed" width="400px"><hr>';
    result += '<tr class="tweet-field-name"><td style="border: 5px solid' + color + ';">Twitter Post</td></tr>';
    result += '<tr class="tweet-field-value"><td>' + dd.text.replace(/@\w+/g, "<a href=\"#\" class=\"do_search_string\">$&</a>") + '</td></tr>';
    result += '<tr><td><b>Date:</b> ' + dd.date + '</td></tr>';
    result += '<tr><td><b>Retweets:</b> ' + dd.retweets + '</td></tr>';

    if (dd.concepts.length) {
      result += '<tr class="tweet-field-name"><td><i>cluster:</i> Ontology concepts</td></tr>';
      result += '<tr><td><table class="table table-condensed inner-subtable"><thead><tr><th>#</th><th>Name</th><th>Frequency</th></tr></thead>';
      result += '<tbody>';
      for (i = 0; i < dd.concepts.length && i < 5; ++i) {
        result += '<tr><td>' + dd.concepts[i][0] + '</td><td>' + dd.concepts[i][1] + '</td><td>' + dd.concepts[i][2] + '</td></tr>';
      }
      result += '</tbody></table></td></tr>';
    }
    
    if (dd.kpex.length) {
      result += '<tr class="tweet-field-name"><td><i>cluster:</i> KPEX terms</td></tr>';
      result += '<tr><td><table class="table table-condensed inner-subtable"><thead><tr><th>Name</th><th>Score</th><th>Frequency</th></tr></thead>';
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
    $('.do_search_string').click(function() {
      $('#search_term').val($(this).html());
      $('.btn.btn-primary').click();
    });
  } else {
    $('#svg-detaild').html('Details not loaded yet...');  
  }
}

document.details = null;
document.user_details = null;
document.colormap = {
  current: null,
  maps: {},
  legends: {},
  load: function(filename) {
    document.colormap.current = filename;
    if (!document.colormap.maps.hasOwnProperty(filename)) {
      d3.json(filename, function (error, map) {
        if (error) {
          return;
        }
        document.colormap.maps[filename] = map;
        document.colormap.load(filename);
      });
      return;
    }
    svg.selectAll("circle").style('fill', function(d) {
      return document.colormap.maps[filename][d[0]];
    });
  },
  legend: function() {
    topics = [
      ["'Climate change' and 'Global warming'", "#FA3B55"],
      ["'Sea-level rise' and 'Climate change'", "#FF4900"],
      ["'Weather extremes' and 'Climate change'", "#4CC0F2"],
      ["'Sea ice' and 'Global warming'", "#B3C0CA"],
      ["'CH4' and 'Climate'", "#5CFCEE"],
      ["'CH4' and 'Water'", "#FF70FF"],
      ["'Fracking' and 'CH4'", "#69AB0A"],
      ["'Pollution' and 'Fracking'", "#CD4F39"],
      ["'CH4' and 'Gas Industry'", "#FFFF00"],
      ["'Fracking' and 'Methane Emissions'", "#00FF00"]
    ]

    issues = [
      ["'Climate change' and 'Sea level rise'", "#ff0000"],
      ["'Fossil fuels' and 'GHG emissions'", "#87CEFF"],
      ["'Climate change' and 'Weather extremes'", "#0CA73D"]
    ]

    returns = {
      "data/groups_in_favor_coloring_mono.json": topics,
      "data/groups_coloring.json": topics,
      "data/groups_agains_coloring_mono.json": topics,
      "data/issues_in_favor_coloring_mono.json": issues,
      "data/_3_issues_coloring_map.json": issues,
      "data/issues_agains_coloring_mono.json": issues
    }
    
    if (returns.hasOwnProperty(document.colormap.current)) {
      return returns[document.colormap.current];
    }

    if (!document.colormap.current) {
      return returns["data/_3_issues_coloring_map.json"];
    }

    return [];
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
  d3.select("#search_term").attr("placeholder", "Search by keyword");
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

      var width = $(document).width() - margin.right - margin.left,
        height = $(document).height() - margin.top - margin.bottom;

      function zoomed() {
          // console.log(d3.event.scale);
          // console.log(d3.event.translate);
          // console.log(d3.event);
          // console.log('--------');
          svg.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
      }

      var zoom = d3.behavior.zoom().scaleExtent([0., 40]).on("zoom", zoomed);
       
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
        return d[3] + 5;
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
      .on("click", function(d) { 
        show_node_info(d);
      })
      .on("doubleclick", function(d) {
        $(this)[0].classList.toggle("clicked");
      });

    });
  });
}
