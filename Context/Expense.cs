using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Projekt.Context
{
    public class Expense
    {
        [Required]
        [Column("id")]
        public string Id { get; set; }
        
        [Column("name")]
        public string Name { get; set; }
        
        [Column("value")]
        public double  Value { get; set; }
    }
}