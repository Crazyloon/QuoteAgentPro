﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using web_agent_pro.Data;

namespace webagentpro.Migrations
{
    [DbContext(typeof(WebAgentProDbContext))]
    [Migration("20181005205920_FixedTypo")]
    partial class FixedTypo
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.1.1-rtm-30846")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<string>("Name")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasName("RoleNameIndex")
                        .HasFilter("[NormalizedName] IS NOT NULL");

                    b.ToTable("AspNetRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<string>("RoleId")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider");

                    b.Property<string>("ProviderKey");

                    b.Property<string>("ProviderDisplayName");

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId");

                    b.Property<string>("RoleId");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId");

                    b.Property<string>("LoginProvider");

                    b.Property<string>("Name");

                    b.Property<string>("Value");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens");
                });

            modelBuilder.Entity("web_agent_pro.Models.ApplicationUser", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("AccessFailedCount");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<string>("Email")
                        .HasMaxLength(256);

                    b.Property<bool>("EmailConfirmed");

                    b.Property<bool>("LockoutEnabled");

                    b.Property<DateTimeOffset?>("LockoutEnd");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256);

                    b.Property<string>("PasswordHash");

                    b.Property<string>("PhoneNumber");

                    b.Property<bool>("PhoneNumberConfirmed");

                    b.Property<string>("SecurityStamp");

                    b.Property<bool>("TwoFactorEnabled");

                    b.Property<string>("UserName")
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasName("UserNameIndex")
                        .HasFilter("[NormalizedUserName] IS NOT NULL");

                    b.ToTable("AspNetUsers");
                });

            modelBuilder.Entity("web_agent_pro.Models.Discount", b =>
                {
                    b.Property<long>("DiscountId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<double>("Amount");

                    b.Property<string>("Name");

                    b.Property<string>("Scope");

                    b.Property<string>("State");

                    b.HasKey("DiscountId");

                    b.ToTable("Discounts");
                });

            modelBuilder.Entity("web_agent_pro.Models.Driver", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("DateOfBirth");

                    b.Property<string>("DriversLicenseNumber")
                        .IsRequired()
                        .HasMaxLength(20);

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasMaxLength(50);

                    b.Property<string>("IssuingState")
                        .IsRequired();

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasMaxLength(50);

                    b.Property<long>("QuoteId");

                    b.Property<decimal>("QuoteMultiplier");

                    b.Property<string>("SSN")
                        .IsRequired()
                        .HasMaxLength(9);

                    b.Property<bool>("SafeDrivingSchool");

                    b.Property<double?>("SafeDrivingSchoolDiscount");

                    b.Property<bool>("Under23YearsOld");

                    b.Property<double?>("Under23YearsOldDiscount");

                    b.HasKey("Id");

                    b.HasIndex("QuoteId");

                    b.ToTable("Drivers");
                });

            modelBuilder.Entity("web_agent_pro.Models.Quote", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasMaxLength(40);

                    b.Property<string>("City")
                        .IsRequired()
                        .HasMaxLength(50);

                    b.Property<DateTime?>("DateDiscarded");

                    b.Property<DateTime>("DateOfBirth");

                    b.Property<DateTime>("DateQuoted");

                    b.Property<DateTime?>("DateSold");

                    b.Property<bool>("Discarded");

                    b.Property<string>("Email")
                        .IsRequired();

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasMaxLength(50);

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasMaxLength(50);

                    b.Property<bool>("MovingViolations");

                    b.Property<double?>("MovingViolationsDiscount");

                    b.Property<bool>("MultiCar");

                    b.Property<double?>("MultiCarDiscount");

                    b.Property<bool>("NewDriver");

                    b.Property<double?>("NewDriverDiscount");

                    b.Property<bool>("PastClaims");

                    b.Property<double?>("PastClaimsDiscount");

                    b.Property<string>("Phone");

                    b.Property<string>("PreviousCarrier")
                        .IsRequired();

                    b.Property<bool>("PreviousCarrierLizard");

                    b.Property<double?>("PreviousCarrierLizardDiscount");

                    b.Property<bool>("PreviousCarrierPervasive");

                    b.Property<double?>("PreviousCarrierPervasiveDiscount");

                    b.Property<decimal>("Price");

                    b.Property<decimal>("QuoteMultiplier");

                    b.Property<string>("SSN")
                        .IsRequired()
                        .HasMaxLength(9);

                    b.Property<string>("State")
                        .IsRequired();

                    b.Property<bool>("Submitted");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasMaxLength(450);

                    b.Property<string>("Zip")
                        .IsRequired()
                        .HasMaxLength(5);

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Quotes");
                });

            modelBuilder.Entity("web_agent_pro.Models.Vehicle", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("AnnualMileage")
                        .IsRequired();

                    b.Property<double?>("AnnualMileageDiscount");

                    b.Property<bool>("AnnualMileageUnder6k");

                    b.Property<bool>("AntiTheft");

                    b.Property<double?>("AntiTheftDiscount");

                    b.Property<bool>("AntilockBrakes");

                    b.Property<double?>("AntilockBrakesDiscount");

                    b.Property<decimal>("CurrentValue");

                    b.Property<byte>("DaysDrivenPerWeek");

                    b.Property<bool>("DaysDrivenPerWeekOver4");

                    b.Property<double?>("DaysDrivenPerWeekOver4Discount");

                    b.Property<bool>("DaytimeLights");

                    b.Property<double?>("DaytimeLightsDiscount");

                    b.Property<string>("Make")
                        .IsRequired()
                        .HasMaxLength(20);

                    b.Property<int?>("MilesToWork");

                    b.Property<bool>("MilesToWorkUnder26");

                    b.Property<double?>("MilesToWorkUnder26Discount");

                    b.Property<string>("Model")
                        .IsRequired()
                        .HasMaxLength(25);

                    b.Property<bool>("NonResidenceGarage");

                    b.Property<double?>("NonResidenceGarageDiscount");

                    b.Property<bool>("PassiveRestraints");

                    b.Property<double?>("PassiveRestraintsDiscount");

                    b.Property<long?>("PrimaryDriverId");

                    b.Property<long>("QuoteId");

                    b.Property<decimal>("QuoteMultiplier");

                    b.Property<bool>("ReducedUsed");

                    b.Property<double?>("ReducedUsedDiscount");

                    b.Property<string>("Vin")
                        .IsRequired()
                        .HasMaxLength(17);

                    b.Property<short>("Year");

                    b.HasKey("Id");

                    b.HasIndex("PrimaryDriverId");

                    b.HasIndex("QuoteId");

                    b.ToTable("Vehicles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("web_agent_pro.Models.ApplicationUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("web_agent_pro.Models.ApplicationUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("web_agent_pro.Models.ApplicationUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.HasOne("web_agent_pro.Models.ApplicationUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("web_agent_pro.Models.Driver", b =>
                {
                    b.HasOne("web_agent_pro.Models.Quote", "Quote")
                        .WithMany("Drivers")
                        .HasForeignKey("QuoteId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("web_agent_pro.Models.Quote", b =>
                {
                    b.HasOne("web_agent_pro.Models.ApplicationUser", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("web_agent_pro.Models.Vehicle", b =>
                {
                    b.HasOne("web_agent_pro.Models.Driver", "PrimaryDriver")
                        .WithMany("Vehicles")
                        .HasForeignKey("PrimaryDriverId");

                    b.HasOne("web_agent_pro.Models.Quote", "Quote")
                        .WithMany("Vehicles")
                        .HasForeignKey("QuoteId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}