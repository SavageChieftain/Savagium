/* Generated by Opal 1.0.3 */
(function(Opal) {
  function $rb_le(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs <= rhs : lhs['$<='](rhs);
  }
  function $rb_ge(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs >= rhs : lhs['$>='](rhs);
  }
  function $rb_plus(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs + rhs : lhs['$+'](rhs);
  }
  var self = Opal.top, $nesting = [], nil = Opal.nil, $$$ = Opal.const_get_qualified, $$ = Opal.const_get_relative, $breaker = Opal.breaker, $slice = Opal.slice, $klass = Opal.klass, $send = Opal.send, $truthy = Opal.truthy, $hash2 = Opal.hash2;

  Opal.add_stubs(['$==', '$<=', '$>=', '$upcase', '$===', '$getRandomSkillTableResult', '$getTableDiceCommandResult', '$get_table_by_1d6', '$get_table_by_2d6', '$[]', '$nil?', '$getD66Table', '$get_table_by_d66_swap', '$getD66', '$bcdice', '$get_table_by_number', '$map', '$is_a?', '$to_i', '$last_match', '$freeze', '$setPrefixes', '$+', '$keys']);
  return (function($base, $super, $parent_nesting) {
    var self = $klass($base, $super, 'DarkDaysDrive');

    var $nesting = [self].concat($parent_nesting), $DarkDaysDrive_initialize$1, $DarkDaysDrive_check_2D6$2, $DarkDaysDrive_rollDiceCommand$3, $DarkDaysDrive_getRandomSkillTableResult$4, $DarkDaysDrive_getTableDiceCommandResult$5, $DarkDaysDrive_getD66Table$6;

    
    Opal.const_set($nesting[0], 'ID', "DarkDaysDrive");
    Opal.const_set($nesting[0], 'NAME', "\u30C0\u30FC\u30AF\u30C7\u30A4\u30BA\u30C9\u30E9\u30A4\u30D6");
    Opal.const_set($nesting[0], 'SORT_KEY', "\u305F\u3042\u304F\u3066\u3044\u3059\u3068\u3089\u3044\u3075");
    Opal.const_set($nesting[0], 'HELP_MESSAGE', "" + "\u30FB\u5224\u5B9A\n" + "\u30B9\u30DA\u30B7\u30E3\u30EB\uFF0F\u30D5\u30A1\u30F3\u30D6\u30EB\uFF0F\u6210\u529F\uFF0F\u5931\u6557\u3092\u5224\u5B9A\n" + "\u30FB\u5404\u7A2E\u8868\n" + "RTT\t\u30E9\u30F3\u30C0\u30E0\u7279\u6280\u6C7A\u5B9A\u8868\n" + "ABRT \u30A2\u30D3\u30EA\u30C6\u30A3\u6C7A\u5B9A\u8868\n" + "DT \u30C0\u30E1\u30FC\u30B8\u8868\n" + "FT \u5931\u6557\u8868\n" + "GJT \u5927\u6210\u529F\u8868\n" + "ITT \u79FB\u52D5\u30C8\u30E9\u30D6\u30EB\u8868\n" + "NTT \u4EFB\u52D9\u30C8\u30E9\u30D6\u30EB\u8868\n" + "STT \u8972\u6483\u30C8\u30E9\u30D6\u30EB\u8868\n" + "HTT \u5909\u8EAB\u30C8\u30E9\u30D6\u30EB\u8868\n" + "DET \u30C9\u30E9\u30A4\u30D6\u30A4\u30D9\u30F3\u30C8\u8868\n" + "BET \u30D6\u30EC\u30A4\u30AF\u30A4\u30D9\u30F3\u30C8\u8868\n" + "CT \u30AD\u30E3\u30F3\u30D7\u8868\n" + "KZT \u95A2\u4FC2\u5C5E\u6027\u8868\n" + "IA \u30A4\u30B1\u30E1\u30F3\u30A2\u30AF\u30B7\u30E7\u30F3\u6C7A\u5B9A\u8868\n" + " IAA \u9060\u8DDD\u96E2\n" + " IAB \u79FB\u52D5\n" + " IAC \u8FD1\u8DDD\u96E2\n" + " IAD \u5584\u4EBA\n" + " IAE \u60AA\u4EBA\n" + " IAF \u5E7C\u3044\n" + " IAG \u30D0\u30AB\n" + " IAH \u6E0B\u3044\n" + " IAI \u8CE2\u3044\n" + " IAJ \u8D85\u81EA\u7136\n" + "\u30FBD66\u30C0\u30A4\u30B9\u3042\u308A\n");
    
    Opal.def(self, '$initialize', $DarkDaysDrive_initialize$1 = function $$initialize() {
      var $iter = $DarkDaysDrive_initialize$1.$$p, $yield = $iter || nil, self = this, $zuper = nil, $zuper_i = nil, $zuper_ii = nil;

      if ($iter) $DarkDaysDrive_initialize$1.$$p = null;
      // Prepare super implicit arguments
      for($zuper_i = 0, $zuper_ii = arguments.length, $zuper = new Array($zuper_ii); $zuper_i < $zuper_ii; $zuper_i++) {
        $zuper[$zuper_i] = arguments[$zuper_i];
      }
      
      $send(self, Opal.find_super_dispatcher(self, 'initialize', $DarkDaysDrive_initialize$1, false), $zuper, $iter);
      return (self.d66Type = 2);
    }, $DarkDaysDrive_initialize$1.$$arity = 0);
    
    Opal.def(self, '$check_2D6', $DarkDaysDrive_check_2D6$2 = function $$check_2D6(total, dice_total, _dice_list, cmp_op, target) {
      var self = this;

      
      if (cmp_op['$=='](">=")) {
      } else {
        return ""
      };
      if ($truthy($rb_le(dice_total, 2))) {
        return " \uFF1E \u30D5\u30A1\u30F3\u30D6\u30EB(\u5224\u5B9A\u5931\u6557\u3002\u5931\u6557\u8868(FT)\u3092\u8FFD\u52A0\u3067\uFF11\u56DE\u632F\u308B)"
      } else if ($truthy($rb_ge(dice_total, 12))) {
        return " \uFF1E \u30B9\u30DA\u30B7\u30E3\u30EB(\u5224\u5B9A\u6210\u529F\u3002\u5927\u6210\u529F\u8868(GJT)\u3092\uFF11\u56DE\u4F7F\u7528\u53EF\u80FD)"
      } else if ($truthy($rb_ge(total, target))) {
        return " \uFF1E \u6210\u529F"
      } else {
        return " \uFF1E \u5931\u6557"
      };
    }, $DarkDaysDrive_check_2D6$2.$$arity = 5);
    
    Opal.def(self, '$rollDiceCommand', $DarkDaysDrive_rollDiceCommand$3 = function $$rollDiceCommand(command) {
      var self = this, string = nil, $case = nil;

      
      string = command.$upcase();
      $case = string;
      if ("RTT"['$===']($case)) {return self.$getRandomSkillTableResult(command)};
      return self.$getTableDiceCommandResult(command);
    }, $DarkDaysDrive_rollDiceCommand$3.$$arity = 1);
    
    Opal.def(self, '$getRandomSkillTableResult', $DarkDaysDrive_getRandomSkillTableResult$4 = function $$getRandomSkillTableResult(_command) {
      var $a, $b, self = this, name = nil, skillTableFull = nil, skillTable = nil, total_n = nil, tableName = nil, skill = nil, total_n2 = nil, output = nil;

      
      name = "\u30E9\u30F3\u30C0\u30E0";
      skillTableFull = [["\u80CC\u666F", ["\u546A\u3044", "\u7D76\u671B", "\u5B64\u5150", "\u6B7B\u5225", "\u4E00\u822C\u4EBA", "\u7372\u7269", "\u61A7\u308C", "\u53CB\u4EBA", "\u6311\u6226\u8005", "\u8840\u7E01", "\u6C38\u9060"]], ["\u4ED5\u4E8B", ["\u8105\u8FEB", "\u6368\u3066\u308B", "\u62C9\u81F4", "\u76D7\u3080", "\u30CF\u30C3\u30AD\u30F3\u30B0", "\u4FB5\u5165", "\u5909\u88C5", "\u3060\u307E\u3059", "\u96A0\u3059", "\u306E\u305E\u304F", "\u805E\u304D\u51FA\u3059"]], ["\u635C\u7D22", ["\u30C8\u30A4\u30EC", "\u98DF\u4E8B", "\u81EA\u7136", "\u904B\u52D5\u65BD\u8A2D", "\u8857", "\u53CB\u611B\u4F1A", "\u6697\u90E8", "\u53F2\u8DE1", "\u6587\u5316\u65BD\u8A2D", "\u6E29\u6CC9", "\u5BBF\u6CCA"]], ["\u8DA3\u5473", ["\u304A\u9152", "\u30B0\u30EB\u30E1", "\u30C0\u30F3\u30B9", "\u30B9\u30DD\u30FC\u30C4", "\u5065\u5EB7", "\u30D5\u30A1\u30C3\u30B7\u30E7\u30F3", "\u604B\u611B", "\u30D5\u30A7\u30B9", "\u97F3\u697D", "\u7269\u8A9E", "\u5B66\u554F"]], ["\u96F0\u56F2\u6C17", ["\u3060\u3089\u3057\u306A\u3044", "\u306E\u3093\u3073\u308A", "\u6696\u304B\u3044", "\u660E\u308B\u3044", "\u7518\u3044", "\u666E\u901A", "\u6D17\u7DF4", "\u6E0B\u3044", "\u9759\u304B", "\u771F\u9762\u76EE", "\u51B7\u305F\u3044"]], ["\u6226\u95D8\u6CD5", ["\u5FCD\u8853", "\u53E4\u6B66\u8853", "\u5263\u8853", "\u68D2\u8853", "\u62F3\u6CD5", "\u30B1\u30F3\u30AB", "\u7DCF\u5408\u683C\u95D8\u6280", "\u30EC\u30B9\u30EA\u30F3\u30B0", "\u8ECD\u968A\u683C\u95D8\u8853", "\u5C04\u6483", "\u5F13\u8853"]]];
      $b = self.$get_table_by_1d6(skillTableFull), $a = Opal.to_ary($b), (skillTable = ($a[0] == null ? nil : $a[0])), (total_n = ($a[1] == null ? nil : $a[1])), $b;
      $b = skillTable, $a = Opal.to_ary($b), (tableName = ($a[0] == null ? nil : $a[0])), (skillTable = ($a[1] == null ? nil : $a[1])), $b;
      $b = self.$get_table_by_2d6(skillTable), $a = Opal.to_ary($b), (skill = ($a[0] == null ? nil : $a[0])), (total_n2 = ($a[1] == null ? nil : $a[1])), $b;
      output = "" + (name) + "\u6307\u5B9A\u7279\u6280\u8868(" + (total_n) + "," + (total_n2) + ") \uFF1E \u300E" + (tableName) + "\u300F" + (skill);
      return output;
    }, $DarkDaysDrive_getRandomSkillTableResult$4.$$arity = 1);
    
    Opal.def(self, '$getTableDiceCommandResult', $DarkDaysDrive_getTableDiceCommandResult$5 = function $$getTableDiceCommandResult(command) {
      var $a, $b, self = this, info = nil, name = nil, type = nil, table = nil, $case = nil, isSwap = nil, number = nil, result = nil, text = nil;

      
      info = $$($nesting, 'TABLES')['$[]'](command);
      if ($truthy(info['$nil?']())) {
        return nil};
      name = info['$[]']("name");
      type = info['$[]']("type");
      table = info['$[]']("table");
      $b = (function() {$case = type;
      if ("2D6"['$===']($case)) {return self.$get_table_by_2d6(table)}
      else if ("1D6"['$===']($case)) {return self.$get_table_by_1d6(table)}
      else if ("D66S"['$===']($case)) {
      table = self.$getD66Table(table);
      return self.$get_table_by_d66_swap(table);}
      else if ("D66N"['$===']($case)) {
      table = self.$getD66Table(table);
      isSwap = false;
      number = self.$bcdice().$getD66(isSwap);
      result = self.$get_table_by_number(number, table);
      return [result, number];}
      else { return nil }})(), $a = Opal.to_ary($b), (text = ($a[0] == null ? nil : $a[0])), (number = ($a[1] == null ? nil : $a[1])), $b;
      if ($truthy(text['$nil?']())) {
        return nil};
      return "" + (name) + "(" + (number) + ") \uFF1E " + (text);
    }, $DarkDaysDrive_getTableDiceCommandResult$5.$$arity = 1);
    
    Opal.def(self, '$getD66Table', $DarkDaysDrive_getD66Table$6 = function $$getD66Table(table) {
      var $$7, self = this;

      return $send(table, 'map', [], ($$7 = function(item){var self = $$7.$$s || this, $a;

      
        
        if (item == null) {
          item = nil;
        };
        if ($truthy(($truthy($a = item['$is_a?']($$($nesting, 'String'))) ? /^(\d+):(.*)/['$==='](item) : $a))) {
          return [$$($nesting, 'Regexp').$last_match(1).$to_i(), $$($nesting, 'Regexp').$last_match(2)]
        } else {
          return item
        };}, $$7.$$s = self, $$7.$$arity = 1, $$7))
    }, $DarkDaysDrive_getD66Table$6.$$arity = 1);
    Opal.const_set($nesting[0], 'TABLES', $hash2(["ABRT", "DT", "FT", "GJT", "ITT", "NTT", "STT", "HTT", "DET", "BET", "CT", "KZT", "IA", "IAA", "IAB", "IAC", "IAD", "IAE", "IAF", "IAG", "IAH", "IAI", "IAJ"], {"ABRT": $hash2(["name", "type", "table"], {"name": "\u30A2\u30D3\u30EA\u30C6\u30A3\u6C7A\u5B9A\u8868", "type": "D66S", "table": ["11:\u30A4\u30F3\u30B9\u30C8\u30E9\u30AF\u30BF\u30FC(P155)", "12:\u904B\u9001\u696D(P155)", "13:\u904B\u8EE2\u624B(P155)", "14:\u30AB\u30D5\u30A7\u5E97\u54E1(P155)", "15:\u8DA3\u5473\u4EBA(P155)", "16:\u30B7\u30E7\u30C3\u30D7\u5E97\u54E1(P155)", "22:\u6B63\u793E\u54E1(P156)", "23:\u5927\u5DE5(P156)", "24:\u63A2\u5075(P156)", "25:\u30D0\u30A4\u30E4\u30FC(P156)", "26:\u4FF3\u512A(P156)", "33:\u6D3E\u9063\u793E\u54E1(P156)", "34:\u72AF\u7F6A\u8005(P157)", "35:\u30D0\u30F3\u30C9\u30DE\u30F3(P157)", "36:\u30D0\u30FC\u30C6\u30F3\u30C0\u30FC(P157)", "44:\u30D2\u30E2(P157)", "45:\u30DB\u30B9\u30C8(P157)", "46:\u30DB\u30C6\u30EB\u30DE\u30F3(P157)", "55:\u7121\u8077(P158)", "56:\u7528\u5FC3\u68D2(P158)", "66:\u6599\u7406\u4EBA(P158)"]}), "DT": $hash2(["name", "type", "table"], {"name": "\u30C0\u30E1\u30FC\u30B8\u8868", "type": "1D6", "table": ["\u75B2\u308C", "\u75DB\u307F", "\u7126\u308A", "\u4E0D\u8ABF", "\u30B7\u30E7\u30C3\u30AF", "\u30B1\u30AC"]}), "FT": $hash2(["name", "type", "table"], {"name": "\u5931\u6557\u8868", "type": "1D6", "table": ["\u4EFB\u610F\u306E\u30A2\u30A4\u30C6\u30E0\u3092\u4E00\u3064\u5931\u3046", "\uFF11\u30C0\u30E1\u30FC\u30B8\u3092\u53D7\u3051\u308B", "\u3010\u6240\u6301\u91D1\u30E9\u30F3\u30AF\u3011\u304C\uFF11\u6E1B\u5C11\u3059\u308B\uFF08\u6700\u4F4E\uFF10\uFF09", "\uFF12\u30C0\u30E1\u30FC\u30B8\u3092\u53D7\u3051\u308B", "\u3010\u6240\u6301\u91D1\u30E9\u30F3\u30AF\u3011\u304C\uFF12\u6E1B\u5C11\u3059\u308B\uFF08\u6700\u4F4E\uFF10\uFF09", "\u6A19\u7684\u30EC\u30D9\u30EB\u304C\uFF11\u5897\u52A0\u3059\u308B"]}), "GJT": $hash2(["name", "type", "table"], {"name": "\u5927\u6210\u529F\u8868", "type": "1D6", "table": ["\u4E3B\u4EBA\u304B\u3089\u304A\u8912\u3081\u306E\u8A00\u8449\u3092\u3044\u305F\u3060\u304F", "\u30C0\u30E1\u30FC\u30B8\u3092\uFF11\u56DE\u5FA9\u3059\u308B", "\u30C0\u30E1\u30FC\u30B8\u3092\uFF11\u56DE\u5FA9\u3059\u308B", "\u95A2\u4FC2\u306E\u30C1\u30A7\u30C3\u30AF\u3092\u4E00\u3064\u6D88\u3059", "\u30C0\u30E1\u30FC\u30B8\u3092\uFF12\u56DE\u5FA9\u3059\u308B", "\u3010\u6240\u6301\u91D1\u30E9\u30F3\u30AF\u3011\u304C\uFF11\u5897\u52A0\u3059\u308B"]}), "ITT": $hash2(["name", "type", "table"], {"name": "\u79FB\u52D5\u30C8\u30E9\u30D6\u30EB\u8868", "type": "1D6", "table": ["\u691C\u554F\uFF08P220)", "\u6025\u306A\u8179\u75DB\uFF08P220)", "\u9ED2\u7159\uFF08P221)", "\u868A\uFF08P221)", "\u843D\u3068\u3057\u7269\uFF08P222)", "\u7A7A\u8179\uFF08P222)"]}), "NTT": $hash2(["name", "type", "table"], {"name": "\u4EFB\u52D9\u30C8\u30E9\u30D6\u30EB\u8868", "type": "1D6", "table": ["\u901A\u5831\uFF08P223)", "\u30D7\u30EC\u30C3\u30B7\u30E3\u30FC\uFF08P223)", "\u30DE\u30CA\u30FC\u9055\u53CD\uFF08P224)", "\u5FD7\u9858\u8005\uFF08P224)", "\u4EF2\u9593\u5272\u308C\uFF08P225)", "\u72E9\u4EBA\u306E\u5642\uFF08P225)"]}), "STT": $hash2(["name", "type", "table"], {"name": "\u8972\u6483\u30C8\u30E9\u30D6\u30EB\u8868", "type": "1D6", "table": ["\u5B64\u72EC\u306A\u8FFD\u8DE1\u8005\uFF08P226)", "\u5730\u5143\u306E\u82E5\u8005\u305F\u3061\uFF08P226)", "V-FILES\uFF08P227)", "\u30C1\u30F3\u30D4\u30E9\u306E\u7FA4\u308C\uFF08P227)", "\u5B64\u72EC\u306A\u72E9\u4EBA\uFF08P228)", "\u72E9\u4EBA\u306E\u7FA4\u308C\uFF08P228)"]}), "HTT": $hash2(["name", "type", "table"], {"name": "\u5909\u8EAB\u30C8\u30E9\u30D6\u30EB\u8868", "type": "D66N", "table": ["11:\u3042\u308C\u3092\u98DF\u3079\u305F\u3044(P214)", "12:\u3042\u308C\u3092\u7740\u305F\u3044(P214)", "13:\u3042\u308C\u3092\u898B\u305F\u3044(P215)", "14:\u3042\u308C\u3092\u72E9\u308A\u305F\u3044(P215)", "15:\u3042\u308C\u3092\u8E0A\u308A\u305F\u3044(P216)", "16:\u3042\u308C\u306B\u5165\u308A\u305F\u3044(P216)", "21:\u5F37\u596A(P217)", "22:\u66B4\u884C(P217)", "23:\u8650\u6BBA(P218)", "24:\u8A98\u62D0(P218)", "25:\u7121\u7CBE(P219)", "26:\u5931\u8E2A(P219)", "31:\u3042\u308C\u3092\u98DF\u3079\u305F\u3044(P214)", "32:\u3042\u308C\u3092\u7740\u305F\u3044(P214)", "33:\u3042\u308C\u3092\u898B\u305F\u3044(P215)", "34:\u3042\u308C\u3092\u72E9\u308A\u305F\u3044(P215)", "35:\u3042\u308C\u3092\u8E0A\u308A\u305F\u3044(P216)", "36:\u3042\u308C\u306B\u5165\u308A\u305F\u3044(P216)", "41:\u5F37\u596A(P217)", "42:\u66B4\u884C(P217)", "43:\u8650\u6BBA(P218)", "44:\u8A98\u62D0(P218)", "45:\u7121\u7CBE(P219)", "46:\u5931\u8E2A(P219)", "51:\u3042\u308C\u3092\u98DF\u3079\u305F\u3044(P214)", "52:\u3042\u308C\u3092\u7740\u305F\u3044(P214)", "53:\u3042\u308C\u3092\u898B\u305F\u3044(P215)", "54:\u3042\u308C\u3092\u72E9\u308A\u305F\u3044(P215)", "55:\u3042\u308C\u3092\u8E0A\u308A\u305F\u3044(P216)", "56:\u3042\u308C\u306B\u5165\u308A\u305F\u3044(P216)", "61:\u5F37\u596A(P217)", "62:\u66B4\u884C(P217)", "63:\u8650\u6BBA(P218)", "64:\u8A98\u62D0(P218)", "65:\u7121\u7CBE(P219)", "66:\u5931\u8E2A(P219)"]}), "DET": $hash2(["name", "type", "table"], {"name": "\u30C9\u30E9\u30A4\u30D6\u30A4\u30D9\u30F3\u30C8\u8868", "type": "1D6", "table": ["\u8EAB\u306E\u4E0A\u8A71\u3092\u3059\u308B\u3002\u76EE\u6A19\u304C\u80CC\u666F\u5206\u91CE\u3067\u9078\u629E\u3057\u3066\u3044\u308B\u7279\u6280\u304C\u30C9\u30E9\u30A4\u30D6\u5224\u5B9A\u306E\u6307\u5B9A\u7279\u6280\u306B\u306A\u308B\u3002", "\u30B9\u30AD\u30EB\u81EA\u6162\u3092\u3059\u308B\u3002\u76EE\u6A19\u304C\u4ED5\u4E8B\u5206\u91CE\u3067\u9078\u629E\u3057\u3066\u3044\u308B\u7279\u6280\u304C\u30C9\u30E9\u30A4\u30D6\u5224\u5B9A\u306E\u6307\u5B9A\u7279\u6280\u306B\u306A\u308B\u3002", "\u3080\u304B\u3057\u884C\u3063\u305F\u5834\u6240\u306E\u8A71\u3092\u3059\u308B\u3002\u76EE\u6A19\u304C\u635C\u7D22\u5206\u91CE\u3067\u9078\u629E\u3057\u3066\u3044\u308B\u7279\u6280\u304C\u30C9\u30E9\u30A4\u30D6\u5224\u5B9A\u306E\u6307\u5B9A\u7279\u6280\u306B\u306A\u308B\u3002", "\u8DA3\u5473\u306E\u8A71\u3092\u3059\u308B\u3002\u76EE\u6A19\u304C\u8DA3\u5473\u5206\u91CE\u3067\u9078\u629E\u3057\u3066\u3044\u308B\u7279\u6280\u304C\u30C9\u30E9\u30A4\u30D6\u5224\u5B9A\u306E\u6307\u5B9A\u7279\u6280\u306B\u306A\u308B\u3002", "\u30C6\u30FC\u30DE\u304C\u306A\u3044\u96D1\u8AC7\u3092\u3059\u308B\u3002\u76EE\u6A19\u304C\u96F0\u56F2\u6C17\u5206\u91CE\u3067\u9078\u629E\u3057\u3066\u3044\u308B\u7279\u6280\u304C\u30C9\u30E9\u30A4\u30D6\u5224\u5B9A\u306E\u6307\u5B9A\u7279\u6280\u306B\u306A\u308B\u3002", "\u7269\u9A12\u306A\u8A71\u3092\u3059\u308B\u3002\u76EE\u6A19\u304C\u6226\u95D8\u6CD5\u5206\u91CE\u3067\u9078\u629E\u3057\u3066\u3044\u308B\u7279\u6280\u304C\u30C9\u30E9\u30A4\u30D6\u5224\u5B9A\u306E\u6307\u5B9A\u7279\u6280\u306B\u306A\u308B\u3002"]}), "BET": $hash2(["name", "type", "table"], {"name": "\u30D6\u30EC\u30A4\u30AF\u30A4\u30D9\u30F3\u30C8\u8868", "type": "1D6", "table": ["\u30A4\u30B1\u30E1\u30F3\u306E\u8ECA\u306F\u98A8\u5149\u660E\u7F8E\u306A\u5834\u6240\u306B\u5230\u7740\u3059\u308B\u3002197\u30DA\u30FC\u30B8\u306E\u300C\u89B3\u5149\u5730\u300D\u3092\u53C2\u7167\u3002", "\u30A4\u30B1\u30E1\u30F3\u306E\u8ECA\u306F\u660E\u308B\u3044\u5149\u306B\u7167\u3089\u3055\u308C\u305F\u5C0F\u3055\u306A\u5E97\u306B\u5230\u7740\u3059\u308B\u3002197\u30DA\u30FC\u30B8\u306E\u300C\u30B3\u30F3\u30D3\u30CB\u300D\u3092\u53C2\u7167\u3002", "\u30A4\u30B1\u30E1\u30F3\u306E\u8ECA\u306F\u5DE8\u5927\u304B\u3064\u4F55\u3067\u3082\u58F2\u3063\u3066\u3044\u308B\u5E97\u306B\u5230\u7740\u3059\u308B\u3002198\u30DA\u30FC\u30B8\u306E\u300C\u30DB\u30FC\u30E0\u30BB\u30F3\u30BF\u30FC\u300D\u3092\u53C2\u7167\u3002", "\u30A4\u30B1\u30E1\u30F3\u306E\u8ECA\u306F\u30C9\u30E9\u30A4\u30D0\u30FC\u305F\u3061\u306E\u61A9\u3044\u306E\u5730\u306B\u5230\u7740\u3059\u308B\u3002198\u30DA\u30FC\u30B8\u306E\u300C\u30B5\u30FC\u30D3\u30B9\u30A8\u30EA\u30A2\u300D\u3092\u53C2\u7167\u3002", "\u30A4\u30B1\u30E1\u30F3\u306E\u8ECA\u306F\u5927\u304D\u306A\u30B5\u30FC\u30D3\u30B9\u30A8\u30EA\u30A2\u306E\u3088\u3046\u306A\u5834\u6240\u306B\u5230\u7740\u3059\u308B\u3002199\u30DA\u30FC\u30B8\u306E\u300C\u9053\u306E\u99C5\u300D\u3092\u53C2\u7167\u3002", "\u30A4\u30B1\u30E1\u30F3\u306E\u8ECA\u306F\u95C7\u306E\u5E95\u306B\u96A0\u3055\u308C\u305F\u79D8\u5BC6\u306E\u5834\u6240\u306B\u5230\u7740\u3059\u308B\u3002199\u30DA\u30FC\u30B8\u306E\u300C\u53CB\u611B\u4F1A\u652F\u90E8\u300D\u3092\u53C2\u7167\u3002"]}), "CT": $hash2(["name", "type", "table"], {"name": "\u30AD\u30E3\u30F3\u30D7\u8868", "type": "1D6", "table": ["\u7121\u6599\u4EEE\u7720\u6240\u30FB\u3044\u3044\u611F\u3058\u306E\u7A7A\u304D\u5730\uFF1A\u5B9A\u54E1\u7121\u5236\u9650\uFF0F\u5C45\u4F4F\u6027-2\uFF0F\u4FA1\u683C0\uFF0F\u767A\u898B\u73872", "\u30AB\u30D7\u30BB\u30EB\u30DB\u30C6\u30EB\uFF1A\u5B9A\u54E11\uFF0F\u5C45\u4F4F\u6027-1\uFF0F\u4FA1\u683C3\uFF0F\u767A\u898B\u73872", "\u30E9\u30D6\u30DB\u30C6\u30EB\uFF1A\u5B9A\u54E12\uFF0F\u5C45\u4F4F\u60270\uFF0F\u4FA1\u683C4\uFF0F\u767A\u898B\u73871", "\u30D3\u30B8\u30CD\u30B9\u30DB\u30C6\u30EB\uFF1A\u5B9A\u54E12\uFF0F\u5C45\u4F4F\u60270\uFF0F\u4FA1\u683C4\uFF0F\u767A\u898B\u73871", "\u89B3\u5149\u30DB\u30C6\u30EB\uFF1A\u5B9A\u54E14\uFF0F\u5C45\u4F4F\u60271\uFF0F\u4FA1\u683C5\uFF0F\u767A\u898B\u73871", "\u9AD8\u7D1A\u30DB\u30C6\u30EB\uFF1A\u5B9A\u54E14\uFF0F\u5C45\u4F4F\u60272\uFF0F\u4FA1\u683C6\uFF0F\u767A\u898B\u73870"]}), "KZT": $hash2(["name", "type", "table"], {"name": "\u95A2\u4FC2\u5C5E\u6027\u8868", "type": "1D6", "table": ["\u8EFD\u8511", "\u53CD\u611F", "\u6DF7\u4E71", "\u8208\u5473", "\u5171\u611F", "\u61A7\u308C"]}), "IA": $hash2(["name", "type", "table"], {"name": "\u30A4\u30B1\u30E1\u30F3\u30A2\u30AF\u30B7\u30E7\u30F3\u6C7A\u5B9A\u8868", "type": "D66S", "table": ["11:\u9060\u8DDD\u96E2", "12:\u9060\u8DDD\u96E2", "13:\u79FB\u52D5", "14:\u79FB\u52D5", "15:\u8FD1\u8DDD\u96E2", "16:\u8FD1\u8DDD\u96E2", "22:\u5584\u4EBA", "23:\u5584\u4EBA", "24:\u60AA\u4EBA", "25:\u60AA\u4EBA", "26:\u5E7C\u3044", "33:\u5E7C\u3044", "34:\u30D0\u30AB", "35:\u30D0\u30AB", "36:\u6E0B\u3044", "44:\u6E0B\u3044", "45:\u8CE2\u3044", "46:\u8CE2\u3044", "55:\u8D85\u81EA\u7136", "56:\u8D85\u81EA\u7136", "66:\u632F\u308A\u76F4\u3057or\u81EA\u7531\u9078\u629E"]}), "IAA": $hash2(["name", "type", "table"], {"name": "\u30A4\u30B1\u30E1\u30F3\u30A2\u30AF\u30B7\u30E7\u30F3\uFF08\u9060\u8DDD\u96E2\uFF09\u8868", "type": "1D6", "table": ["\u76EE\u3092\u5408\u308F\u305B\u3066\u5FAE\u7B11\u3080\uFF08\u304B\u3063\u3053\u3088\u3055\uFF1A4\uFF09", "\u5834\u6240\u3092\u8B72\u308B\uFF08\u304B\u3063\u3053\u3088\u3055\uFF1A4\uFF09", "\u9AEA\u3092\u304B\u304D\u3042\u3052\u308B\uFF08\u304B\u3063\u3053\u3088\u3055\uFF1A5\uFF09", "\u8907\u96D1\u306A\u30DD\u30FC\u30BA\u3067\u5EA7\u308B\uFF08\u304B\u3063\u3053\u3088\u3055\uFF1A5\uFF09", "\u7269\u6182\u3052\u306A\u8868\u60C5\u3067\u632F\u308A\u8FD4\u308B\uFF08\u304B\u3063\u3053\u3088\u3055\uFF1A6\uFF09", "\u3082\u306E\u3092\u4E0A\u306B\u6301\u3064\uFF08\u304B\u3063\u3053\u3088\u3055\uFF1A6\uFF09"]}), "IAB": $hash2(["name", "type", "table"], {"name": "\u30A4\u30B1\u30E1\u30F3\u30A2\u30AF\u30B7\u30E7\u30F3\uFF08\u79FB\u52D5\uFF09\u8868", "type": "1D6", "table": ["\u8ECA\u9053\u5074\u3092\u6B69\u304F\uFF08\u304B\u3063\u3053\u3088\u3055\uFF1A4\uFF09", "\u4E57\u308A\u7269\u304B\u3089\u964D\u308A\u308B\uFF08\u304B\u3063\u3053\u3088\u3055\uFF1A4\uFF09", "\u771F\u5263\u306A\u8868\u60C5\u3067\u8FD1\u3065\u304F\uFF08\u304B\u3063\u3053\u3088\u3055\uFF1A4\uFF09", "\u99AC\u306B\u4E57\u308B\uFF08\u304B\u3063\u3053\u3088\u3055\uFF1A6\uFF09", "\u30C0\u30E1\u30FC\u30B8\u3092\u53D7\u3051\u3064\u3064\u79FB\u52D5\uFF08\u304B\u3063\u3053\u3088\u3055\uFF1A6\uFF09", "\u77AC\u9593\u79FB\u52D5\uFF08\u304B\u3063\u3053\u3088\u3055\uFF1A6\uFF09"]}), "IAC": $hash2(["name", "type", "table"], {"name": "\u30A4\u30B1\u30E1\u30F3\u30A2\u30AF\u30B7\u30E7\u30F3\uFF08\u8FD1\u8DDD\u96E2\uFF09\u8868", "type": "1D6", "table": ["\u9ED9\u3063\u3066\u898B\u3064\u3081\u308B\uFF08\u304B\u3063\u3053\u3088\u3055\uFF1A3\uFF09", "\u3061\u3087\u3063\u3068\u3057\u305F\u30D7\u30EC\u30BC\u30F3\u30C8\uFF08\u304B\u3063\u3053\u3088\u3055\uFF1A3\uFF09", "\u984E\u30AF\u30A4\uFF08\u304B\u3063\u3053\u3088\u3055\uFF1A5\uFF09", "\u58C1\u30C9\u30F3\uFF08\u304B\u3063\u3053\u3088\u3055\uFF1A5\uFF09", "\u304A\u59EB\u69D8\u62B1\u3063\u3053\uFF08\u304B\u3063\u3053\u3088\u3055\uFF1A7\uFF09", "\u5E8A\u30C9\u30F3\uFF08\u304B\u3063\u3053\u3088\u3055\uFF1A7\uFF09"]}), "IAD": $hash2(["name", "type", "table"], {"name": "\u30A4\u30B1\u30E1\u30F3\u30A2\u30AF\u30B7\u30E7\u30F3\uFF08\u5584\u4EBA\uFF09\u8868", "type": "1D6", "table": ["\u624B\u3092\u5F15\u3044\u3066\u9003\u3052\u308B\uFF08\u304B\u3063\u3053\u3088\u3055\uFF1A4\uFF09", "\u6BDB\u5E03\u3092\u639B\u3051\u308B\uFF08\u304B\u3063\u3053\u3088\u3055\uFF1A4\uFF09", "\u5B88\u308B\uFF08\u304B\u3063\u3053\u3088\u3055\uFF1A5\uFF09", "\u7B11\u3063\u3066\u53BB\u308B\uFF08\u304B\u3063\u3053\u3088\u3055\uFF1A5\uFF09", "\u5168\u3066\u3092\u6367\u3052\u308B\uFF08\u304B\u3063\u3053\u3088\u3055\uFF1A6\uFF09", "\u60AA\u5815\u3061\uFF08\u304B\u3063\u3053\u3088\u3055\uFF1A6\uFF09"]}), "IAE": $hash2(["name", "type", "table"], {"name": "\u30A4\u30B1\u30E1\u30F3\u30A2\u30AF\u30B7\u30E7\u30F3\uFF08\u60AA\u4EBA\uFF09\u8868", "type": "1D6", "table": ["\u653B\u6483\u3059\u308B\uFF08\u304B\u3063\u3053\u3088\u3055\uFF1A4\uFF09", "\u6697\u304F\u7B11\u3046\uFF08\u304B\u3063\u3053\u3088\u3055\uFF1A4\uFF09", "\u596A\u3046\uFF08\u304B\u3063\u3053\u3088\u3055\uFF1A4\uFF09", "\u76EE\u8AD6\u898B\u3092\u53E3\u306B\u3059\u308B\uFF08\u304B\u3063\u3053\u3088\u3055\uFF1A6\uFF09", "\u7F60\u306B\u304B\u3051\u308B\uFF08\u304B\u3063\u3053\u3088\u3055\uFF1A6\uFF09", "\u6539\u5FC3\u3059\u308B\uFF08\u304B\u3063\u3053\u3088\u3055\uFF1A6\uFF09"]}), "IAF": $hash2(["name", "type", "table"], {"name": "\u30A4\u30B1\u30E1\u30F3\u30A2\u30AF\u30B7\u30E7\u30F3\uFF08\u5E7C\u3044\uFF09\u8868", "type": "1D6", "table": ["\u7518\u3048\u308B\uFF08\u304B\u3063\u3053\u3088\u3055\uFF1A3\uFF09", "\u75B2\u308C\u308B\uFF08\u304B\u3063\u3053\u3088\u3055\uFF1A3\uFF09", "\u7121\u90AA\u6C17\u306A\u767A\u8A00\uFF08\u304B\u3063\u3053\u3088\u3055\uFF1A5\uFF09", "\u304A\u306D\u3060\u308A\uFF08\u304B\u3063\u3053\u3088\u3055\uFF1A5\uFF09", "\u4E0A\u76EE\u9063\u3044\uFF08\u304B\u3063\u3053\u3088\u3055\uFF1A7\uFF09", "\u62B1\u304D\u3064\u304F\uFF08\u304B\u3063\u3053\u3088\u3055\uFF1A7\uFF09"]}), "IAG": $hash2(["name", "type", "table"], {"name": "\u30A4\u30B1\u30E1\u30F3\u30A2\u30AF\u30B7\u30E7\u30F3\uFF08\u30D0\u30AB\uFF09\u8868", "type": "1D6", "table": ["\u82E6\u60A9\u3059\u308B\uFF08\u304B\u3063\u3053\u3088\u3055\uFF1A4\uFF09", "\u5C48\u8A17\u306E\u306A\u3044\u7B11\u9854\uFF08\u304B\u3063\u3053\u3088\u3055\uFF1A4\uFF09", "\u8EE2\u3076\uFF08\u304B\u3063\u3053\u3088\u3055\uFF1A4\uFF09", "\u53EB\u3076\uFF08\u304B\u3063\u3053\u3088\u3055\uFF1A6\uFF09", "\u9593\u9055\u3048\u308B\uFF08\u304B\u3063\u3053\u3088\u3055\uFF1A6\uFF09", "\u6016\u304C\u308B\uFF08\u304B\u3063\u3053\u3088\u3055\uFF1A6\uFF09"]}), "IAH": $hash2(["name", "type", "table"], {"name": "\u30A4\u30B1\u30E1\u30F3\u30A2\u30AF\u30B7\u30E7\u30F3\uFF08\u6E0B\u3044\uFF09\u8868", "type": "1D6", "table": ["\u8AAC\u6559\uFF08\u304B\u3063\u3053\u3088\u3055\uFF1A4\uFF09", "\u6C17\u3065\u304B\u305B\u308B\uFF08\u304B\u3063\u3053\u3088\u3055\uFF1A4\uFF09", "\u898B\u5B88\u308B\uFF08\u304B\u3063\u3053\u3088\u3055\uFF1A5\uFF09", "\u6B8B\u5FC3\uFF08\u304B\u3063\u3053\u3088\u3055\uFF1A5\uFF09", "\u79F0\u3048\u308B\uFF08\u304B\u3063\u3053\u3088\u3055\uFF1A6\uFF09", "\u3044\u3044\u4F4D\u7F6E\u3092\u53D6\u308B\uFF08\u304B\u3063\u3053\u3088\u3055\uFF1A6\uFF09"]}), "IAI": $hash2(["name", "type", "table"], {"name": "\u30A4\u30B1\u30E1\u30F3\u30A2\u30AF\u30B7\u30E7\u30F3\uFF08\u8CE2\u3044\uFF09\u8868", "type": "1D6", "table": ["\u96E3\u3057\u3044\u672C\u3092\u8AAD\u3080\uFF08\u304B\u3063\u3053\u3088\u3055\uFF1A3\uFF09", "\u30A2\u30C9\u30D0\u30A4\u30B9\u3092\u3059\u308B\uFF08\u304B\u3063\u3053\u3088\u3055\uFF1A3\uFF09", "\u773C\u93E1\u3092\u6301\u3061\u4E0A\u3052\u308B\uFF08\u304B\u3063\u3053\u3088\u3055\uFF1A5\uFF09", "\u72B6\u6CC1\u3092\u89E3\u8AAC\u3059\u308B\uFF08\u304B\u3063\u3053\u3088\u3055\uFF1A5\uFF09", "\u8A08\u7B97\u3067\u304D\u306A\u304F\u306A\u308B\uFF08\u304B\u3063\u3053\u3088\u3055\uFF1A7\uFF09", "\u5927\u4E08\u592B\u3060\u3068\u8A00\u3046\uFF08\u304B\u3063\u3053\u3088\u3055\uFF1A7\uFF09"]}), "IAJ": $hash2(["name", "type", "table"], {"name": "\u30A4\u30B1\u30E1\u30F3\u30A2\u30AF\u30B7\u30E7\u30F3\uFF08\u8D85\u81EA\u7136\uFF09\u8868", "type": "1D6", "table": ["\u6C34\u306B\u6FE1\u308C\u308B\uFF08\u304B\u3063\u3053\u3088\u3055\uFF1A4\uFF09", "\u98A8\u3092\u7E8F\u3046\uFF08\u304B\u3063\u3053\u3088\u3055\uFF1A4\uFF09", "\u5730\u5272\u308C\uFF08\u304B\u3063\u3053\u3088\u3055\uFF1A5\uFF09", "\u706B\u3092\u653E\u3064\uFF08\u304B\u3063\u3053\u3088\u3055\uFF1A5\uFF09", "\u95C7\u3092\u751F\u307F\u51FA\u3059\uFF08\u304B\u3063\u3053\u3088\u3055\uFF1A6\uFF09", "\u5149\u308B\uFF08\u304B\u3063\u3053\u3088\u3055\uFF1A6\uFF09"]})}).$freeze());
    return self.$setPrefixes($rb_plus(["RTT"], $$($nesting, 'TABLES').$keys()));
  })($nesting[0], $$($nesting, 'DiceBot'), $nesting)
})(Opal);
