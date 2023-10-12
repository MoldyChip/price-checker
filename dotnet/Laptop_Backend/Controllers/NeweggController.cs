using Laptop_Backend.DAO.Interfaces;
using Laptop_Backend.Model;
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

        [HttpGet("newegg")]
        public ActionResult<List<Newegg>> ListLaptops() 
        {
            return Ok(neweggDao.ListLaptops());
        }

        [HttpPost()]
        public ActionResult<Newegg> AddLaptop(Newegg laptop) 
        {
            Newegg newLaptop = neweggDao.AddLaptop(laptop);

            if (newLaptop == null || newLaptop.Id == 0)
            {
                return BadRequest();
            }
            else
            {
                return Ok(newLaptop);
            }
        }
    }
}
