'use strict';
var expect = require('expect.js')
  , iframeUtils = require('../../lib/utils/iframe')
  , testUtils = require('./test-utils')
  , debug = require('debug')('sockjs-client:tests:echo')
  ;

function echoFactory(transport, messages, url) {
  return function (done) {
    var test = this.runnable();
    var title = test.fullTitle();
    debug('start', title);
    this.timeout(20000);
    var msgs = messages.slice(0);

    var sjs = testUtils.newSockJs(url, transport);
    sjs.onopen = function () {
      sjs.send(msgs[0]);
    };
    sjs.onmessage = function (e) {
      if (test.timedOut || test.duration) {
        return;
      }
      // TODO don't like having to force the element toString here
      try {
        expect(e.data).to.eql('' + msgs[0]);
      } catch (err) {
        done(err);
        sjs.close();
        return;
      }

      msgs.shift();
      if (typeof msgs[0] === 'undefined') {
        sjs.close();
      } else {
        sjs.send(msgs[0]);
      }
    };
    sjs.onclose = function (e) {
      if (test.timedOut || test.duration) {
        return;
      }

      try {
        expect(e.code).to.equal(1000);
        expect(msgs).to.have.length(0);
      } catch (err) {
        done(err);
        return;
      }

      done();
      debug('end', title);
    };
  };
}

module.exports.echoBasic = function echoBasic(url, transport) {
  var messages = ['data'];
  it('echo basic', echoFactory(transport, messages, url + '/echo'));
};

module.exports.echoQueryString = function echoBasic(url, transport) {
  var messages = ['data'];
  it('echo querystring', echoFactory(transport, messages, url + '/echo?testqs=1'));
};

module.exports.echoRich = function echoRich(url, transport) {
  var messages = [
    [1, 2, 3, 'data'], null, false, 'data', 1, 12.0, {
      a: 1,
      b: 2
    }
  ];
  it('echo rich', echoFactory(transport, messages, url + '/echo'));
};

