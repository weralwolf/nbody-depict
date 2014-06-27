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

  $scope.do_search = function () {
    if ($scope._selected.length) {
      $scope._make_selection().style('fill', 'black').style('fill-opacity', 0.3);
      $scope._make_selection('-t').style('fill-opacity', 0.2).style('font-size', '8px');
    }

    _selected = $.trim($scope.search_term).split(',').map($.trim);
    for (var inp in _selected) {
      var in_name = _selected[inp].toLowerCase();
      for (var name in document.user_map) {
        if (document.user_map[name].toLowerCase().indexOf(in_name) != -1) {
          $scope._selected.push(name);
        }
      }
//      var user_id = document.user_map[_selected[i]];
//      if (user_id) {
//        $scope._selected.append(user_id);
//      }
    }

    //$scope._selected.map($scope._append_element);
    $scope._make_selection().style('fill', 'red').style('fill-opacity', 0.8).attr('r', 100);
    $scope._make_selection('-t').style('fill-opacity', 0.8).style('font-size', '12px');
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
