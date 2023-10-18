using Laptop_Backend.Model;
using Laptop_Backend.DAO.Interfaces;
using Microsoft.Data.SqlClient;
using Laptop_Backend.Exceptions;

namespace Laptop_Backend.DAO
{
    public class BestbuySqlDao : IBestbuyDao
    {
        private readonly string connectionString = "";
        private readonly string sqlGetList = "SELECT TOP 5 * FROM bestbuy ORDER BY date_pulled DESC";
        private readonly string sqlAddLaptops = "INSERT INTO bestbuy (company_name, title, image_url, link, price, stars, date_pulled) " +
            "OUTPUT INSERTED.laptop_id " +
            "VALUES (@company_name, @title, @image_url, @link, @price, @stars, @date_pulled)";

        public BestbuySqlDao(string connectionString)
        {
            this.connectionString = connectionString;
        }

        public List<Bestbuy> ListLaptops()
        {
            List<Bestbuy> laptops = new List<Bestbuy>();

            try
            {
                using (SqlConnection conn = new SqlConnection(connectionString))
                {
                    conn.Open();
                    using (SqlCommand cmd = new SqlCommand(sqlGetList, conn))
                    {
                        using (SqlDataReader reader = cmd.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                Bestbuy laptop = MapRowToBestbuy(reader);
                                laptops.Add(laptop);
                            }
                        }
                    }
                }
            }
            catch (SqlException ex)
            {
                throw new DaoException("SQL exception occurred", ex);
            }
            return laptops;
        }
        public List<Bestbuy> AddLaptops(List<Bestbuy> laptops)
        {
            List<Bestbuy> addedLaptops = new List<Bestbuy>();
            try
            {
                using (SqlConnection conn = new SqlConnection(connectionString))
                {
                    conn.Open();
                    foreach (Bestbuy laptop in laptops)
                    {
                        using (SqlCommand cmd = new SqlCommand(sqlAddLaptops, conn))
                        {
                            cmd.Parameters.AddWithValue("@company_name", "bestbuy");
                            cmd.Parameters.AddWithValue("@title", laptop.Title);
                            cmd.Parameters.AddWithValue("@image_url", laptop.ImageUrl);
                            cmd.Parameters.AddWithValue("@link", laptop.Link);
                            cmd.Parameters.AddWithValue("@price", laptop.Price);
                            cmd.Parameters.AddWithValue("@stars", laptop.Stars);
                            cmd.Parameters.AddWithValue("@date_pulled", laptop.DatePulled);

                            laptop.Id = (int)cmd.ExecuteScalar();
                            addedLaptops.Add(laptop);
                        }
                    }
                }
            }
            catch (SqlException ex)
            {
                throw new DaoException("SQL exception occurred", ex);
            }
            return addedLaptops;
        }
        private Bestbuy MapRowToBestbuy(SqlDataReader reader)
        {
            Bestbuy laptop = new Bestbuy();

            laptop.Id = Convert.ToInt32(reader["laptop_id"]);
            laptop.Title = Convert.ToString(reader["title"]);
            laptop.ImageUrl = Convert.ToString(reader["image_url"]);
            laptop.Link = Convert.ToString(reader["link"]);
            laptop.Stars = Convert.ToString(reader["stars"]);
            laptop.DatePulled = Convert.ToDateTime(reader["date_pulled"]);

            return laptop;
        }
    }
}
