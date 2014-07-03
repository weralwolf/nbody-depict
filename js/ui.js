function InfoCtrl($scope) {
  var empty_text = 'Nothing selected';
  $scope.node_id = 12;
  $scope.node_info = {
    'author': empty_text
  };

  // $scope.top_users = [
  //   [
  //     ["climate change", "sea level rise"], 
  //     [
  //       {"retweets_count": 1101, "name": "Mygreenbooking"}, 
  //       {"retweets_count": 1094, "name": "\u00d7\u0e14.\u0e40\u0e14\u0e47\u0e01\u0e2b\u0e21\u0e35\u0e19\u0e49\u0e2d\u0e22\u00d7"}, 
  //       {"retweets_count": 1092, "name": "\u0e41\u0e21\u0e27\u0e19\u0e49\u0e2d\u0e22"}, 
  //       {"retweets_count": 1089, "name": "\u2663 \u0e19\u0e31\u0e21\u0e40\u0e1a\u0e2d\u0e23\u0e4c\u0e44\u0e19\u0e19\u0e4c \u2116.9 \u2660"}, 
  //       {"retweets_count": 887, "name": "Mantaseafood "}, 
  //       {"retweets_count": 846, "name": "Joshua  Coleman"}, 
  //       {"retweets_count": 844, "name": "\u306a\u307f"}, 
  //       {"retweets_count": 844, "name": "Roberto Casalini"}, 
  //       {"retweets_count": 841, "name": "Matteo Nardi"}, 
  //       {"retweets_count": 840, "name": "Maria Chiara Mascia"}
  //     ]
  //   ], 
  //   [
  //     ["fossil fuels", "ghg emissions"], 
  //     [
  //       {"retweets_count": 474, "name": "John Lundin"}, 
  //       {"retweets_count": 332, "name": "Frack Off"}, 
  //       {"retweets_count": 288, "name": "WhoIsGovt"}, 
  //       {"retweets_count": 274, "name": "The Daily Planet"}, 
  //       {"retweets_count": 176, "name": "350 dot org"}, 
  //       {"retweets_count": 166, "name": "Kasim Arman Ul-Haq"}, 
  //       {"retweets_count": 165, "name": "Marcellus Wallace"}, 
  //       {"retweets_count": 158, "name": "AdvanceMattapan"}, 
  //       {"retweets_count": 154, "name": "Climate Progress"}, 
  //       {"retweets_count": 137, "name": "Jamie Rumble"}
  //     ]
  //   ], 
  //   [
  //     ["climate change", "weather extremes"], 
  //     [
  //       {"retweets_count": 1404, "name": "Tild Dallelie"}, 
  //       {"retweets_count": 1404, "name": "John Houck"}, 
  //       {"retweets_count": 1404, "name": "Ms B_Orlando"}, 
  //       {"retweets_count": 1246, "name": "Steve Martin"}, 
  //       {"retweets_count": 1235, "name": "Geoff Webber"}, 
  //       {"retweets_count": 1228, "name": "jeremy gimbel"}, 
  //       {"retweets_count": 1204, "name": "Bretta Applebaum"}, 
  //       {"retweets_count": 1204, "name": "Celeste Leibowitz"}, 
  //       {"retweets_count": 1204, "name": "Larry K"}, 
  //       {"retweets_count": 1150, "name": "Maria G"}
  //     ]
  //   ]
  // ];

  $scope._selected = [];

  $scope.update = function () {
    $scope.node_info['author'] = 'King Arthur';
  }

  $scope._deselect = function () {
    for (var i in $scope._selected) {
      d3.select
    }
  }

  $scope._make_selection = function (postfix, prefix) {
    if (!prefix) {
      prefix = '#E';
    }
    if (!postfix) {
      postfix = '';
    }
    return d3.selectAll(prefix + $scope._selected.join(postfix + ', ' + prefix) + postfix);
  }

  $scope._append_element = function (element_id) {
    $('#selected-elements').append(
      '<span class="btn-group btn-group-xs" id="cite-' + element_id + '">' +
      '<button type="button" class="btn btn-detault" ng-click="return false;">#' + element_id + '</button>' +
      '<button type="button" class="btn btn-default" ng-click="delete_element(' + element_id + ')">' +
      '<span class="glyphicon glyphicon-remove"></span>' +
      '</button>' +
      '</span>');
    return element_id;
  }

  $scope.delete_element = function (element_id) {
    console.log('remove ' + element_id);
  }

  $scope._search_filter = function (search_term, initial) {
    var nodes = [];
    search_term = search_term.toLowerCase();

    for (var i = 0; Boolean(document.details[i]); ++i) {
      node = document.details[i];
      if (initial && initial.length && initial.indexOf(node.id) == -1) {
        continue;
      }

      if (node.text.toLowerCase().indexOf(search_term) != -1) {
        nodes.push(node.id);
        continue;
      }

      if (document.user_details[i].name.toLowerCase().indexOf(search_term) != -1) {
        nodes.push(node.id);
        continue;
      }

      // var pushed = false;

      // for (var j = 0; j < node.concepts.length; ++j) {
      //   if (node.concepts[j][1].toLowerCase().indexOf(search_term) != -1) {
      //     nodes.push(node.id);
      //     pushed = true;
      //     break;
      //   }
      // }

      // if (pushed) { continue; }

      // for (var j = 0; j < node.kpex.length; ++j) {
      //   if (node.kpex[j][0].toLowerCase().indexOf(search_term) != -1) {
      //     nodes.push(node.id);
      //     pushed = true;
      //     break;
      //   }
      // }

      // if (pushed) { continue; }
    }
    return nodes;
  }

  $scope.legend = document.colormap.legend()


  $scope.update_color_map = function () {
    document.colormap.load($scope.color_map_selection);
    $scope.legend = document.colormap.legend();
    if ($scope._selected.length) {
      var colormap = document.colormap.maps[document.colormap.current];
      for (var i = 0; i < $scope._selected.length; ++i) {
        d3.selectAll('#E' + $scope._selected[i]).style('fill', colormap[$scope._selected[i]])
        .style('fill-opacity', 1.).attr('r', function (d) { return d[3] + 5; });
      }
    }
    
    $scope._selected = [];
  }

  $scope.do_search = function () {
    if ($scope._selected.length) {
      var colormap = document.colormap.maps[document.colormap.current];
      for (var i = 0; i < $scope._selected.length; ++i) {
        d3.selectAll('#E' + $scope._selected[i]).style('fill', colormap[$scope._selected[i]])
        .style('fill-opacity', 1.).attr('r', function (d) { return d[3] + 5; });
      }
    }

    $scope._selected = [];

    // if (!$scope.search_term) {
    $scope.search_term = $('#search_term').val();
    // }

    

    if (!$scope.search_term.trim().length) {
      return;
    }

    var terms = $.trim($scope.search_term).split(',').map($.trim);

    for (var i = 0; i < terms.length; ++i) {
      if (!$scope.or_and) {
        var selected = $scope._search_filter(terms[i]);
        $scope._selected = $scope._selected.concat(selected);  
      } else {
        $scope._selected = $scope._search_filter(terms[i], $scope._selected);
      }
      
    }

    if ($scope._selected.length) {
      $scope._make_selection().style('fill', 'yellow').style('fill-opacity', 0.8).attr('r', function (d) { return 3.5 * d[3]; });
    }
  }
}

