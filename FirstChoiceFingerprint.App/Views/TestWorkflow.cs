namespace FirstChoiceFingerprint.App.Views
{
    using System;
    using System.Collections.Generic;
    using Umbraco.Forms.Core;
    using Umbraco.Forms.Core.Enums;
    using Umbraco.Forms.Core.Persistence.Dtos;

    public class TestWorkflow : WorkflowType
    {
        public TestWorkflow()
        {
            this.Id = new Guid("1cbeb0d5-adaa-4729-8b4c-4bb439dc0202");
            this.Name = "TestWorkflow";
            this.Description = "This workflow is just for testing";
            this.Icon = "icon-chat-active";
            this.Group = "Services";
        }

        public override WorkflowExecutionStatus Execute(WorkflowExecutionContext context)
        {
            // first we log it

            // we can then iterate through the fields
            foreach (RecordField rf in context.Record.RecordFields.Values)
            {
                // and we can then do something with the collection of values on each field
                List<object> vals = rf.Values;

                // or get it as a string
                rf.ValuesAsString();
            }

            //Change the state
            context.Record.State = FormState.Approved;

            return WorkflowExecutionStatus.Completed;
        }

        public override List<Exception> ValidateSettings()
        {
            return new List<Exception>();
        }
    }
}