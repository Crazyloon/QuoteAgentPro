using Microsoft.EntityFrameworkCore.Migrations;

namespace webagentpro.Migrations
{
    public partial class FixedTypo : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Quotes_AspNetUsers_userId",
                table: "Quotes");

            migrationBuilder.RenameColumn(
                name: "userId",
                table: "Quotes",
                newName: "UserId");

            migrationBuilder.RenameIndex(
                name: "IX_Quotes_userId",
                table: "Quotes",
                newName: "IX_Quotes_UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Quotes_AspNetUsers_UserId",
                table: "Quotes",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Quotes_AspNetUsers_UserId",
                table: "Quotes");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Quotes",
                newName: "userId");

            migrationBuilder.RenameIndex(
                name: "IX_Quotes_UserId",
                table: "Quotes",
                newName: "IX_Quotes_userId");

            migrationBuilder.AddForeignKey(
                name: "FK_Quotes_AspNetUsers_userId",
                table: "Quotes",
                column: "userId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
