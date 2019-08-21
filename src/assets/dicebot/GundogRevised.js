/* Generated by Opal 0.11.4 */
(function(Opal) {
  function $rb_ge(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs >= rhs : lhs['$>='](rhs);
  }
  function $rb_le(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs <= rhs : lhs['$<='](rhs);
  }
  function $rb_divide(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs / rhs : lhs['$/'](rhs);
  }
  function $rb_minus(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs - rhs : lhs['$-'](rhs);
  }
  function $rb_times(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs * rhs : lhs['$*'](rhs);
  }
  function $rb_plus(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs + rhs : lhs['$+'](rhs);
  }
  var self = Opal.top, $nesting = [], nil = Opal.nil, $breaker = Opal.breaker, $slice = Opal.slice, $klass = Opal.klass, $truthy = Opal.truthy;

  Opal.add_stubs(['$==', '$>=', '$<=', '$to_i', '$/', '$-', '$*', '$+']);
  return (function($base, $super, $parent_nesting) {
    function $Gundog(){};
    var self = $Gundog = $klass($base, $super, 'Gundog', $Gundog);

    var def = self.$$proto, $nesting = [self].concat($parent_nesting), TMP_Gundog_gameName_1, TMP_Gundog_gameType_2, TMP_Gundog_getHelpMessage_3, TMP_Gundog_check_1D100_4, TMP_Gundog_isD9_5;

    
    
    Opal.defn(self, '$gameName', TMP_Gundog_gameName_1 = function $$gameName() {
      var self = this;

      return "ガンドッグ"
    }, TMP_Gundog_gameName_1.$$arity = 0);
    
    Opal.defn(self, '$gameType', TMP_Gundog_gameType_2 = function $$gameType() {
      var self = this;

      return "Gundog"
    }, TMP_Gundog_gameType_2.$$arity = 0);
    
    Opal.defn(self, '$getHelpMessage', TMP_Gundog_getHelpMessage_3 = function $$getHelpMessage() {
      var self = this;

      return "" + "失敗、成功、クリティカル、ファンブルとロールの達成値の自動判定を行います。\n" + "nD9ロールも対応。\n"
    }, TMP_Gundog_getHelpMessage_3.$$arity = 0);
    
    Opal.defn(self, '$check_1D100', TMP_Gundog_check_1D100_4 = function $$check_1D100(total_n, dice_n, signOfInequality, diff, dice_cnt, dice_max, n1, n_max) {
      var self = this, dig10 = nil, dig1 = nil;

      
      if (signOfInequality['$==']("<=")) {
        } else {
        return ""
      };
      if ($truthy($rb_ge(total_n, 100))) {
        return " ＞ ファンブル"};
      if ($truthy($rb_le(total_n, 1))) {
        return " ＞ 絶対成功(達成値1+SL)"};
      if ($truthy($rb_le(total_n, diff))) {
        
        dig10 = $rb_divide(total_n, 10).$to_i();
        dig1 = $rb_minus(total_n, $rb_times(dig10, 10));
        if ($truthy($rb_ge(dig10, 10))) {
          dig10 = 0};
        if ($truthy($rb_ge(dig1, 10))) {
          dig1 = 0};
        if ($truthy($rb_le(dig1, 0))) {
          return " ＞ クリティカル(達成値20+SL)"};
        return "" + " ＞ 成功(達成値" + ($rb_plus(dig10, dig1)) + "+SL)";};
      return " ＞ 失敗";
    }, TMP_Gundog_check_1D100_4.$$arity = 8);
    return (Opal.defn(self, '$isD9', TMP_Gundog_isD9_5 = function $$isD9() {
      var self = this;

      return true
    }, TMP_Gundog_isD9_5.$$arity = 0), nil) && 'isD9';
  })($nesting[0], Opal.const_get_relative($nesting, 'DiceBot'), $nesting)
})(Opal);

