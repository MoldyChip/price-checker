using Laptop_Backend.Model;

namespace Laptop_Backend.DAO.Interfaces
{
    public interface INeweggDao
    {
        public List<Newegg> ListLaptops();
        public List<Newegg> AddLaptops(List<Newegg> laptops);
    }
}
