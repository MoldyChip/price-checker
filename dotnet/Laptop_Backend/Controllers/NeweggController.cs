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

        [HttpGet()]
        public ActionResult<List<Newegg>> ListLaptops() 
        {
            return Ok(neweggDao.ListLaptops());
        }

        [HttpPost()]
        public ActionResult<List<Newegg>> AddLaptops(List<Newegg> laptops) 
        {
            List<Newegg> newLaptops = neweggDao.AddLaptops(laptops);

            if (newLaptops == null)
            {
                return BadRequest();
            }
            else
            {
                return Ok(newLaptops);
            }
        }
    }
}
