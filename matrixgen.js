// Generated by CoffeeScript 1.3.3
(function() {
  var DATA, bang, clear, column, draw, empty, empty_matrix, if_hide_patch_cord, if_scale, if_scripting_name, inlets, objectname, outlets, root, row;

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  inlets = 1;

  outlets = 1;

  DATA = {
    row: 3,
    column: 4,
    objectname: "dial",
    object_matrix: [],
    prepend_matrix: [],
    if_scale: 1,
    scale_matrix: [],
    column_distance: 50,
    row_distance: 50,
    if_scripting_name: 1,
    scripting_name_prefix: "matrix_control_",
    if_hide_patch_cord: 0
  };

  row = function(i) {
    return DATA.row = i;
  };

  column = function(i) {
    return DATA.column = i;
  };

  objectname = function(s) {
    return DATA.objectname = s;
  };

  if_scripting_name = function(i) {
    return DATA.if_scripting_name = i;
  };

  if_scale = function(i) {
    return DATA.if_scale = i;
  };

  if_hide_patch_cord = function(i) {
    return DATA.if_hide_patch_cord = i;
  };

  clear = function() {
    return empty();
  };

  bang = function(b) {
    empty();
    return draw();
  };

  empty_matrix = function(m) {
    var o, r, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = m.length; _i < _len; _i++) {
      r = m[_i];
      _results.push((function() {
        var _j, _len1, _results1;
        _results1 = [];
        for (_j = 0, _len1 = r.length; _j < _len1; _j++) {
          o = r[_j];
          _results1.push(root.patcher.remove(o));
        }
        return _results1;
      })());
    }
    return _results;
  };

  empty = function() {
    root.patcher.remove(DATA.matrix);
    empty_matrix(DATA.object_matrix);
    empty_matrix(DATA.prepend_matrix);
    return empty_matrix(DATA.scale_matrix);
  };

  draw = function() {
    var connect_method, i, inter_object, j, _i, _ref, _results;
    DATA.matrix = root.patcher.newdefault(100, 300, "matrix~", DATA.row, DATA.column, 0.000000000000000000001);
    DATA.object_matrix = (function() {
      var _i, _ref, _results;
      _results = [];
      for (i = _i = 0, _ref = DATA.row; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        _results.push((function() {
          var _j, _ref1, _results1;
          _results1 = [];
          for (j = _j = 0, _ref1 = DATA.column; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; j = 0 <= _ref1 ? ++_j : --_j) {
            _results1.push([i, j]);
          }
          return _results1;
        })());
      }
      return _results;
    })();
    DATA.prepend_matrix = (function() {
      var _i, _ref, _results;
      _results = [];
      for (i = _i = 0, _ref = DATA.row; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        _results.push((function() {
          var _j, _ref1, _results1;
          _results1 = [];
          for (j = _j = 0, _ref1 = DATA.column; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; j = 0 <= _ref1 ? ++_j : --_j) {
            _results1.push([i, j]);
          }
          return _results1;
        })());
      }
      return _results;
    })();
    if (DATA.if_scale) {
      DATA.scale_matrix = (function() {
        var _i, _ref, _results;
        _results = [];
        for (i = _i = 0, _ref = DATA.row; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
          _results.push((function() {
            var _j, _ref1, _results1;
            _results1 = [];
            for (j = _j = 0, _ref1 = DATA.column; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; j = 0 <= _ref1 ? ++_j : --_j) {
              _results1.push([i, j]);
            }
            return _results1;
          })());
        }
        return _results;
      })();
    }
    connect_method = DATA.if_hide_patch_cord ? "hiddenconnect" : "connect";
    _results = [];
    for (i = _i = 0, _ref = DATA.row; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
      _results.push((function() {
        var _j, _ref1, _results1;
        _results1 = [];
        for (j = _j = 0, _ref1 = DATA.column; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; j = 0 <= _ref1 ? ++_j : --_j) {
          DATA.object_matrix[i][j] = root.patcher.newdefault(300 + j * DATA.column_distance, 300 + i * DATA.row_distance, DATA.objectname);
          if (DATA.if_scripting_name) {
            DATA.object_matrix[i][j].varname = "" + DATA.scripting_name_prefix + i + "_" + j;
          }
          inter_object = DATA.object_matrix[i][j];
          if (DATA.if_scale) {
            DATA.scale_matrix[i][j] = root.patcher.newdefault(800 + j * 120, 300 + i * 50, "scale", 0, 127, 0.0000000000001, 1.0000000000001);
            root.patcher[connect_method](inter_object, 0, DATA.scale_matrix[i][j], 0);
            inter_object = DATA.scale_matrix[i][j];
          }
          DATA.prepend_matrix[i][j] = root.patcher.newdefault(500 + j * 50, 300 + i * 50, "prepend", i, j);
          root.patcher[connect_method](inter_object, 0, DATA.prepend_matrix[i][j], 0);
          inter_object = DATA.prepend_matrix[i][j];
          _results1.push(root.patcher[connect_method](inter_object, 0, DATA.matrix, 0));
        }
        return _results1;
      })());
    }
    return _results;
  };

  root.bang = bang;

  root.clear = clear;

  root.row = row;

  root.column = column;

  root.objectname = objectname;

  root.if_scripting_name = if_scripting_name;

  root.if_scale = if_scale;

  root.if_hide_patch_cord = if_hide_patch_cord;

}).call(this);
