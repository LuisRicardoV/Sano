using System.Web;
using System.Web.Optimization;

namespace Sano
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            #region CSS
            bundles.Add(new StyleBundle("~/CSS/Bootstrap").Include(
                    "~/Content/CSS/Bootstrap/bootstrap.min.css"

                    ));


            bundles.Add(new ScriptBundle("~/CSS/Font_Animate").Include(
                         "~/Content/CSS/Animate/animate.css",
                         "~/Content/CSS/Bootstrap/dataTables.bootstrap.min.css",
                          "~/Content/CSS/Bootstrap/responsive.bootstrap.min.css"
                         ));


            bundles.Add(new ScriptBundle("~/Site").Include(
                 "~/Content/CSS/Site.css"));

            bundles.Add(new ScriptBundle("~/Layout").Include(
               "~/Content/CSS/Layout/Icons.css",
                "~/Content/CSS/Layout/Resposive.css",
                "~/Content/CSS/Layout/Core.css",
                "~/Content/CSS/Layout/dropify.min.css",
                "~/Content/CSS/Layout/Menu.css"
               ));


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
            "~/Content/Scripts/Bootstrap/bootstrap-inputmask.min.js",
            "~/Content/Scripts/Bootstrap/respond.js"));

            bundles.Add(new ScriptBundle("~/Scripts/Bootstrap/Modernizr").Include(
            "~/Content/Scripts/Bootstrap/modernizr-*"));

            bundles.Add(new ScriptBundle("~/Scripts/Bootstrap-Notify").Include(
            "~/Content/Scripts/Bootstrap-Notify/bootstrap-notify.js"));

         

            bundles.Add(new ScriptBundle("~/Scripts/dataTable").Include(
            "~/Content/Scripts/dataTable/jquery.dataTables.min.js",
            "~/Content/Scripts/dataTable/dataTables.bootstrap.min.js",
            "~/Content/Scripts/dataTable/dataTables.responsive.min.js",
            "~/Content/Scripts/dataTable/responsive.bootstrap.min.js"
            ));

            bundles.Add(new ScriptBundle("~/Scripts/FormValidation").Include(
            "~/Content/Scripts/FormValidation/formValidation.min.js",
             "~/Content/Scripts/FormValidation/bootstrap.min.js"));



            bundles.Add(new ScriptBundle("~/Site.js").Include(
            "~/Content/Scripts/Site.js",
            "~/Content/Scripts/jqueryExtend.js"));

            bundles.Add(new ScriptBundle("~/Scripts/Layout").Include(
            "~/Content/Scripts/Layout/detect.js",
            "~/Content/Scripts/Layout/fastclick.js",
            "~/Content/Scripts/Layout/jquery.slimscroll.js",
            "~/Content/Scripts/Layout/jquery.blockUI.js",
            "~/Content/Scripts/Layout/waves.js",
            "~/Content/Scripts/Layout/jquery.nicescroll.js",
            "~/Content/Scripts/Layout/jquery.scrollTo.min.js",
            "~/Content/Scripts/Layout/dropify.js",
            "~/Content/Scripts/Layout/jquery.core.js",
            "~/Content/Scripts/Layout/jquery.app.js"));

            #endregion

            #region Modulos Javascript
            bundles.Add(new StyleBundle("~/Scripts/Pais").Include(
            "~/Content/Scripts/Catalogo/Pais.js"));


            bundles.Add(new ScriptBundle("~/bundles/Cuenta").Include(
            "~/Content/Scripts/aes.js",
            "~/Content/Scripts/lockr.js",
            "~/Content/Scripts/AppScripts/Cuenta.js"
            ));

            bundles.Add(new ScriptBundle("~/bundles/Configuracion").Include(
              "~/Content/Scripts/AppScripts/Configuracion.js"
          ));

            #endregion
        }
    }
}
