using System;
using System.Collections.Generic;

namespace waiter_srv.Models;

public partial class OrderDetail
{
    public int OdId { get; set; }

    public int DId { get; set; }

    public int OId { get; set; }

    public int Qty { get; set; }

    public int? UId { get; set; }

    public int OrderId { get; set; }

    public virtual Dish DIdNavigation { get; set; } = null!;

    public virtual Order OIdNavigation { get; set; } = null!;

    public virtual User? UIdNavigation { get; set; }
}
