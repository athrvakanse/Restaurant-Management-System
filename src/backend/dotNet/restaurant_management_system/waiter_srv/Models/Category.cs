using System;
using System.Collections.Generic;

namespace waiter_srv.Models;

public partial class Category
{
    public int CId { get; set; }

    public string? CName { get; set; }

    public virtual ICollection<Subcategory> Subcategories { get; set; } = new List<Subcategory>();
}
