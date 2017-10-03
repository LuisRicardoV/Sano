using System;
using System.Security.Claims;
using System.Web.Mvc;
using Microsoft.AspNet.Identity;
using Microsoft.Owin.Security;
using Sano.Models.AppModels;
using Sano.Models.DataModels;
using Sano.Repository;
using System.Collections.Generic;

namespace Sano.Controllers.Cuenta
{
    public class CuentaController : Controller
    {
        private readonly IAuthenticationManager _auth;
        private readonly CuentaModel _accountServices;


        public CuentaController(IAuthenticationManager auth, CuentaModel accountServices)
        {
            this._auth = auth;
            this._accountServices = accountServices;
        }
        
        [AllowAnonymous]
        public ActionResult IniciarSesion(string returnUrl)
        {

            ViewBag.ReturnUrl = returnUrl;
            return View();
        }

        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public ActionResult IniciarSesion(CuentaModel cuenta)
        {
            CatUsuarios objCatUsuarios = new CatUsuarios();

            try
            {


                using (CuentaRepository repository = new CuentaRepository())
                {
                    objCatUsuarios = repository.Login(cuenta.Usuario, cuenta.Password);
                }

                if (objCatUsuarios != null){

                    List<Claim> claim = new List<Claim>();
                    claim.Add(new Claim(ClaimTypes.Name, objCatUsuarios.Nombre.ToString()));
                    claim.Add(new Claim("idUsuario", objCatUsuarios.idUsuario.ToString()));
                    claim.Add(new Claim("Usuario", objCatUsuarios.Usuario.ToString()));
                    claim.Add(new Claim("Nombre", objCatUsuarios.Nombre.ToString()));
                    claim.Add(new Claim("ApellidoPaterno", objCatUsuarios.ApellidoPaterno.ToString()));
                    claim.Add(new Claim("ApellidoMaterno", objCatUsuarios.ApellidoMaterno.ToString()));
                    claim.Add(new Claim("Email", objCatUsuarios.Email.ToString()));
                    claim.Add(new Claim("FechaNacimiento", objCatUsuarios.FechaNacimiento.ToString()));
                    var imagen = Convert.ToBase64String(objCatUsuarios.imagenUsuario);
                    claim.Add(new Claim("imagenUsuario", imagen));


                    var identity = new ClaimsIdentity(claim, DefaultAuthenticationTypes.ApplicationCookie);
                    this._auth.SignIn(new AuthenticationProperties { IsPersistent = false }, identity);

                    //using (CatOpcionesRepository repo = new CatOpcionesRepository())
                    //{
                    //    Session["Menu"] = repo.getCatOpcionesMenu(objCatUsuarios.idRol);
                    //}

                    //using (CuentaRepository repository = new CuentaRepository())
                    //{ 
                    //    byte[] data = System.IO.File.ReadAllBytes("C:\\z\\avatar-1.jpg");
                    //    repository.UpdateImagenUsuario(objCatUsuarios.idUsuario, data);
                    //}

                    


                    return Json(new { success = true});

                }
                return Json(new { success = false , message = "101. Ha ocurrido un error, intente mas tarde." });
            }

            catch (Exception e){

                return Json(new { success = false, message = "102. " + e.Message });
            }
            finally {

                objCatUsuarios = null;

            }
         
        }


        [HttpPost]
        public ActionResult CerrarSesion()
        {
            this._auth.SignOut();
            return RedirectToAction("IniciarSesion", "Cuenta");
        }

      
    }
}