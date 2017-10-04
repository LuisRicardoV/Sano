using Sano.App_Start;
using Sano.Models.AppModels;
using Sano.Models.DataModels;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace Sano.Repository
{
    public class BitacorasRepository : IDisposable
    {
        private DataBaseContext context;
        private bool disposed = false;

        public BitacorasRepository()
        {
            try
            {
                context = new DataBaseContext();
            }
            catch (Exception)
            {
                throw;
            }
        }

        public void Exceptions(Exceptions ex)
        {
            List<SqlParameter> param = new List<SqlParameter>();
            try
            {
                param.Add(new SqlParameter("@CodError", ex.CodError > 0 ? (object)ex.CodError : 0));
                param.Add(new SqlParameter("@Message", !string.IsNullOrEmpty(ex.Message) ? (object)ex.Message : DBNull.Value));
                param.Add(new SqlParameter("@InnerException", !string.IsNullOrEmpty(ex.InnerException) ? (object)ex.InnerException : DBNull.Value));
                param.Add(new SqlParameter("@idUsuario", ex.idUsuario > 0 ? (object)ex.idUsuario : 0));
                param.Add(new SqlParameter("@Usuario", !string.IsNullOrEmpty(ex.Usuario) ? (object)ex.InnerException : DBNull.Value));

                context.Database.SqlQuery<Exceptions>("exec dbo.Bitacora_Exceptions_Insert @CodError,@Message,@InnerException,@idUsuario,@Usuario", param.ToArray()).FirstOrDefault();
            }
            catch (Exception e)
            {
                throw e;
            }
            finally
            {
                param = null;
            }
        }

        protected virtual void Dispose(bool disposing)
        {
            try
            {
                if (!disposed)
                {
                    if (disposing)
                    {
                        context.Dispose();
                    }
                    disposed = true;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public void Dispose()
        {
            try
            {
                Dispose(true);
                GC.SuppressFinalize(this);
            }
            catch (Exception)
            {
                throw;
            }
        }

        ~BitacorasRepository()
        {
            try
            {
                Dispose(false);
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}