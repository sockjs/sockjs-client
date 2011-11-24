module('Utils')

u = SockJS.getUtils()

test 'random_string', ->
    notEqual(u.random_string(8), u.random_string(8))
    for i in [1,2,3,128]
        equal(u.random_string(i).length, i)
    equal(u.random_string(4, 1), 'aaaa')

test 'random_number_string', ->
    for i in [0..10]
        equal(u.random_number_string(10).length, 1)
        equal(u.random_number_string(100).length, 2)
        equal(u.random_number_string(1000).length, 3)
        equal(u.random_number_string(10000).length, 4)
        equal(u.random_number_string(100000).length, 5)

test 'getOrigin', ->
    equal(u.getOrigin('http://a.b/'), 'http://a.b')
    equal(u.getOrigin('http://a.b/c'), 'http://a.b')
    equal(u.getOrigin('http://a.b:123/c'), 'http://a.b:123')

test 'objectExtend', ->
    deepEqual(u.objectExtend({}, {}), {})
    a = {a:1};
    equal(u.objectExtend(a, {}), a)
    equal(u.objectExtend(a, {b:1}), a)
    a = {a:1}; b = {b:2}
    deepEqual(u.objectExtend(a, b), {a:1, b:2})
    deepEqual(a, {a:1, b:2})
    deepEqual(b, {b:2})

test 'bind', ->
    o = {}
    fun = ->
        return this
    deepEqual(fun(), window)
    bound_fun = u.bind(fun, o)
    deepEqual(bound_fun(), o)

test 'amendUrl', ->
    dl = document.location

    equal(u.amendUrl('//blah:1/abc'), dl.protocol + '//blah:1/abc')
    equal(u.amendUrl('/abc'), dl.protocol + '//' + dl.host + '/abc')
    equal(u.amendUrl('http://a:1/abc'), 'http://a:1/abc')
    equal(u.amendUrl('http://a:1/abc/'), 'http://a:1/abc')
    equal(u.amendUrl('http://a:1/abc//'), 'http://a:1/abc')
    t = -> u.amendUrl('')
    raises(t, 'Wrong url')
    t = -> u.amendUrl(false)
    raises(t, 'Wrong url')

test 'arrIndexOf', ->
    a = [1,2,3,4,5]
    equal(u.arrIndexOf(a, 1), 0)
    equal(u.arrIndexOf(a, 5), 4)
    equal(u.arrIndexOf(a, null), -1)
    equal(u.arrIndexOf(a, 6), -1)

test 'quote', ->
    equal(u.quote(''), '""');
    equal(u.quote('a'), '"a"');
    equal(u.quote('\t'), '"\\t"')
    equal(u.quote('\n'), '"\\n"')
    equal(u.quote('\x00\udfff\ufffe\uffff'), '"\\u0000\\udfff\\ufffe\\uffff"')
    # Unicode surrogates, formally incorrect unicode datapoints:
    equal(u.quote('\ud85c\udff7\ud800\ud8ff'), '"\\ud85c\\udff7\\ud800\\ud8ff"')
    equal(u.quote('\u2000\u2001\u0300\u0301'), '"\\u2000\\u2001\\u0300\\u0301"')

    # And a sanity check.
    c = for i in [0..65535]
            String.fromCharCode(i)
    all_chars = c.join('')
    ok(JSON.parse(u.quote(all_chars)) is all_chars, "Quote/unquote all 64K chars.")
