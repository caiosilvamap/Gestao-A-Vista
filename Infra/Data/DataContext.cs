using Domain.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infra.Data
{
    public partial class DataContext : DbContext
    {
        public DataContext()
        {
        }

        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }



        public virtual DbSet<User> User { get; set; }
        public virtual DbSet<Document> Document { get; set; }
        public virtual DbSet<DocumentCategory> DocumentCategory { get; set; }
        public virtual DbSet<UserGroup> UserGroup { get; set; }


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
            => optionsBuilder.UseSqlServer("Data Source=(localdb)\\MSSQLLocalDB;Initial Catalog=GestaoAVista_DB;Integrated Security=True").UseLazyLoadingProxies().EnableDetailedErrors();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {


            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("Id_User_Pk");

                entity.ToTable("Users");

                entity.Property(e => e.UserGroupId).HasColumnName("UserGroupId");

                entity.Property(e => e.Name)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.CreationDate).HasColumnName("CreationDate");

                entity.Property(e => e.Active);

                entity.Property(e => e.GerenciaGeral)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.UserName)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.Password)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.HasOne(d => d.UserGroupObj).WithMany(p => p.Users)
                    .HasForeignKey(d => d.UserGroupId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Id_UserGroup_Fk");

            });

            modelBuilder.Entity<Document>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("Id_Document_Pk");

                entity.ToTable("Document");

                entity.Property(e => e.UserId).HasColumnName("UserId");

                entity.Property(e => e.DocumentCategoryId).HasColumnName("DocumentCategoryId");

                entity.Property(e => e.Name)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.PathFile)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.PathSlide)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.Active);

                entity.Property(e => e.IsPublic);

                entity.Property(e => e.CreationDate);

                entity.HasOne(d => d.UserObj).WithMany(p => p.Documents)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Id_User_Fk");

                entity.HasOne(d => d.DocumentCategoryObj).WithMany(p => p.Documents)
                .HasForeignKey(d => d.DocumentCategoryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Id_DocumentCategory_Fk");

            });

            modelBuilder.Entity<UserGroup>(entity =>
             {
                 entity.HasKey(e => e.Id).HasName("Id_UserGroup_Pk");

                 entity.ToTable("UserGroup");

                 entity.Property(e => e.Name)
                     .HasMaxLength(200)
                     .IsUnicode(false);
             });

            modelBuilder.Entity<DocumentCategory>(entity =>
           {
               entity.HasKey(e => e.Id).HasName("Id_DocumentCategory_Pk");

               entity.ToTable("DocumentCategory");

               entity.Property(e => e.Name)
                   .HasMaxLength(200)
                   .IsUnicode(false);

               entity.Property(e => e.Active);
           });




            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
