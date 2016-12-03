modules.define('engine-selector', [ 'i-bem__dom'], function(provide, BEMDOM) {

    provide(BEMDOM.decl('engine-selector', {
        onSetMod: {
            js: {
                inited: function() {

                    this._bPage = this.findBlockOutside('page');
                    this._bDemo = this._bPage.findBlockInside("demo")

                    this.domElem[0].addEventListener('change', function(e){
                        var selected = e.target.selectedIndex === 0 ? 'BEMHTML': 'BEMTREE';
                        console.log(selected);
                        this._bDemo.changeEngine(selected);
                    }.bind(this));
                }
            }
        }
    }, {}));

});
