/* Generated by Opal 1.0.3 */
(function(Opal) {
  function $rb_ge(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs >= rhs : lhs['$>='](rhs);
  }
  var self = Opal.top, $nesting = [], nil = Opal.nil, $$$ = Opal.const_get_qualified, $$ = Opal.const_get_relative, $breaker = Opal.breaker, $slice = Opal.slice, $klass = Opal.klass, $send = Opal.send, $truthy = Opal.truthy;

  Opal.add_stubs(['$count', '$==', '$size', '$>=', '$!=']);
  return (function($base, $super, $parent_nesting) {
    var self = $klass($base, $super, 'Arianrhod');

    var $nesting = [self].concat($parent_nesting), $Arianrhod_initialize$1, $Arianrhod_check_nD6$2;

    
    Opal.const_set($nesting[0], 'ID', "Arianrhod");
    Opal.const_set($nesting[0], 'NAME', "\u30A2\u30EA\u30A2\u30F3\u30ED\u30C3\u30C9");
    Opal.const_set($nesting[0], 'SORT_KEY', "\u3042\u308A\u3042\u3093\u308D\u3064\u3068");
    Opal.const_set($nesting[0], 'HELP_MESSAGE', "" + "\u30FB\u30AF\u30EA\u30C6\u30A3\u30AB\u30EB\u3001\u30D5\u30A1\u30F3\u30D6\u30EB\u306E\u81EA\u52D5\u5224\u5B9A\u3092\u884C\u3044\u307E\u3059\u3002(\u30AF\u30EA\u30C6\u30A3\u30AB\u30EB\u6642\u306E\u8FFD\u52A0\u30C0\u30E1\u30FC\u30B8\u3082\u8868\u793A\u3055\u308C\u307E\u3059)\n" + "\u30FBD66\u30C0\u30A4\u30B9\u3042\u308A\n");
    
    Opal.def(self, '$initialize', $Arianrhod_initialize$1 = function $$initialize() {
      var $iter = $Arianrhod_initialize$1.$$p, $yield = $iter || nil, self = this, $zuper = nil, $zuper_i = nil, $zuper_ii = nil;

      if ($iter) $Arianrhod_initialize$1.$$p = null;
      // Prepare super implicit arguments
      for($zuper_i = 0, $zuper_ii = arguments.length, $zuper = new Array($zuper_ii); $zuper_i < $zuper_ii; $zuper_i++) {
        $zuper[$zuper_i] = arguments[$zuper_i];
      }
      
      $send(self, Opal.find_super_dispatcher(self, 'initialize', $Arianrhod_initialize$1, false), $zuper, $iter);
      self.sendMode = 2;
      self.sortType = 1;
      return (self.d66Type = 1);
    }, $Arianrhod_initialize$1.$$arity = 0);
    
    Opal.def(self, '$check_nD6', $Arianrhod_check_nD6$2 = function $$check_nD6(total, _dice_total, dice_list, cmp_op, target) {
      var $a, self = this, n_max = nil;

      
      n_max = dice_list.$count(6);
      if (dice_list.$count(1)['$=='](dice_list.$size())) {
        return " \uFF1E \u30D5\u30A1\u30F3\u30D6\u30EB"
      } else if ($truthy($rb_ge(n_max, 2))) {
        if ($truthy($rb_ge(n_max, 2))) {
          return "" + " \uFF1E \u30AF\u30EA\u30C6\u30A3\u30AB\u30EB(+" + (n_max) + "D6)"
        } else {
          return nil
        }
      } else if ($truthy(($truthy($a = cmp_op['$!='](">=")) ? $a : target['$==']("?")))) {
        return ""
      } else if ($truthy($rb_ge(total, target))) {
        return " \uFF1E \u6210\u529F"
      } else {
        return " \uFF1E \u5931\u6557"
      };
    }, $Arianrhod_check_nD6$2.$$arity = 5);
    return Opal.alias(self, "check_2D6", "check_nD6");
  })($nesting[0], $$($nesting, 'DiceBot'), $nesting)
})(Opal);
