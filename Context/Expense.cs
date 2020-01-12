using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Projekt.Context
{
    public class Expense
    {
        [Required]
        [Column("expenseId")]
        public int Id { get; set; }
        [Column("name")]
        public string Name { get; set; }
        [Column("value")]
        public double  Value { get; set; }
    }
}