/* Generated by Opal 0.10.5 */
(function(Opal) {
  function $rb_ge(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs >= rhs : lhs['$>='](rhs);
  }
  function $rb_gt(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs > rhs : lhs['$>'](rhs);
  }
  function $rb_times(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs * rhs : lhs['$*'](rhs);
  }
  function $rb_divide(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs / rhs : lhs['$/'](rhs);
  }
  function $rb_lt(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs < rhs : lhs['$<'](rhs);
  }
  function $rb_minus(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs - rhs : lhs['$-'](rhs);
  }
  function $rb_plus(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs + rhs : lhs['$+'](rhs);
  }
  var self = Opal.top, $scope = Opal, nil = Opal.nil, $breaker = Opal.breaker, $slice = Opal.slice, $klass = Opal.klass, $gvars = Opal.gvars;

  Opal.add_stubs(['$setPrefixes', '$!=', '$>=', '$>', '$*', '$/', '$roll_strike_rank_result', '$debug', '$=~', '$to_i', '$<', '$check_strike_rank', '$-', '$+', '$roll', '$to_s', '$sendMode', '$empty?']);
  return (function($base, $super) {
    function $Chill(){};
    var self = $Chill = $klass($base, $super, 'Chill', $Chill);

    var def = self.$$proto, $scope = self.$$scope, TMP_1, TMP_2, TMP_3, TMP_4, TMP_5, TMP_6;

    self.$setPrefixes(["SR\\d+.*"]);

    Opal.defn(self, '$gameType', TMP_1 = function $$gameType() {
      var self = this;

      return "Chill";
    }, TMP_1.$$arity = 0);

    Opal.defn(self, '$getHelpMessage', TMP_2 = function $$getHelpMessage() {
      var self = this;

      return "・ストライク・ランク　(SRx)\n　\"SRストライク・ランク\"の形で記入します。\n　ストライク・ランク・チャートに従って自動でダイスロールを行い、\n　負傷とスタミナロスを計算します。\n　ダイスロールと同様に、他のプレイヤーに隠れてロールすることも可能です。\n　例）SR7　　　sr13　　　SR(7+4)　　　Ssr10\n";
    }, TMP_2.$$arity = 0);

    Opal.defn(self, '$check_1D100', TMP_3 = function $$check_1D100(total_n, dice_n, signOfInequality, diff, dice_cnt, dice_max, n1, n_max) {
      var $a, self = this;

      if ((($a = (signOfInequality['$!=']("<="))) !== nil && $a != null && (!$a.$$is_boolean || $a == true))) {
        return ""};
      if ((($a = ($rb_ge(total_n, 100))) !== nil && $a != null && (!$a.$$is_boolean || $a == true))) {
        return " ＞ ファンブル"};
      if ((($a = ($rb_gt(total_n, diff))) !== nil && $a != null && (!$a.$$is_boolean || $a == true))) {
        return " ＞ 失敗"};
      if ((($a = ($rb_ge(total_n, ($rb_times(diff, 0.9))))) !== nil && $a != null && (!$a.$$is_boolean || $a == true))) {
        return " ＞ Ｌ成功"};
      if ((($a = ($rb_ge(total_n, ($rb_divide(diff, 2))))) !== nil && $a != null && (!$a.$$is_boolean || $a == true))) {
        return " ＞ Ｍ成功"};
      if ((($a = ($rb_ge(total_n, ($rb_divide(diff, 10))))) !== nil && $a != null && (!$a.$$is_boolean || $a == true))) {
        return " ＞ Ｈ成功"};
      return " ＞ Ｃ成功";
    }, TMP_3.$$arity = 8);

    Opal.defn(self, '$rollDiceCommand', TMP_4 = function $$rollDiceCommand(command) {
      var self = this;

      return self.$roll_strike_rank_result(command);
    }, TMP_4.$$arity = 1);

    Opal.defn(self, '$roll_strike_rank_result', TMP_5 = function $$roll_strike_rank_result(string) {
      var $a, $b, self = this, output = nil, wounds = nil, sta_loss = nil, dice = nil, dice_add = nil, dice_str = nil, strikeRank = nil, dice_w = nil, dice_ws = nil, dice_wa = nil, wounds_wk = nil;

      self.$debug("strike_rank begin string", string);
      output = "";
      wounds = 0;
      sta_loss = 0;
      dice = "";
      dice_add = "";
      dice_str = "";
      if ((($a = (/(^|\s)[sS]?(SR|sr)(\d+)($|\s)/['$=~'](string))) !== nil && $a != null && (!$a.$$is_boolean || $a == true))) {
        } else {
        self.$debug("invalid string", string);
        return "1";
      };
      strikeRank = (($a = $gvars['~']) === nil ? nil : $a['$[]'](3)).$to_i();
      dice_w = "";
      dice_ws = "";
      dice_wa = "";
      if ((($a = ($rb_lt(strikeRank, 14))) !== nil && $a != null && (!$a.$$is_boolean || $a == true))) {
        $b = self.$check_strike_rank(strikeRank), $a = Opal.to_ary($b), sta_loss = ($a[0] == null ? nil : $a[0]), dice = ($a[1] == null ? nil : $a[1]), dice_add = ($a[2] == null ? nil : $a[2]), dice_str = ($a[3] == null ? nil : $a[3]), $b;
        $b = self.$check_strike_rank($rb_minus(strikeRank, 3)), $a = Opal.to_ary($b), wounds = ($a[0] == null ? nil : $a[0]), dice_w = ($a[1] == null ? nil : $a[1]), dice_wa = ($a[2] == null ? nil : $a[2]), dice_ws = ($a[3] == null ? nil : $a[3]), $b;
        dice = $rb_plus($rb_plus(dice, ", "), dice_w);
        dice_add = $rb_plus(dice_add, $rb_plus(", ", dice_wa));
        dice_str = $rb_plus($rb_plus(dice_str, ", "), dice_ws);
        } else {
        wounds_wk = 0;
        $b = self.$check_strike_rank(13), $a = Opal.to_ary($b), sta_loss = ($a[0] == null ? nil : $a[0]), dice = ($a[1] == null ? nil : $a[1]), dice_add = ($a[2] == null ? nil : $a[2]), dice_str = ($a[3] == null ? nil : $a[3]), $b;
        $b = self.$roll(4, 10), $a = Opal.to_ary($b), wounds = ($a[0] == null ? nil : $a[0]), dice_ws = ($a[1] == null ? nil : $a[1]), $b;
        dice = $rb_plus($rb_plus("5d10*3, 4d10+", ($rb_times(($rb_minus(strikeRank, 13)), 2)).$to_s()), "d10");
        dice_add = $rb_plus(dice_add, $rb_plus(", ", wounds.$to_s()));
        dice_str = "" + (dice_str) + ", " + (dice_ws.$to_s());
        $b = self.$roll($rb_times(($rb_minus(strikeRank, 13)), 2), 10), $a = Opal.to_ary($b), wounds_wk = ($a[0] == null ? nil : $a[0]), dice_ws = ($a[1] == null ? nil : $a[1]), $b;
        dice_str = $rb_plus(dice_str, "+" + (dice_ws));
        dice_add = $rb_plus(dice_add, "+" + (wounds_wk));
        wounds = $rb_plus(wounds, wounds_wk);
      };
      if ((($a = ($rb_gt(self.$sendMode(), 1))) !== nil && $a != null && (!$a.$$is_boolean || $a == true))) {
        output = "" + (dice_str) + " ＞ " + (dice_add) + " ＞ スタミナ損失" + (sta_loss) + ", 負傷" + (wounds)
      } else if ((($a = ($rb_gt(self.$sendMode(), 0))) !== nil && $a != null && (!$a.$$is_boolean || $a == true))) {
        output = "" + (dice_add) + " ＞ スタミナ損失" + (sta_loss) + ", 負傷" + (wounds)
        } else {
        output = $rb_plus($rb_plus($rb_plus("スタミナ損失", sta_loss), ", 負傷"), wounds)
      };
      string = $rb_plus(string, $rb_plus(":", dice));
      if ((($a = (output['$empty?']())) !== nil && $a != null && (!$a.$$is_boolean || $a == true))) {
        return "1"};
      output = "(" + (string) + ") ＞ " + (output);
      self.$debug("strike_rank end output", output);
      return output;
    }, TMP_5.$$arity = 1);

    return (Opal.defn(self, '$check_strike_rank', TMP_6 = function $$check_strike_rank(strikeRank) {
      var $a, $b, self = this, dice = nil, dice_add = nil, dice_str = nil, damage = nil;

      strikeRank = strikeRank.$to_i();
      dice = "";
      dice_add = "";
      dice_str = "";
      damage = 0;
      if ((($a = ($rb_lt(strikeRank, 1))) !== nil && $a != null && (!$a.$$is_boolean || $a == true))) {
        damage = 0;
        dice_str = "-";
        dice_add = "-";
        dice = "-";
      } else if ((($a = ($rb_lt(strikeRank, 2))) !== nil && $a != null && (!$a.$$is_boolean || $a == true))) {
        dice = "0or1";
        $b = self.$roll(1, 2), $a = Opal.to_ary($b), damage = ($a[0] == null ? nil : $a[0]), dice_str = ($a[1] == null ? nil : $a[1]), $b;
        damage = $rb_minus(damage, 1);
        dice_add = damage.$to_s();
      } else if ((($a = ($rb_lt(strikeRank, 3))) !== nil && $a != null && (!$a.$$is_boolean || $a == true))) {
        dice = "1or2";
        $b = self.$roll(1, 2), $a = Opal.to_ary($b), damage = ($a[0] == null ? nil : $a[0]), dice_str = ($a[1] == null ? nil : $a[1]), $b;
        dice_add = damage.$to_s();
      } else if ((($a = ($rb_lt(strikeRank, 4))) !== nil && $a != null && (!$a.$$is_boolean || $a == true))) {
        dice = "1d5";
        $b = self.$roll(1, 5), $a = Opal.to_ary($b), damage = ($a[0] == null ? nil : $a[0]), dice_str = ($a[1] == null ? nil : $a[1]), $b;
        dice_add = damage.$to_s();
      } else if ((($a = ($rb_lt(strikeRank, 10))) !== nil && $a != null && (!$a.$$is_boolean || $a == true))) {
        dice = $rb_plus(($rb_minus(strikeRank, 3)).$to_s(), "d10");
        $b = self.$roll($rb_minus(strikeRank, 3), 10), $a = Opal.to_ary($b), damage = ($a[0] == null ? nil : $a[0]), dice_str = ($a[1] == null ? nil : $a[1]), $b;
        dice_add = damage.$to_s();
      } else if ((($a = ($rb_lt(strikeRank, 13))) !== nil && $a != null && (!$a.$$is_boolean || $a == true))) {
        dice = $rb_plus(($rb_minus(strikeRank, 6)).$to_s(), "d10*2");
        $b = self.$roll($rb_minus(strikeRank, 6), 10), $a = Opal.to_ary($b), damage = ($a[0] == null ? nil : $a[0]), dice_str = ($a[1] == null ? nil : $a[1]), $b;
        dice_add = $rb_plus(damage.$to_s(), "*2");
        damage = $rb_times(damage, 2);
        dice_str = "(" + (dice_str) + ")*2";
        } else {
        dice = "5d10*3";
        $b = self.$roll(5, 10), $a = Opal.to_ary($b), damage = ($a[0] == null ? nil : $a[0]), dice_str = ($a[1] == null ? nil : $a[1]), $b;
        dice_add = $rb_plus(damage.$to_s(), "*3");
        damage = $rb_times(damage, 3);
        dice_str = "(" + (dice_str) + ")*3";
      };
      return [damage, dice, dice_add, dice_str];
    }, TMP_6.$$arity = 1), nil) && 'check_strike_rank';
  })($scope.base, $scope.get('DiceBot'))
})(Opal);

/* Generated by Opal 0.10.5 */
(function(Opal) {
  var self = Opal.top, $scope = Opal, nil = Opal.nil, $breaker = Opal.breaker, $slice = Opal.slice;

  Opal.add_stubs(['$exit']);
  return $scope.get('Kernel').$exit()
})(Opal);
