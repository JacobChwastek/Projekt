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
        public IActionResult Get(int id)
        {
            var data = _context.Expenses.Where(e => e.Id == id);
            
            return Ok(data);
        }
   
        [HttpPost]
        public IActionResult Post(Expense expense)
        {
            var newData = expense;
            var context = _context.Add(expense);
            _context.SaveChanges();
            
            return Ok(expense);
        }

        [HttpDelete]
        public IActionResult Delete(int id)
        {
            var data = _context.Expenses.Where(e => e.Id == id);
            _context.Expenses.Remove(data.First());
            _context.SaveChanges();
            return Ok(data);
        }
        
    }
}
