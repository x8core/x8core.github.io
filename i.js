var fs = require('fs');
var path = require('path');
var walk = function(dir, done) {
    var results = [];
    fs.readdir(dir, function(err, list) {
        if (err) return done(err);
        var pending = list.length;
        if (!pending) return done(null, results);

        list.forEach(function(file) {
            file = path.resolve(dir, file);
            fs.stat(file, function(err, stat) {
                if (stat && stat.isDirectory()) {
                    walk(file, function(err, res) {
                        results = results.concat(res);
                        if (!--pending) done(null, results);
                    });
                } else {
                    results.push(file);
                    if (!--pending) done(null, results);
                }
            });
        });
    });
};

let list = []

walk('audio',(err, results) => {
    for (let i = 0; i < results.length; i++) {
        let t = results[i]
        list.push('https://' + t.substr(t.indexOf('x8core.github.io/audio')))
    }
    fs.writeFileSync('list.json', JSON.stringify(list.sort()))
})

