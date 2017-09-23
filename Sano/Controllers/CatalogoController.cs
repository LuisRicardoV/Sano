using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Sano.Controllers
{
    public class CatalogoController : Controller
    {
        [Authorize]
        public ActionResult Pais()
        {
            return View();
        }



    }
}