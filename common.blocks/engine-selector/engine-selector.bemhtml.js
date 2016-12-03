block('engine-selector')(
    tag()('select'),

    js()(function() {
        return true;
    }),

    content()(function() {
        return this.ctx.versions.map(function(item) {
            return {
                tag: 'option',
                content: item.name
            };
        });
    })
);
