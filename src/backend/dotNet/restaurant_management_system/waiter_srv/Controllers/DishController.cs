using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using waiter_srv.Models;

namespace waiter_srv.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DishController : ControllerBase
    {
        private readonly P20RestdbContext db;
        public DishController(P20RestdbContext p20RestdbContext)
        {
            db = p20RestdbContext;
        }
            
        [HttpGet]
        public List<Dish> GetDishes()
        {
            List<Dish> dishes = db.Dishes.ToList();
            return dishes;
        }

        [HttpPost]
        public Dish AddDish(Dish dish)
        {
            db.Dishes.Add(dish);
            db.SaveChanges();
            return dish;
        }
        [HttpPut("{dish_id}")]
        public String UpdateDish(int dish_id, Dish dish)
        {
            var ob_dish = db.Dishes.Find(dish_id);
            ob_dish.SId = dish.SId;
            ob_dish.Rate = dish.Rate;   
            ob_dish.DName = dish.DName;

            db.SaveChanges();
            return "Dish Updated successfully!";
        }
        [HttpDelete]
        public String DeleteDish(int dish_id)
        {
            var ob_dish = db.Dishes.Find(dish_id);
            db.Dishes.Remove(ob_dish);
            db.SaveChanges();
            return "Dish Deleted successfully!";
        }
        [HttpGet("{dish_id}")]
        public Dish GetDishById(int dish_id)
        {
            var ob_dish = db.Dishes.Find(dish_id);
            return ob_dish;
        }
    }
}
