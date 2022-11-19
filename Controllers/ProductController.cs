using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using ExpenseStatistics.Models;
using System.Collections;
using System.Reflection;
using System.ComponentModel;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.EntityFrameworkCore.Metadata;

namespace ExpenseStatistics.Controllers
{
    [ApiController]
    [Route("api/product")]
    public class ProductController : Controller
    {
        private ApplicationContext db;
        public ProductController(ApplicationContext context)
        {
            db = context;
        }

        [HttpGet("{model}")]
        public IEnumerable<BaseEntity> Get(string model)
        {
            return db.Product.ToList();
        }

        [HttpGet("{model}/{id}")]
        public BaseEntity Get(string model, Guid id)
        {
            return db.Product.FirstOrDefault(x => x.Id == id);
        }

        [HttpPost]
        public IActionResult Post(Product Product)
        {
            if (ModelState.IsValid)
            {
                db.Product.Add(Product);
                db.SaveChanges();
                return Ok(Product);
            }

            return BadRequest(ModelState);
        }

        [HttpPut]
        public IActionResult Put(Product Product)
        {
            if (ModelState.IsValid)
            {
                db.Update(Product);
                db.SaveChanges();
                return Ok(Product);
            }

            return BadRequest(ModelState);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(Guid id)
        {
            Product Product = db.Product.FirstOrDefault(x => x.Id == id);
            if (Product != null)
            {
                db.Product.Remove(Product);
                db.SaveChanges();
            }

            return Ok(Product);
        }
    }
}
