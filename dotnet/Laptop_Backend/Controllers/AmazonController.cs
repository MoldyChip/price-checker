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

        [HttpGet()]
        public ActionResult<List<Amazon>> ListLaptops()
        {
            return Ok(amazonDao.ListLaptops());
        }

        [HttpPost()]
        public ActionResult<List<Amazon>> AddLaptops(List<Amazon> laptops)
        {
            List<Amazon> newLaptops = amazonDao.AddLaptops(laptops);

              return Ok(newLaptops);
        }
    }
}
