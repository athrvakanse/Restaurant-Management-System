using System;
using System.Collections.Generic;

namespace waiter_srv.Models;

public partial class Subcategory
{
    public int SId { get; set; }

    public string? SName { get; set; }

    public int CId { get; set; }

    public virtual Category CIdNavigation { get; set; } = null!;

    public virtual ICollection<Dish> Dishes { get; set; } = new List<Dish>();
}
