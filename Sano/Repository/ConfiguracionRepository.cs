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
    public class ConfiguracionRepository : IDisposable
    {
        private DataBaseContext context;
        private bool disposed = false;

        public ConfiguracionRepository()
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

        public void GuardarDatos(CatUsuarios content)
        {
            List<SqlParameter> param = new List<SqlParameter>();
            try
            {
                param.Add(new SqlParameter("@idUsuario", content.idUsuario > 0 ? (object)content.idUsuario : 0));
                param.Add(new SqlParameter("@Usuario", !string.IsNullOrEmpty(content.Usuario) ? (object)content.Usuario : "NOCAPTURADO"));
                param.Add(new SqlParameter("@Nombre", !string.IsNullOrEmpty(content.Nombre) ? (object)content.Nombre : DBNull.Value));
                param.Add(new SqlParameter("@ApellidoPaterno", !string.IsNullOrEmpty(content.ApellidoPaterno) ? (object)content.ApellidoPaterno : DBNull.Value));
                param.Add(new SqlParameter("@ApellidoMaterno", !string.IsNullOrEmpty(content.ApellidoMaterno) ? (object)content.ApellidoMaterno : DBNull.Value));
                param.Add(new SqlParameter("@Email", !string.IsNullOrEmpty(content.Email) ? (object)content.Email : DBNull.Value));
                param.Add(new SqlParameter("@FechaNacimiento", content.FechaNacimiento > DateTime.MinValue ? (object)content.FechaNacimiento : DateTime.MinValue));

                context.Database.SqlQuery<CatUsuarios>("exec dbo.Configuracion_GuardarDatos_Update @idUsuario,@Usuario,@Nombre,@ApellidoPaterno,@ApellidoMaterno,@Email,@FechaNacimiento", param.ToArray()).FirstOrDefault();
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

        ~ConfiguracionRepository()
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