using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using PeopleAddTable.Data;

namespace homework_040819_peopleAddTable_ajax.Controllers
{
    public class HomeController : Controller
    {
        PeopleDb db = new PeopleDb(Properties.Settings.Default.ConStr);

        public ActionResult Index()
        { 
            var ppl = db.GetPeople();
            return View(ppl);
        }

        [HttpPost]
        public ActionResult AddPerson(Person p)
        {
            if(p.FirstName == null|| p.LastName == null || p.Age == 0)
            {
                return Redirect("/");
            }
            db.AddPerson(p);
            List<Person> ppl = db.GetPeople();
            return Json(new { People = ppl });
        }

        [HttpPost]
        public ActionResult Delete(int id)
        {
            db.DeletePerson(id);
            List<Person> ppl = db.GetPeople();
            return Json(new { People = ppl });
        }

        [HttpPost]
        public ActionResult Edit(Person p)
        {
            db.Edit(p);
            List<Person> ppl = db.GetPeople();
            return Json(new { People = ppl });
        }
    }
}