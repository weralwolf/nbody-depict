function InfoCtrl($scope) {
  var empty_text = 'Nothing selected';
  $scope.node_id = 12;
  $scope.node_info = {
    'author': empty_text
  };

  $scope._selected = [];

  /* Here dirty hack #1.p2 */
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

  $scope._search_filter = function (search_term) {
    var nodes = [];

    for (var i = 0; Boolean(document.details[i]); ++i) {
      node = document.details[i];

      if (node.text.toLowerCase().indexOf(search_term) != -1) {
        nodes.push(node.id);
        continue;
      }

      var pushed = false;

      for (var j = 0; j < node.concepts.length; ++j) {
        if (node.concepts[j][1].toLowerCase().indexOf(search_term) != -1) {
          nodes.push(node.id);
          pushed = true;
          break;
        }
      }

      if (pushed) { continue; }

      for (var j = 0; j < node.kpex.length; ++j) {
        if (node.kpex[j][0].toLowerCase().indexOf(search_term) != -1) {
          nodes.push(node.id);
          pushed = true;
          break;
        }
      }

      if (pushed) { continue; }
    }
    return nodes;
  }

  $scope.do_search = function () {
    if ($scope._selected.length) {
      for (var i = 0; i < $scope._selected.length; ++i) {
        d3.selectAll('#E' + $scope._selected[i]).style('fill', document.color_map[$scope._selected[i]]).style('fill-opacity', 0.6);
      }
      // $scope._make_selection().style('fill-opacity', 1.).style('font-size', '8px');
    }

    $scope._selected = [];

    var terms = $.trim($scope.search_term).split(',').map($.trim);

    for (var i = 0; i < terms.length; ++i) {
      var selected = $scope._search_filter(terms[i]);
      console.log(selected);
      $scope._selected = $scope._selected.concat(selected);
    }
    console.log($scope._selected);

    if ($scope._selected.length) {
      // $scope._selected.map($scope._append_element);
      $scope._make_selection().style('fill', 'red').style('fill-opacity', 1.);
      // $scope._make_selection('-t').style('fill-opacity', 0.5).style('font-size', '12px');
    }
  }
}

/* @stackoverflow-link: http://stackoverflow.com/questions/11868393/angularjs-inputtext-ngchange-fires-while-the-value-is-changing */
// override the default input to update 
//    angular.module('ng-nbody', []).directive('ngModelOnchange', function() {
//        return {
//            restrict: 'A',
//            require: 'ngModel',
//            link: function(scope, elm, attr, ngModelCtrl) {
//                if (attr.type === 'radio' || attr.type === 'checkbox') return;
//                console.log("I'm on changing!");
//                elm.unbind('input').unbind('keydown').unbind('change');
//                elm.bind('change', function() {
//                    scope.$apply(function() {
//                        ngModelCtrl.$setViewValue(elm.val());
//                    });         
//                });
//            }
//        };
