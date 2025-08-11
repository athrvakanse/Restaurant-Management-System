using System;
using System.Collections.Generic;

namespace waiter_srv.Models;

public partial class User
{
    public int UId { get; set; }

    public int? RId { get; set; }

    public string? Fname { get; set; }

    public string? Mname { get; set; }

    public string? Lname { get; set; }

    public string Password { get; set; } = null!;

    public string? Email { get; set; }

    public string? PhoneNo { get; set; }

    public string? AadharNo { get; set; }

    public string? ProfilePhoto { get; set; }

    public string? Gender { get; set; }

    public string Address { get; set; } = null!;

    public string Username { get; set; } = null!;

    public virtual ICollection<Dish> Dishes { get; set; } = new List<Dish>();

    public virtual ICollection<OrderDetail> OrderDetails { get; set; } = new List<OrderDetail>();

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();

    public virtual Role? RIdNavigation { get; set; }

    public virtual ICollection<Reservation> Reservations { get; set; } = new List<Reservation>();
}
