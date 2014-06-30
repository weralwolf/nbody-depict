function InfoCtrl($scope) {
  var empty_text = 'Nothing selected';
  $scope.node_id = 12;
  $scope.node_info = {
    'author': empty_text
  };

  $scope._selected = [];

  document.scope = $scope;

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

    for (var i = 0; Boolean(document.details[i]); ++i) {
      node = document.details[i];
      if (initial && initial.length && initial.indexOf(node.id) == -1) {
        continue;
      }

      if (node.text.toLowerCase().indexOf(search_term) != -1) {
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

  $scope.update_color_map = function () {
    document.colormap.load($scope.color_map_selection);
    if ($scope._selected.length) {
      var colormap = document.colormap.maps[document.colormap.current];
      for (var i = 0; i < $scope._selected.length; ++i) {
        d3.selectAll('#E' + $scope._selected[i]).style('fill', colormap[$scope._selected[i]]).style('fill-opacity', 0.6).attr('r', 10);
      }
    }
    $scope._selected = [];
  }

  $scope.do_search = function () {
    if ($scope._selected.length) {
      var colormap = document.colormap.maps[document.colormap.current];
      for (var i = 0; i < $scope._selected.length; ++i) {
        d3.selectAll('#E' + $scope._selected[i]).style('fill', colormap[$scope._selected[i]]).style('fill-opacity', 0.6).attr('r', 10);
      }
    }

    $scope._selected = [];

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
      $scope._make_selection().style('fill', 'yellow').style('fill-opacity', 1.).attr('r', 20);
    }
  }
}

