using System.Web;
using System.Web.Mvc;

namespace homework_040819_peopleAddTable_ajax
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}
