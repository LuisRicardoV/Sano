using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Sano.Helpers;
using Sano.Models.DataModels;
using Sano.Repository;
using Sano.Models.AppModels;
using System.IO;
using System.Drawing;

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
            catusuario.imagenUsuario = objUsuario.imagenUsuario;

            return View(catusuario);
        }

        [Authorize]
        public JsonResult GuardarDatos(CatUsuarios content)
        {
            try
            {
                if (!User.Identity.IsAuthenticated)
                {
                    return Json(new { success = false, message = "Usuario no autentificado" });
                }


                using (ConfiguracionRepository cx = new ConfiguracionRepository())
                {
                    content.idUsuario = objUsuario.idUsuario;
                    cx.GuardarDatos(content);
                }

                return Json(new { success = true, message = "Registro actualizado." });

            }
            catch (Exception e)
            {
                Bitacoras.Exceptions(new ExceptionsModel { CodError = 103, Message = e.Message, InnerException = Bitacoras.GetExceptionMessages(e), idUsuario = objUsuario.idUsuario, Usuario = objUsuario.Usuario });
                return Json(new { success = false, message = "103. No se han guardaron los cambios, intente luego." });
            }
        }


        [Authorize]
        [HttpPost]
        public JsonResult GuardarImagen()
        {
            // Checking no of files injected in Request object  
            if (Request.Files.Count > 0)
            {
                try
                {
                    //  Get all files from Request object  
                    HttpFileCollectionBase files = Request.Files;
                    for (int i = 0; i < files.Count; i++)
                    {
                        HttpPostedFileBase file = files[i];
                        string fname;
                        // Checking for Internet Explorer  
                        if (Request.Browser.Browser.ToUpper() == "IE" || Request.Browser.Browser.ToUpper() == "INTERNETEXPLORER")
                        {
                            string[] testfiles = file.FileName.Split(new char[] { '\\' });
                            fname = testfiles[testfiles.Length - 1];
                        }
                        else
                        {
                            fname = file.FileName;
                        }


                        System.Drawing.Image imageToBeResized = System.Drawing.Image.FromStream(file.InputStream);
                        int imageHeight = imageToBeResized.Height;
                        int imageWidth = imageToBeResized.Width;
                        int maxHeight = 256;
                        int maxWidth = 256;
                        imageHeight = (imageHeight * maxWidth) / imageWidth;
                        imageWidth = maxWidth;
                        if (imageHeight > maxHeight)
                        {
                            imageWidth = (imageWidth * maxHeight) / imageHeight;
                            imageHeight = maxHeight;
                        }
                        Bitmap bitmap = new Bitmap(imageToBeResized, imageWidth, imageHeight);
                        System.IO.MemoryStream stream = new MemoryStream();
                        bitmap.Save(stream, System.Drawing.Imaging.ImageFormat.Jpeg);
                        stream.Position = 0;
                        byte[] image = new byte[stream.Length + 1];
                        stream.Read(image, 0, image.Length);
                        string filename = Encriptacion.Encriptar( "Perfil" + objUsuario.idUsuario);

                        System.IO.File.WriteAllBytes(Server.MapPath("/Perfil_images/" + filename + ".jpg"), stream.ToArray());

                        using (CuentaRepository repository = new CuentaRepository())
                        {
                            repository.UpdateImagenUsuario(objUsuario.idUsuario, filename);
                        }
                    }



                    return Json(new { success = true, message = "File Uploaded Successfully!" });
                }
                catch (Exception ex)
                {
                    return Json(new { success = false, message = "Error occurred. Error details: " + ex.Message });
                }
            }
            else
            {

                return Json(new { success = false, message = "No files selected."});
                
            }
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