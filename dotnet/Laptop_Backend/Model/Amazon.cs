using System;
using System.Collections.Generic;

namespace Laptop_Backend.Model
{
    public class Amazon
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string ImageUrl { get; set; }
        public string Link { get; set; }
        public DateTime DatePulled { get; set; }
        public decimal Price { get; set; }
        public string Stars { get; set; }
        public string Reviews { get; set; }

    }
}
