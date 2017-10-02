using Sano.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading;
using System.Web;
using System.Web.Mvc;
using static Sano.Helpers.Identify;

namespace Sano.Helpers
{
    public class BaseController : Controller
    {
        protected DatosDeUsuario objUsuario;

        public BaseController()
        {
            try
            {
                objUsuario = Identify.ObtieneDatosUsuario((ClaimsPrincipal)Thread.CurrentPrincipal);
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}



