using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Sano.Models.AppModels
{
    public class ExceptionsModel
    {
        public int CodError { get; set; }
        public string Message { get; set; }
        public string InnerException { get; set; }
        public int idUsuario { get; set; }
        public string Usuario { get; set; }
    }
}