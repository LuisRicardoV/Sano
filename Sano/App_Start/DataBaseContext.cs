using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Sano.App_Start
{
    public class DataBaseContext : DbContext
    {
        public DataBaseContext()
        {
            this.Database.Connection.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
        }

    }
}