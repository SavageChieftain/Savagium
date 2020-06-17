/* Generated by Opal 1.0.3 */
(function(Opal) {
  function $rb_times(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs * rhs : lhs['$*'](rhs);
  }
  function $rb_plus(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs + rhs : lhs['$+'](rhs);
  }
  function $rb_gt(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs > rhs : lhs['$>'](rhs);
  }
  var self = Opal.top, $nesting = [], nil = Opal.nil, $$$ = Opal.const_get_qualified, $$ = Opal.const_get_relative, $breaker = Opal.breaker, $slice = Opal.slice, $klass = Opal.klass, $send = Opal.send, $truthy = Opal.truthy, $range = Opal.range;

  Opal.add_stubs(['$setPrefixes', '$===', '$to_i', '$last_match', '$checkRoll', '$getLifeAndDeathUnknownResult', '$debug', '$!=', '$roll', '$sort', '$collect', '$split', '$concat', '$*', '$size', '$select', '$==', '$+', '$join', '$>', '$each', '$get_table_by_d66']);
  return (function($base, $super, $parent_nesting) {
    var self = $klass($base, $super, 'EndBreaker');

    var $nesting = [self].concat($parent_nesting), $EndBreaker_initialize$1, $EndBreaker_rollDiceCommand$2, $EndBreaker_checkRoll$3, $EndBreaker_getLifeAndDeathUnknownResult$8;

    
    Opal.const_set($nesting[0], 'ID', "EndBreaker");
    Opal.const_set($nesting[0], 'NAME', "\u30A8\u30F3\u30C9\u30D6\u30EC\u30A4\u30AB\u30FC");
    Opal.const_set($nesting[0], 'SORT_KEY', "\u3048\u3093\u3068\u3075\u308C\u3044\u304B\u3042");
    Opal.const_set($nesting[0], 'HELP_MESSAGE', "" + "\u30FB\u5224\u5B9A (nEB)\n" + "  n\u500B\u306ED6\u3092\u632F\u308B\u5224\u5B9A\u3002\u30C0\u30D6\u30EB\u30C8\u30EA\u30AC\u30FC\u767A\u52D5\u3067\u81EA\u52D5\u632F\u308A\u8DB3\u3057\u3002\n" + "\u30FB\u5404\u7A2E\u8868\n" + "  \u30FB\u751F\u6B7B\u4E0D\u660E\u8868 (LDUT)\n");
    self.$setPrefixes(["\\d+EB", "LDUT"]);
    
    Opal.def(self, '$initialize', $EndBreaker_initialize$1 = function $$initialize() {
      var $iter = $EndBreaker_initialize$1.$$p, $yield = $iter || nil, self = this, $zuper = nil, $zuper_i = nil, $zuper_ii = nil;

      if ($iter) $EndBreaker_initialize$1.$$p = null;
      // Prepare super implicit arguments
      for($zuper_i = 0, $zuper_ii = arguments.length, $zuper = new Array($zuper_ii); $zuper_i < $zuper_ii; $zuper_i++) {
        $zuper[$zuper_i] = arguments[$zuper_i];
      }
      
      $send(self, Opal.find_super_dispatcher(self, 'initialize', $EndBreaker_initialize$1, false), $zuper, $iter);
      self.sendMode = 2;
      return (self.d66Type = 1);
    }, $EndBreaker_initialize$1.$$arity = 0);
    
    Opal.def(self, '$rollDiceCommand', $EndBreaker_rollDiceCommand$2 = function $$rollDiceCommand(command) {
      var $a, $b, self = this, diceCount = nil, tableName = nil, text = nil, number = nil, $case = nil, result = nil;

      
      if ($truthy(/(\d+)EB/i['$==='](command))) {
        
        diceCount = $$($nesting, 'Regexp').$last_match(1).$to_i();
        return self.$checkRoll(diceCount);};
      tableName = "";
      text = "";
      number = 0;
      $case = command;
      if ("LDUT"['$===']($case)) {
      tableName = "\u751F\u6B7B\u4E0D\u660E\u8868";
      $b = self.$getLifeAndDeathUnknownResult(), $a = Opal.to_ary($b), (text = ($a[0] == null ? nil : $a[0])), (number = ($a[1] == null ? nil : $a[1])), $b;}
      else {return nil};
      result = "" + (tableName) + "(" + (number) + "):" + (text);
      return result;
    }, $EndBreaker_rollDiceCommand$2.$$arity = 1);
    
    Opal.def(self, '$checkRoll', $EndBreaker_checkRoll$3 = function $$checkRoll(diceCount) {
      var $a, $b, $c, $$4, $$5, $$6, self = this, rollCount = nil, result = nil, diceFullList = nil, _ = nil, dice_str = nil, diceList = nil;

      
      self.$debug("EndBreaker diceCount", diceCount);
      rollCount = diceCount;
      result = "";
      diceFullList = [];
      while ($truthy(rollCount['$!='](0))) {
        
        $c = self.$roll(rollCount, 6), $b = Opal.to_ary($c), (_ = ($b[0] == null ? nil : $b[0])), (dice_str = ($b[1] == null ? nil : $b[1])), $c;
        diceList = $send(dice_str.$split(/,/), 'collect', [], ($$4 = function(i){var self = $$4.$$s || this;

        
          
          if (i == null) {
            i = nil;
          };
          return i.$to_i();}, $$4.$$s = self, $$4.$$arity = 1, $$4)).$sort();
        diceFullList.$concat(diceList);
        rollCount = $rb_times($send(diceList, 'select', [], ($$5 = function(i){var self = $$5.$$s || this;

        
          
          if (i == null) {
            i = nil;
          };
          return i['$=='](1);}, $$5.$$s = self, $$5.$$arity = 1, $$5)).$size(), 2);
        result = $rb_plus(result, "" + "[" + (diceList.$join()) + "]");
        if ($truthy($rb_gt(rollCount, 0))) {
          result = $rb_plus(result, " \u30C0\u30D6\u30EB\u30C8\u30EA\u30AC\u30FC! ")};
      };
      result = $rb_plus(result, " \uFF1E");
      $send($range(2, 6, false), 'each', [], ($$6 = function(num){var self = $$6.$$s || this, $$7, count = nil;

      
        
        if (num == null) {
          num = nil;
        };
        count = $send(diceFullList, 'select', [], ($$7 = function(i){var self = $$7.$$s || this;

        
          
          if (i == null) {
            i = nil;
          };
          return i['$=='](num);}, $$7.$$s = self, $$7.$$arity = 1, $$7)).$size();
        if (count['$=='](0)) {
          return nil
        } else {
          return (result = $rb_plus(result, "" + " [" + (num) + ":" + (count) + "\u500B]"))
        };}, $$6.$$s = self, $$6.$$arity = 1, $$6));
      return result;
    }, $EndBreaker_checkRoll$3.$$arity = 1);
    return (Opal.def(self, '$getLifeAndDeathUnknownResult', $EndBreaker_getLifeAndDeathUnknownResult$8 = function $$getLifeAndDeathUnknownResult() {
      var self = this, table = nil;

      
      table = [" 1\u65E5\uFF1A\u751F\u9084\uFF01", " 1\u65E5\uFF1A\u751F\u9084\uFF01", " 1\u65E5\uFF1A\u751F\u9084\uFF01", " 1\u65E5\uFF1A\u751F\u9084\uFF01", " 1\u65E5\uFF1A\u751F\u9084\uFF01", " 1\u65E5\uFF1A\u751F\u9084\uFF01", " 1\u65E5\uFF1A\u751F\u9084\uFF01", " 5\u65E5\uFF1A\u6575\u306B\u6355\u3089\u308F\u308C\u3001\u3072\u3069\u3044\u66B4\u884C\u3068\u62F7\u554F\u3092\u53D7\u3051\u305F\u3002", " 2\u65E5\uFF1A\u8B0E\u306E\u4EBA\u7269\u306B\u547D\u3092\u6551\u308F\u308C\u305F\u3002", "10\u65E5\uFF1A\u5974\u96B7\u3068\u3057\u3066\u58F2\u308A\u98DB\u3070\u3055\u308C\u305F\u3002", " 8\u65E5\uFF1A\u304A\u305E\u307E\u3057\u3044\u5100\u5F0F\u306E\u751F\u8D04\u3068\u3057\u3066\u9023\u308C\u53BB\u3089\u308C\u305F\u3002", " 9\u65E5\uFF1A\u5E7D\u9589\u30FB\u6295\u7344\u3055\u308C\u305F\u3002", " 1\u65E5\uFF1A\u751F\u9084\uFF01", " 7\u65E5\uFF1A\u30E2\u30F3\u30B9\u30BF\u30FC\u8822\u304F\u5730\u4E0B\u8FF7\u5BAE\u306B\u6ED1\u843D\u3057\u305F\u3002", "12\u65E5\u5F37\u529B\u306A\u30DE\u30B9\u30AB\u30EC\u30A4\u30C9\u306B\u3068\u3089\u308F\u308C\u3001\u5B9F\u9A13\u53F0\u306B\u3055\u308C\u305F\u3002", " 8\u65E5\uFF1A\u653E\u6D6A\u4E2D\u306B\u906D\u9047\u3057\u305F\u4E8B\u4EF6\u3092\u3001\u98AF\u723D\u3068\u89E3\u6C7A\u3057\u3066\u3044\u305F\u3002", " 5\u65E5\uFF1A\u98E2\u9913\u72B6\u614B\u306B\u8FFD\u3044\u8FBC\u307E\u308C\u305F\u3002", "15\u65E5\uFF1A\u8A18\u61B6\u3092\u5931\u3044\u653E\u6D6A\u3057\u305F\u3002", " 1\u65E5\uFF1A\u751F\u9084\uFF01", "10\u65E5\uFF1A\u7570\u6027\u306B\u547D\u3092\u6551\u308F\u308C\u3066\u3001\u624B\u539A\u3044\u770B\u75C5\u3092\u53D7\u3051\u305F\u3002", " 3\u65E5\uFF1A\u8CA0\u50B7\u304B\u3089\u304F\u308B\u71B1\u75C5\u3067\u3001\u751F\u6B7B\u306E\u5883\u3092\u5F77\u5FA8\u3063\u305F\u3002", "11\u65E5\uFF1A\u95D8\u5974\u306B\u3055\u308C\u305F\u304C\u3001\u6226\u3044\u3068\u53CB\u60C5\u306E\u672B\u306B\u81EA\u7531\u3092\u7372\u5F97\u3057\u305F\u3002", " 6\u65E5\uFF1A\u8CA0\u50B7\u3057\u305F\u307E\u307E\u5DDD\u306B\u843D\u3061\u3001\u9065\u304B\u4E0B\u6D41\u307E\u3067\u6D41\u3055\u308C\u305F\u3002", " 9\u65E5\uFF1A\u6575\u306B\u9023\u308C\u53BB\u3089\u308C\u3001\u57F7\u62D7\u306A\u62F7\u554F\u3092\u53D7\u3051\u7D9A\u3051\u305F\u3002", " 1\u65E5\uFF1A\u751F\u9084\uFF01", " 4\u65E5\uFF1A\u7E70\u308A\u8FD4\u3059\u300C\u6B7B\u306E\u60AA\u5922\u300D\u306B\u82DB\u307E\u308C\u305F\u3002", " 3\u65E5\uFF1A\u5DE8\u7363\u306E\u5DE3\u306B\u9023\u308C\u53BB\u3089\u308C\u305F\u3002", "10\u65E5\uFF1A\u8B0E\u306E\u96C6\u56E3\u306B\u6551\u308F\u308C\u3066\u3001\u624B\u539A\u3044\u770B\u75C5\u3092\u53D7\u3051\u305F\u3002", " 3\u65E5\uFF1A\u30C1\u30C3\u30BF\u30CB\u30A2\u30F3\u306E\u96C6\u843D\u306B\u8FF7\u3044\u8FBC\u307F\u3001\u3082\u3066\u306A\u3057\u3092\u53D7\u3051\u305F\u3002", " 7\u65E5\uFF1A\u30D4\u30E5\u30A2\u30EA\u30A3\u306E\u7FA4\u308C\u306B\u3068\u3089\u308F\u308C\u3001\u5F04\u3070\u308C\u305F\u3002", " 1\u65E5\uFF1A\u751F\u9084\uFF01", " 6\u65E5\uFF1A\u697D\u5712\u306E\u3088\u3046\u306A\u5834\u6240\u3092\u767A\u898B\u3057\u3001\u3057\u3070\u3089\u304F\u9017\u7559\u3057\u305F\u3002", " 9\u65E5\uFF1A\u76D7\u8CCA\u56E3\u306B\u6551\u308F\u308C\u3001\u6069\u8FD4\u3057\u3068\u3057\u3066\u5C11\u3057\u7528\u5FC3\u68D2\u3092\u3057\u305F\u3002", "10\u65E5\uFF1A\u71B1\u75C5\u306E\u898B\u305B\u308B\u5B98\u80FD\u7684\u306A\u5E7B\u5F71\u306B\u3068\u3089\u308F\u308C\u3001\u5F77\u5FA8\u3063\u305F\u3002", " 5\u65E5\uFF1A\u8B0E\u306E\u8CDE\u91D1\u9996\u306B\u72D9\u308F\u308C\u3001\u50B7\u3081\u3064\u3051\u3089\u308C\u3066\u3044\u305F\u3002", " - \uFF1A\u300C\u4E94\u5206\u4E94\u5206\u300D\u306E\u4E00\u822C\u5224\u5B9A\u3002\u5931\u6557\u3059\u308B\u3068\u6B7B\u4EA1\u3002"];
      return self.$get_table_by_d66(table);
    }, $EndBreaker_getLifeAndDeathUnknownResult$8.$$arity = 0), nil) && 'getLifeAndDeathUnknownResult';
  })($nesting[0], $$($nesting, 'DiceBot'), $nesting)
})(Opal);
