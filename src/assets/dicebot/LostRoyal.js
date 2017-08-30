/* Generated by Opal 0.10.5 */
(function(Opal) {
  function $rb_minus(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs - rhs : lhs['$-'](rhs);
  }
  function $rb_plus(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs + rhs : lhs['$+'](rhs);
  }
  function $rb_ge(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs >= rhs : lhs['$>='](rhs);
  }
  function $rb_gt(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs > rhs : lhs['$>'](rhs);
  }
  var self = Opal.top, $scope = Opal, nil = Opal.nil, $breaker = Opal.breaker, $slice = Opal.slice, $klass = Opal.klass, $gvars = Opal.gvars, $range = Opal.range;

  Opal.add_stubs(['$setPrefixes', '$===', '$check_lostroyal', '$to_i', '$roll_fumble_chart', '$roll_wind_power_chart', '$roll_emotion_chart', '$roll_hope', '$each', '$roll', '$<<', '$to_a', '$map', '$[]', '$-', '$inject', '$find_sequence', '$join', '$nil?', '$empty?', '$is_fumble?', '$size', '$+', '$>=', '$sort', '$last', '$<=>', '$find_all', '$>', '$find_sequence_from_start_key', '$include?', '$==', '$unshift', '$count', '$min', '$!=', '$is_1or2']);
  return (function($base, $super) {
    function $LostRoyal(){};
    var self = $LostRoyal = $klass($base, $super, 'LostRoyal', $LostRoyal);

    var def = self.$$proto, $scope = self.$$scope, TMP_1, TMP_2, TMP_3, TMP_4, TMP_5, TMP_8, TMP_12, TMP_13, TMP_15, TMP_16, TMP_17, TMP_18, TMP_19, TMP_20;

    self.$setPrefixes(["LR\\[[0-5],[0-5],[0-5],[0-5],[0-5],[0-5]\\]", "FC", "WPC", "EC", "HR[1-2]"]);

    Opal.defn(self, '$initialize', TMP_1 = function $$initialize() {
      var $a, $b, self = this, $iter = TMP_1.$$p, $yield = $iter || nil, $zuper = nil, $zuper_index = nil, $zuper_length = nil;

      TMP_1.$$p = null;
      $zuper = [];
      
      for($zuper_index = 0; $zuper_index < arguments.length; $zuper_index++) {
        $zuper[$zuper_index] = arguments[$zuper_index];
      }
      ($a = ($b = self, Opal.find_super_dispatcher(self, 'initialize', TMP_1, false)), $a.$$p = $iter, $a).apply($b, $zuper);
      self.sendMode = 2;
      self.sortType = 1;
      return self.d66Type = 1;
    }, TMP_1.$$arity = 0);

    Opal.defn(self, '$gameName', TMP_2 = function $$gameName() {
      var self = this;

      return "ロストロイヤル";
    }, TMP_2.$$arity = 0);

    Opal.defn(self, '$gameType', TMP_3 = function $$gameType() {
      var self = this;

      return "LostRoyal";
    }, TMP_3.$$arity = 0);

    Opal.defn(self, '$getHelpMessage', TMP_4 = function $$getHelpMessage() {
      var self = this;

      return "・D66ダイスあり\n\n行為判定\n　LR[x,x,x,x,x,x]\n　　x の並びには【判定表】の数値を順番に入力する。\n　　（例： LR[1,3,0,1,2] ）\n\nファンブル表\n　FC\n\n風力決定表\n　WPC\n\n感情決定表\n　EC\n\n希望点の決定\n　HRx\n　　x にはダイスの数（ 1 - 2 ）を指定\n";
    }, TMP_4.$$arity = 0);

    Opal.defn(self, '$rollDiceCommand', TMP_5 = function $$rollDiceCommand(command) {
      var $a, self = this, $case = nil;

      $case = command;if (/LR\[([0-5]),([0-5]),([0-5]),([0-5]),([0-5]),([0-5])\]/i['$===']($case)) {return self.$check_lostroyal([(($a = $gvars['~']) === nil ? nil : $a['$[]'](1)).$to_i(), (($a = $gvars['~']) === nil ? nil : $a['$[]'](2)).$to_i(), (($a = $gvars['~']) === nil ? nil : $a['$[]'](3)).$to_i(), (($a = $gvars['~']) === nil ? nil : $a['$[]'](4)).$to_i(), (($a = $gvars['~']) === nil ? nil : $a['$[]'](5)).$to_i(), (($a = $gvars['~']) === nil ? nil : $a['$[]'](6)).$to_i()])}else if (/FC/['$===']($case)) {return self.$roll_fumble_chart()}else if (/WPC/['$===']($case)) {return self.$roll_wind_power_chart()}else if (/EC/['$===']($case)) {return self.$roll_emotion_chart()}else if (/HR([1-2])/['$===']($case)) {return self.$roll_hope((($a = $gvars['~']) === nil ? nil : $a['$[]'](1)).$to_i())};
      return nil;
    }, TMP_5.$$arity = 1);

    Opal.defn(self, '$check_lostroyal', TMP_8 = function $$check_lostroyal(checking_table) {
      var $a, $b, $c, TMP_6, TMP_7, $d, self = this, keys = nil, i = nil, scores = nil, total_score = nil, chained_sequence = nil, text = nil, bonus = nil;

      keys = [];
      ($b = ($c = $range(0, 3, true)).$each, $b.$$p = (TMP_6 = function($a){var self = TMP_6.$$s || this, $d, $e, key = nil;
if ($a == null) $a = nil;
      i = $a;
        $e = self.$roll(1, 6), $d = Opal.to_ary($e), key = ($d[0] == null ? nil : $d[0]), $e;
        return keys['$<<'](key);}, TMP_6.$$s = self, TMP_6.$$arity = 1, TMP_6), $b).call($c);
      scores = (($a = ($b = keys).$map, $a.$$p = (TMP_7 = function(k){var self = TMP_7.$$s || this;
if (k == null) k = nil;
      return checking_table['$[]']($rb_minus(k, 1))}, TMP_7.$$s = self, TMP_7.$$arity = 1, TMP_7), $a).call($b)).$to_a();
      total_score = scores.$inject("+");
      chained_sequence = self.$find_sequence(keys);
      text = "3D6 => [" + (keys.$join(",")) + "] => (" + (scores.$join("+")) + ") => " + (total_score);
      if ((($a = ((($d = chained_sequence['$nil?']()) !== false && $d !== nil && $d != null) ? $d : chained_sequence['$empty?']())) !== nil && $a != null && (!$a.$$is_boolean || $a == true))) {
        } else {
        bonus = (function() {if ((($a = self['$is_fumble?'](keys, chained_sequence)) !== nil && $a != null && (!$a.$$is_boolean || $a == true))) {
          return 3
          } else {
          return chained_sequence.$size()
        }; return nil; })();
        text = $rb_plus(text, " | " + (chained_sequence.$size()) + " chain! (" + (chained_sequence.$join(",")) + ") => " + ($rb_plus(total_score, bonus)));
        if ((($a = $rb_ge(chained_sequence.$size(), 3)) !== nil && $a != null && (!$a.$$is_boolean || $a == true))) {
          text = $rb_plus(text, " [スペシャル]")};
        if ((($a = self['$is_fumble?'](keys, chained_sequence)) !== nil && $a != null && (!$a.$$is_boolean || $a == true))) {
          text = $rb_plus(text, " [ファンブル]")};
      };
      return text;
    }, TMP_8.$$arity = 1);

    Opal.defn(self, '$find_sequence', TMP_12 = function $$find_sequence(keys) {
      var $a, $b, TMP_9, $c, $d, TMP_10, $e, $f, TMP_11, self = this, sequence = nil;

      keys = keys.$sort();
      sequence = ($a = ($b = ($c = ($d = ($e = ($f = ($range(1, 6, true))).$map, $e.$$p = (TMP_11 = function(start_key){var self = TMP_11.$$s || this;
if (start_key == null) start_key = nil;
      return self.$find_sequence_from_start_key(keys, start_key)}, TMP_11.$$s = self, TMP_11.$$arity = 1, TMP_11), $e).call($f)).$find_all, $c.$$p = (TMP_10 = function(x){var self = TMP_10.$$s || this;
if (x == null) x = nil;
      return $rb_gt(x.$size(), 1)}, TMP_10.$$s = self, TMP_10.$$arity = 1, TMP_10), $c).call($d)).$sort, $a.$$p = (TMP_9 = function(a, b){var self = TMP_9.$$s || this;
if (a == null) a = nil;if (b == null) b = nil;
      return a.$size()['$<=>'](b.$size())}, TMP_9.$$s = self, TMP_9.$$arity = 2, TMP_9), $a).call($b).$last();
      return sequence;
    }, TMP_12.$$arity = 1);

    Opal.defn(self, '$find_sequence_from_start_key', TMP_13 = function $$find_sequence_from_start_key(keys, start_key) {
      var $a, $b, self = this, chained_keys = nil, key = nil;

      chained_keys = [];
      key = start_key;
      while ((($b = keys['$include?'](key)) !== nil && $b != null && (!$b.$$is_boolean || $b == true))) {
      chained_keys['$<<'](key);
      key = $rb_plus(key, 1);};
      if ((($a = ($b = $rb_gt(chained_keys.$size(), 0), $b !== false && $b !== nil && $b != null ?chained_keys['$[]'](0)['$=='](1) : $b)) !== nil && $a != null && (!$a.$$is_boolean || $a == true))) {
        key = 6;
        while ((($b = keys['$include?'](key)) !== nil && $b != null && (!$b.$$is_boolean || $b == true))) {
        chained_keys.$unshift(key);
        key = $rb_minus(key, 1);};};
      return chained_keys;
    }, TMP_13.$$arity = 2);

    Opal.defn(self, '$is_fumble?', TMP_15 = function(keys, chained_sequence) {try {

      var $a, $b, $c, TMP_14, self = this, k = nil;

      ($b = ($c = chained_sequence).$each, $b.$$p = (TMP_14 = function($a){var self = TMP_14.$$s || this, $d;
if ($a == null) $a = nil;
      k = $a;
        if ((($d = $rb_ge(keys.$count(k), 2)) !== nil && $d != null && (!$d.$$is_boolean || $d == true))) {
          Opal.ret(true)
          } else {
          return nil
        };}, TMP_14.$$s = self, TMP_14.$$arity = 1, TMP_14), $b).call($c);
      return false;
      } catch ($returner) { if ($returner === Opal.returner) { return $returner.$v } throw $returner; }
    }, TMP_15.$$arity = 2);

    Opal.defn(self, '$roll_fumble_chart', TMP_16 = function $$roll_fumble_chart() {
      var $a, $b, self = this, key = nil, text = nil;

      $b = self.$roll(1, 6), $a = Opal.to_ary($b), key = ($a[0] == null ? nil : $a[0]), $b;
      text = ["何かの問題で言い争い、主君に無礼を働いてしまう。あなたは主君の名誉点を１点失うか、【時間】を１点消費して和解の話し合いを持つか選べる。", "見過ごせば人々を不幸にする危険に遭遇する。あなたは逃げ出して冒険の名誉点を１点失うか、これに立ち向かい【命数】を２点減らすかを選べる。", "あなたが惹かれたのは好意に付け込む人だった。あなたはその場を去って恋慕の名誉点を１点失うか【正義】を１点減らして礼を尽くすかを選べる。", "金銭的な問題で、生命と魂の苦しみを背負う人に出会う。あなたは庇護の名誉点を１点失うか出費を３点増やすかを選べる。", "襲撃を受ける。苦もなく叩き伏せると、卑屈な態度で命乞いをしてきた。容赦なく命を奪い寛容の名誉点を１点失うか、密告によって【血路】が１Ｄ６点増えるかを選ぶことができる。", "風聞により、友が悪に身を貶めたと知る。共に並んだ戦場が色褪せる想いだ。戦友の名誉点を１点減らすか、【酒と歌】すべてを失うかを選べる。"]['$[]']($rb_minus(key, 1));
      return "1D6 => [" + (key) + "] " + (text);
    }, TMP_16.$$arity = 0);

    Opal.defn(self, '$roll_wind_power_chart', TMP_17 = function $$roll_wind_power_chart() {
      var $a, $b, $c, self = this, key = nil, total_bonus = nil, text = nil, dice = nil, add = nil, bonus = nil, current_text = nil;

      key = 0;
      total_bonus = 0;
      text = "";
      while ((($b = true) !== nil && $b != null && (!$b.$$is_boolean || $b == true))) {
      $c = self.$roll(1, 6), $b = Opal.to_ary($c), dice = ($b[0] == null ? nil : $b[0]), $c;
      key = $rb_plus(key, dice);
      $c = [[true, 0, "ほぼ凪（振り足し）"], [true, 0, "弱い風（振り足し）"], [false, 0, "ゆるやかな風"], [false, 0, "ゆるやかな風"], [false, 1, "やや強い風（儀式点プラス１）"], [false, 2, "強い風（龍を幻視、儀式点プラス２）"], [false, 3, "体が揺らぐほどの風（龍を幻視、儀式点プラス３）"]]['$[]']($rb_minus([key, 7].$min(), 1)), $b = Opal.to_ary($c), add = ($b[0] == null ? nil : $b[0]), bonus = ($b[1] == null ? nil : $b[1]), current_text = ($b[2] == null ? nil : $b[2]), $c;
      total_bonus = $rb_plus(total_bonus, bonus);
      if ((($b = key['$!='](dice)) !== nil && $b != null && (!$b.$$is_boolean || $b == true))) {
        current_text = "1D6[" + (dice) + "]+" + ($rb_minus(key, dice)) + " " + (current_text)
        } else {
        current_text = "1D6[" + (dice) + "] " + (current_text)
      };
      if ((($b = text['$empty?']()) !== nil && $b != null && (!$b.$$is_boolean || $b == true))) {
        text = current_text
        } else {
        text = "" + (text) + " => " + (current_text)
      };
      if (add !== false && add !== nil && add != null) {
        } else {
        text = $rb_plus(text, " [合計：儀式点 +" + (total_bonus) + " ]");
        return text;
      };};
    }, TMP_17.$$arity = 0);

    Opal.defn(self, '$roll_emotion_chart', TMP_18 = function $$roll_emotion_chart() {
      var $a, $b, self = this, key = nil, text = nil;

      $b = self.$roll(1, 6), $a = Opal.to_ary($b), key = ($a[0] == null ? nil : $a[0]), $b;
      text = ["愛情／殺意", "友情／負目", "崇拝／嫌悪", "興味／侮蔑", "信頼／嫉妬", "守護／欲情"]['$[]']($rb_minus(key, 1));
      return "1D6 => [" + (key) + "] " + (text);
    }, TMP_18.$$arity = 0);

    Opal.defn(self, '$roll_hope', TMP_19 = function $$roll_hope(number_of_dice) {
      var $a, $b, $c, self = this, total = nil, text = nil, d1 = nil, d2 = nil;

      total = 0;
      text = "";
      while ((($b = true) !== nil && $b != null && (!$b.$$is_boolean || $b == true))) {
      $c = self.$roll(1, 6), $b = Opal.to_ary($c), d1 = ($b[0] == null ? nil : $b[0]), $c;
      d2 = 0;
      if ((($b = $rb_ge(number_of_dice, 2)) !== nil && $b != null && (!$b.$$is_boolean || $b == true))) {
        $c = self.$roll(1, 6), $b = Opal.to_ary($c), d2 = ($b[0] == null ? nil : $b[0]), $c};
      total = $rb_plus(total, $rb_plus(d1, d2));
      if (number_of_dice['$=='](2)) {
        text = $rb_plus(text, "2D6[" + (d1) + "," + (d2) + "]")
        } else {
        text = $rb_plus(text, "1D6[" + (d1) + "]")
      };
      if ((($b = ((($c = self.$is_1or2(d1)) !== false && $c !== nil && $c != null) ? $c : self.$is_1or2(d2))) !== nil && $b != null && (!$b.$$is_boolean || $b == true))) {
        text = $rb_plus(text, " （振り足し） => ")
        } else {
        text = $rb_plus(text, " => 合計 " + (total));
        return text;
      };};
    }, TMP_19.$$arity = 1);

    return (Opal.defn(self, '$is_1or2', TMP_20 = function $$is_1or2(n) {
      var $a, self = this;

      return ((($a = n['$=='](1)) !== false && $a !== nil && $a != null) ? $a : n['$=='](2));
    }, TMP_20.$$arity = 1), nil) && 'is_1or2';
  })($scope.base, $scope.get('DiceBot'))
})(Opal);

/* Generated by Opal 0.10.5 */
(function(Opal) {
  var self = Opal.top, $scope = Opal, nil = Opal.nil, $breaker = Opal.breaker, $slice = Opal.slice;

  Opal.add_stubs(['$exit']);
  return $scope.get('Kernel').$exit()
})(Opal);
