/* Generated by Opal 0.10.5 */
(function(Opal) {
  function $rb_plus(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs + rhs : lhs['$+'](rhs);
  }
  function $rb_ge(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs >= rhs : lhs['$>='](rhs);
  }
  function $rb_lt(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs < rhs : lhs['$<'](rhs);
  }
  var self = Opal.top, $scope = Opal, nil = Opal.nil, $breaker = Opal.breaker, $slice = Opal.slice, $klass = Opal.klass, $gvars = Opal.gvars;

  Opal.add_stubs(['$setPrefixes', '$upcase', '$===', '$==', '$to_i', '$scan', '$each', '$+', '$checkRoll', '$roll', '$getValueText', '$>=', '$<']);
  return (function($base, $super) {
    function $TherapieSein(){};
    var self = $TherapieSein = $klass($base, $super, 'TherapieSein', $TherapieSein);

    var def = self.$$proto, $scope = self.$$scope, TMP_1, TMP_2, TMP_3, TMP_4, TMP_6, TMP_7, TMP_8;

    self.$setPrefixes(["(TS|OP)(\\d+)?([\\+\\-]\\d)*(\\@\\d+)?"]);

    Opal.defn(self, '$initialize', TMP_1 = function $$initialize() {
      var $a, $b, self = this, $iter = TMP_1.$$p, $yield = $iter || nil, $zuper = nil, $zuper_index = nil, $zuper_length = nil;

      TMP_1.$$p = null;
      $zuper = [];
      
      for($zuper_index = 0; $zuper_index < arguments.length; $zuper_index++) {
        $zuper[$zuper_index] = arguments[$zuper_index];
      }
      return ($a = ($b = self, Opal.find_super_dispatcher(self, 'initialize', TMP_1, false)), $a.$$p = $iter, $a).apply($b, $zuper);
    }, TMP_1.$$arity = 0);

    Opal.defn(self, '$gameName', TMP_2 = function $$gameName() {
      var self = this;

      return "青春疾患セラフィザイン";
    }, TMP_2.$$arity = 0);

    Opal.defn(self, '$gameType', TMP_3 = function $$gameType() {
      var self = this;

      return "TherapieSein";
    }, TMP_3.$$arity = 0);

    Opal.defn(self, '$getHelpMessage', TMP_4 = function $$getHelpMessage() {
      var self = this;

      return "・一般判定：TS[n][±m][@t]　　[]内のコマンドは省略可能。クリティカル無。\n・戦闘判定：OP[n][±m][@t]　　[]内のコマンドは省略可能。クリティカル有。\n\n「n」で能力値修正などを指定。\n「±m」で達成値への修正値を追加指定。+5+1-3のように、複数指定も可能です。\n「@t」で目標値を指定。省略時は達成値のみ表示、指定時は判定の正否を追加表示。\n\n【書式例】\n・TS → ダイスの合計値を達成値として表示。\n・TS4 → ダイス合計+4を達成値表示。\n・TS4-1 → ダイス合計+4-1（計+3）を達成値表示。\n・TS2+1@10 → ダイス合計+2+1（計+3）の達成値と、判定の成否を表示。\n・OP4+3+1 → ダイス合計+4+3+1（計+8）を達成値＆クリティカル表示。\n・OP3@12 → ダイス合計+3の達成値＆クリティカル、判定の成否を表示。\n";
    }, TMP_4.$$arity = 0);

    Opal.defn(self, '$rollDiceCommand', TMP_6 = function $$rollDiceCommand(command) {
      var $a, $b, TMP_5, self = this, output = nil, $case = nil, hasCritical = nil, target = nil, modify = nil, modifyAddString = nil, modify_list = nil;

      output = (function() {$case = command.$upcase();if (/(TS|OP)(\d+)?(([\+\-]\d+)*)(\@(\d+))?$/i['$===']($case)) {hasCritical = ((($a = $gvars['~']) === nil ? nil : $a['$[]'](1))['$==']("OP"));
      target = (((($a = (($b = $gvars['~']) === nil ? nil : $b['$[]'](6))) !== false && $a !== nil && $a != null) ? $a : 0)).$to_i();
      modify = (((($a = (($b = $gvars['~']) === nil ? nil : $b['$[]'](2))) !== false && $a !== nil && $a != null) ? $a : 0)).$to_i();
      modifyAddString = (($a = $gvars['~']) === nil ? nil : $a['$[]'](3));
      modify_list = modifyAddString.$scan(/[\+\-]\d+/);
      ($a = ($b = modify_list).$each, $a.$$p = (TMP_5 = function(i){var self = TMP_5.$$s || this;
if (i == null) i = nil;
      return modify = $rb_plus(modify, i.$to_i())}, TMP_5.$$s = self, TMP_5.$$arity = 1, TMP_5), $a).call($b);
      return self.$checkRoll(hasCritical, modify, target);}else {return nil}})();
      return output;
    }, TMP_6.$$arity = 1);

    Opal.defn(self, '$checkRoll', TMP_7 = function $$checkRoll(hasCritical, modify, target) {
      var $a, $b, self = this, dice = nil, diceText = nil, successValue = nil, modifyText = nil, targetText = nil, result = nil;

      $b = self.$roll(2, 6), $a = Opal.to_ary($b), dice = ($a[0] == null ? nil : $a[0]), diceText = ($a[1] == null ? nil : $a[1]), $b;
      successValue = $rb_plus(dice, modify);
      modifyText = self.$getValueText(modify);
      targetText = ((function() {if (target['$=='](0)) {
        return ""
        } else {
        return ">=" + (target)
      }; return nil; })());
      result = "(2D6" + (modifyText) + (targetText) + ")";
      result = $rb_plus(result, " ＞ " + (dice) + "(" + (diceText) + ")" + (modifyText));
      if ((($a = ((($b = hasCritical !== false && hasCritical !== nil && hasCritical != null) ? dice['$=='](12) : hasCritical))) !== nil && $a != null && (!$a.$$is_boolean || $a == true))) {
        result = $rb_plus(result, " ＞ クリティカル！");
        return result;};
      result = $rb_plus(result, " ＞ " + (successValue) + (targetText));
      if ((($a = (target['$=='](0))) !== nil && $a != null && (!$a.$$is_boolean || $a == true))) {
        return result};
      if ((($a = ($rb_ge(successValue, target))) !== nil && $a != null && (!$a.$$is_boolean || $a == true))) {
        result = $rb_plus(result, " ＞ 【成功】")
        } else {
        result = $rb_plus(result, " ＞ 【失敗】")
      };
      return result;
    }, TMP_7.$$arity = 3);

    return (Opal.defn(self, '$getValueText', TMP_8 = function $$getValueText(value) {
      var $a, self = this;

      if ((($a = (value['$=='](0))) !== nil && $a != null && (!$a.$$is_boolean || $a == true))) {
        return ""};
      if ((($a = ($rb_lt(value, 0))) !== nil && $a != null && (!$a.$$is_boolean || $a == true))) {
        return "" + (value)};
      return "+" + (value);
    }, TMP_8.$$arity = 1), nil) && 'getValueText';
  })($scope.base, $scope.get('DiceBot'))
})(Opal);

/* Generated by Opal 0.10.5 */
(function(Opal) {
  var self = Opal.top, $scope = Opal, nil = Opal.nil, $breaker = Opal.breaker, $slice = Opal.slice;

  Opal.add_stubs(['$exit']);
  return $scope.get('Kernel').$exit()
})(Opal);
