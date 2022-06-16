namespace FirstChoiceFingerprint.App.CustomFields
{
    using Microsoft.AspNetCore.Http;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using Umbraco.Forms.Core.Enums;
    using Umbraco.Forms.Core.Models;
    using Umbraco.Forms.Core.Services;

    public class MyCustomTimePickerField : Umbraco.Forms.Core.FieldType
    {
        public MyCustomTimePickerField()
        {
            this.Id = new Guid("08b8057f-06c9-4ca5-8a42-fd1fc2a46e22"); // Replace this!
            this.Name = "MyCustomTimePickerField";
            this.Description = "Render a time picker field.";
            this.Icon = "icon-autofill";
            this.DataType = FieldDataType.String;
            this.SortOrder = 10;
            this.SupportsRegex = true;
        }

        // You can do custom validation in here which will occur when the form is submitted.
        // Any strings returned will cause the submit to be invalid!
        // Where as returning an empty ienumerable of strings will say that it's okay.
        public override IEnumerable<string> ValidateField(Form form, Field field, IEnumerable<object> postedValues, HttpContext context, IPlaceholderParsingService placeholderParsingService)
        {
            return new List<string>();
        }

        public override string GetDesignView() => "~/App_Plugins/UmbracoFormsCustomFields/backoffice/Common/FieldTypes/mycustomtimepickerfield.html";
    }
}
