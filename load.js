function inc(jspath) {
    document.write('<script type="text/javascript" src="' + jspath + '"><\/script>');
}

inc("lib.js");
inc("pixi.min.js");
inc("mainloop.min.js");
inc("victor.min.js");
inc("chance.js");
inc("main.js");
