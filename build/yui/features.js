YUI.add('features', function(Y) {

var feature_tests = {};

Y.mix(Y.namespace('Features'), {

    tests: feature_tests,

    add: function(cat, name, o) {
        feature_tests[cat] = feature_tests[cat] || {};
        feature_tests[cat][name] = o;
    },

    all: function(cat, args) {
        var cat_o = feature_tests[cat],
            // results = {};
            result = '';
        if (cat_o) {
            Y.Object.each(cat_o, function(v, k) {
                // results[k] = Y.Features.test(cat, k, args);
                result += k + ':' +
                       (Y.Features.test(cat, k, args) ? 1 : 0) + ';';
            });
        }

        return result;
    },

    test: function(cat, name, args) {

        var result, ua, test,
            cat_o = feature_tests[cat],
            feature = cat_o && cat_o[name];

        if (!feature) {
        } else {

            result = feature.result;

            if (Y.Lang.isUndefined(result)) {

                ua = feature.ua;
                if (ua) {
                    result = (Y.UA[ua]);
                }

                test = feature.test;
                if (test && ((!ua) || result)) {
                    result = test.apply(Y, args);
                }

                feature.result = result;
            }
        }

        return result;
    }
});

// Y.Features.add("load", "1", {});
// Y.Features.test("load", "1");
// caps=1:1;2:0;3:1;

/* This file is auto-generated by src/loader/meta_join.py */
var add = Y.Features.add;
// 0
add('load', '0', {
    "trigger": "node-base", 
    "ua": "gecko"
});
// history-hash-ie-test.js
add('load', '1', {
    "test": function (Y) {
    var docMode = Y.config.doc.documentMode;

    return Y.UA.ie && (!('onhashchange' in Y.config.win) ||
            !docMode || docMode < 8);
}, 
    "trigger": "history-hash"
});
// dd-gestures-test.js
add('load', '2', {
    "test": function(Y) {
    return (Y.config.win && ('ontouchstart' in Y.config.win && !Y.UA.chrome));
}, 
    "trigger": "dd-drag"
});


}, '@VERSION@' ,{requires:['yui-base']});
