(function($) {
    ChiliBook = {
        version: "1.8a",
        automatic: true,
        automaticSelector: "code",
        codeLanguage: function(el) {
            var recipeName = $(el).attr("class");
            return recipeName ? recipeName : ''
        },
        metadataSelector: "object.chili",
        recipeLoading: true,
        recipeFolder: "",
        stylesheetLoading: true,
        stylesheetFolder: "",
        defaultReplacement: '<span class="$0">$$</span>',
        replaceSpace: "&#160;",
        replaceTab: "&#160;&#160;&#160;&#160;",
        replaceNewLine: "&#160;<br/>",
        recipes: {},
        queue: {},
        preFixCopy: document.selection && document.selection.createRange,
        preContent: "",
        preElement: null
    };
    $.metaobjects = function(options) {
        options = $.extend({
            context: document,
            clean: true,
            selector: 'object.metaobject'
        }, options);

        function jsValue(value) {
            eval('value = ' + value + ";");
            return value
        }
        return $(options.selector, options.context).each(function() {
            var settings = {
                target: this.parentNode
            };
            $('> param[@name=metaparam]', this).each(function() {
                $.extend(settings, jsValue(this.value))
            });
            $('> param', this).not('[@name=metaparam]').each(function() {
                var name = this.name,
                    value = jsValue(this.value);
                $(settings.target).each(function() {
                    this[name] = value
                })
            });
            if (options.clean) {
                $(this).remove()
            }
        })
    };
    $.fn.chili = function(options) {
        var book = $.extend({}, ChiliBook, options || {});

        function cook(ingredients, recipe) {
            function prepareStep(stepName, step) {
                var exp = (typeof step.exp == "string") ? step.exp : step.exp.source;
                steps.push({
                    stepName: stepName,
                    exp: "(" + exp + ")",
                    length: 1 + (exp.replace(/\\./g, "%").replace(/\[.*?\]/g, "%").match(/\((?!\?)/g) || []).length,
                    replacement: (step.replacement) ? step.replacement : book.defaultReplacement
                })
            }

            function knowHow() {
                var prevLength = 0;
                var exps = new Array;
                for (var i = 0; i < steps.length; i++) {
                    var exp = steps[i].exp;
                    exp = exp.replace(/\\\\|\\(\d+)/g, function(m, aNum) {
                        return !aNum ? m : "\\" + (prevLength + 1 + parseInt(aNum, 10))
                    });
                    exps.push(exp);
                    prevLength += steps[i].length
                }
                var source = exps.join("|");
                return new RegExp(source, (recipe.ignoreCase) ? "gi" : "g")
            }

            function escapeHTML(str) {
                return str.replace(/&/g, "&amp;").replace(/</g, "&lt;")
            }

            function replaceSpaces(str) {
                return str.replace(/ +/g, function(spaces) {
                    return spaces.replace(/ /g, replaceSpace)
                })
            }

            function filter(str) {
                str = escapeHTML(str);
                if (replaceSpace) {
                    str = replaceSpaces(str)
                }
                return str
            }

            function chef(matched) {
                var i = 0;
                var j = 1;
                var step;
                while (step = steps[i++]) {
                    var aux = arguments;
                    if (aux[j]) {
                        var pattern = /(\\\$)|(?:\$\$)|(?:\$(\d+))/g;
                        var replacement = step.replacement.replace(pattern, function(m, escaped, K) {
                            var bit = '';
                            if (escaped) {
                                return "$"
                            } else if (!K) {
                                return filter(aux[j])
                            } else if (K == "0") {
                                return step.stepName
                            } else {
                                return filter(aux[j + parseInt(K, 10)])
                            }
                        });
                        var offset = arguments[arguments.length - 2];
                        var input = arguments[arguments.length - 1];
                        var unmatched = input.substring(lastIndex, offset);
                        lastIndex = offset + matched.length;
                        perfect += filter(unmatched) + replacement;
                        return replacement
                    } else {
                        j += step.length
                    }
                }
            }
            var replaceSpace = book.replaceSpace;
            var steps = new Array;
            for (var stepName in recipe.steps) {
                prepareStep(stepName, recipe.steps[stepName])
            }
            var perfect = "";
            var lastIndex = 0;
            ingredients.replace(knowHow(), chef);
            var lastUnmatched = ingredients.substring(lastIndex, ingredients.length);
            perfect += filter(lastUnmatched);
            return perfect
        }

        function checkCSS(stylesheetPath) {
            if (!book.queue[stylesheetPath]) {
                var e = document.createElement("link");
                e.rel = "stylesheet";
                e.type = "text/css";
                e.href = stylesheetPath;
                document.getElementsByTagName("head")[0].appendChild(e);
                book.queue[stylesheetPath] = true
            }
        }

        function makeDish(el, recipePath) {
            var recipe = book.recipes[recipePath];
            if (recipe) {
                var ingredients = el && el.childNodes && el.childNodes[0] && el.childNodes[0].data;
                if (!ingredients) {
                    ingredients = ""
                }
                ingredients = ingredients.replace(/\r\n?/g, "\n");
                var dish = cook(ingredients, recipe);
                if (book.replaceTab) {
                    dish = dish.replace(/\t/g, book.replaceTab)
                }
                if (book.replaceNewLine) {
                    dish = dish.replace(/\n/g, book.replaceNewLine)
                }
                $(el).html(dish);
                if (ChiliBook.preFixCopy) {
                    $(el).parents().filter("pre").bind("mousedown", function() {
                        ChiliBook.preElement = this
                    }).bind("mouseup", function() {
                        if (ChiliBook.preElement == this) {
                            ChiliBook.preContent = document.selection.createRange().htmlText
                        }
                    })
                }
            }
        }

        function getPath(recipeName, options) {
            var settingsDef = {
                recipeFolder: book.recipeFolder,
                recipeFile: recipeName + ".js",
                stylesheetFolder: book.stylesheetFolder,
                stylesheetFile: recipeName + ".css"
            };
            var settings;
            if (options && typeof options == "object") {
                settings = $.extend(settingsDef, options)
            } else {
                settings = settingsDef
            }
            return {
                recipe: settings.recipeFolder + settings.recipeFile,
                stylesheet: settings.stylesheetFolder + settings.stylesheetFile
            }
        }
        if (book.metadataSelector) {
            $.metaobjects({
                context: this,
                selector: book.metadataSelector
            })
        }
        this.each(function() {
            var el = this;
            var recipeName = book.codeLanguage(el);
            if ('' != recipeName) {
                var path = getPath(recipeName, el.chili);
                if (book.recipeLoading || el.chili) {
                    if (!book.queue[path.recipe]) {
                        try {
                            book.queue[path.recipe] = [el];
                            $.getJSON(path.recipe, function(recipeLoaded) {
                                recipeLoaded.path = path.recipe;
                                book.recipes[path.recipe] = recipeLoaded;
                                if (book.stylesheetLoading) {
                                    checkCSS(path.stylesheet)
                                }
                                var q = book.queue[path.recipe];
                                for (var i = 0, iTop = q.length; i < iTop; i++) {
                                    makeDish(q[i], path.recipe)
                                }
                            })
                        } catch (recipeNotAvailable) {
                            alert("the recipe for '" + recipeName + "' was not found in '" + path.recipe + "'")
                        }
                    } else {
                        book.queue[path.recipe].push(el)
                    }
                    makeDish(el, path.recipe)
                } else {
                    makeDish(el, path.recipe)
                }
            }
        });
        return this
    };
    $(function() {
        if (ChiliBook.automatic) {
            if (ChiliBook.elementPath) {
                ChiliBook.automaticSelector = ChiliBook.elementPath;
                if (ChiliBook.elementClass) {
                    ChiliBook.codeLanguage = function(el) {
                        var selectClass = new RegExp("\\b" + ChiliBook.elementClass + "\\b", "gi");
                        var elClass = $(el).attr("class");
                        if (!elClass) {
                            return ''
                        }
                        var recipeName = $.trim(elClass.replace(selectClass, ""));
                        return recipeName
                    }
                }
            }
            $(ChiliBook.automaticSelector).chili()
        }
        if (ChiliBook.preFixCopy) {
            function preformatted(text) {
                if ('' == text) {
                    return ""
                }
                do {
                    var newline_flag = (new Date()).valueOf()
                } while (text.indexOf(newline_flag) > -1);
                text = text.replace(/\<br[^>]*?\>/ig, newline_flag);
                var el = document.createElement('<pre>');
                el.innerHTML = text;
                text = el.innerText.replace(new RegExp(newline_flag, "g"), '\r\n');
                return text
            }
            $("body").bind("copy", function() {
                if ('' != ChiliBook.preContent) {
                    window.clipboardData.setData('Text', preformatted(ChiliBook.preContent));
                    event.returnValue = false
                }
            }).bind("mousedown", function() {
                ChiliBook.preContent = ""
            }).bind("mouseup", function() {
                ChiliBook.preElement = null
            })
        }
    })
})(jQuery);