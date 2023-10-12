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

        [HttpGet("bestbuy")]
        public ActionResult<List<Amazon>> ListLaptops()
        {
            return Ok(bestbuyDao.ListLaptops());
        }

        [HttpPost()]
        public ActionResult<Bestbuy> AddLaptop(Bestbuy laptop)
        {
            Bestbuy newLaptop = bestbuyDao.AddLaptop(laptop);

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
