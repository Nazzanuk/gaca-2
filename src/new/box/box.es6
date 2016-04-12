app.directive('boxItem', () => ({
    controllerAs: 'box',
    templateUrl: 'box-item.html',
    bindToController: true,
    transclude: true,
    scope: {
        header: '@',
        styleClass: '@',
        icon: '@',
        active: '='
    },
    controller: function ($scope, $element, $timeout) {
        var visible = false;

        this.active = this.active == undefined ? false : this.active;

        //var showPopup = function () {
        //    PopupService.setPopupHeader($element.find('.popup-title').text());
        //    PopupService.setPopupContent($element.find('.popup-content').html());
        //    PopupService.showPopup();
        //};

        var changeActive = () => {
            this.active = !this.active;

            console.log('zzz');
            $timeout(() => google.maps.event.trigger(map, 'resize'), 50);
        };

        var init = () => {
            $timeout(() => visible = true);
        };

        init();

        _.extend(this, {
            changeActive,
            isVisible:() => visible
            //showPopup
        });
    }
}));