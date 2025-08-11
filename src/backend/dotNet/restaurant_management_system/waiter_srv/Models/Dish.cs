using System;
using System.Collections.Generic;

namespace waiter_srv.Models;

public partial class Dish
{
    public int DId { get; set; }

    public int? SId { get; set; }

    public float Rate { get; set; }

    public string? DName { get; set; }

    public int? UId { get; set; }

    public virtual ICollection<OrderDetail> OrderDetails { get; set; } = new List<OrderDetail>();

    public virtual Subcategory? SIdNavigation { get; set; }

    public virtual User? UIdNavigation { get; set; }
}
