using System.Web;
using System.Web.Optimization;

namespace Sano
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            #region CSS
            bundles.Add(new StyleBundle("~/CSS/Bootstrap").Include(
                    "~/Content/CSS/Bootstrap/bootstrap.min.css"
                    
                    ));
            

            bundles.Add(new ScriptBundle("~/CSS/Font_Animate").Include(
                         "~/Content/CSS/Font-Awesome/font-awesome.css",
                         "~/Content/CSS/Animate/animate.css",
                         "~/Content/CSS/Bootstrap/dataTables.bootstrap.min.css",
                          "~/Content/CSS/Bootstrap/responsive.bootstrap.min.css"
                         ));


            bundles.Add(new ScriptBundle("~/Site").Include(
                 "~/Content/CSS/Site.css"));


            bundles.Add(new StyleBundle("~/CSS/Login").Include(
                    "~/Content/CSS/Login/Login.css"));

            #endregion

            #region Javascript
            bundles.Add(new ScriptBundle("~/Scripts/Jquery").Include(
                     "~/Content/Scripts/Jquery/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/Scripts/Jquery/JqueryValidate").Include(
                       "~/Content/Scripts/Jquery/jquery.validate*"));


            bundles.Add(new ScriptBundle("~/Scripts/Bootstrap").Include(
                "~/Content/Scripts/Bootstrap/bootstrap.min.js",
                "~/Content/Scripts/Bootstrap/respond.js"));

            bundles.Add(new ScriptBundle("~/Scripts/Bootstrap/Modernizr").Include(
                      "~/Content/Scripts/Bootstrap/modernizr-*"));

            bundles.Add(new ScriptBundle("~/Scripts/Bootstrap-Notify").Include(
             "~/Content/Scripts/bootstrap-notify.js"));

            bundles.Add(new ScriptBundle("~/Scripts/Bootstrap-Validation").Include(
             "~/Content/Scripts/Bootstrap-Validation/validator.min.js"));

            bundles.Add(new ScriptBundle("~/Scripts/dataTable").Include(
          "~/Content/Scripts/dataTable/jquery.dataTables.min.js",
          "~/Content/Scripts/dataTable/dataTables.bootstrap.min.js",
           "~/Content/Scripts/dataTable/dataTables.responsive.min.js",
            "~/Content/Scripts/dataTable/responsive.bootstrap.min.js"
          ));

           

            bundles.Add(new ScriptBundle("~/Site.js").Include(
                   "~/Content/Scripts/Site.js"));

            #endregion

            #region Modulos Javascript
            bundles.Add(new StyleBundle("~/Scripts/Pais").Include(
           "~/Content/Scripts/Catalogo/Pais.js"));
            #endregion
        }
    }
}
