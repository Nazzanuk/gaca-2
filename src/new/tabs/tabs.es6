app.directive('tabsItem', () => ({
    controllerAs: 'tabs',
    templateUrl: 'tabs-item.html',
    bindToController: true,
    transclude: true,
    scope: { },
    controller: function ($element, $timeout, Translation) {

        var tabs = [], currentTab = 0;

        var getTabs = () => {
            $element.find('[tab-content]').each(function () {
               tabs.push($(this).attr('tab-content'));
            });
            $timeout(setTab);
        };



        var setTab = (index = 0) => {
            currentTab = index;
            $(`[tab-content]`).removeClass('active');
            $(`[tab-content='${tabs[currentTab]}']`).addClass('active');
        };

        var init = () => {
            $timeout(getTabs);
        };

        init();

        _.extend(this, {
            getTabs: () => tabs,
            getTab: () => currentTab,
            setTab
        });
    }
}));