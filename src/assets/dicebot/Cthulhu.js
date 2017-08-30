/* Generated by Opal 0.10.5 */
(function(Opal) {
  function $rb_gt(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs > rhs : lhs['$>'](rhs);
  }
  function $rb_plus(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs + rhs : lhs['$+'](rhs);
  }
  function $rb_divide(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs / rhs : lhs['$/'](rhs);
  }
  function $rb_times(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs * rhs : lhs['$*'](rhs);
  }
  function $rb_lt(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs < rhs : lhs['$<'](rhs);
  }
  function $rb_le(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs <= rhs : lhs['$<='](rhs);
  }
  function $rb_ge(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs >= rhs : lhs['$>='](rhs);
  }
  function $rb_minus(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs - rhs : lhs['$-'](rhs);
  }
  var self = Opal.top, $scope = Opal, nil = Opal.nil, $breaker = Opal.breaker, $slice = Opal.slice, $klass = Opal.klass, $gvars = Opal.gvars;

  Opal.add_stubs(['$setPrefixes', '$===', '$getCheckResult', '$getRegistResult', '$getCombineRoll', '$=~', '$to_i', '$>', '$+', '$roll', '$getCheckResultText', '$floor', '$/', '$*', '$<', '$<=', '$>=', '$-', '$include?', '$debug', '$==']);
  return (function($base, $super) {
    function $Cthulhu(){};
    var self = $Cthulhu = $klass($base, $super, 'Cthulhu', $Cthulhu);

    var def = self.$$proto, $scope = self.$$scope, TMP_1, TMP_2, TMP_3, TMP_4, TMP_5, TMP_6, TMP_7, TMP_8, TMP_9;

    def.special_percentage = def.critical_percentage = def.fumble_percentage = nil;
    self.$setPrefixes(["CC(B)?\\(\\d+\\)", "CC(B)?.*", "RES(B)?.*", "CBR(B)?\\(\\d+,\\d+\\)"]);

    Opal.defn(self, '$initialize', TMP_1 = function $$initialize() {
      var $a, $b, self = this, $iter = TMP_1.$$p, $yield = $iter || nil, $zuper = nil, $zuper_index = nil, $zuper_length = nil;

      TMP_1.$$p = null;
      $zuper = [];
      
      for($zuper_index = 0; $zuper_index < arguments.length; $zuper_index++) {
        $zuper[$zuper_index] = arguments[$zuper_index];
      }
      ($a = ($b = self, Opal.find_super_dispatcher(self, 'initialize', TMP_1, false)), $a.$$p = $iter, $a).apply($b, $zuper);
      self.special_percentage = 20;
      self.critical_percentage = 1;
      return self.fumble_percentage = 1;
    }, TMP_1.$$arity = 0);

    Opal.defn(self, '$gameName', TMP_2 = function $$gameName() {
      var self = this;

      return "クトゥルフ";
    }, TMP_2.$$arity = 0);

    Opal.defn(self, '$gameType', TMP_3 = function $$gameType() {
      var self = this;

      return "Cthulhu";
    }, TMP_3.$$arity = 0);

    Opal.defn(self, '$getHelpMessage', TMP_4 = function $$getHelpMessage() {
      var self = this;

      return "c=クリティカル値 ／ f=ファンブル値 ／ s=スペシャル\n\n1d100<=n    c・f・sすべてオフ（単純な数値比較判定のみ行います）\n\n・cfs判定付き判定コマンド\n\nCC\t 1d100ロールを行う c=1、f=100\nCCB  同上、c=5、f=96\n\n例：CC<=80  （技能値80で行為判定。1%ルールでcf適用）\n例：CCB<=55 （技能値55で行為判定。5%ルールでcf適用）\n\n・組み合わせロールについて\n\nCBR(x,y)\tc=1、f=100\nCBRB(x,y)\tc=5、f=96\n\n・抵抗表ロールについて\nRES(x-y)\tc=1、f=100\nRESB(x-y)\tc=5、f=96\n\n※故障ナンバー判定\n\n・CC(x) c=1、f=100\nx=故障ナンバー。出目x以上が出た上で、ファンブルが同時に発生した場合、共に出力する（テキスト「ファンブル＆故障」）\nファンブルでない場合、成功・失敗に関わらずテキスト「故障」のみを出力する（成功・失敗を出力せず、上書きしたものを出力する形）\n\n・CCB(x) c=5、f=96\n同上\n\n";
    }, TMP_4.$$arity = 0);

    Opal.defn(self, '$rollDiceCommand', TMP_5 = function $$rollDiceCommand(command) {
      var self = this, $case = nil;

      $case = command;if (/CCB/i['$===']($case)) {self.critical_percentage = 5;
      self.fumble_percentage = 5;
      return self.$getCheckResult(command);}else if (/CC/i['$===']($case)) {self.critical_percentage = 1;
      self.fumble_percentage = 1;
      return self.$getCheckResult(command);}else if (/RESB/i['$===']($case)) {self.critical_percentage = 5;
      self.fumble_percentage = 5;
      return self.$getRegistResult(command);}else if (/CBRB/i['$===']($case)) {self.critical_percentage = 5;
      self.fumble_percentage = 5;
      return self.$getCombineRoll(command);}else if (/RES/i['$===']($case)) {self.critical_percentage = 1;
      self.fumble_percentage = 1;
      return self.$getRegistResult(command);}else if (/CBR/i['$===']($case)) {self.critical_percentage = 1;
      self.fumble_percentage = 1;
      return self.$getCombineRoll(command);};
      return nil;
    }, TMP_5.$$arity = 1);

    Opal.defn(self, '$getCheckResult', TMP_6 = function $$getCheckResult(command) {
      var $a, $b, self = this, output = nil, broken_num = nil, diff = nil, total_n = nil;

      output = "";
      broken_num = 0;
      diff = 0;
      if ((($a = (/CC(B)?(\d+)<=(\d+)/i['$=~'](command))) !== nil && $a != null && (!$a.$$is_boolean || $a == true))) {
        broken_num = (($a = $gvars['~']) === nil ? nil : $a['$[]'](2)).$to_i();
        diff = (($a = $gvars['~']) === nil ? nil : $a['$[]'](3)).$to_i();
      } else if ((($a = (/CC(B)?<=(\d+)/i['$=~'](command))) !== nil && $a != null && (!$a.$$is_boolean || $a == true))) {
        diff = (($a = $gvars['~']) === nil ? nil : $a['$[]'](2)).$to_i()};
      if ((($a = ($rb_gt(diff, 0))) !== nil && $a != null && (!$a.$$is_boolean || $a == true))) {
        output = $rb_plus(output, "(1D100<=" + (diff) + ")");
        if ((($a = ($rb_gt(broken_num, 0))) !== nil && $a != null && (!$a.$$is_boolean || $a == true))) {
          output = $rb_plus(output, " 故障ナンバー[" + (broken_num) + "]")};
        $b = self.$roll(1, 100), $a = Opal.to_ary($b), total_n = ($a[0] == null ? nil : $a[0]), $b;
        output = $rb_plus(output, $rb_plus(" ＞ ", "" + (total_n)));
        output = $rb_plus(output, $rb_plus(" ＞ ", self.$getCheckResultText(total_n, diff, broken_num)));
        } else {
        output = $rb_plus(output, "(1D100)");
        $b = self.$roll(1, 100), $a = Opal.to_ary($b), total_n = ($a[0] == null ? nil : $a[0]), $b;
        output = $rb_plus(output, $rb_plus(" ＞ ", "" + (total_n)));
      };
      return output;
    }, TMP_6.$$arity = 1);

    Opal.defn(self, '$getCheckResultText', TMP_7 = function $$getCheckResultText(total_n, diff, broken_num) {
      var $a, $b, self = this, result = nil, diff_special = nil, fumble = nil;

      if (broken_num == null) {
        broken_num = 0;
      }
      result = "";
      diff_special = 0;
      fumble = false;
      if ((($a = ($rb_gt(self.special_percentage, 0))) !== nil && $a != null && (!$a.$$is_boolean || $a == true))) {
        diff_special = ($rb_divide($rb_times(diff, self.special_percentage), 100)).$floor();
        if ((($a = ($rb_lt(diff_special, 1))) !== nil && $a != null && (!$a.$$is_boolean || $a == true))) {
          diff_special = 1};};
      if ((($a = (($b = ($rb_le(total_n, diff)), $b !== false && $b !== nil && $b != null ?($rb_lt(total_n, 100)) : $b))) !== nil && $a != null && (!$a.$$is_boolean || $a == true))) {
        result = "成功";
        if ((($a = ($rb_gt(diff_special, 0))) !== nil && $a != null && (!$a.$$is_boolean || $a == true))) {
          if ((($a = ($rb_le(total_n, self.critical_percentage))) !== nil && $a != null && (!$a.$$is_boolean || $a == true))) {
            if ((($a = ($rb_le(total_n, diff_special))) !== nil && $a != null && (!$a.$$is_boolean || $a == true))) {
              result = "決定的成功/スペシャル"
              } else {
              result = "決定的成功"
            }
          } else if ((($a = ($rb_le(total_n, diff_special))) !== nil && $a != null && (!$a.$$is_boolean || $a == true))) {
            result = "スペシャル"}};
        } else {
        result = "失敗";
        if ((($a = ($rb_gt(diff_special, 0))) !== nil && $a != null && (!$a.$$is_boolean || $a == true))) {
          if ((($a = (($b = ($rb_ge(total_n, ($rb_minus(101, self.fumble_percentage)))), $b !== false && $b !== nil && $b != null ?($rb_lt(diff, 100)) : $b))) !== nil && $a != null && (!$a.$$is_boolean || $a == true))) {
            result = "致命的失敗";
            fumble = true;}};
      };
      if ((($a = ($rb_gt(broken_num, 0))) !== nil && $a != null && (!$a.$$is_boolean || $a == true))) {
        if ((($a = ($rb_ge(total_n, broken_num))) !== nil && $a != null && (!$a.$$is_boolean || $a == true))) {
          if ((($a = (fumble)) !== nil && $a != null && (!$a.$$is_boolean || $a == true))) {
            result = $rb_plus(result, "/故障")
            } else {
            result = "故障"
          }}};
      return result;
    }, TMP_7.$$arity = -3);

    Opal.defn(self, '$getRegistResult', TMP_8 = function $$getRegistResult(command) {
      var $a, $b, self = this, output = nil, value = nil, target = nil, total_n = nil, result = nil;

      output = "1";
      if ((($a = (/RES(B)?([-\d]+)/i['$=~'](command))) !== nil && $a != null && (!$a.$$is_boolean || $a == true))) {
        } else {
        return output
      };
      value = (($a = $gvars['~']) === nil ? nil : $a['$[]'](2)).$to_i();
      target = $rb_plus($rb_times(value, 5), 50);
      if ((($a = ($rb_lt(target, 5))) !== nil && $a != null && (!$a.$$is_boolean || $a == true))) {
        return "(1d100<=" + (target) + ") ＞ 自動失敗"};
      if ((($a = ($rb_gt(target, 95))) !== nil && $a != null && (!$a.$$is_boolean || $a == true))) {
        return "(1d100<=" + (target) + ") ＞ 自動成功"};
      $b = self.$roll(1, 100), $a = Opal.to_ary($b), total_n = ($a[0] == null ? nil : $a[0]), $b;
      result = self.$getCheckResultText(total_n, target);
      return "(1d100<=" + (target) + ") ＞ " + (total_n) + " ＞ " + (result);
    }, TMP_8.$$arity = 1);

    return (Opal.defn(self, '$getCombineRoll', TMP_9 = function $$getCombineRoll(command) {
      var $a, $b, self = this, output = nil, diff_1 = nil, diff_2 = nil, total = nil, result_1 = nil, result_2 = nil, successList = nil, failList = nil, succesCount = nil, rank = nil;

      output = "1";
      if ((($a = (/CBR(B)?\((\d+),(\d+)\)/i['$=~'](command))) !== nil && $a != null && (!$a.$$is_boolean || $a == true))) {
        } else {
        return output
      };
      diff_1 = (($a = $gvars['~']) === nil ? nil : $a['$[]'](2)).$to_i();
      diff_2 = (($a = $gvars['~']) === nil ? nil : $a['$[]'](3)).$to_i();
      $b = self.$roll(1, 100), $a = Opal.to_ary($b), total = ($a[0] == null ? nil : $a[0]), $b;
      result_1 = self.$getCheckResultText(total, diff_1);
      result_2 = self.$getCheckResultText(total, diff_2);
      successList = ["決定的成功/スペシャル", "決定的成功", "スペシャル", "成功"];
      failList = ["失敗", "致命的失敗"];
      succesCount = 0;
      if ((($a = successList['$include?'](result_1)) !== nil && $a != null && (!$a.$$is_boolean || $a == true))) {
        succesCount = $rb_plus(succesCount, 1)};
      if ((($a = successList['$include?'](result_2)) !== nil && $a != null && (!$a.$$is_boolean || $a == true))) {
        succesCount = $rb_plus(succesCount, 1)};
      self.$debug("succesCount", succesCount);
      rank = (function() {if ((($a = ($rb_ge(succesCount, 2))) !== nil && $a != null && (!$a.$$is_boolean || $a == true))) {
        return "成功"
      } else if ((($a = (succesCount['$=='](1))) !== nil && $a != null && (!$a.$$is_boolean || $a == true))) {
        return "部分的成功"
        } else {
        return "失敗"
      }; return nil; })();
      return "(1d100<=" + (diff_1) + "," + (diff_2) + ") ＞ " + (total) + "[" + (result_1) + "," + (result_2) + "] ＞ " + (rank);
    }, TMP_9.$$arity = 1), nil) && 'getCombineRoll';
  })($scope.base, $scope.get('DiceBot'))
})(Opal);

/* Generated by Opal 0.10.5 */
(function(Opal) {
  var self = Opal.top, $scope = Opal, nil = Opal.nil, $breaker = Opal.breaker, $slice = Opal.slice;

  Opal.add_stubs(['$exit']);
  return $scope.get('Kernel').$exit()
})(Opal);
