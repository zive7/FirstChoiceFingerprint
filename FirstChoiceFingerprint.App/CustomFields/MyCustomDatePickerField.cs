namespace FirstChoiceFingerprint.App.CustomFields
{
    using Microsoft.AspNetCore.Http;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Umbraco.Forms.Core.Enums;
    using Umbraco.Forms.Core.Models;
    using Umbraco.Forms.Core.Services;

    public class MyCustomDatePickerField : Umbraco.Forms.Core.FieldType
    {
        public MyCustomDatePickerField()
        {
            this.Id = new Guid("266e0a85-27d2-4e54-b8cc-7556c11ad0a1");
            this.Name = "MyCustomDatePickerField";
            this.Description = "Render a date picker field.";
            this.Icon = "icon-calendar";
            this.DataType = FieldDataType.String;
            this.SortOrder = 10;
            this.SupportsMandatory = true;
            this.SupportsRegex = false;
        }

        public override IEnumerable<object> ConvertToRecord(Field field, IEnumerable<object> postedValues, HttpContext context)
        {
            List<Object> convertedValues = new()
            {
                postedValues?.LastOrDefault()?.ToString() ?? string.Empty
            };

            postedValues = convertedValues;

            return base.ConvertToRecord(field, postedValues, context);
        }

        public override IEnumerable<object> ConvertFromRecord(Field field, IEnumerable<object> storedValues)
        {
            List<Object> convertedValues = new()
            {
                storedValues?.LastOrDefault()?.ToString() ?? string.Empty
            };

            storedValues = convertedValues;

            return base.ConvertFromRecord(field, storedValues);
        }


        public override IEnumerable<string> ValidateField(Form form, Field field, IEnumerable<object> postedValues, HttpContext context, IPlaceholderParsingService placeholderParsingService)
        {
            var returnStrings = new List<string>();

            if (!DateTime.TryParse(postedValues.LastOrDefault()?.ToString(), out DateTime myDate))
            {
                returnStrings.Add("Please select a valid date.");
            }
            else
            {
                if (myDate.DayOfWeek == DayOfWeek.Saturday || myDate.DayOfWeek == DayOfWeek.Sunday)
                {
                    returnStrings.Add("We are not working on weekends! Please select valid working period.");
                }
            }

            // Also validate it against the original default method.
            returnStrings.AddRange(base.ValidateField(form, field, postedValues, context, placeholderParsingService));

            return returnStrings;
        }

        public override string GetDesignView() => "~/App_Plugins/UmbracoFormsCustomFields/backoffice/Common/FieldTypes/mycustomdatepickerfield.html";
    }
}
