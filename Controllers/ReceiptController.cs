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
    /*
    public static class ReceiptControllerExtensions
    {
        private static Action<DbSet<BaseEntity>> test;
        public static object GetDbSet<T>(this DbContext _context) where T : class
        {
            var a = (DbSet<T>)_context.GetType().GetMethod("Set", types: Type.EmptyTypes).MakeGenericMethod(typeof(T)).Invoke(_context, null);
            test((DbSet<BaseEntity>)a);

            return a;
        }

        public static object ExecOperations(this DbContext _context, string model, Action<DbSet<BaseEntity>> action = null)
        {
            test = action;
            MethodInfo method = typeof(DbContext).GetMethods().First(mi => mi.Name == "GetDbSet" && mi.GetParameters().Count() == 1);
            Type type = Type.GetType(model);
            return method.MakeGenericMethod(type).Invoke(_context, null);
        }
    }
    */

    [ApiController]
    [Route("api/receipt")]
    public class ReceiptController : Controller
    {
        private ApplicationContext db;
        public ReceiptController(ApplicationContext context)
        {
            db = context;

            if (!db.Receipt.Any())
            {
                db.Receipt.Add(new Receipt { Date = DateTime.UtcNow });
                db.SaveChanges();
            }

            if (!db.User.Any())
            {
                db.User.Add(new User { Name = "Supervisor" });
                db.SaveChanges();
            }
        }

        [HttpGet("{model}")]
        public IEnumerable<BaseEntity> Get(string model)
        {
            /*
            var th = typeof(DbSet<>).MakeGenericType(Type.GetType(model));
            MethodInfo method = typeof(DbContext).GetMethods().First(mi => mi.Name == "GetDbSet" && mi.GetParameters().Count() == 1);
            Type type = Type.GetType(model);
            var t = (DbSet<Receipt>)method.MakeGenericMethod(type).Invoke(db, new object[] { {x => x.ToList() } }) ;
            */
            /*
            var th = typeof(DbSet<>).MakeGenericType(Type.GetType(model));
            MethodInfo method = typeof(DbContext).GetMethod("GetDbSet");
            Type type = Type.GetType(model);
            var t = (DbSet<Receipt>)method.MakeGenericMethod(type).Invoke(db, null);
            return t.ToList();
            */
            /*
            var h = db.Receipt;
            var th = db.Model.GetEntityTypes().First(type => type.ClrType == Type.GetType(model));
            Type type = typeof(DbSet<Receipt>);
            var a = typeof(ApplicationContext).GetProperty(model).GetValue(db);
            var b = a as DbSet<BaseEntity>;
            return b.ToList();
            */
            //var a2 = db.Model.GetEntityTypes().First(type => type.ClrType == Type.GetType(model));
            /*
            var a = (DbSet<Receipt>)db.GetType().GetProperty(model).GetValue(db);

            var modelType = Type.GetType(String.Format("ExpenseStatistics.Models.{0}", model));
            var r = Activator.CreateInstance(typeof(DbSet<>).MakeGenericType(modelType));
                r = db.GetType().GetMethods().First(e => e.Name == "Set" && e.IsGenericMethod && e.GetParameters().Count() == 0).MakeGenericMethod(modelType).Invoke(db, null);
            
            return Ok(r);
            */
            //return db.Receipt.ToList();
            //return (IEnumerable<BaseEntity>)db.ExecOperations(model, x => x.ToList());

            //var a = (IQueryable<BaseEntity>)db.GetType().GetProperty(model).GetValue(db);
            return db.Receipt.ToList();
        }

        [HttpGet("{model}/{id}")]
        public BaseEntity Get(string model, Guid id)
        {
            return db.Receipt.FirstOrDefault(x => x.Id == id);
        }

        [HttpPost]
        public IActionResult Post(Receipt Receipt)
        {
            if (ModelState.IsValid)
            {
                db.Receipt.Add(Receipt);
                db.SaveChanges();
                return Ok(Receipt);
            }

            return BadRequest(ModelState);
        }

        [HttpPut]
        public IActionResult Put(Receipt Receipt)
        {
            if (ModelState.IsValid)
            {
                db.Update(Receipt);
                db.SaveChanges();
                return Ok(Receipt);
            }

            return BadRequest(ModelState);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(Guid id)
        {
            Receipt Receipt = db.Receipt.FirstOrDefault(x => x.Id == id);
            if (Receipt != null)
            {
                db.Receipt.Remove(Receipt);
                db.SaveChanges();
            }

            return Ok(Receipt);
        }
    }
}
