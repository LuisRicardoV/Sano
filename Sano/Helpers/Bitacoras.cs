using Sano.Models.AppModels;
using Sano.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Sano.Helpers
{
    public  static class Bitacoras
    {
        public static void Exceptions(ExceptionsModel ex)
        {
            using (BitacorasRepository  cx = new BitacorasRepository())
            {
                cx.Exceptions(ex);
            }
        }

        public static string GetExceptionMessages(this Exception e)
        {
            string msgs = "";
            if (e == null) return string.Empty;
            if (e.InnerException != null)
                msgs += GetExceptionMessages(e.InnerException);
            return msgs;
        }

    }
}

//Bitacoras.Exceptions(new Exceptions { CodError = 103, Message = e.Message, InnerException = Bitacoras.GetExceptionMessages, idUsuario = objUsuario.idUsuario, Usuario = objUsuario.Usuario });