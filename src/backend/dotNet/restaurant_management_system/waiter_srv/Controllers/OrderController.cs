using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using waiter_srv.Models;

namespace waiter_srv.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly P20RestdbContext db;

        public OrderController(P20RestdbContext p20RestdbContext)
        {
            db = p20RestdbContext;
        }

        [HttpGet]
        public List<Order> GetOrders()
        {
            List<Order> orders = db.Orders.ToList();
            return orders;
        }

        [HttpPost]
        public Order AddOrder(Order order)
        {
            db.Orders.Add(order);
            db.SaveChanges();
            return order;
        }
        [HttpPut("{o_id}")]
        public String UpdateOrder(int o_id, Order order)
        {
            var ob_order = db.Orders.Find(o_id);

            ob_order.Amount = 300;
            ob_order.PayMode = "Card";
            ob_order.Date = new DateOnly(2025, 03, 07);
            db.SaveChanges();
            return "Order Updated successfully!";
        }
        [HttpDelete]
        public String DeleteOrder(int order_id)
        {
            var ob_order = db.Orders.Find(order_id);
            db.Orders.Remove(ob_order);
            db.SaveChanges();
            return "Order Deleted successfully!";
        }
        [HttpGet("{order_id}")]
        public Order GetOrderById(int order_id)
        {
            var ob_order = db.Orders.Find(order_id);
            return ob_order;
        }

        //[HttpPut("{id}")]
        //public async Task<IActionResult> UpdateOrder(int id, [FromBody] Order updatedOrder)
        //{
        //    if (id != updatedOrder.OId)
        //    {
        //        return BadRequest("Order ID mismatch.");
        //    }

        //    // Find the existing order
        //    var existingOrder = await  db.Orders.FindAsync(id);

        //    if (existingOrder == null)
        //    {
        //        return NotFound("Order not found.");
        //    }

        //    // Update the properties of the existing order with the new values
        //    existingOrder.Chef = updatedOrder.Chef;
        //    existingOrder.OrderDetails = updatedOrder.OrderDetails;

        //    // You may need to handle child collections (like OrderDetails) more carefully
        //    // For example, clearing and re-adding them or updating them individually.
        //    // The following is a simple approach:
        //    existingOrder.OrderDetails.Clear();
        //    foreach (var detail in updatedOrder.OrderDetails)
        //    {
        //        existingOrder.OrderDetails.Add(detail);
        //    }

        //    await db.SaveChangesAsync();

        //    return NoContent();
        //}

        // PUT: api/Order/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrder(int id, Order order)
        {
            if (id != order.OId)
            {
                return BadRequest();
            }

            db.Entry(order).State = EntityState.Modified;

            try
            {
                // Update OrderDetails
                var existingOrder = await db.Orders.Include(o => o.OrderDetails).FirstOrDefaultAsync(o => o.OId == id);
                if (existingOrder == null)
                {
                    return NotFound();
                }

                // Remove old OrderDetails not present in the new list
                foreach (var existingDetail in existingOrder.OrderDetails.ToList())
                {
                    if (!order.OrderDetails.Any(d => d.OdId == existingDetail.OdId))
                    {
                        db.OrderDetails.Remove(existingDetail);
                    }
                }

                // Add or update new/existing OrderDetails
                foreach (var newDetail in order.OrderDetails)
                {
                    var existingDetail = existingOrder.OrderDetails.FirstOrDefault(d => d.OdId == newDetail.OdId);
                    if (existingDetail != null)
                    {
                        // Update existing detail
                        db.Entry(existingDetail).CurrentValues.SetValues(newDetail);
                    }
                    else
                    {
                        // Add new detail
                        newDetail.OId = order.OId;
                        db.OrderDetails.Add(newDetail);
                    }
                }

                // Update other properties on the Order entity
                existingOrder.UId = order.UId;
                existingOrder.Amount = order.Amount;
                existingOrder.PayMode = order.PayMode;
                existingOrder.Date = order.Date;
                existingOrder.LocalDateTime = order.LocalDateTime;
                existingOrder.Status = order.Status;
                existingOrder.Chef = order.Chef;
                db.Entry(existingOrder).State = EntityState.Modified;

                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }
        private bool OrderExists(int id)
        {
            return db.Orders.Any(e => e.OId == id);
        }
    }
}