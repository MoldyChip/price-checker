using Laptop_Backend.Model;
using Laptop_Backend.DAO.Interfaces;
using Microsoft.Data.SqlClient;
using Laptop_Backend.Exceptions;

namespace Laptop_Backend.DAO
{
    public class NeweggSqlDao : INeweggDao
    {
        private readonly string connectionString = "";
        private readonly string sqlGetList = "SELECT TOP 5 * FROM newegg ORDER BY date_pulled DESC";
        private readonly string sqlAddLaptops = "INSERT INTO newegg (company_name, title, image_url, link, price, stars, date_pulled) " +
            "VALUES ('newegg', @title, @image_url, @link, @price, @stars, @date_pulled)";

        public NeweggSqlDao(string connectionString)
        {
            this.connectionString = connectionString;
        }

        public List<Newegg> ListLaptops()
        {
            List<Newegg> laptops = new List<Newegg>();

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
                                Newegg laptop = MapRowToNewegg(reader);
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
        public Newegg AddLaptop(Newegg laptop)
        {
            laptop.Id = 0;
            try
            {
                using (SqlConnection conn = new SqlConnection(connectionString))
                {
                    conn.Open();
                    using (SqlCommand cmd = new SqlCommand(sqlAddLaptops, conn))
                    {
                        cmd.Parameters.AddWithValue("@title", laptop.Title);
                        cmd.Parameters.AddWithValue("@image_url", laptop.Title);
                        cmd.Parameters.AddWithValue("@link", laptop.Link);
                        cmd.Parameters.AddWithValue("@price", laptop.Price);
                        cmd.Parameters.AddWithValue("@stars", laptop.Stars);
                        cmd.Parameters.AddWithValue("@date_pulled", laptop.DatePulled);

                        laptop.Id = (int)cmd.ExecuteScalar();
                    }
                }
            }
            catch (SqlException ex)
            {
                throw new DaoException("SQL exception occurred", ex);
            }
            return laptop;
        }
        private Newegg MapRowToNewegg(SqlDataReader reader)
        {
            Newegg laptop = new Newegg();

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