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
    [Route("api/receipt-detail")]
    public class ReceiptDetailController : Controller
    {
        private ApplicationContext db;
        public ReceiptDetailController(ApplicationContext context)
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
                return db.ReceiptDetail.ToList();
            //else
                //return db.ReceiptDetail.Where(x => x.Receipt.Id == id).ToList();
        }

        [HttpGet("{model}/{id}")]
        public IEnumerable<BaseEntity> Get(string model, Guid id)
        {
            return db.ReceiptDetail.Where(x => x.ReceiptId == id).ToList();
        }

        [HttpPost]
        public IActionResult Post(ReceiptDetail ReceiptDetail)
        {
            if (ModelState.IsValid)
            {
                //db.Attach(ReceiptDetail.Receipt);
                db.ReceiptDetail.Add(ReceiptDetail);
                db.SaveChanges();
                return Ok(ReceiptDetail);
            }

            return BadRequest(ModelState);
        }

        [HttpPut]
        public IActionResult Put(ReceiptDetail ReceiptDetail)
        {
            if (ModelState.IsValid)
            {
                db.Update(ReceiptDetail);
                db.SaveChanges();
                return Ok(ReceiptDetail);
            }

            return BadRequest(ModelState);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(Guid id)
        {
            ReceiptDetail ReceiptDetail = db.ReceiptDetail.FirstOrDefault(x => x.Id == id);
            if (ReceiptDetail != null)
            {
                db.ReceiptDetail.Remove(ReceiptDetail);
                db.SaveChanges();
            }

            return Ok(ReceiptDetail);
        }
    }
}
