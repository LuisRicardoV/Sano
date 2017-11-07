
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Threading.Tasks;
using System.Security.Claims;
using System.Threading;

namespace Sano.Helpers
{
    public class Identify
    { 
        public static DatosDeUsuario ObtieneDatosUsuario(ClaimsPrincipal user)
        {
            DatosDeUsuario usuario = new DatosDeUsuario();

            usuario.idUsuario = Convert.ToInt32(  user.Claims.Where(c => c.Type == "idUsuario").Select(c => c.Value).SingleOrDefault()); ;
            usuario.Usuario = user.Claims.Where(c => c.Type == "Usuario").Select(c => c.Value).SingleOrDefault();
            usuario.Nombre = user.Claims.Where(c => c.Type == "Nombre").Select(c => c.Value).SingleOrDefault();
            usuario.ApellidoPaterno = user.Claims.Where(c => c.Type == "ApellidoPaterno").Select(c => c.Value).SingleOrDefault();
            usuario.ApellidoMaterno = user.Claims.Where(c => c.Type == "ApellidoMaterno").Select(c => c.Value).SingleOrDefault();
            usuario.Email = user.Claims.Where(c => c.Type == "Email").Select(c => c.Value).SingleOrDefault();
            usuario.FechaNacimiento = Convert.ToDateTime(user.Claims.Where(c => c.Type == "FechaNacimiento").Select(c => c.Value).SingleOrDefault());
            usuario.imagenUsuario = user.Claims.Where(c => c.Type == "imagenUsuario").Select(c => c.Value).SingleOrDefault();

            return usuario;
        }
        public class DatosDeUsuario
        {
            public int idUsuario { get; set; }
            public string Usuario { get; set; }
            public string Password { get; set; }
            public string Nombre { get; set; }
            public string ApellidoPaterno { get; set; }
            public string ApellidoMaterno { get; set; }
            public string Email { get; set; }
            public DateTime FechaNacimiento { get; set; }
            public byte Estatus { get; set; }
            public string imagenUsuario { get; set; }

        }
    }
}


