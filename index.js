(function() {
  var Gridlike = function(options) {
    this.grid = null;
    this.isVisible = false;

    this.id = null;
    this.columnCount = null;
    this.columnWidth = null;
    this.gutterWidth = null;
    this.columnColor = 'red';
    this.opacity = 0.5;
    this.zIndex = 99999;
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
      this.columnCount = options.columnCount || this.columnCount;
      this.columnWidth = options.columnWidth || this.columnWidth;
      this.gutterWidth = options.gutterWidth || this.gutterWidth;
      this.columnColor = options.columnColor || this.columnColor;
      this.opacity = options.opacity || this.opacity;
      this.zIndex = options.zIndex || this.zIndex;

      var classNames = options.classNames || {};
      classNames.grid = options.classNames.grid || this.classNames.grid;
      classNames.column = options.classNames.column || this.classNames.column;
      this.classNames = classNames;
    }

    this.initEventListener = function() {
      document.addEventListener('keydown', function(event) {
        if (event.keyCode != 71) {  // 'g'
          return;
        }

        this.isVisible = !this.isVisible;
        this.grid.style.visibility = this.isVisible ? 'visible' : 'hidden';
      }.bind(this));
    }

    this.createGrid = function() {
      this.grid = this.createElement(this.classNames.grid);
      this.grid.style.overflow = 'hidden';
      this.grid.style.visibility = 'hidden',
      this.grid.style.position = 'fixed';
      this.grid.style.top = 0;
      this.grid.style.right = 0;
      this.grid.style.bottom = 0;
      this.grid.style.left = 0;
      this.grid.style.width = this.calcGridWidth() + 'px';
      this.grid.style.margin = '0 auto';
      this.grid.style.opacity = this.opacity;
      this.grid.style.zIndex = this.zIndex;
      this.grid.style.pointerEvents = 'none';

      for (var i = 0; i < this.columnCount; i++) {
        var column = this.createElement(this.classNames.column);
        column.style.float = 'left';
        column.style.width = this.columnWidth + 'px';
        column.style.height = '100%';
        column.style.backgroundColor = this.columnColor;

        if (i > 0) {
          column.style.marginLeft = this.gutterWidth + 'px';
        }

        this.grid.appendChild(column);
      }
    }

    this.createElement = function(className) {
      var element = document.createElement('div');
      element.className = className;
      return element;
    }

    this.calcGridWidth = function(options) {
      var columnWidths = this.columnWidth * this.columnCount;
      var gutterWidths = this.gutterWidth * (this.columnCount - 1);
      return columnWidths + gutterWidths;
    }

    return this.init(options);
  };

  if (module && module.exports && typeof exports === 'object') {
    module.exports = Gridlike;
  }
  else {
    if (typeof window !== 'undefined') {
      window.Gridlike = Gridlike
    };
  }

  return Gridlike;
})();
