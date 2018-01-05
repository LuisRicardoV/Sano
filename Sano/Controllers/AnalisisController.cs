using Sano.Models.AppModels;
using Sano.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace Sano.Controllers
{
    public class AnalisisController : Controller
    {
        public ActionResult Index()
        {

            return View();
        }

        public ActionResult Trades(List<trade> trades)
        {
            try
            {
                using (TradesRepository repo = new TradesRepository())
                {
                    repo.SaveTrades(trades);
                }

                return Json(new
                {
                    success = true,
                    message = "Guardado Exitosamente"
                });
            }


            catch (Exception ex)
            {
                return Json(new
                {
                    success = false,
                    message = ex.Message
                });
            }
        }







        public async Task<ActionResult> ShowTheAnswerAsync()
        {
            var result = await GetTheAnswerToLifeTheUniverseAndEverythingAsync();
            return Content("Response: " + result);
        }


        public Task<int> GetTheAnswerToLifeTheUniverseAndEverythingAsync()
        {
            return Task.Factory.StartNew(() =>
            {

                
                string sUrlRequest = "https://api.bitso.com/v3/trades/?book=xrp_mxn";
                var json = new WebClient().DownloadString(sUrlRequest);
                JavaScriptSerializer ser = new JavaScriptSerializer();
                TradesModel model = ser.Deserialize<TradesModel>(json);


                Thread.Sleep(10000); // Simulate a very hard task
                return 1;
            });
        }



    }
}