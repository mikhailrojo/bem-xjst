var inherits = require('inherits');
var utils = require('../bemxjst/utils');
var BEMXJST = require('../bemxjst');
var Entity = require('../bemxjst/entity').Entity;

function BEMTREE() {
  BEMXJST.apply(this, arguments);
}

inherits(BEMTREE, BEMXJST);
module.exports = BEMTREE;

BEMTREE.prototype.Entity = Entity;

BEMTREE.prototype.runMany = function runMany(arr) {
  var out = [];
  var context = this.context;
  var prevPos = context.position;
  var prevNotNewList = context._notNewList;

  if (prevNotNewList) {
    context._listLength += arr.length - 1;
  } else {
    context.position = 0;
    context._listLength = arr.length;
  }
  context._notNewList = true;

  if (this.canFlush) {
    for (var i = 0; i < arr.length; i++)
      out.push(context._flush(this._run(arr[i])));
  } else {
    for (var i = 0; i < arr.length; i++)
      out.push(this._run(arr[i]));
  }

  if (!prevNotNewList)
    context.position = prevPos;

  return out;
};

BEMTREE.prototype.render = function render(context,
                                           entity,
                                           tag,
                                           js,
                                           bem,
                                           cls,
                                           mix,
                                           attrs,
                                           content,
                                           mods,
                                           elemMods) {
  var ctx = context.ctx;

  if (typeof js !== 'undefined')
    ctx.js = js;

  if (typeof bem !== 'undefined')
    ctx.bem = bem;

  if (typeof cls !== 'undefined')
    ctx.cls = cls;

  if (typeof mix !== 'undefined')
    ctx.mix = mix;

  if (typeof attrs !== 'undefined')
    ctx.attrs = attrs;

  if (!entity.elem && mods && Object.keys(mods).length > 0)
    ctx.mods = utils.extend(ctx.mods || {}, mods);

  if (entity.elem && elemMods && Object.keys(elemMods).length > 0)
    ctx.elemMods = utils.extend(ctx.elemMods || {}, elemMods);

  if (typeof content === 'undefined')
    return ctx;

  var isBEM = !!(ctx.block || ctx.elem || ctx.bem);

  ctx.content = this.renderContent(content, isBEM);

  return ctx;
};

BEMTREE.prototype._run = function _run(context) {
  if (!context || context === true) return context;
  return BEMXJST.prototype._run.call(this, context);
};
