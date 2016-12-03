var xjst = require('bem-xjst');
var bundle1 = xjst.bemhtml.generate();
var bundle2 = xjst.bemtree.generate('', {exportName: 'BEMTREE'});



module.exports = require('enb/lib/build-flow').create()
    .name('bemxjst')
    .target('target', '?.bemxjst.js')
    .builder(function() {
        return bundle1.replace('api.exportApply(exports);', '').concat(bundle2).replace('api.exportApply(exports);', '');
    })
    .createTech();
