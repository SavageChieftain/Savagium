/* Generated by Opal 0.10.5 */
(function(Opal) {
  function $rb_ge(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs >= rhs : lhs['$>='](rhs);
  }
  function $rb_plus(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs + rhs : lhs['$+'](rhs);
  }
  function $rb_le(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs <= rhs : lhs['$<='](rhs);
  }
  function $rb_gt(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs > rhs : lhs['$>'](rhs);
  }
  function $rb_lt(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs < rhs : lhs['$<'](rhs);
  }
  function $rb_minus(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs - rhs : lhs['$-'](rhs);
  }
  var self = Opal.top, $scope = Opal, nil = Opal.nil, $breaker = Opal.breaker, $slice = Opal.slice, $klass = Opal.klass, $gvars = Opal.gvars;

  Opal.add_stubs(['$setPrefixes', '$gsub', '$bbt_check', '$==', '$>=', '$debug', '$=~', '$to_i', '$nil?', '$parren_killer', '$+', '$<=', '$>', '$collect', '$split', '$to_s', '$each', '$include?', '$<', '$size', '$push', '$-', '$roll', '$&', '$sortType', '$sort!', '$join', '$[]', '$max', '$!=', '$sendMode', '$check_suc', '$===', '$bbt_emotion_table', '$get_table_by_d66']);
  return (function($base, $super) {
    function $BeastBindTrinity(){};
    var self = $BeastBindTrinity = $klass($base, $super, 'BeastBindTrinity', $BeastBindTrinity);

    var def = self.$$proto, $scope = self.$$scope, TMP_1, TMP_2, TMP_3, TMP_4, TMP_11, TMP_12, TMP_13, TMP_17, TMP_18, TMP_19;

    def.nick_e = nil;
    self.$setPrefixes(["\\d+BB", "EMO"]);

    Opal.defn(self, '$initialize', TMP_1 = function $$initialize() {
      var $a, $b, self = this, $iter = TMP_1.$$p, $yield = $iter || nil, $zuper = nil, $zuper_index = nil, $zuper_length = nil;

      TMP_1.$$p = null;
      $zuper = [];
      
      for($zuper_index = 0; $zuper_index < arguments.length; $zuper_index++) {
        $zuper[$zuper_index] = arguments[$zuper_index];
      }
      ($a = ($b = self, Opal.find_super_dispatcher(self, 'initialize', TMP_1, false)), $a.$$p = $iter, $a).apply($b, $zuper);
      self.sendMode = 2;
      self.sortType = 0;
      return self.d66Type = 2;
    }, TMP_1.$$arity = 0);

    Opal.defn(self, '$gameName', TMP_2 = function $$gameName() {
      var self = this;

      return "ビーストバインド トリニティ";
    }, TMP_2.$$arity = 0);

    Opal.defn(self, '$gameType', TMP_3 = function $$gameType() {
      var self = this;

      return "BeastBindTrinity";
    }, TMP_3.$$arity = 0);

    Opal.defn(self, '$getHelpMessage', TMP_4 = function $$getHelpMessage() {
      var self = this;

      return "・判定　(nBB+m%w@x#y$z)\n　n個のD6を振り、出目の大きい2個から達成値を算出。修正mも可能。\n　＞%wは「現在の人間性が w」であることを表し、省略可能。\n　　これを入力すると、人間性からクリティカル値を自動計算します。\n　＞@xは「クリティカル値が x」であることを表し、省略可能。\n　　%wと@xを両方とも指定した場合、@xのクリティカル値指定が優先されます。\n　＞#yは「ファンブル値が y」であることを表し、省略可能。\n　＞$zは、ダイスの出目をその数値に固定して判定を行う。複数指定可、省略可能。\n　　例）2BB$1→ダイスを2個振る判定で、ダイス1個の出目を1で固定\n　　例）2BB$16→ダイスを2個振る判定で、ダイス2個の出目を1と6で固定\n　＞クリティカル値（または%wの指定）を省略した場合は「12」として、\n　　ファンブル値を省略した場合は「2」として達成値を計算します。\n\n※%wの機能は、イニシアティブ表に「人間性」の項目を用意しておき、\n　「nBB+m%{人間性}」のチャットパレットを作成して使う事を想定しています。\n\n・邂逅表　EMO\n・D66ダイスあり\n";
    }, TMP_4.$$arity = 0);

    Opal.defn(self, '$changeText', TMP_11 = function $$changeText(string) {
      var $a, $b, TMP_5, $c, TMP_6, $d, TMP_7, $e, TMP_8, $f, TMP_9, $g, TMP_10, self = this;

      string = ($a = ($b = string).$gsub, $a.$$p = (TMP_5 = function(){var self = TMP_5.$$s || this, $c;

      return "" + ((($c = $gvars['~']) === nil ? nil : $c['$[]'](1))) + "R6"}, TMP_5.$$s = self, TMP_5.$$arity = 0, TMP_5), $a).call($b, /(\d+)BB6/i);
      string = ($a = ($c = string).$gsub, $a.$$p = (TMP_6 = function(){var self = TMP_6.$$s || this, $d;

      return "" + ((($d = $gvars['~']) === nil ? nil : $d['$[]'](1))) + "R6"}, TMP_6.$$s = self, TMP_6.$$arity = 0, TMP_6), $a).call($c, /(\d+)BB/i);
      string = ($a = ($d = string).$gsub, $a.$$p = (TMP_7 = function(){var self = TMP_7.$$s || this, $e;

      return "[H:" + ((($e = $gvars['~']) === nil ? nil : $e['$[]'](1))) + "]"}, TMP_7.$$s = self, TMP_7.$$arity = 0, TMP_7), $a).call($d, /\%([\-\d]+)/i);
      string = ($a = ($e = string).$gsub, $a.$$p = (TMP_8 = function(){var self = TMP_8.$$s || this, $f;

      return "[C" + ((($f = $gvars['~']) === nil ? nil : $f['$[]'](1))) + "]"}, TMP_8.$$s = self, TMP_8.$$arity = 0, TMP_8), $a).call($e, /\@(\d+)/i);
      string = ($a = ($f = string).$gsub, $a.$$p = (TMP_9 = function(){var self = TMP_9.$$s || this, $g;

      return "[F" + ((($g = $gvars['~']) === nil ? nil : $g['$[]'](1))) + "]"}, TMP_9.$$s = self, TMP_9.$$arity = 0, TMP_9), $a).call($f, /\#(\d+)/i);
      string = ($a = ($g = string).$gsub, $a.$$p = (TMP_10 = function(){var self = TMP_10.$$s || this, $h;

      return "[S" + ((($h = $gvars['~']) === nil ? nil : $h['$[]'](1))) + "]"}, TMP_10.$$s = self, TMP_10.$$arity = 0, TMP_10), $a).call($g, /\$(\d+)/i);
      return string;
    }, TMP_11.$$arity = 1);

    Opal.defn(self, '$dice_command_xRn', TMP_12 = function $$dice_command_xRn(string, nick_e) {
      var self = this;

      self.nick = nick_e;
      return self.$bbt_check(string);
    }, TMP_12.$$arity = 2);

    Opal.defn(self, '$check_2D6', TMP_13 = function $$check_2D6(total_n, dice_n, signOfInequality, diff, dice_cnt, dice_max, n1, n_max) {
      var $a, self = this;

      if ((($a = (signOfInequality['$=='](">="))) !== nil && $a != null && (!$a.$$is_boolean || $a == true))) {
        } else {
        return ""
      };
      if ((($a = ($rb_ge(total_n, diff))) !== nil && $a != null && (!$a.$$is_boolean || $a == true))) {
        return " ＞ 成功"
        } else {
        return " ＞ 失敗"
      };
    }, TMP_13.$$arity = 8);

    Opal.defn(self, '$bbt_check', TMP_17 = function $$bbt_check(string) {
      var $a, $b, TMP_14, $c, $d, TMP_15, TMP_16, self = this, output = nil, reg1 = nil, reg2 = nil, reg3 = nil, reg4 = nil, reg5 = nil, reg6 = nil, reg7 = nil, reg8 = nil, reg9 = nil, reg10 = nil, reg11 = nil, reg12 = nil, reg13 = nil, reg14 = nil, reg15 = nil, dice_c = nil, bonus = nil, signOfInequality = nil, diff = nil, bonusText = nil, cri = nil, fum = nil, humanity = nil, rer = nil, dice_now = nil, dice_str = nil, total_n = nil, cri_flg = nil, cri_bonus = nil, fum_flg = nil, rer_num = nil, rer_ary = nil, i = nil, dice_tc = nil, _ = nil, dice_num = nil, showstring = nil;

      output = "1";
      self.$debug("bbt string", string);
      if ((($a = (/(^|\s)S?((\d+)[rR]6([\+\-\d]*)(\[H:([\-\d]+)\])?(\[C(\d+)\])?(\[F(\d+)\])?(\[S(\d+)\])?(([>=]+)(\d+))?)(\s|$)/i['$=~'](string))) !== nil && $a != null && (!$a.$$is_boolean || $a == true))) {
        } else {
        self.$debug("not mutch");
        return output;
      };
      reg1 = (($a = $gvars['~']) === nil ? nil : $a['$[]'](1));
      reg2 = (($a = $gvars['~']) === nil ? nil : $a['$[]'](2));
      reg3 = (($a = $gvars['~']) === nil ? nil : $a['$[]'](3));
      reg4 = (($a = $gvars['~']) === nil ? nil : $a['$[]'](4));
      reg5 = (($a = $gvars['~']) === nil ? nil : $a['$[]'](5));
      reg6 = (($a = $gvars['~']) === nil ? nil : $a['$[]'](6));
      reg7 = (($a = $gvars['~']) === nil ? nil : $a['$[]'](7));
      reg8 = (($a = $gvars['~']) === nil ? nil : $a['$[]'](8));
      reg9 = (($a = $gvars['~']) === nil ? nil : $a['$[]'](9));
      reg10 = (($a = $gvars['~']) === nil ? nil : $a['$[]'](10));
      reg11 = (($a = $gvars['~']) === nil ? nil : $a['$[]'](11));
      reg12 = (($a = $gvars['~']) === nil ? nil : $a['$[]'](12));
      reg13 = (($a = $gvars['~']) === nil ? nil : $a['$[]'](13));
      reg14 = (($a = $gvars['~']) === nil ? nil : $a['$[]'](14));
      reg15 = (($a = $gvars['~']) === nil ? nil : $a['$[]'](15));
      string = reg2;
      dice_c = reg3.$to_i();
      bonus = 0;
      signOfInequality = "";
      diff = 0;
      bonusText = reg4;
      if ((($a = (bonusText['$nil?']())) !== nil && $a != null && (!$a.$$is_boolean || $a == true))) {
        } else {
        bonus = self.$parren_killer($rb_plus($rb_plus("(0", bonusText), ")")).$to_i()
      };
      cri = 12;
      fum = 2;
      humanity = 99;
      if ((($a = (reg5)) !== nil && $a != null && (!$a.$$is_boolean || $a == true))) {
        if ((($a = (reg6)) !== nil && $a != null && (!$a.$$is_boolean || $a == true))) {
          humanity = reg6.$to_i()};
        if ((($a = $rb_le(humanity, 0)) !== nil && $a != null && (!$a.$$is_boolean || $a == true))) {
          cri = 9
        } else if ((($a = $rb_le(humanity, 20)) !== nil && $a != null && (!$a.$$is_boolean || $a == true))) {
          cri = 10
        } else if ((($a = $rb_le(humanity, 40)) !== nil && $a != null && (!$a.$$is_boolean || $a == true))) {
          cri = 11
          } else {
          cri = 12
        };};
      if ((($a = (reg7)) !== nil && $a != null && (!$a.$$is_boolean || $a == true))) {
        if ((($a = (reg8)) !== nil && $a != null && (!$a.$$is_boolean || $a == true))) {
          cri = reg8.$to_i()}};
      if ((($a = (reg9)) !== nil && $a != null && (!$a.$$is_boolean || $a == true))) {
        if ((($a = (reg10)) !== nil && $a != null && (!$a.$$is_boolean || $a == true))) {
          fum = reg10.$to_i()}};
      rer = 0;
      if ((($a = (reg11)) !== nil && $a != null && (!$a.$$is_boolean || $a == true))) {
        if ((($a = (reg12)) !== nil && $a != null && (!$a.$$is_boolean || $a == true))) {
          rer = reg12.$to_i()}};
      if ((($a = (reg14)) !== nil && $a != null && (!$a.$$is_boolean || $a == true))) {
        signOfInequality = reg14};
      if ((($a = (reg15)) !== nil && $a != null && (!$a.$$is_boolean || $a == true))) {
        diff = reg15};
      dice_now = 0;
      dice_str = "";
      total_n = 0;
      cri_flg = false;
      cri_bonus = 0;
      fum_flg = false;
      rer_num = [];
      if ((($a = ($rb_gt(rer, 0))) !== nil && $a != null && (!$a.$$is_boolean || $a == true))) {
        rer_ary = ($a = ($b = rer.$to_s().$split(/(?:)/)).$collect, $a.$$p = (TMP_14 = function(i){var self = TMP_14.$$s || this;
if (i == null) i = nil;
        return i.$to_i()}, TMP_14.$$s = self, TMP_14.$$arity = 1, TMP_14), $a).call($b);
        ($c = ($d = rer_ary).$each, $c.$$p = (TMP_15 = function($a){var self = TMP_15.$$s || this, $e, $f;
if ($a == null) $a = nil;
        i = $a;
          if ((($e = (($f = [1, 2, 3, 4, 5, 6]['$include?'](i), $f !== false && $f !== nil && $f != null ?$rb_lt(rer_num.$size(), dice_c) : $f))) !== nil && $e != null && (!$e.$$is_boolean || $e == true))) {
            return rer_num.$push(i)
            } else {
            return nil
          };}, TMP_15.$$s = self, TMP_15.$$arity = 1, TMP_15), $c).call($d);};
      dice_tc = $rb_minus(dice_c, rer_num.$size());
      if ((($a = ($rb_gt(dice_tc, 0))) !== nil && $a != null && (!$a.$$is_boolean || $a == true))) {
        $c = self.$roll(dice_tc, 6, (self.$sortType()['$&'](1))), $a = Opal.to_ary($c), _ = ($a[0] == null ? nil : $a[0]), dice_str = ($a[1] == null ? nil : $a[1]), $c;
        dice_num = ($a = ($c = ($rb_plus(dice_str.$split(/,/), rer_num))).$collect, $a.$$p = (TMP_16 = function(n){var self = TMP_16.$$s || this;
if (n == null) n = nil;
        return n.$to_i()}, TMP_16.$$s = self, TMP_16.$$arity = 1, TMP_16), $a).call($c);
      } else if ((($a = (rer_num.$size()['$=='](0))) !== nil && $a != null && (!$a.$$is_boolean || $a == true))) {
        return "ERROR:振るダイスの数が0個です"
        } else {
        dice_num = rer_num
      };
      dice_num['$sort!']();
      dice_str = dice_num.$join(",");
      dice_now = $rb_plus(dice_num['$[]']($rb_minus(dice_c, 2)), dice_num['$[]']($rb_minus(dice_c, 1)));
      if ((($a = ($rb_ge(dice_now, cri))) !== nil && $a != null && (!$a.$$is_boolean || $a == true))) {
        cri_flg = true;
        cri_bonus = 20;};
      total_n = [$rb_plus($rb_plus(dice_now, bonus), cri_bonus), 0].$max();
      if ((($a = ($rb_ge(fum, dice_now))) !== nil && $a != null && (!$a.$$is_boolean || $a == true))) {
        fum_flg = true;
        total_n = 0;};
      dice_str = "[" + (dice_str) + "]";
      if ((($a = (fum_flg['$=='](true))) !== nil && $a != null && (!$a.$$is_boolean || $a == true))) {
        output = "" + (dice_now) + (dice_str) + "【ファンブル】"
        } else {
        output = "" + (dice_now) + (dice_str);
        if ((($a = ($rb_gt(bonus, 0))) !== nil && $a != null && (!$a.$$is_boolean || $a == true))) {
          output = $rb_plus(output, "+" + (bonus))
        } else if ((($a = ($rb_lt(bonus, 0))) !== nil && $a != null && (!$a.$$is_boolean || $a == true))) {
          output = $rb_plus(output, "" + (bonus))};
        if ((($a = (cri_flg['$=='](true))) !== nil && $a != null && (!$a.$$is_boolean || $a == true))) {
          output = $rb_plus(output, "+" + (cri_bonus) + "【クリティカル】")};
      };
      showstring = "" + (dice_c) + "R6";
      if ((($a = ($rb_gt(bonus, 0))) !== nil && $a != null && (!$a.$$is_boolean || $a == true))) {
        showstring = $rb_plus(showstring, "+" + (bonus))
      } else if ((($a = ($rb_lt(bonus, 0))) !== nil && $a != null && (!$a.$$is_boolean || $a == true))) {
        showstring = $rb_plus(showstring, "" + (bonus))};
      showstring = $rb_plus(showstring, "[C" + (cri) + ",F" + (fum) + "]");
      if ((($a = (signOfInequality['$!='](""))) !== nil && $a != null && (!$a.$$is_boolean || $a == true))) {
        showstring = $rb_plus(showstring, "" + (signOfInequality) + (diff))};
      if ((($a = ($rb_gt(self.$sendMode(), 0))) !== nil && $a != null && (!$a.$$is_boolean || $a == true))) {
        if ((($a = (/[^\d\[\]]+/['$=~'](output))) !== nil && $a != null && (!$a.$$is_boolean || $a == true))) {
          output = "" + (self.nick_e) + ": (" + (showstring) + ") ＞ " + (output) + " ＞ " + (total_n)
          } else {
          output = "" + (self.nick_e) + ": (" + (showstring) + ") ＞ " + (total_n)
        }
        } else {
        output = "" + (self.nick_e) + ": (" + (showstring) + ") ＞ " + (total_n)
      };
      if ((($a = (signOfInequality['$!='](""))) !== nil && $a != null && (!$a.$$is_boolean || $a == true))) {
        output = $rb_plus(output, self.$check_suc(total_n, dice_now, signOfInequality, diff, 2, 6, 0, 0))};
      return output;
    }, TMP_17.$$arity = 1);

    Opal.defn(self, '$rollDiceCommand', TMP_18 = function $$rollDiceCommand(command) {
      var $a, $b, self = this, output = nil, type = nil, total_n = nil, $case = nil;

      output = "1";
      type = "";
      total_n = 0;
      $case = command;if (/EMO/i['$===']($case)) {type = "邂逅表";
      $b = self.$bbt_emotion_table(), $a = Opal.to_ary($b), output = ($a[0] == null ? nil : $a[0]), total_n = ($a[1] == null ? nil : $a[1]), $b;};
      if ((($a = (output['$!=']("1"))) !== nil && $a != null && (!$a.$$is_boolean || $a == true))) {
        output = "" + (type) + "(" + (total_n) + ") ＞ " + (output)};
      return output;
    }, TMP_18.$$arity = 1);

    return (Opal.defn(self, '$bbt_emotion_table', TMP_19 = function $$bbt_emotion_table() {
      var self = this, table = nil;

      table = ["家族", "家族", "信頼", "信頼", "忘却", "忘却", "慈愛", "慈愛", "憧憬", "憧憬", "感銘", "感銘", "同志", "同志", "幼子", "幼子", "興味", "興味", "ビジネス", "ビジネス", "師事", "師事", "好敵手", "好敵手", "友情", "友情", "忠誠", "忠誠", "恐怖", "恐怖", "執着", "執着", "軽蔑", "軽蔑", "憎悪", "憎悪"];
      return self.$get_table_by_d66(table);
    }, TMP_19.$$arity = 0), nil) && 'bbt_emotion_table';
  })($scope.base, $scope.get('DiceBot'))
})(Opal);

/* Generated by Opal 0.10.5 */
(function(Opal) {
  var self = Opal.top, $scope = Opal, nil = Opal.nil, $breaker = Opal.breaker, $slice = Opal.slice;

  Opal.add_stubs(['$exit']);
  return $scope.get('Kernel').$exit()
})(Opal);
