namespace FirstChoiceFingerprint.App.Models
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    public class CreateBookRequest
    {
        public DateTime AppointmentDate { get; set; }
        
        public string Name { get; set; }
        
        public string Phone { get; set; }
        
        public string Email { get; set; }

        public DateTime DateOfBirth { get; set; }

        public string State { get; set; }

        public string City { get; set; }

        public string ZipCode { get; set; }

        public string ApplicantName { get; set; }

        public string HasConfirmedCorrectnessOfDatas { get; set; }

        public string GenderType { get; set; }

        public string RaceType { get; set; }

        public string CopyType { get; set; }

        public string HeightInFeet { get; set; }

        public string HeightInInches { get; set; }

        public string Weight { get; set; }

        public string HairColorDescription { get; set; }

        public string EyeColorDescription { get; set; }

        public string ResultType { get; set; }

        public string OtherCopyText { get; set; }
        
        public string Reason { get; set; }

        public string BciAndFbiPayNowAnswerType { get; set; }

        public string FbiPayNowAnswerType { get; set; }

        public string BciPayNowAnswerType { get; set; }
    }
}
