using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace webagentpro.Migrations
{
    public partial class SyncModelsFrontAndBackEnd : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Quotes_AspNetUsers_UserId",
                table: "Quotes");

            migrationBuilder.DropColumn(
                name: "ReducedUsedDiscountDiscount",
                table: "Vehicles");

            migrationBuilder.RenameColumn(
                name: "VehicleId",
                table: "Vehicles",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Quotes",
                newName: "userId");

            migrationBuilder.RenameColumn(
                name: "SocialSecurityNumber",
                table: "Quotes",
                newName: "SSN");

            migrationBuilder.RenameColumn(
                name: "QuotePrice",
                table: "Quotes",
                newName: "Price");

            migrationBuilder.RenameColumn(
                name: "PreviousInsurerPervasiveDiscount",
                table: "Quotes",
                newName: "PreviousCarrierPervasiveDiscount");

            migrationBuilder.RenameColumn(
                name: "PreviousInsurerPervasive",
                table: "Quotes",
                newName: "PreviousCarrierPervasive");

            migrationBuilder.RenameColumn(
                name: "PreviousInsurerLizardDiscount",
                table: "Quotes",
                newName: "PreviousCarrierLizardDiscount");

            migrationBuilder.RenameColumn(
                name: "PreviousInsurerLizard",
                table: "Quotes",
                newName: "PreviousCarrierLizard");

            migrationBuilder.RenameColumn(
                name: "PreviousInsurer",
                table: "Quotes",
                newName: "PreviousCarrier");

            migrationBuilder.RenameColumn(
                name: "QuoteId",
                table: "Quotes",
                newName: "Id");

            migrationBuilder.RenameIndex(
                name: "IX_Quotes_UserId",
                table: "Quotes",
                newName: "IX_Quotes_userId");

            migrationBuilder.RenameColumn(
                name: "DriverId",
                table: "Drivers",
                newName: "Id");

            migrationBuilder.AlterColumn<double>(
                name: "ReducedUsedDiscount",
                table: "Vehicles",
                nullable: true,
                oldClrType: typeof(bool));

            migrationBuilder.AddColumn<bool>(
                name: "ReducedUsed",
                table: "Vehicles",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AlterColumn<string>(
                name: "userId",
                table: "Quotes",
                maxLength: 450,
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DateDiscarded",
                table: "Quotes",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Discarded",
                table: "Quotes",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "SSN",
                table: "Drivers",
                maxLength: 9,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddForeignKey(
                name: "FK_Quotes_AspNetUsers_userId",
                table: "Quotes",
                column: "userId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Quotes_AspNetUsers_userId",
                table: "Quotes");

            migrationBuilder.DropColumn(
                name: "ReducedUsed",
                table: "Vehicles");

            migrationBuilder.DropColumn(
                name: "DateDiscarded",
                table: "Quotes");

            migrationBuilder.DropColumn(
                name: "Discarded",
                table: "Quotes");

            migrationBuilder.DropColumn(
                name: "SSN",
                table: "Drivers");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Vehicles",
                newName: "VehicleId");

            migrationBuilder.RenameColumn(
                name: "userId",
                table: "Quotes",
                newName: "UserId");

            migrationBuilder.RenameColumn(
                name: "SSN",
                table: "Quotes",
                newName: "SocialSecurityNumber");

            migrationBuilder.RenameColumn(
                name: "Price",
                table: "Quotes",
                newName: "QuotePrice");

            migrationBuilder.RenameColumn(
                name: "PreviousCarrierPervasiveDiscount",
                table: "Quotes",
                newName: "PreviousInsurerPervasiveDiscount");

            migrationBuilder.RenameColumn(
                name: "PreviousCarrierPervasive",
                table: "Quotes",
                newName: "PreviousInsurerPervasive");

            migrationBuilder.RenameColumn(
                name: "PreviousCarrierLizardDiscount",
                table: "Quotes",
                newName: "PreviousInsurerLizardDiscount");

            migrationBuilder.RenameColumn(
                name: "PreviousCarrierLizard",
                table: "Quotes",
                newName: "PreviousInsurerLizard");

            migrationBuilder.RenameColumn(
                name: "PreviousCarrier",
                table: "Quotes",
                newName: "PreviousInsurer");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Quotes",
                newName: "QuoteId");

            migrationBuilder.RenameIndex(
                name: "IX_Quotes_userId",
                table: "Quotes",
                newName: "IX_Quotes_UserId");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Drivers",
                newName: "DriverId");

            migrationBuilder.AlterColumn<bool>(
                name: "ReducedUsedDiscount",
                table: "Vehicles",
                nullable: false,
                oldClrType: typeof(double),
                oldNullable: true);

            migrationBuilder.AddColumn<double>(
                name: "ReducedUsedDiscountDiscount",
                table: "Vehicles",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "Quotes",
                nullable: true,
                oldClrType: typeof(string),
                oldMaxLength: 450);

            migrationBuilder.AddForeignKey(
                name: "FK_Quotes_AspNetUsers_UserId",
                table: "Quotes",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
