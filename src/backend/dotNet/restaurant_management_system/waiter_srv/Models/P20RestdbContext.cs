using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql.Scaffolding.Internal;

namespace waiter_srv.Models;

public partial class P20RestdbContext : DbContext
{
    public P20RestdbContext()
    {
    }

    public P20RestdbContext(DbContextOptions<P20RestdbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Category> Categories { get; set; }

    public virtual DbSet<DineTable> DineTables { get; set; }

    public virtual DbSet<Dish> Dishes { get; set; }

    public virtual DbSet<Order> Orders { get; set; }

    public virtual DbSet<OrderDetail> OrderDetails { get; set; }

    public virtual DbSet<Reservation> Reservations { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<Subcategory> Subcategories { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseMySql("server=localhost;port=3306;user=root;password=root;database=p20_restdb", Microsoft.EntityFrameworkCore.ServerVersion.Parse("8.4.4-mysql"));

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .UseCollation("utf8mb4_0900_ai_ci")
            .HasCharSet("utf8mb4");

        modelBuilder.Entity<Category>(entity =>
        {
            entity.HasKey(e => e.CId).HasName("PRIMARY");

            entity.ToTable("categories");

            entity.HasIndex(e => e.CName, "c_name").IsUnique();

            entity.Property(e => e.CId).HasColumnName("c_id");
            entity.Property(e => e.CName).HasColumnName("c_name");
        });

        modelBuilder.Entity<DineTable>(entity =>
        {
            entity.HasKey(e => e.TId).HasName("PRIMARY");

            entity.ToTable("dine_tables");

            entity.Property(e => e.TId).HasColumnName("t_id");
            entity.Property(e => e.AvailabilityStatus)
                .HasMaxLength(50)
                .HasColumnName("availability_status");
            entity.Property(e => e.AvailablityStatus)
                .HasMaxLength(255)
                .HasColumnName("availablity_status");
            entity.Property(e => e.Capacity).HasColumnName("capacity");
        });

        modelBuilder.Entity<Dish>(entity =>
        {
            entity.HasKey(e => e.DId).HasName("PRIMARY");

            entity.ToTable("dishes");

            entity.HasIndex(e => e.UId, "FK1ywejqff83t4ogas4ab2j9if1");

            entity.HasIndex(e => e.SId, "s_id");

            entity.Property(e => e.DId).HasColumnName("d_id");
            entity.Property(e => e.DName)
                .HasMaxLength(255)
                .HasColumnName("d_name");
            entity.Property(e => e.Rate).HasColumnName("rate");
            entity.Property(e => e.SId).HasColumnName("s_id");
            entity.Property(e => e.UId).HasColumnName("u_id");

            entity.HasOne(d => d.SIdNavigation).WithMany(p => p.Dishes)
                .HasForeignKey(d => d.SId)
                .HasConstraintName("dishes_ibfk_1");

            entity.HasOne(d => d.UIdNavigation).WithMany(p => p.Dishes)
                .HasForeignKey(d => d.UId)
                .HasConstraintName("FK1ywejqff83t4ogas4ab2j9if1");
        });

        modelBuilder.Entity<Order>(entity =>
        {
            entity.HasKey(e => e.OId).HasName("PRIMARY");

            entity.ToTable("orders");

            entity.HasIndex(e => e.UId, "u_id");

            entity.Property(e => e.OId).HasColumnName("o_id");
            entity.Property(e => e.Amount)
                .HasPrecision(38, 2)
                .HasColumnName("amount");
            entity.Property(e => e.Chef)
                .HasMaxLength(45)
                .HasColumnName("chef");
            entity.Property(e => e.Date).HasColumnName("date");
            entity.Property(e => e.LocalDateTime)
                .HasMaxLength(6)
                .HasColumnName("localDateTime");
            entity.Property(e => e.PayMode)
                .HasColumnType("enum('Cash','Card','UPI','Wallet')")
                .HasColumnName("pay_mode");
            entity.Property(e => e.Status)
                .HasMaxLength(255)
                .HasColumnName("status");
            entity.Property(e => e.UId).HasColumnName("u_id");

            entity.HasOne(d => d.UIdNavigation).WithMany(p => p.Orders)
                .HasForeignKey(d => d.UId)
                .HasConstraintName("fk_uid");
        });

        modelBuilder.Entity<OrderDetail>(entity =>
        {
            entity.HasKey(e => e.OdId).HasName("PRIMARY");

            entity.ToTable("order_details");

            entity.HasIndex(e => e.DId, "d_id");

            entity.HasIndex(e => e.UId, "fk_order_user");

            entity.HasIndex(e => e.OId, "o_id");

            entity.Property(e => e.OdId).HasColumnName("od_id");
            entity.Property(e => e.DId).HasColumnName("d_id");
            entity.Property(e => e.OId).HasColumnName("o_id");
            entity.Property(e => e.OrderId).HasColumnName("order_id");
            entity.Property(e => e.Qty).HasColumnName("qty");
            entity.Property(e => e.UId).HasColumnName("u_id");

            entity.HasOne(d => d.DIdNavigation).WithMany(p => p.OrderDetails)
                .HasForeignKey(d => d.DId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("order_details_ibfk_1");

            entity.HasOne(d => d.OIdNavigation).WithMany(p => p.OrderDetails)
                .HasForeignKey(d => d.OId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("order_details_ibfk_2");

            entity.HasOne(d => d.UIdNavigation).WithMany(p => p.OrderDetails)
                .HasForeignKey(d => d.UId)
                .HasConstraintName("fk_order_user");
        });

        modelBuilder.Entity<Reservation>(entity =>
        {
            entity.HasKey(e => e.RtId).HasName("PRIMARY");

            entity.ToTable("reservations");

            entity.HasIndex(e => e.TId, "t_id");

            entity.HasIndex(e => e.UId, "u_id");

            entity.Property(e => e.RtId).HasColumnName("rt_id");
            entity.Property(e => e.Date).HasColumnName("date");
            entity.Property(e => e.SeatCount).HasColumnName("seat_count");
            entity.Property(e => e.TId).HasColumnName("t_id");
            entity.Property(e => e.Time)
                .HasColumnType("time")
                .HasColumnName("time");
            entity.Property(e => e.UId).HasColumnName("u_id");

            entity.HasOne(d => d.TIdNavigation).WithMany(p => p.Reservations)
                .HasForeignKey(d => d.TId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("reservations_ibfk_1");

            entity.HasOne(d => d.UIdNavigation).WithMany(p => p.Reservations)
                .HasForeignKey(d => d.UId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("reservations_ibfk_2");
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.RId).HasName("PRIMARY");

            entity.ToTable("roles");

            entity.HasIndex(e => e.RName, "r_name").IsUnique();

            entity.Property(e => e.RId).HasColumnName("r_id");
            entity.Property(e => e.RName).HasColumnName("r_name");
        });

        modelBuilder.Entity<Subcategory>(entity =>
        {
            entity.HasKey(e => e.SId).HasName("PRIMARY");

            entity.ToTable("subcategories");

            entity.HasIndex(e => e.CId, "c_id");

            entity.Property(e => e.SId).HasColumnName("s_id");
            entity.Property(e => e.CId).HasColumnName("c_id");
            entity.Property(e => e.SName)
                .HasMaxLength(255)
                .HasColumnName("s_name");

            entity.HasOne(d => d.CIdNavigation).WithMany(p => p.Subcategories)
                .HasForeignKey(d => d.CId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("subcategories_ibfk_1");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UId).HasName("PRIMARY");

            entity.ToTable("users");

            entity.HasIndex(e => e.AadharNo, "aadhar_no").IsUnique();

            entity.HasIndex(e => e.Email, "email").IsUnique();

            entity.HasIndex(e => e.Password, "password").IsUnique();

            entity.HasIndex(e => e.PhoneNo, "phone_no").IsUnique();

            entity.HasIndex(e => e.RId, "r_id");

            entity.Property(e => e.UId).HasColumnName("u_id");
            entity.Property(e => e.AadharNo).HasColumnName("aadhar_no");
            entity.Property(e => e.Address)
                .HasMaxLength(255)
                .HasColumnName("address");
            entity.Property(e => e.Email).HasColumnName("email");
            entity.Property(e => e.Fname)
                .HasMaxLength(255)
                .HasColumnName("fname");
            entity.Property(e => e.Gender)
                .HasMaxLength(255)
                .HasColumnName("gender");
            entity.Property(e => e.Lname)
                .HasMaxLength(255)
                .HasColumnName("lname");
            entity.Property(e => e.Mname)
                .HasMaxLength(255)
                .HasColumnName("mname");
            entity.Property(e => e.Password).HasColumnName("password");
            entity.Property(e => e.PhoneNo).HasColumnName("phone_no");
            entity.Property(e => e.ProfilePhoto).HasColumnName("profile_photo");
            entity.Property(e => e.RId).HasColumnName("r_id");
            entity.Property(e => e.Username)
                .HasMaxLength(255)
                .HasColumnName("username");

            entity.HasOne(d => d.RIdNavigation).WithMany(p => p.Users)
                .HasForeignKey(d => d.RId)
                .HasConstraintName("users_ibfk_1");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
