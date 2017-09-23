using System.Web.Mvc;
using Microsoft.Practices.Unity;
using Unity.Mvc5;
using System.Diagnostics.CodeAnalysis;
using Microsoft.Owin.Security;
using System.Web;

namespace Sano
{
    [ExcludeFromCodeCoverage]
    public static class UnityConfig
    {
        public static void RegisterComponents()
        {
            var container = new UnityContainer();
            container.RegisterType<IAuthenticationManager>(new InjectionFactory(o => HttpContext.Current.GetOwinContext().Authentication));
            DependencyResolver.SetResolver(new UnityDependencyResolver(container));
        }
    }
}