(function() {

    //execute init() on document ready
    if (document.readyState === "complete" || (document.readyState !== "loading" && !document.documentElement.doScroll)) {
        listen();
    } else {
        document.addEventListener("DOMContentLoaded", listen);
    }

    function listen() {

        // Inline script setting umbracoFormsLocale was removed in 8.11/9.3, and replaced by a config element.
        // So if we have that, use it, otherwise fall-back to legacy method.
        var configElement = document.getElementById("umbraco-forms-date-picker-config");
        if (configElement) {
            var umbracoFormsLocaleFromConfig = {
                name: configElement.dataset.name,
                datePickerYearRange: configElement.dataset.yearRange,
                locales: {
                    previousMonth: configElement.dataset.previousMonth,
                    nextMonth: configElement.dataset.nextMonth,
                    months: configElement.dataset.months.split(','),
                    weekdays: configElement.dataset.weekdays.split(','),
                    weekdaysShort: configElement.dataset.weekdaysShort.split(',')
                }
            };
            init({ umbracoFormsLocale: umbracoFormsLocaleFromConfig });
        } else {
            if (typeof umbracoFormsLocale === "undefined") {
                //this will occur if this js file is loaded before the inline scripts, in which case
                //we'll listen for the inline scripts to execute a custom event.
                document.addEventListener("umbracoFormsLocaleLoaded", init);
            }
            else {
                init({ umbracoFormsLocale: umbracoFormsLocale });
            }
        }
    }

    function init(e) {

        if (typeof moment === "undefined") {
            throw "moment lib has not been loaded";
        }

        moment.locale(e.umbracoFormsLocale.name);

        var datePickerFields = document.getElementsByClassName('datepickerfield');
        for (var i = 0; i < datePickerFields.length; i++) {
            var field = datePickerFields[i];
            new Pikaday({
                field: field,
                yearRange: e.umbracoFormsLocale.datePickerYearRange,
                i18n: e.umbracoFormsLocale.locales,
                format: "LL",
                onSelect: function (date) {
                    setShadow(this, date);
                    var evt = document.createEvent("HTMLEvents");
                    evt.initEvent("input", false, true);
                    this._o.field.dispatchEvent(evt);
                },
                minDate: new Date('1753-01-01T00:00:00'), //Min value of datetime in SQL Server CE
                defaultDate: new Date(field.value),
                setDefaultDate: true
            });
        }

        function setShadow(pickaday, date) {
            var id = pickaday._o.field.id.replace("_1", "");
            var value = moment(date).format('YYYY-MM-DD');
            var field = document.getElementById(id);
            field.value = value;
        }
    }

})();

