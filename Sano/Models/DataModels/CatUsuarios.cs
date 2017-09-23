using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Sano.Models.DataModels
{
    public class CatUsuarios
    {
        public int idUsuario { get; set; }
        public string Usuario { get; set; }
        public string Password { get; set; }
        public string Nombre { get; set; }
        public string ApellidoPaterno { get; set; }
        public string ApellidoMaterno { get; set; }
        public string Email { get; set; }
        public Nullable<DateTime> FechaNacimiento { get; set; }
        public byte Estatus { get; set; }
    }
}