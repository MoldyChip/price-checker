using Laptop_Backend.DAO.Interfaces;
using Laptop_Backend.Model;
using Microsoft.AspNetCore.Mvc;

namespace Laptop_Backend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AmazonController : ControllerBase
    {
        public IAmazonDao amazonDao;
        public AmazonController(IAmazonDao amazonDao) 
        {
            this.amazonDao = amazonDao;
        }

        [HttpGet("amazon")]
        public ActionResult<List<Amazon>> ListLaptops()
        {
            return Ok(amazonDao.ListLaptops());
        }

        [HttpPost()]
        public ActionResult<Amazon> AddLaptop(Amazon laptop)
        {
            Amazon newLaptop = amazonDao.AddLaptop(laptop);

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
