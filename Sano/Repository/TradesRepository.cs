using Sano.App_Start;
using Sano.Models.AppModels;
using Sano.Models.DataModels;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace Sano.Repository
{
    public class TradesRepository : IDisposable
    {
        private DataBaseContext context;
        private bool disposed = false;

        public TradesRepository()
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

        public void SaveTrades(List<trade> list)
        {
            List<SqlParameter> listSqlParameter = new List<SqlParameter>();
            try
            {
                DataTable table = new DataTable("trades");
                table.Columns.Add("tid", typeof(int));
                table.Columns.Add("book", typeof(string));
                table.Columns.Add("maker_side", typeof(string));
                table.Columns.Add("created_at", typeof(DateTime));
                table.Columns.Add("amount", typeof(decimal));
                table.Columns.Add("price", typeof(decimal));


                if (list != null)
                {
                    foreach (var item in list)
                    {
                        table.Rows.Add(item.tid, item.book, item.maker_side, item.created_at, item.amount, item.price);
                    }

                    listSqlParameter.Add(new SqlParameter { ParameterName = "@trades", SqlDbType = SqlDbType.Structured, Value = table, TypeName = "dbo.trades" });
                    context.Database.ExecuteSqlCommand("exec dbo.uspTrades_ins @trades", listSqlParameter.ToArray());
                }


            }
            catch (Exception ex)
            {
                throw ex;
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

        ~TradesRepository()
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