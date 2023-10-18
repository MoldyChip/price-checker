using Laptop_Backend.Model;

namespace Laptop_Backend.DAO.Interfaces
{
    public interface IBestbuyDao
    {
        public List<Bestbuy> ListLaptops();
        public List<Bestbuy> AddLaptops(List<Bestbuy> laptops);
    }
}
