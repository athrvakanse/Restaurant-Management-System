using System;
using System.Collections.Generic;

namespace waiter_srv.Models;

public partial class Order
{
    internal int orderId;
    internal object customerFirstName;
    internal object customerLastName;
    internal string status;
    internal IEnumerable<object> orderDetails;

    public int OId { get; set; }

    public int UId { get; set; }

    public decimal? Amount { get; set; }

    public string PayMode { get; set; } = null!;

    public DateOnly Date { get; set; }

    public DateTime? LocalDateTime { get; set; }

    public string? Status { get; set; }

    public string? Chef { get; set; }

    public virtual ICollection<OrderDetail> OrderDetails { get; set; } = new List<OrderDetail>();

    public virtual User UIdNavigation { get; set; } = null!;
}
