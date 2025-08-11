using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;
using System.Text.RegularExpressions;
using waiter_srv.Models;

namespace waiter_srv.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderDetailController : ControllerBase
    {
        private readonly P20RestdbContext db;

        public OrderDetailController(P20RestdbContext p20RestdbContext)
        {
            db = p20RestdbContext;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetOrderDetails()
        {
            var orderDetails = await db.OrderDetails
                .Include(od => od.DIdNavigation)
                .Include(od => od.OIdNavigation)
                .Include(od => od.UIdNavigation)
                .Select(od => new
                {
                    od.OdId,
                    od.Qty,
                    Dish = new
                    {
                        od.DIdNavigation.DId,
                        od.DIdNavigation.DName,
                        od.DIdNavigation.Rate
                    },
                    Order = new
                    {
                        od.OIdNavigation.OId,
                        od.OIdNavigation.Amount,
                        od.OIdNavigation.PayMode,
                        od.OIdNavigation.Date
                    },
                    User = new
                    {
                        od.UIdNavigation.UId,
                        FullName = od.UIdNavigation.Fname + " " + od.UIdNavigation.Lname,
                        od.UIdNavigation.Email,
                        od.UIdNavigation.PhoneNo
                    }
                })
                .ToListAsync();

            return Ok(orderDetails);
        }

        [HttpPut("submit-order")]
        public IActionResult SubmitOrder()
        {
            // Read the request body as a string.
            using var reader = new StreamReader(Request.Body);
            var jsonString = reader.ReadToEnd();

            // Parse the JSON string into a JsonDocument.
            using var document = JsonDocument.Parse(jsonString);
            var root = document.RootElement;

            // Fetch the userId and other properties.
            int orderId = root.GetProperty("orderId").GetInt32();
            int userId = root.GetProperty("userId").GetInt32(); // <-- Fetched here
            string customerFirstName = root.GetProperty("customerFirstName").GetString();
            string customerLastName = root.GetProperty("customerLastName").GetString();
            string assignTo = root.GetProperty("assignTo").GetString(); // Assuming this is a string

            string status = root.GetProperty("status").GetString();
            string dishes = root.GetProperty("dishes").GetString();

            //Access and process nested properties and arrays as before.
           var orderDetails = root.GetProperty("orderDetails");
            int odId = orderDetails.GetProperty("odId").GetInt32();
            
            var dishesIdArray = root.GetProperty("dishesId");
            List<int> dishIds = new List<int>();
            foreach (var dishIdElement in dishesIdArray.EnumerateArray())
            {
                dishIds.Add(dishIdElement.GetInt32());
            }

            //var ob_orderD = db.OrderDetails.Find(orderId);
            var ob_user = db.Users.Find(userId);
            var ob_order = db.Orders.Find(orderId);
            //var ob_dish = db.Dishes.Find(dishesId);
            //var ob_od_id = db.Orders.Find(od_id);

            ob_user.Fname = customerFirstName;
            ob_user.Lname = customerLastName;

            ob_order.Status = status;
            ob_order.Chef = assignTo;
            

            string pattern = @"(.*?)\s\(x(\d+)\)";

            // Split the input string by ", " to process each dish separately
            string[] d_arr = dishes.Split(new[] { ", " }, StringSplitOptions.RemoveEmptyEntries);

            foreach (string dish in d_arr)
            {
                int itr = 0;
                Match match = Regex.Match(dish, pattern);
                db.Dishes.Find(dishIds[itr]).DName = match.Groups[1].Value;// Captures the dish name
                db.OrderDetails.Find(odId).Qty = int.Parse(match.Groups[2].Value);// Captures the quantity
            }

            //Console.WriteLine($"Received order ID: {orderId}");
            //Console.WriteLine($"Received User ID: {userId}"); // <-- Display the user ID
            //Console.WriteLine($"Customer First Name: {customerFirstName}");
            //Console.WriteLine($"Status: {status}");

            return Ok(new { message = $"Order {orderId} for User {userId} processed successfully!" });
        }

    }
}
