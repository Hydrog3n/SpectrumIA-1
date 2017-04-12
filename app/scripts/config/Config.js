(function () {
    function Config() {
        var config;

        this.useConfig = function (conf) {
            config = conf;
        };

        this.$get = function () {
            return config;
        };
    }

    angular.module('spectrumIaApp').provider('Config', Config);
}());