/* eslint-disable quotes */
module.exports.echoUnicode = function echoUnicode(url, transport) {
  var messages = ["Τη γλώσσα μου έδωσαν ελληνική το σπίτι φτωχικό στις αμμουδιές του ", "ღმერთსი შემვედრე, ნუთუ კვლა დამხსნას სოფლისა შრომასა, ცეცხლს, წყალს", "⠊⠀⠉⠁⠝⠀⠑⠁⠞⠀⠛⠇⠁⠎⠎⠀⠁⠝⠙⠀⠊⠞⠀⠙⠕⠑⠎⠝⠞⠀⠓⠥⠗⠞⠀⠍⠑", "Би шил идэй чадна, надад хортой биш", "을", "나는 유리를 먹을 수 있어요. 그래도 아프지 않아요", "ฉันกินกระจกได้ แต่มันไม่ทำให้ฉันเจ็บฉันกินกระจกได้ แต่มันไม่ทำให้ฉันเจ็บ", "Ég get etið gler án þess að meiða mig.", "Mogę jeść szkło, i mi nie szkodzi.", "\ufffd\u10102\u2f877", "Начало музыкальной карьеры\nБритни пела в церковном хоре местной баптистской церкви. В возрасте 8-ми лет Спирс прошла аудирование для участия в шоу «Новый Клуб Микки-Мауса» на канале «Дисней». И хотя продюсеры решили, что Спирс слишком молода для участия в шоу, они представили её агенту в Нью-Йорке. Следующие 3 года Бритни училась в актёрской школе Professional Performing Arts School в Нью-Йорке и участвовала в нескольких постановках, в том числе «Ruthless!» 1991 года. В 1992 году Спирс участвовала в конкурсе Star Search, но проиграла во втором туре.\nВ 1993 году Спирс вернулась на канал «Дисней» и в течение 2-х лет участвовала в шоу «Новый Клуб Микки-Мауса». Другие будущие знаменитости, начинавшие с этого шоу — Кристина Агилера, участники 'N Sync Джастин Тимберлейк и Джейси Шазе, звезда сериала «Счастье» Кери Расселл и актёр фильма «Дневник памяти» Райан Гослинг.\nВ 1994 году шоу закрыли, Бритни вернулась домой в Луизиану, где поступила в среднюю школу. Некоторое время она пела в девичьей группе Innosense, но вскоре, решив начать сольную карьеру, записала демодиск, который попал в руки продюсерам из Jive Records, и те заключили с ней контракт.\nДалее последовал тур по стране, выступления в супермаркетах и работа на разогреве у групп 'N Sync и Backstreet Boys.\n[править]1999—2000: Ранний коммерческий успех\nВ октябре 1998 года вышел дебютный сингл Бритни Спирс «…Baby One More Time» . Песня имела огромный успех, в первые же недели возглавила международные чарты, мировые продажи сингла составили 9 миллионов копий, что сделало диск дважды платиновым. Альбом с одноимённым названием вышел в январе 1999 года. Альбом стартовал на первом месте рейтинга Billboard 200, пятьдесят одну неделю продержался в верхней десятке и шестьдесят недель в двадцати лучших. Альбом стал 15-кратным платиновым и на сегодняшний день является самым успешным альбомом Бритни Спирс.\nВ 1999 году Бритни снялась для апрельского номера журнала Rolling Stone. Откровенные фотографии спровоцировали слухи о том, что 17-летняя звезда сделала операцию по увеличению груди, что сама Спирс отрицала. Успех альбома и противоречивый образ Спирс, созданный массмедиа, сделали её главной звездой 1999 года.\nВслед за успешным дебютом последовал второй альбом певицы «Oops!... I Did It Again», также стартовавший на 1-м месте в США. Продажи за первую неделю составили 1 319 193 копии, что являлось абсолютным рекордом, который затем побил американский рэпер Эминем. Летом 2000 года Спирс отправилась в свой первый мировой тур, «Oops!… I Did It Again World Tour». В 2000 году Спирс получила две награды Billboards Music Awards и была номинирована на «Грэмми» в двух категориях — «Лучший поп-альбом» и «Лучшее живое выступление».\n[править]2001—2003: Вершина карьеры\n\n\nИсполняя «Me Against the Music»\nУспех Спирс сделал её заметной фигурой и в музыкальной индустрии, и в поп-культуре. В начале 2001 года она привлекла внимание «Пепси», эта компания предложила ей многомиллионный контракт, включавший телевизионную рекламу и участие в промо-акциях.\nВ ноябре 2001 года вышел третий альбом Спирс — Britney. Альбом дебютировал на первом месте в США с продажами в 745 744 пластинок за первую неделю, что сделало Бритни первой в истории исполнительницей, чьи первые три альбома стартовали на вершине рейтинга. Сразу же после выхода альбома Спирс отправилась в тур Dream Within a Dream Tour, по окончании которого объявила, что хочет взять 6-месячный перерыв в карьере.\nВ этом же году Спирс рассталась с солистом 'N Sync Джастином Тимберлейком, с которым встречалась 4 года.\nБритни вернулась на сцену в августе 2003 года.\nВ ноябре 2003 года вышел четвёртый студийный альбом Спирс In The Zone. Бритни участвовала в написании восьми из тринадцати композиций, а также выступила в качестве продюсера альбома. In The Zone дебютировал на первом месте в США, что сделало Бритни первой в истории исполнительницей, чьи первые четыре альбома стартовали на вершине рейтинга. Самый успешный сингл с альбома — Toxic — принёс Бритни первую для неё награду Грэмми в категории «Лучшая танцевальная композиция».\n[править]2007—2008: Возвращение к музыке\nВ начале 2007 года после двухлетнего перерыва Спирс приступила к записи нового сольного альбома, продюсерами которого выступили Nate «Danja» Hills, Шон Гарретт и Джонатан Ротэм.\nВ мае 2007 года Спирс в составе коллектива «The M and M’s» дала 6 концертов в рамках тура «House of Blues» в Лос-Анджелесе, Сан-Диего, Анахайме, Лас-Вегасе, Орландо и Майами. Каждый концерт длился около 15 минут и включал 5 старых хитов певицы.[4]\n30 августа 2007 года на волнах нью-йоркской радиостанции Z100 состоялась премьера песни «Gimme More», первого сингла с нового альбома Спирс.[5] Сингл вышел на iTunes 24 сентября и на CD 29 октября 2007.\n9 сентября 2007 года Спирс исполнила «Gimme More» на церемонии вручения наград MTV Video Music Awards. Выступление оказалось неудачным; Спирс выглядела непрофессионально — не всегда попадала в фонограмму и в танце отставала от группы хореографической поддержки.[6]\nНесмотря на это, в начале октября 2007 года сингл «Gimme More» достиг 3-го места в чарте Billboard Hot 100, став таким образом одним из самых успешных синглов Спирс.[7]"];
  it('unicode', echoFactory(transport, messages, url + '/echo'));
};

module.exports.echoSpecialChars = function echoSpecialChars(url, transport) {
  var messages = [" ", "\u0000", "\xff", "\xff\x00", "\x00\xff", " \r ", " \n ", " \r\n ", "\r\n", "", "message\t", "\tmessage", "message ", " message", "message\r", "\rmessage", "message\n", "\nmessage", "message\xff", "\xffmessage", "A", "b", "c", "d", "e", "\ufffd", "\ufffd\u0000", "message\ufffd", "\ufffdmessage"];
  it('special chars', echoFactory(transport, messages, url + '/echo'));
};
/* eslint-enable quotes */

module.exports.echoLargeMessage = function echoLargeMessage(url, transport) {
  var messages = [new Array(Math.pow(2, 1)).join('x'), new Array(Math.pow(2, 2)).join('x'), new Array(Math.pow(2, 4)).join('x'), new Array(Math.pow(2, 8)).join('x'), new Array(Math.pow(2, 13)).join('x'), new Array(Math.pow(2, 13)).join('x')];
  it('large message (ping-pong)', echoFactory(transport, messages, url + '/echo'));
};

