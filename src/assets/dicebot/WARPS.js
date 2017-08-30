/* Generated by Opal 0.10.5 */
(function(Opal) {
  function $rb_le(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs <= rhs : lhs['$<='](rhs);
  }
  function $rb_ge(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs >= rhs : lhs['$>='](rhs);
  }
  function $rb_minus(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs - rhs : lhs['$-'](rhs);
  }
  var self = Opal.top, $scope = Opal, nil = Opal.nil, $breaker = Opal.breaker, $slice = Opal.slice, $klass = Opal.klass;

  Opal.add_stubs(['$debug', '$<=', '$>=', '$==', '$!=', '$-', '$output']);
  return (function($base, $super) {
    function $WARPS(){};
    var self = $WARPS = $klass($base, $super, 'WARPS', $WARPS);

    var def = self.$$proto, $scope = self.$$scope, TMP_1, TMP_2, TMP_3, TMP_4;

    Opal.defn(self, '$gameName', TMP_1 = function $$gameName() {
      var self = this;

      return "ワープス";
    }, TMP_1.$$arity = 0);

    Opal.defn(self, '$gameType', TMP_2 = function $$gameType() {
      var self = this;

      return "WARPS";
    }, TMP_2.$$arity = 0);

    Opal.defn(self, '$getHelpMessage', TMP_3 = function $$getHelpMessage() {
      var self = this;

      return "失敗、成功度の自動判定を行います。\n";
    }, TMP_3.$$arity = 0);

    return (Opal.defn(self, '$check_2D6', TMP_4 = function $$check_2D6(total_n, dice_n, signOfInequality, diff, dice_cnt, dice_max, n1, n_max) {
      var $a, self = this, success = nil;

      self.$debug("WARPS check_2D6 betgin");
      self.$debug("diff", diff);
      self.$debug("total_n", total_n);
      if ((($a = ($rb_le(dice_n, 2))) !== nil && $a != null && (!$a.$$is_boolean || $a == true))) {
        return " ＞ クリティカル"
      } else if ((($a = ($rb_ge(dice_n, 12))) !== nil && $a != null && (!$a.$$is_boolean || $a == true))) {
        return " ＞ ファンブル"
      } else if ((($a = (signOfInequality['$==']("<="))) !== nil && $a != null && (!$a.$$is_boolean || $a == true))) {
        if ((($a = (diff['$!=']("?"))) !== nil && $a != null && (!$a.$$is_boolean || $a == true))) {
          if ((($a = ($rb_le(total_n, diff))) !== nil && $a != null && (!$a.$$is_boolean || $a == true))) {
            success = $rb_minus(diff, total_n);
            return " ＞ " + (success) + "成功";
            } else {
            return " ＞ 失敗"
          }}};
      return self.$output();
    }, TMP_4.$$arity = 8), nil) && 'check_2D6';
  })($scope.base, $scope.get('DiceBot'))
})(Opal);

/* Generated by Opal 0.10.5 */
(function(Opal) {
  var self = Opal.top, $scope = Opal, nil = Opal.nil, $breaker = Opal.breaker, $slice = Opal.slice;

  Opal.add_stubs(['$exit']);
  return $scope.get('Kernel').$exit()
})(Opal);
