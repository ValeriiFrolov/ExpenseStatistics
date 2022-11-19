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
    [Route("api/product-price")]
    public class ProductPriceController : Controller
    {
        private ApplicationContext db;
        public ProductPriceController(ApplicationContext context)
        {
            db = context;

            //if (!db.Receipt.Any())
            //{
            //    db.Receipt.Add(new Receipt { Date = DateTime.UtcNow });
            //    db.SaveChanges();
            //}
        }

        [HttpGet("{model}")]
        public IEnumerable<BaseEntity> Get(string model)
        {
            //if (id is null)
                return db.ProductPrice.ToList();
            //else
                //return db.ProductPrice.Where(x => x.Receipt.Id == id).ToList();
        }

        [HttpGet("{model}/{id}")]
        public IEnumerable<BaseEntity> Get(string model, Guid id)
        {
            return db.ProductPrice.Where(x => x.ProductId == id).ToList();
        }

        [HttpPost]
        public IActionResult Post(ProductPrice ProductPrice)
        {
            if (ModelState.IsValid)
            {
                //db.Attach(ProductPrice.Receipt);
                db.ProductPrice.Add(ProductPrice);
                db.SaveChanges();
                return Ok(ProductPrice);
            }

            return BadRequest(ModelState);
        }

        [HttpPut]
        public IActionResult Put(ProductPrice ProductPrice)
        {
            if (ModelState.IsValid)
            {
                db.Update(ProductPrice);
                db.SaveChanges();
                return Ok(ProductPrice);
            }

            return BadRequest(ModelState);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(Guid id)
        {
            ProductPrice ProductPrice = db.ProductPrice.FirstOrDefault(x => x.Id == id);
            if (ProductPrice != null)
            {
                db.ProductPrice.Remove(ProductPrice);
                db.SaveChanges();
            }

            return Ok(ProductPrice);
        }
    }
}
