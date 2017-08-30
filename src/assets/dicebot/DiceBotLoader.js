/* Generated by Opal 0.10.5 */
(function(Opal) {
  var self = Opal.top, $scope = Opal, nil = Opal.nil, $breaker = Opal.breaker, $slice = Opal.slice, $klass = Opal.klass, $hash2 = Opal.hash2;

  Opal.add_stubs(['$debug', '$gsub', '$new', '$const_get', '$to_s', '$===', '$downcase', '$map', '$to_proc', '$[]', '$raise', '$first', '$include?', '$each']);
  return (function($base, $super) {
    function $DiceBotLoader(){};
    var self = $DiceBotLoader = $klass($base, $super, 'DiceBotLoader', $DiceBotLoader);

    var def = self.$$proto, $scope = self.$$scope, TMP_1, TMP_2, TMP_3, TMP_5;

    def.filenames = def.gameTitlePattern = def.diceBotClass = nil;
    Opal.defs(self, '$loadUnknownGame', TMP_1 = function $$loadUnknownGame(gameTitle) {
      var self = this, escapedGameTitle = nil, e = nil;

      self.$debug("loadUnknownGame gameTitle", gameTitle);
      escapedGameTitle = gameTitle.$gsub(/(\.\.|\/|:|-)/, "_");
      try {
        return $scope.get('Object').$const_get(gameTitle.$gsub(/[\.\/:-]/, "_")).$new()
      } catch ($err) {
        if (Opal.rescue($err, [$scope.get('LoadError'), $scope.get('StandardError')])) {e = $err;
          try {
            self.$debug("DiceBot load ERROR!!!", e.$to_s());
            return nil;
          } finally { Opal.pop_exception() }
        } else { throw $err; }
      };
    }, TMP_1.$$arity = 1);

    Opal.defn(self, '$initialize', TMP_2 = function $$initialize(gameTitlePattern, options) {
      var $a, $b, self = this, $case = nil, defaultFilenames = nil;

      if (options == null) {
        options = $hash2([], {});
      }
      $case = gameTitlePattern;if ($scope.get('String')['$===']($case)) {self.gameTitlePattern = [gameTitlePattern.$downcase()]}else if ($scope.get('Array')['$===']($case)) {self.gameTitlePattern = ($a = ($b = gameTitlePattern).$map, $a.$$p = "downcase".$to_proc(), $a).call($b)}else if ($scope.get('Regexp')['$===']($case)) {if ((($a = options['$[]']("filenames")) !== nil && $a != null && (!$a.$$is_boolean || $a == true))) {
        } else {
        self.$raise($scope.get('ArgumentError'), "options[:filenames] is required when gameTitlePattern is a Regexp")
      };
      self.gameTitlePattern = gameTitlePattern;}else {self.$raise($scope.get('TypeError'), "gameTitlePattern must be a String or an Array<String> or a Regexp")};
      defaultFilenames = (function() {$case = gameTitlePattern;if ($scope.get('String')['$===']($case)) {return [gameTitlePattern]}else if ($scope.get('Array')['$===']($case)) {return [gameTitlePattern.$first()]}else if ($scope.get('Regexp')['$===']($case)) {return []}else { return nil }})();
      self.filenames = ((($a = options['$[]']("filenames")) !== false && $a !== nil && $a != null) ? $a : defaultFilenames);
      return self.diceBotClass = ((($a = options['$[]']("class")) !== false && $a !== nil && $a != null) ? $a : self.filenames.$first());
    }, TMP_2.$$arity = -2);

    Opal.defn(self, '$match?', TMP_3 = function(gameTitle) {
      var self = this, $case = nil;

      return (function() {$case = self.gameTitlePattern;if ($scope.get('Array')['$===']($case)) {return self.gameTitlePattern['$include?'](gameTitle.$downcase())}else if ($scope.get('Regexp')['$===']($case)) {return self.gameTitlePattern['$==='](gameTitle)}else { return nil }})();
    }, TMP_3.$$arity = 1);

    return (Opal.defn(self, '$loadDiceBot', TMP_5 = function $$loadDiceBot() {
      var $a, $b, TMP_4, self = this;

      ($a = ($b = self.filenames).$each, $a.$$p = (TMP_4 = function(filename){var self = TMP_4.$$s || this;
if (filename == null) filename = nil;
      return nil}, TMP_4.$$s = self, TMP_4.$$arity = 1, TMP_4), $a).call($b);
      return $scope.get('Object').$const_get(self.diceBotClass).$new();
    }, TMP_5.$$arity = 0), nil) && 'loadDiceBot';
  })($scope.base, null)
})(Opal);

/* Generated by Opal 0.10.5 */
(function(Opal) {
  var self = Opal.top, $scope = Opal, nil = Opal.nil, $breaker = Opal.breaker, $slice = Opal.slice;

  Opal.add_stubs(['$exit']);
  return $scope.get('Kernel').$exit()
})(Opal);
