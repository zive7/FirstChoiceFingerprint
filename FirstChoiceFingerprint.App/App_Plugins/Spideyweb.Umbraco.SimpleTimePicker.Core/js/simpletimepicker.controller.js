function timePickerController($scope, assetsService, angularHelper, userService, $element, dateHelper) {
    //setup the default config
    const config = {
        pickDate: false,
        pickTime: true,
        useSeconds: false,
            format: 'HH:mm',
            icons: {
                time: 'icon-time',
                date: 'icon-calendar',
                up: 'icon-chevron-up',
                down: 'icon-chevron-down'
            }
        };
        //map the user config
        $scope.model.config = angular.extend(config, $scope.model.config);
        //ensure the format doesn't get overwritten with an empty string
        if ($scope.model.config.format === '' || $scope.model.config.format === undefined || $scope.model.config.format === null) {
            $scope.model.config.format = 'HH:mm';
        }
        $scope.hasDatetimePickerValue = $scope.model.value ? true : false;
        $scope.datetimePickerValue = null;
        //hide picker if clicking on the document
        $scope.hidePicker = function () {
            const dtp = $element.find('div:first');
            if (dtp && dtp.datetimepicker) {
                dtp.datetimepicker('hide');
            }
        };
        $(document).bind('click', $scope.hidePicker);
        //here we declare a special method which will be called whenever the value has changed from the server
        //this is instead of doing a watch on the model.value = faster
        $scope.model.onValueChanged = function (newVal, oldVal) {
            if (newVal !== oldVal) {
                //check for c# System.DateTime.MinValue being passed as the clear indicator
                const minDate = moment('0001-01-01');
                const newDate = moment(newVal);
                if (newDate.isAfter(minDate)) {
                    applyDate({ date: moment(newVal) });
                } else {
                    $scope.clearDate();
                }
            }
        };
        //handles the date changing via the api
        function applyDate(e) {
            angularHelper.safeApply($scope, function () {
                // when a date is changed, update the model
                if (e.date && e.date.isValid()) {
                    $scope.datePickerForm.datepicker.$setValidity('pickerError', true);
                    $scope.hasDatetimePickerValue = true;
                    $scope.datetimePickerValue = e.date.format($scope.model.config.format);
                } else {
                    $scope.hasDatetimePickerValue = false;
                    $scope.datetimePickerValue = null;
                }
                setModelValue();
                if (!$scope.model.config.pickTime) {
                    $element.find('div:first').datetimepicker('hide', 0);
                }
            });
        }
        //sets the scope model value accordingly - this is the value to be sent up to the server and depends on
        // if the picker is configured to offset time. We always format the date/time in a specific format for sending
        // to the server, this is different from the format used to display the date/time.
        function setModelValue() {
            if ($scope.hasDatetimePickerValue) {
                const elementData = $element.find('div:first').data().DateTimePicker;

                $scope.model.value = elementData.getDate().format('HH:mm');
            } else {
                $scope.model.value = null;
            }
        }
        $scope.clearDate = function () {
            $scope.hasDatetimePickerValue = false;
            $scope.datetimePickerValue = null;
            $scope.model.value = null;
            $scope.datePickerForm.datepicker.$setValidity('pickerError', true);
        };
        //get the current user to see if we can localize this picker
        userService.getCurrentUser().then(function (user) {
            assetsService.loadCss('lib/datetimepicker/bootstrap-datetimepicker.min.css', $scope).then(function () {
                const filesToLoad = ['lib/datetimepicker/bootstrap-datetimepicker.js'];
                $scope.model.config.language = user.locale;
                assetsService.load(filesToLoad, $scope).then(function () {
                    //The Datepicker js and css files are available and all components are ready to use.
                    // Get the id of the datepicker button that was clicked
                    const element = $element.find('div:first');
                    // Open the datepicker and add a changeDate eventlistener
                    element.datetimepicker(angular.extend({ useCurrent: $scope.model.config.defaultEmpty !== '1' }, $scope.model.config)).on('dp.change', applyDate).on('dp.error', function (a, b, c) {
                        $scope.hasDatetimePickerValue = false;
                        $scope.datePickerForm.datepicker.$setValidity('pickerError', false);
                    });
                    if ($scope.hasDatetimePickerValue) {
                        let dateVal;
                        //check if we are supposed to offset the time
                        if ($scope.model.value && $scope.model.config.offsetTime === '1' && $scope.serverTimeNeedsOffsetting) {
                            //get the local time offset from the server
                            dateVal = dateHelper.convertToLocalMomentTime($scope.model.value, Umbraco.Sys.ServerVariables.application.serverTimeOffset);
                            $scope.serverTime = dateHelper.convertToServerStringTime(dateVal, Umbraco.Sys.ServerVariables.application.serverTimeOffset, 'YYYY-MM-DD HH:mm:ss Z');
                        } else {
                            //create a normal moment , no offset required
                            dateVal = $scope.model.value ? moment($scope.model.value, 'HH:mm') : moment();
                        }
                        element.datetimepicker('setValue', dateVal);
                        $scope.datetimePickerValue = dateVal.format($scope.model.config.format);
                    }
                    element.find('input').bind('blur', function () {
                        //we need to force an apply here
                        $scope.$apply();
                    });
                    //Ensure to remove the event handler when this instance is destroyted
                    $scope.$on('$destroy', function () {
                        element.find('input').unbind('blur');
                        element.datetimepicker('destroy');
                    });
                    var unsubscribe = $scope.$on('formSubmitting', function (ev, args) {
                        setModelValue();
                    });
                    //unbind doc click event!
                    $scope.$on('$destroy', function () {
                        unsubscribe();
                    });
                });
            });
        });
        var unsubscribe = $scope.$on('formSubmitting', function (ev, args) {
            setModelValue();
        });
        //unbind doc click event!
        $scope.$on('$destroy', function () {
            $(document).unbind('click', $scope.hidePicker);
            unsubscribe();
        });
    }
angular.module('umbraco').controller('Spideyweb.Umbraco.SimpleTimePicker.Controller', timePickerController);