using Laptop_Backend.DAO.Interfaces;
using Laptop_Backend.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Laptop_Backend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class NeweggController : ControllerBase
    {
        public INeweggDao neweggDao;

        public NeweggController(INeweggDao neweggDao)
        {
            this.neweggDao = neweggDao;
        }

        [HttpGet()]
        public ActionResult<List<Newegg>> ListNewegg() 
        {
            return Ok(neweggDao.ListNewegg());
        }

        [HttpPost()]
        public ActionResult<Newegg> AddLaptop(Newegg laptop) 
        {
            Newegg newLaptop = neweggDao.AddLaptop();
        }
    }
}
