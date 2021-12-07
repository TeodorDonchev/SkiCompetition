using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace DAL.Models
{
    public partial class SkiCompetitionContext : DbContext
    {
        public SkiCompetitionContext()
        {
        }

        public SkiCompetitionContext(DbContextOptions<SkiCompetitionContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Competition> Competitions { get; set; }
        public virtual DbSet<CompetitionCompetitorRelation> CompetitionCompetitorRelations { get; set; }
        public virtual DbSet<Competitor> Competitors { get; set; }
        public virtual DbSet<Team> Teams { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
//#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=TEODORDW;Database=SkiCompetition;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "Cyrillic_General_CI_AS");

            modelBuilder.Entity<Competition>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Date)
                    .HasColumnType("date")
                    .HasColumnName("date");

                entity.Property(e => e.IsFinished).HasColumnName("isFinished");

                entity.Property(e => e.Location)
                    .IsRequired()
                    .HasMaxLength(50)
                    .HasColumnName("location");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50)
                    .HasColumnName("name");
            });

            modelBuilder.Entity<CompetitionCompetitorRelation>(entity =>
            {
                entity.ToTable("Competition_Competitor_Relations");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.CompetitionId).HasColumnName("competitionId");

                entity.Property(e => e.CompetitorId).HasColumnName("competitorId");

                entity.Property(e => e.Place).HasColumnName("place");

                entity.Property(e => e.Points).HasColumnName("points");

                entity.Property(e => e.Time).HasColumnName("time");

                entity.HasOne(d => d.Competition)
                    .WithMany(p => p.CompetitionCompetitorRelations)
                    .HasForeignKey(d => d.CompetitionId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Competition_FK");

                entity.HasOne(d => d.Competitor)
                    .WithMany(p => p.CompetitionCompetitorRelations)
                    .HasForeignKey(d => d.CompetitorId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Competitor_FK");
            });

            modelBuilder.Entity<Competitor>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.FirstName)
                    .IsRequired()
                    .HasMaxLength(50)
                    .HasColumnName("firstName");

                entity.Property(e => e.LastName)
                    .IsRequired()
                    .HasMaxLength(50)
                    .HasColumnName("lastName");

                entity.Property(e => e.Points).HasColumnName("points");

                entity.Property(e => e.Sex)
                    .IsRequired()
                    .HasMaxLength(6)
                    .HasColumnName("sex");

                entity.Property(e => e.TeamId).HasColumnName("teamId");
            });

            modelBuilder.Entity<Team>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50)
                    .HasColumnName("name");

                entity.Property(e => e.Points).HasColumnName("points");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
