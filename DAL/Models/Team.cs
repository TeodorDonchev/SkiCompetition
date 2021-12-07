using System;
using System.Collections.Generic;

#nullable disable

namespace DAL.Models
{
    public partial class Team
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Points { get; set; }
    }
}
