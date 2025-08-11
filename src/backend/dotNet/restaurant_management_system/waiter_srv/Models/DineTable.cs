using System;
using System.Collections.Generic;

namespace waiter_srv.Models;

public partial class DineTable
{
    public int TId { get; set; }

    public int Capacity { get; set; }

    public string AvailabilityStatus { get; set; } = null!;

    public string AvailablityStatus { get; set; } = null!;

    public virtual ICollection<Reservation> Reservations { get; set; } = new List<Reservation>();
}
