using System;
using System.Collections.Generic;

namespace waiter_srv.Models;

public partial class Reservation
{
    public int RtId { get; set; }

    public int TId { get; set; }

    public int UId { get; set; }

    public TimeOnly Time { get; set; }

    public DateOnly Date { get; set; }

    public int SeatCount { get; set; }

    public virtual DineTable TIdNavigation { get; set; } = null!;

    public virtual User UIdNavigation { get; set; } = null!;
}
