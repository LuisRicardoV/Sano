using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Sano.Startup))]
namespace Sano
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
