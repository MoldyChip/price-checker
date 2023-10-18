using Laptop_Backend.DAO.Interfaces;
using Laptop_Backend.Model;
using Microsoft.AspNetCore.Mvc;

namespace Laptop_Backend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class BestbuyController : ControllerBase
    {
        public IBestbuyDao bestbuyDao;
        public BestbuyController(IBestbuyDao bestbuyDao)
        {
            this.bestbuyDao = bestbuyDao;
        }

        [HttpGet()]
        public ActionResult<List<Amazon>> ListLaptops()
        {
            return Ok(bestbuyDao.ListLaptops());
        }

        [HttpPost()]
        public ActionResult<List<Bestbuy>> AddLaptops(List<Bestbuy> laptops)
        {
            List<Bestbuy> newLaptops = bestbuyDao.AddLaptops(laptops);

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
