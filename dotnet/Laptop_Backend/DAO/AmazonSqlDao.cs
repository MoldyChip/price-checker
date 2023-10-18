using Laptop_Backend.Model;
using Laptop_Backend.DAO.Interfaces;
using Microsoft.Data.SqlClient;
using Laptop_Backend.Exceptions;
using System.Net;

namespace Laptop_Backend.DAO
{
    public class AmazonSqlDao : IAmazonDao
    {
        private readonly string connectionString = "";
        private readonly string sqlGetList = "SELECT TOP 5 * FROM amazon ORDER BY date_pulled DESC";
        private readonly string sqlAddLaptops = "INSERT INTO amazon (company_name, title, image_url, link, price, stars, reviews, date_pulled) " +
            "OUTPUT INSERTED.laptop_id " +
            "VALUES (@company_name, @title, @image_url, @link, @price, @stars, @reviews, @date_pulled)";

        public AmazonSqlDao(string connectionString)
        {
            this.connectionString = connectionString;
        }
        
        public List<Amazon> ListLaptops()
        {
            List<Amazon> laptops = new List<Amazon>();

            try
            {
                ServicePointManager.ServerCertificateValidationCallback = (sender, certificate, chain, sslPolicyErrors) => true;

                using (SqlConnection conn = new SqlConnection(connectionString))
                {
                    conn.Open();
                    using (SqlCommand cmd = new SqlCommand(sqlGetList, conn))
                    {
                        using (SqlDataReader reader = cmd.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                Amazon laptop = MapRowToAmazon(reader);
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
        public List<Amazon> AddLaptops(List<Amazon> laptops)
        {
            List<Amazon> addedLaptops = new List<Amazon>();
            try
            {
                using(SqlConnection conn = new SqlConnection(connectionString))
                {
                    conn.Open();
                    foreach (Amazon laptop in laptops)
                    {
                        using (SqlCommand cmd = new SqlCommand(sqlAddLaptops, conn))
                        {
                            cmd.Parameters.AddWithValue("@company_name", "amazon");
                            cmd.Parameters.AddWithValue("@title", laptop.Title);
                            cmd.Parameters.AddWithValue("@image_url", laptop.ImageUrl);
                            cmd.Parameters.AddWithValue("@link", laptop.Link);
                            cmd.Parameters.AddWithValue("@price", laptop.Price);
                            cmd.Parameters.AddWithValue("@stars", laptop.Stars);
                            cmd.Parameters.AddWithValue("@reviews", laptop.Reviews);
                            cmd.Parameters.AddWithValue("@date_pulled", laptop.DatePulled);

                            laptop.Id = (int)cmd.ExecuteScalar();
                            addedLaptops.Add(laptop);
                        }
                    }
                }
            }
            catch(SqlException ex)
            {
                throw new DaoException("SQL exception occurred", ex);
            }
            return addedLaptops;
        }
        private Amazon MapRowToAmazon(SqlDataReader reader)
        {
            Amazon laptop = new Amazon();

            laptop.Id = Convert.ToInt32(reader["laptop_id"]);
            laptop.Title = Convert.ToString(reader["title"]);
            laptop.ImageUrl = Convert.ToString(reader["image_url"]);
            laptop.Link = Convert.ToString(reader["link"]);
            laptop.Stars = Convert.ToString(reader["stars"]);
            laptop.Reviews = Convert.ToString(reader["reviews"]);
            laptop.DatePulled = Convert.ToDateTime(reader["date_pulled"]);

            return laptop;
        }
    }
}