module.exports.echoUtfEncodingSimple = function echoUtfEncodingSimple(url, transport) {
  var chars = [];
  for (var i = 0; i <= 256; i++) {
    chars.push(String.fromCharCode(i));
  }
  it('echo utf encoding 0x00-0xFF', echoFactory(transport, [chars.join('')], url + '/echo'));
};

// eslint-disable-next-line no-control-regex, no-useless-escape
var escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u2000-\u20ff\ufeff\ufff0-\uffff\x00-\x1f\ufffe\uffff\u0300-\u0333\u033d-\u0346\u034a-\u034c\u0350-\u0352\u0357-\u0358\u035c-\u0362\u0374\u037e\u0387\u0591-\u05af\u05c4\u0610-\u0617\u0653-\u0654\u0657-\u065b\u065d-\u065e\u06df-\u06e2\u06eb-\u06ec\u0730\u0732-\u0733\u0735-\u0736\u073a\u073d\u073f-\u0741\u0743\u0745\u0747\u07eb-\u07f1\u0951\u0958-\u095f\u09dc-\u09dd\u09df\u0a33\u0a36\u0a59-\u0a5b\u0a5e\u0b5c-\u0b5d\u0e38-\u0e39\u0f43\u0f4d\u0f52\u0f57\u0f5c\u0f69\u0f72-\u0f76\u0f78\u0f80-\u0f83\u0f93\u0f9d\u0fa2\u0fa7\u0fac\u0fb9\u1939-\u193a\u1a17\u1b6b\u1cda-\u1cdb\u1dc0-\u1dcf\u1dfc\u1dfe\u1f71\u1f73\u1f75\u1f77\u1f79\u1f7b\u1f7d\u1fbb\u1fbe\u1fc9\u1fcb\u1fd3\u1fdb\u1fe3\u1feb\u1fee-\u1fef\u1ff9\u1ffb\u1ffd\u2000-\u2001\u20d0-\u20d1\u20d4-\u20d7\u20e7-\u20e9\u2126\u212a-\u212b\u2329-\u232a\u2adc\u302b-\u302c\uaab2-\uaab3\uf900-\ufa0d\ufa10\ufa12\ufa15-\ufa1e\ufa20\ufa22\ufa25-\ufa26\ufa2a-\ufa2d\ufa30-\ufa6d\ufa70-\ufad9\ufb1d\ufb1f\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40-\ufb41\ufb43-\ufb44\ufb46-\ufb4e]/g;
module.exports.echoUtfEncoding = function echoUtfEncoding(url, transport) {
  var chars = [], message = [];
  for (var i = 0; i <= 65536; i++) {
    chars.push(String.fromCharCode(i));
  }
  escapable.lastIndex = 0;
  chars.join('').replace(escapable, function (a) {
    message.push(a);
    return '';
  });
  it('echo utf encoding killer message', echoFactory(transport, [message.join('')], url + '/echo'));
};

module.exports.echoFromChild = function echoFromChild(url, transport) {
  if (!iframeUtils.iframeEnabled) {
    it('echo from child [unsupported]');
    return;
  }

  it('echo from child', function (done) {
    this.timeout(10000);

    var test = this.runnable();
    var title = test.fullTitle();
    debug('start', title);
    var hook = testUtils.createIframe('/sockjs-test/sockjs-in-parent.html');
    var sjs = testUtils.newSockJs(url + '/echo', transport);
    var code = 'hook.sjs.send("a"); hook.onsend();';
    var hookReady, sockJsReady, timeout, i = 0;

    hook.open = function() {
      debug('hook open');
      hook.iobj.loaded();
      i++;
      hookReady = true;
      hook.sjs = sjs;
      if (sockJsReady) {
        hook.callback(code);
      }
    };
    hook.onsend = function () {
      debug('hook onsend');
      timeout = setTimeout(function() {
        done(new Error('echo timeout'));
        sjs.close();
        debug('end', title);
      }, 1000);
    };

    sjs.onopen = function() {
      debug('hook sjs open');
      hook.iobj.loaded();
      i++;
      sockJsReady = true;
      if (hookReady) {
        hook.callback(code);
      }
    };
    sjs.onmessage = function(e) {
      debug('hook sjs message, e.data');
      clearTimeout(timeout);
      try {
        expect(e.data).to.equal('a');
        expect(i).to.equal(2);
      } catch (err) {
        done(err);
      } finally {
        hook.iobj.cleanup();
        hook.del();
        sjs.close();
      }
    };
    sjs.onclose = function(e) {
      if (test.timedOut || test.duration) {
        return;
      }

      try {
        expect(e.code).to.equal(1000);
      } catch (err) {
        done(e);
        return;
      }
      debug('hook sjs close');
      done();
      debug('end', title);
    };
  });
};
