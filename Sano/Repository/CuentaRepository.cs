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
    public class CuentaRepository : IDisposable
    {
        private DataBaseContext context;
        private bool disposed = false;

       public CuentaRepository()
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

        public CatUsuarios Login(string Usuario,string Pass)
        {
            List<SqlParameter> param = new List<SqlParameter>();
            try
            {
                param.Add(new SqlParameter("@Usuario", !string.IsNullOrEmpty(Usuario) ? (object)Usuario : DBNull.Value));
                param.Add(new SqlParameter("@Pass", !string.IsNullOrEmpty(Pass) ? (object)Pass : DBNull.Value));

                return context.Database.SqlQuery<CatUsuarios>("exec dbo.Cuenta_Login_Get @Usuario,@Pass", param.ToArray()).FirstOrDefault();
            }
            catch (Exception)
            {
                throw;
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

        ~CuentaRepository()
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