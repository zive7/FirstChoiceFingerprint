namespace FirstChoiceFingerprint.App.Controllers
{
    using FirstChoiceFingerprint.App.Models;
    using Microsoft.AspNetCore.Mvc;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Umbraco.Cms.Core.Cache;
    using Umbraco.Cms.Core.Logging;
    using Umbraco.Cms.Core.Routing;
    using Umbraco.Cms.Core.Services;
    using Umbraco.Cms.Core.Web;
    using Umbraco.Cms.Infrastructure.Persistence;
    using Umbraco.Cms.Web.Common.Controllers;
    using Umbraco.Cms.Web.Common.Filters;
    using Umbraco.Cms.Web.Website.Controllers;

    public class BookNowFormController : SurfaceController
    {
        public BookNowFormController(
            IUmbracoContextAccessor umbracoContextAccessor,
            IUmbracoDatabaseFactory databaseFactory,
            ServiceContext services,
            AppCaches appCaches,
            IProfilingLogger profilingLogger,
            IPublishedUrlProvider publishedUrlProvider)
            : base(umbracoContextAccessor, databaseFactory, services, appCaches, profilingLogger, publishedUrlProvider)
        {
        }

        public IActionResult Index()
        {
            return View("~/Views/BookNowForm/Index.cshtml");
        }

        [HttpPost]
        [ValidateUmbracoFormRouteString]
        public IActionResult HandleSubmit()
        {
            return RedirectToCurrentUmbracoPage();
        }


        [HttpPost]
        [Route("create")]
        public void Create(CreateBookRequest request)
        {
            var tt = request;

            var response = HttpContext.Response;
            response.Redirect("/");
        }

        [HttpPost]
        public IActionResult PostMethod()
        {
            if (!ModelState.IsValid)
            {
                return CurrentUmbracoPage();
            }

            return RedirectToCurrentUmbracoPage();
        }
    }
}
