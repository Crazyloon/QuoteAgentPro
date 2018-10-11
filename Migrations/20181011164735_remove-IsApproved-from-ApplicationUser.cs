using Microsoft.EntityFrameworkCore.Migrations;

namespace webagentpro.Migrations
{
    public partial class removeIsApprovedfromApplicationUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsApproved",
                table: "AspNetUsers");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsApproved",
                table: "AspNetUsers",
                nullable: false,
                defaultValue: false);
        }
    }
}
