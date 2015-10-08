(function() {
  var Gridlike = function(options) {
    this.grid = null;
    this.isVisible = false;

    this.id = null;
    this.columns = null;
    this.classNames = {
      grid: 'gridlike',
      column: 'gridlike__column'
    };

    this.init = function(options) {
      this.initOptions(options);
      this.initEventListener();

      this.createGrid();
      document.body.appendChild(this.grid);

      return this.grid;
    }

    this.initOptions = function(options) {
      this.columns = options.columns || this.columns;

      var classNames = options.classNames || {};
      classNames.grid = options.classNames.grid || this.classNames.grid;
      classNames.column = options.classNames.column || this.classNames.column;
      this.classNames = classNames;
    }

    this.initEventListener = function() {
      document.addEventListener('keydown', function(event) {
        if (this.isElementAcceptingKeyInput(event.target)) {
          return;
        }

        if (event.keyCode != 71) {  // 'g'
          return;
        }

        this.isVisible = !this.isVisible;
        this.grid.style.display = this.isVisible ? 'block' : 'none';
      }.bind(this));
    }

    this.isElementAcceptingKeyInput = function(element) {
      var nodeNames = [
        'INPUT',
        'TEXTAREA',
        'SELECT', // <select> and option doesn't seem to trigger a keydown
        'OPTION'  // event, but we test them just in case.
      ];

      for (var i = 0; i < nodeNames.length; i++) {
        if (element.nodeName == nodeNames[i]) {
          return true;
        }
      }

      return false;
    }

    this.createGrid = function() {
      this.grid = this.createElement(this.classNames.grid);
      this.grid.style.display = 'none',
      this.grid.style.pointerEvents = 'none';

      for (var i = 0; i < this.columns; i++) {
        this.grid.appendChild(this.createElement(this.classNames.column));
      }
    }

    this.createElement = function(className) {
      var element = document.createElement('div');
      element.className = className;
      return element;
    }

    return this.init(options);
  };

  if (typeof module !== 'undefined' && typeof module.exports === 'object') {
    module.exports = Gridlike;
  }
  else {
    if (typeof window !== 'undefined') {
      window.Gridlike = Gridlike
    };
  }

  return Gridlike;
})();
