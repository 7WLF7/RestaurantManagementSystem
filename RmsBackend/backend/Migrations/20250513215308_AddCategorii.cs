using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class AddCategorii : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "Produse");

            migrationBuilder.RenameColumn(
                name: "Status",
                table: "Produse",
                newName: "Nume");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Produse",
                newName: "Descriere");

            migrationBuilder.RenameColumn(
                name: "Categorie",
                table: "Produse",
                newName: "CategorieId");

            migrationBuilder.AddColumn<int>(
                name: "CantitateStoc",
                table: "Produse",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<decimal>(
                name: "Pret",
                table: "Produse",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.CreateTable(
                name: "Categorii",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nume = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categorii", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Produse_CategorieId",
                table: "Produse",
                column: "CategorieId");

            migrationBuilder.AddForeignKey(
                name: "FK_Produse_Categorii_CategorieId",
                table: "Produse",
                column: "CategorieId",
                principalTable: "Categorii",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Produse_Categorii_CategorieId",
                table: "Produse");

            migrationBuilder.DropTable(
                name: "Categorii");

            migrationBuilder.DropIndex(
                name: "IX_Produse_CategorieId",
                table: "Produse");

            migrationBuilder.DropColumn(
                name: "CantitateStoc",
                table: "Produse");

            migrationBuilder.DropColumn(
                name: "Pret",
                table: "Produse");

            migrationBuilder.RenameColumn(
                name: "Nume",
                table: "Produse",
                newName: "Status");

            migrationBuilder.RenameColumn(
                name: "Descriere",
                table: "Produse",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "CategorieId",
                table: "Produse",
                newName: "Categorie");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Produse",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
