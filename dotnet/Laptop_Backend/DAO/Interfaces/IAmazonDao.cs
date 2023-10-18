using Laptop_Backend.Model;

namespace Laptop_Backend.DAO.Interfaces
{
    public interface IAmazonDao
    {
        public List<Amazon> ListLaptops();
        public List<Amazon> AddLaptops(List<Amazon> laptops);
    }
}
