using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Sano.Models.AppModels
{
    public class TradesModel
    {
        public System.String success { get; set; }
        public List<trade> payload { get; set; }
    }

    public class trade {
        public Nullable<System.Int32> tid { get; set; }
        public System.String book { get; set; }
        public System.String maker_side { get; set; }
        public Nullable<System.DateTime> created_at { get; set; }
        public Nullable<System.Decimal> amount { get; set; }
        public Nullable<System.Decimal> price { get; set; }
    }
}