/* Generated by Opal 0.11.4 */
(function(Opal) {
  var self = Opal.top, $nesting = [], nil = Opal.nil, $breaker = Opal.breaker, $slice = Opal.slice;

  Opal.add_stubs(['$exit']);
  return Opal.const_get_relative($nesting, 'Kernel').$exit()
})(Opal);
Opal.loaded(["diceBot/Gundog"]);
/* Generated by Opal 0.11.4 */
(function(Opal) {
  function $rb_ge(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs >= rhs : lhs['$>='](rhs);
  }
  function $rb_le(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs <= rhs : lhs['$<='](rhs);
  }
  function $rb_divide(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs / rhs : lhs['$/'](rhs);
  }
  function $rb_minus(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs - rhs : lhs['$-'](rhs);
  }
  function $rb_times(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs * rhs : lhs['$*'](rhs);
  }
  function $rb_plus(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs + rhs : lhs['$+'](rhs);
  }
  function $rb_lt(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs < rhs : lhs['$<'](rhs);
  }
  function $rb_gt(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs > rhs : lhs['$>'](rhs);
  }
  var self = Opal.top, $nesting = [], nil = Opal.nil, $breaker = Opal.breaker, $slice = Opal.slice, $klass = Opal.klass, $truthy = Opal.truthy, $gvars = Opal.gvars, $send = Opal.send;

  Opal.add_stubs(['$require', '$setPrefixes', '$==', '$>=', '$<=', '$to_i', '$/', '$-', '$*', '$+', '$upcase', '$=~', '$parren_killer', '$getDamageTypeAndTable', '$getFumbleTypeAndTable', '$empty?', '$roll', '$collect', '$split', '$each', '$<', '$>', '$[]', '$===']);
  
  self.$require("diceBot/Gundog");
  return (function($base, $super, $parent_nesting) {
    function $GundogRevised(){};
    var self = $GundogRevised = $klass($base, $super, 'GundogRevised', $GundogRevised);

    var def = self.$$proto, $nesting = [self].concat($parent_nesting), TMP_GundogRevised_gameName_1, TMP_GundogRevised_gameType_2, TMP_GundogRevised_getHelpMessage_3, TMP_GundogRevised_check_1D100_4, TMP_GundogRevised_isD9_5, TMP_GundogRevised_rollDiceCommand_8, TMP_GundogRevised_getDamageTypeAndTable_9, TMP_GundogRevised_getFumbleTypeAndTable_10;

    
    self.$setPrefixes(["(.DPT|.FT)(\\+|\\-)?\\d*"]);
    
    Opal.defn(self, '$gameName', TMP_GundogRevised_gameName_1 = function $$gameName() {
      var self = this;

      return "ガンドッグ・リヴァイズド"
    }, TMP_GundogRevised_gameName_1.$$arity = 0);
    
    Opal.defn(self, '$gameType', TMP_GundogRevised_gameType_2 = function $$gameType() {
      var self = this;

      return "GundogRevised"
    }, TMP_GundogRevised_gameType_2.$$arity = 0);
    
    Opal.defn(self, '$getHelpMessage', TMP_GundogRevised_getHelpMessage_3 = function $$getHelpMessage() {
      var self = this;

      return "" + "失敗、成功、クリティカル、ファンブルとロールの達成値の自動判定を行います。\n" + "nD9ロールも対応。\n" + "・ダメージペナルティ表　　(～DPTx) (x:修正)\n" + "　射撃(SDPT)、格闘(MDPT)、車両(VDPT)、汎用(GDPT)の各表を引くことが出来ます。\n" + "　修正を後ろに書くことも出来ます。\n" + "・ファンブル表　　　　　　(～FTx)  (x:修正)\n" + "　射撃(SFT)、格闘(MFT)、投擲(TFT)の各表を引くことが出来ます。\n" + "　修正を後ろに書くことも出来ます。\n"
    }, TMP_GundogRevised_getHelpMessage_3.$$arity = 0);
    
    Opal.defn(self, '$check_1D100', TMP_GundogRevised_check_1D100_4 = function $$check_1D100(total_n, dice_n, signOfInequality, diff, dice_cnt, dice_max, n1, n_max) {
      var self = this, dig10 = nil, dig1 = nil;

      
      if (signOfInequality['$==']("<=")) {
        } else {
        return ""
      };
      if ($truthy($rb_ge(total_n, 100))) {
        return " ＞ ファンブル"};
      if ($truthy($rb_le(total_n, 1))) {
        return " ＞ ベアリー(達成値1+SL)"};
      if ($truthy($rb_le(total_n, diff))) {
        
        dig10 = $rb_divide(total_n, 10).$to_i();
        dig1 = $rb_minus(total_n, $rb_times(dig10, 10));
        if ($truthy($rb_ge(dig10, 10))) {
          dig10 = 0};
        if ($truthy($rb_ge(dig1, 10))) {
          dig1 = 0};
        if ($truthy($rb_le(dig1, 0))) {
          return " ＞ クリティカル(達成値20+SL)"};
        return "" + " ＞ 成功(達成値" + ($rb_plus(dig10, dig1)) + "+SL)";};
      return " ＞ 失敗";
    }, TMP_GundogRevised_check_1D100_4.$$arity = 8);
    
    Opal.defn(self, '$isD9', TMP_GundogRevised_isD9_5 = function $$isD9() {
      var self = this;

      return true
    }, TMP_GundogRevised_isD9_5.$$arity = 0);
    
    Opal.defn(self, '$rollDiceCommand', TMP_GundogRevised_rollDiceCommand_8 = function $$rollDiceCommand(command) {
      var $a, $b, TMP_6, TMP_7, self = this, string = nil, table = nil, ttype = nil, type = nil, dice = nil, mod = nil, head = nil, diceText = nil, diceArray = nil, diceOriginalText = nil, output = nil;

      
      string = command.$upcase();
      table = [];
      ttype = "";
      type = "";
      dice = 0;
      mod = 0;
      if ($truthy(/(\w)DPT([\+\-\d]*)/i['$=~'](string))) {
        
        ttype = "ダメージペナルティー";
        head = (($a = $gvars['~']) === nil ? nil : $a['$[]'](1));
        if ($truthy((($a = $gvars['~']) === nil ? nil : $a['$[]'](2)))) {
          mod = self.$parren_killer("" + "(0" + ((($a = $gvars['~']) === nil ? nil : $a['$[]'](2))) + ")").$to_i()};
        $b = self.$getDamageTypeAndTable(head), $a = Opal.to_ary($b), (type = ($a[0] == null ? nil : $a[0])), (table = ($a[1] == null ? nil : $a[1])), $b;};
      if ($truthy(/(\w)FT([\+\-\d]*)/i['$=~'](string))) {
        
        ttype = "ファンブル";
        head = (($a = $gvars['~']) === nil ? nil : $a['$[]'](1));
        if ($truthy((($a = $gvars['~']) === nil ? nil : $a['$[]'](2)))) {
          mod = self.$parren_killer("" + "(0" + ((($a = $gvars['~']) === nil ? nil : $a['$[]'](2))) + ")").$to_i()};
        $b = self.$getFumbleTypeAndTable(head), $a = Opal.to_ary($b), (type = ($a[0] == null ? nil : $a[0])), (table = ($a[1] == null ? nil : $a[1])), $b;};
      if ($truthy(type['$empty?']())) {
        return "1"};
      $b = self.$roll(2, 10), $a = Opal.to_ary($b), (dice = ($a[0] == null ? nil : $a[0])), (diceText = ($a[1] == null ? nil : $a[1])), $b;
      dice = mod;
      diceArray = $send(diceText.$split(/,/), 'collect', [], (TMP_6 = function(i){var self = TMP_6.$$s || this;
if (i == null) i = nil;
      return i.$to_i()}, TMP_6.$$s = self, TMP_6.$$arity = 1, TMP_6));
      $send(diceArray, 'each', [], (TMP_7 = function(i){var self = TMP_7.$$s || this;
if (i == null) i = nil;
      if ($truthy($rb_lt(i, 10))) {
          return (dice = $rb_plus(dice, i))
          } else {
          return nil
        }}, TMP_7.$$s = self, TMP_7.$$arity = 1, TMP_7));
      diceOriginalText = dice;
      if ($truthy($rb_lt(dice, 0))) {
        dice = 0};
      if ($truthy($rb_gt(dice, 18))) {
        dice = 18};
      output = "" + (type) + (ttype) + "表[" + (diceOriginalText) + "] ＞ " + (table['$[]'](dice));
      return output;
    }, TMP_GundogRevised_rollDiceCommand_8.$$arity = 1);
    
    Opal.defn(self, '$getDamageTypeAndTable', TMP_GundogRevised_getDamageTypeAndTable_9 = function $$getDamageTypeAndTable(head) {
      var $a, $b, self = this, $case = nil, type = nil, table = nil;

      
      $case = head;
      if ("S"['$===']($case)) {
      type = "射撃";
      table = ["対象は[死亡]", "[追加D]4D6/[出血]2D6/[重傷]-40％/[朦朧判定]15", "[追加D]3D6/[出血]2D6/[重傷]-30％/[朦朧判定]14", "[追加D]3D6/[出血]2D6/[重傷]-30％/[朦朧判定]13", "[追加D]3D6/[出血]1D6/[重傷]-20％/[朦朧判定]12", "[追加D]2D6/[出血]1D6/[重傷]-20％/[朦朧判定]11", "[追加D]2D6/[軽傷]-20％/[朦朧判定]11", "[追加D]2D6/[軽傷]-20％/[朦朧判定]10", "[追加D]2D6/[軽傷]-20％/[朦朧判定]8", "[追加D]2D6/[軽傷]-20％/[朦朧判定]6", "[追加D]2D6/[軽傷]-10％/[朦朧判定]4", "[追加D]2D6/[軽傷]-20％", "[追加D]1D6/[軽傷]-20％", "[追加D]1D6/[軽傷]-10％", "[ショック]-20％", "[ショック]-10％", "[不安定]", "手に持った武器を落とす。複数ある場合はランダム", "ペナルティー無し"];}
      else if ("M"['$===']($case)) {
      type = "格闘";
      table = ["対象は[死亡]", "[追加D]4D6/[出血]2D6/[重傷]-40％/[朦朧判定]15", "[追加D]3D6/[出血]2D6/[重傷]-30％/[朦朧判定]14", "[追加D]3D6/[出血]1D6/[重傷]-20％/[朦朧判定]14/[不安定]", "[追加D]2D6/[出血]1D6/[重傷]-20％/[朦朧判定]14", "[追加D]2D6/[重傷]-20％/[朦朧判定]12/[不安定]", "[追加D]2D6/[軽傷]-20％/[朦朧判定]11", "[追加D]2D6/[軽傷]-20％/[朦朧判定]10", "[追加D]2D6/[軽傷]-20％/[朦朧判定]8", "[追加D]2D6/[軽傷]-20％/[朦朧判定]6", "[追加D]1D6/[軽傷]-20％/[朦朧判定]6", "[追加D]1D6/[軽傷]-10％/[朦朧判定]6", "[追加D]1D6/[軽傷]-10％/[不安定]", "[追加D]1D6/[軽傷]-10％", "[ショック]-20％", "[ショック]-10％", "[不安定]", "手に持った武器を落とす。複数ある場合はランダム", "ペナルティー無し"];}
      else if ("V"['$===']($case)) {
      type = "車両";
      table = ["[クラッシュ]する。[チェイス]から除外", "[車両D]4D6/[乗員D]3D6/[操作性]-40%/[スピン判定]", "[車両D]3D6/[乗員D]3D6/[操作性]-30%/[スピン判定]", "[乗員D]3D6/[操作性]-20%/[スピン判定]", "[乗員D]3D6/[操作性]-20%/[スピン判定]", "[乗員D]3D6/[操作性]-10%/[スピン判定]", "[乗員D]3D6/[操作性]-10%/[スピン判定]", "[乗員D]2D6/[スピード]-2/[スピン判定]", "[乗員D]2D6/[スピード]-2/[スピン判定]", "[乗員D]2D6/[操縦判定]-20%/[スピン判定]", "[乗員D]2D6/[操縦判定]-20%/[スピン判定]", "[乗員D]2D6/[操縦判定]-20%", "[乗員D]2D6/[操縦判定]-20%", "[乗員D]1D6/[操縦判定]-20%", "[乗員D]1D6/[操縦判定]-10%", "攻撃が乗員をかすめる。ランダムな乗員1人に[ショック]-20％", "攻撃が乗員に当たりかける。ランダムな乗員1人に[ショック]-10％", "車両が蛇行。乗員全員は〈運動〉判定。失敗で[不安定]", "ペナルティー無し"];}
      else if ("G"['$===']($case)) {
      type = "汎用";
      table = ["対象は[死亡]", "[追加D]4D6/[出血]2D6/[重傷]-40％/[朦朧判定]15", "[追加D]3D6/[出血]2D6/[重傷]-30％/[朦朧判定]14", "[追加D]2D6/[出血]1D6/[重傷]-30％/[朦朧判定]13/[不安定]", "[追加D]2D6/[出血]1D6/[重傷]-30％/[朦朧判定]12", "[追加D]2D6/[重傷]-20％/[朦朧判定]12/[不安定]", "[追加D]1D6/[重傷]-20％/[朦朧判定]11", "[追加D]1D6/[軽傷]-30％/[朦朧判定]10", "[追加D]1D6/[軽傷]-30％/[朦朧判定]8", "[追加D]1D6/[軽傷]-30％/[朦朧判定]6", "[追加D]1D6/[軽傷]-20％/[朦朧判定]6", "[軽傷]-20％/[朦朧判定]6", "[軽傷]-20％/[不安定]", "[軽傷]-20％", "[軽傷]-10％", "[ショック]-20％", "[ショック]-10％", "[不安定]", "ペナルティー無し"];}
      else {
      head = "S";
      $b = self.$getDamageTypeAndTable(head), $a = Opal.to_ary($b), (type = ($a[0] == null ? nil : $a[0])), (table = ($a[1] == null ? nil : $a[1])), $b;};
      return [type, table];
    }, TMP_GundogRevised_getDamageTypeAndTable_9.$$arity = 1);
    return (Opal.defn(self, '$getFumbleTypeAndTable', TMP_GundogRevised_getFumbleTypeAndTable_10 = function $$getFumbleTypeAndTable(head) {
      var $a, $b, self = this, $case = nil, type = nil, table = nil;

      
      $case = head;
      if ("S"['$===']($case)) {
      type = "射撃";
      table = ["銃器が暴発、自分に命中。[貫通D]。武装喪失", "銃器が暴発、自分に命中。[非貫通D]。武装喪失", "誤射。射線に最も近い味方に命中。[貫通D]", "誤射。射線に最も近い味方に命中。[非貫通D]", "銃器が完全に故障。直せない", "故障。30分かけて〈メカニック〉判定に成功するまで使用不可。", "故障。〈メカニック〉-20％の判定に成功するまで使用不可。", "故障。〈メカニック〉判定に成功するまで射撃不可", "作動不良。[アイテム使用]を2回行って修理するまで射撃不可", "作動不良。[アイテム使用]を行って修理するまで射撃不可", "足がもつれて倒れる。[転倒]", "無理な射撃姿勢で腕を痛める。[軽傷]-20％", "無理な射撃姿勢でどこかの筋を痛める。[軽傷]-10％", "武装を落とす。スリング（肩ひも）も切れる", "武装を落とす。スリング（肩ひも）があれば落とさない", "排莢された薬莢が服の中に。[ショック]-20％", "排莢された薬莢が顔に当たる。[ショック]-10％", "薬莢を踏んで態勢を崩す。[不安定]", "ペナルティー無し"];}
      else if ("M"['$===']($case)) {
      type = "格闘";
      table = ["自分に命中。[貫通D]", "自分に命中。[非貫通D]", "最も近い味方（射程内にいなければ自分）に[貫通D]", "最も近い味方（射程内にいなければ自分）に[非貫通D]", "頭を強く打ちつける。[朦朧]", "武装が壊れる。直せない。[格闘タイプ]なら[重傷]-20％", "武装がすっぽ抜ける。グレネードの誤差で落下先を決定", "武装が損傷。30分かけて〈手先〉判定に成功するまで使用不可。[格闘タイプ]なら[重傷]-10％", "武装がガタつく。〈手先〉判定（[格闘タイプ]なら〈強靭〉）に成功するまで使用不可。", "武装に違和感。[アイテム使用]を行って調整するまで、命中率-20％", "足がもつれる。[転倒]", "足がつる。2[ラウンド]の間、移動距離1/2", "無理な体勢で腕（あるいは脚）を痛める。[軽傷]-20％", "無理な体勢でどこかの筋を痛める。[軽傷]-10％", "武装を落とす", "武装で自分が負傷。[ショック]-20％", "武装の扱いを間違える。[ショック]-10％", "攻撃を避けられて体勢を崩す。[不安定]", "ペナルティー無し"];}
      else if ("T"['$===']($case)) {
      type = "投擲";
      table = ["勢いをつけすぎて転倒し、頭を打つ。[気絶]", "自分に命中。（手榴弾なら自分の足元に落ちる）[貫通D]", "自分に命中。（手榴弾なら自分の足元に落ちる）[非貫通D]", "暴投。射線に最も近い味方に命中。[貫通D]。手榴弾なら新たな中心点からさらに誤差が生じる", "暴投。射線に最も近い味方に命中。[非貫通D]。手榴弾なら新たな中心点からさらに誤差が生じる", "頭を強く打ちつける。[朦朧]", "肩の筋肉断裂。この腕を使う判定に、[重傷]-20％", "ヒジの筋肉断裂。この腕を使う判定に、[重傷]-10％", "肩の筋をひどく痛める。〈医療〉判定に成功するまで、この腕を使う判定に-20％", "肩の筋を痛める。[行動]を使って休めるまで、この腕を使う判定に-20％", "腰を痛める。[軽傷]-30％", "足がもつれて倒れる。[転倒]", "足がつる。2[ラウンド]の間、移動距離1/2", "無理な投擲体勢で腕（あるいは脚）を痛める。[軽傷]-20％", "無理な投擲体勢でどこかの筋を痛める。[軽傷]-10％", "肩に違和感。[ショック]-20％", "ヒジに違和感。[ショック]-10％", "つまずいて姿勢を崩す。[不安定]", "ペナルティー無し"];}
      else {
      head = "S";
      $b = self.$getFumbleTypeAndTable(head), $a = Opal.to_ary($b), (type = ($a[0] == null ? nil : $a[0])), (table = ($a[1] == null ? nil : $a[1])), $b;};
      return [type, table];
    }, TMP_GundogRevised_getFumbleTypeAndTable_10.$$arity = 1), nil) && 'getFumbleTypeAndTable';
  })($nesting[0], Opal.const_get_relative($nesting, 'DiceBot'), $nesting);
})(Opal);

/* Generated by Opal 0.11.4 */
(function(Opal) {
  var self = Opal.top, $nesting = [], nil = Opal.nil, $breaker = Opal.breaker, $slice = Opal.slice;

  Opal.add_stubs(['$exit']);
  return Opal.const_get_relative($nesting, 'Kernel').$exit()
})(Opal);
