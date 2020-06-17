/* Generated by Opal 1.0.3 */
(function(Opal) {
  var self = Opal.top, $nesting = [], nil = Opal.nil, $$$ = Opal.const_get_qualified, $$ = Opal.const_get_relative, $breaker = Opal.breaker, $slice = Opal.slice, $klass = Opal.klass, $truthy = Opal.truthy, $hash2 = Opal.hash2, $send = Opal.send;

  Opal.add_stubs(['$freeze', '$===', '$!', '$include?', '$debug', '$new', '$const_get', '$to_s', '$downcase', '$map', '$to_proc', '$[]', '$raise', '$first']);
  return (function($base, $super, $parent_nesting) {
    var self = $klass($base, $super, 'DiceBotLoader');

    var $nesting = [self].concat($parent_nesting), $DiceBotLoader_validGameType$ques$1, $DiceBotLoader_loadUnknownGame$2, $DiceBotLoader_collectDiceBots$3, $DiceBotLoader_initialize$4, $DiceBotLoader_match$ques$5, $DiceBotLoader_loadDiceBot$6;

    self.$$prototype.filenames = self.$$prototype.gameTitlePattern = self.$$prototype.diceBotClass = nil;
    
    Opal.const_set($nesting[0], 'BOT_NAME_PATTERN', /^[A-Z]\w*$/.$freeze());
    Opal.const_set($nesting[0], 'BOT_NAMES_TO_IGNORE', ["DiceBot", "DiceBotLoader", "DiceBotLoaderList"].$freeze());
    Opal.defs(self, '$validGameType?', $DiceBotLoader_validGameType$ques$1 = function(gameType) {
      var $a, self = this;

      return ($truthy($a = $$($nesting, 'BOT_NAME_PATTERN')['$==='](gameType)) ? $$($nesting, 'BOT_NAMES_TO_IGNORE')['$include?'](gameType)['$!']() : $a)
    }, $DiceBotLoader_validGameType$ques$1.$$arity = 1);
    Opal.defs(self, '$loadUnknownGame', $DiceBotLoader_loadUnknownGame$2 = function $$loadUnknownGame(gameType) {
      var self = this, e = nil;

      
      self.$debug("DiceBotLoader.loadUnknownGame gameType", gameType);
      
      try {
        return $$($nesting, 'Object').$const_get(gameType).$new()
      } catch ($err) {
        if (Opal.rescue($err, [$$($nesting, 'LoadError'), $$($nesting, 'StandardError')])) {e = $err;
          try {
            
            self.$debug("DiceBotLoader.loadUnknownGame: \u30C0\u30A4\u30B9\u30DC\u30C3\u30C8\u306E\u8AAD\u307F\u8FBC\u307F\u306B\u5931\u6557\u3057\u307E\u3057\u305F", e.$to_s());
            return nil;
          } finally { Opal.pop_exception() }
        } else { throw $err; }
      };;
    }, $DiceBotLoader_loadUnknownGame$2.$$arity = 1);
    Opal.defs(self, '$collectDiceBots', $DiceBotLoader_collectDiceBots$3 = function $$collectDiceBots() {
      var self = this;

      return nil
    }, $DiceBotLoader_collectDiceBots$3.$$arity = 0);
    
    Opal.def(self, '$initialize', $DiceBotLoader_initialize$4 = function $$initialize(gameTitlePattern, options) {
      var $a, self = this, $case = nil, defaultFilenames = nil;

      
      
      if (options == null) {
        options = $hash2([], {});
      };
      $case = gameTitlePattern;
      if ($$($nesting, 'String')['$===']($case)) {self.gameTitlePattern = [gameTitlePattern.$downcase()]}
      else if ($$($nesting, 'Array')['$===']($case)) {self.gameTitlePattern = $send(gameTitlePattern, 'map', [], "downcase".$to_proc())}
      else if ($$($nesting, 'Regexp')['$===']($case)) {
      if ($truthy(options['$[]']("filenames"))) {
      } else {
        self.$raise($$($nesting, 'ArgumentError'), "options[:filenames] is required when gameTitlePattern is a Regexp")
      };
      self.gameTitlePattern = gameTitlePattern;}
      else {self.$raise($$($nesting, 'TypeError'), "gameTitlePattern must be a String or an Array<String> or a Regexp")};
      defaultFilenames = (function() {$case = gameTitlePattern;
      if ($$($nesting, 'String')['$===']($case)) {return [gameTitlePattern]}
      else if ($$($nesting, 'Array')['$===']($case)) {return [gameTitlePattern.$first()]}
      else if ($$($nesting, 'Regexp')['$===']($case)) {return []}
      else { return nil }})();
      self.filenames = ($truthy($a = options['$[]']("filenames")) ? $a : defaultFilenames);
      return (self.diceBotClass = ($truthy($a = options['$[]']("class")) ? $a : self.filenames.$first()));
    }, $DiceBotLoader_initialize$4.$$arity = -2);
    
    Opal.def(self, '$match?', $DiceBotLoader_match$ques$5 = function(gameTitle) {
      var self = this, $case = nil;

      return (function() {$case = self.gameTitlePattern;
      if ($$($nesting, 'Array')['$===']($case)) {return self.gameTitlePattern['$include?'](gameTitle.$downcase())}
      else if ($$($nesting, 'Regexp')['$===']($case)) {return self.gameTitlePattern['$==='](gameTitle)}
      else { return nil }})()
    }, $DiceBotLoader_match$ques$5.$$arity = 1);
    return (Opal.def(self, '$loadDiceBot', $DiceBotLoader_loadDiceBot$6 = function $$loadDiceBot() {
      var self = this;

      return $$($nesting, 'Object').$const_get(self.diceBotClass).$new()
    }, $DiceBotLoader_loadDiceBot$6.$$arity = 0), nil) && 'loadDiceBot';
  })($nesting[0], null, $nesting)
})(Opal);
