using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Sano.Helpers;
using Sano.Models.DataModels;

namespace Sano.Controllers
{
    public class ConfiguracionController : BaseController
    {
        [Authorize]
        public ActionResult DatosCuenta()
        {
            CatUsuarios catusuario = new CatUsuarios();

            catusuario.Usuario = objUsuario.Usuario;
            catusuario.Nombre = objUsuario.Nombre;
            catusuario.ApellidoPaterno = objUsuario.ApellidoPaterno;
            catusuario.ApellidoMaterno = objUsuario.ApellidoMaterno;
            catusuario.Email = objUsuario.Email;
            catusuario.FechaNacimiento = objUsuario.FechaNacimiento;
          

            return View(catusuario);
        }
    }
}

//@{
//    var claimsIdentity = User.Identity as System.Security.Claims.ClaimsIdentity;
//var imgSrc = "";
//var Nombre = "";
//    if (claimsIdentity != null)
//    {
//      var imagenUsuario = claimsIdentity.Claims.Where(x => x.Type == "imagenUsuario").Select(x => x.Value).SingleOrDefault();
//Nombre = claimsIdentity.Claims.Where(x => x.Type == "Nombre").Select(x => x.Value).SingleOrDefault();
//imgSrc = String.Format("data:image/gif;base64,{0}", imagenUsuario);
//    }
//}