using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Projekt.Context;

namespace Projekt.Controllers
{
    [ApiController]
   
    [Route("[controller]")]
    public class ExpensesController : ControllerBase
    {
        private readonly ILogger<ExpensesController> _logger;
        private readonly MyDbContext _context;

        public ExpensesController(ILogger<ExpensesController> logger, MyDbContext context)
        {
            _logger = logger;
            _context = context;
        }
        
        [HttpGet]
        public IActionResult Get()
        {
            var data = _context.Expenses;
            
            return Ok(data);
        } 
   
        [HttpGet("{id}")]
        public IActionResult Get(string id)
        {
            var data = _context.Expenses.Where(e => e.Id.Equals(id));
            
            return Ok(data);
        }
   
        [HttpPost]
        public IActionResult Post(ExpenseViewModel expense)
        {
            var newExpense = new Expense()
            {
                Id = Guid.NewGuid().ToString(),
                Name = expense.Name,
                Value = expense.Value
            };
            
            _context.Add(newExpense);
            _context.SaveChanges();
            
            return Ok(expense);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {

            var expense = _context.Expenses.FirstOrDefault(e => e.Id.Equals(id));

            if (expense is null)
                return NotFound();

            _context.Expenses.Remove(expense);
            _context.SaveChanges();
            
            return Ok();
        }
    }

    public class ExpenseViewModel
    {
        public string Name { get; set; }
        
        public double  Value { get; set; }
    }
}
