app.service('Translation', ($rootScope) => {

    var currentLang = 'en', translations = [];

    var setLang = (lang) => currentLang = lang;

    var getLang = () => currentLang;

    var addTranslation = (en, ar) => translations.push({en, ar});

    var getTranslation = (en) => {
        var obj = _.findWhere(translations, {en});

        return currentLang == 'en' ? obj.en : obj.ar ? obj.ar : obj.en;
    };

    var init = () => {
        if ($('body').hasClass('arabic')) setLang('ar');
    };

    init();

    _.extend($rootScope, {
        getLang,
        tran:getTranslation
    });

    return {
        addTranslation,
        getTranslation,
        setLang
    };
});