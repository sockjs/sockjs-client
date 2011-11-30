module('dom tests')

u = SockJS.getUtils()

newIframe = ->
    hook = u.createHook()
    err = ->
        console.log('iframe error. bad.')
    hook.iobj = u.createIframe('/iframe.html#' + hook.id, err)
    return hook


asyncTest 'onunload', ->
    document.domain = document.domain;
    """
    var u = SockJS.getUtils();
    u.attachEvent('unload', function(){
            parent.{{ callback }}.message('unload');
        });
    """
    hook = newIframe()
    hook.open = ->
        hook.callback('alert("hhello world");')
        hook.iobj.cleanup()
        hook.del()
        ok(true)
        start()





# 1. data url
# 2. wrong uri
# 3. mass run - to verify mem leaks

