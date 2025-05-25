using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class UpdateBdComanda : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ComandaProdus_Comenzi_ComandaId",
                table: "ComandaProdus");

            migrationBuilder.DropForeignKey(
                name: "FK_ComandaProdus_Produse_ProdusId",
                table: "ComandaProdus");

            migrationBuilder.DropForeignKey(
                name: "FK_Comenzi_Users_UtilizatorId",
                table: "Comenzi");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ComandaProdus",
                table: "ComandaProdus");

            migrationBuilder.RenameTable(
                name: "ComandaProdus",
                newName: "ProduseComanda");

            migrationBuilder.RenameIndex(
                name: "IX_ComandaProdus_ComandaId",
                table: "ProduseComanda",
                newName: "IX_ProduseComanda_ComandaId");

            migrationBuilder.AlterColumn<int>(
                name: "UtilizatorId",
                table: "Comenzi",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProduseComanda",
                table: "ProduseComanda",
                columns: new[] { "ProdusId", "ComandaId" });

            migrationBuilder.AddForeignKey(
                name: "FK_Comenzi_Users_UtilizatorId",
                table: "Comenzi",
                column: "UtilizatorId",
                principalTable: "Users",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ProduseComanda_Comenzi_ComandaId",
                table: "ProduseComanda",
                column: "ComandaId",
                principalTable: "Comenzi",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ProduseComanda_Produse_ProdusId",
                table: "ProduseComanda",
                column: "ProdusId",
                principalTable: "Produse",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Comenzi_Users_UtilizatorId",
                table: "Comenzi");

            migrationBuilder.DropForeignKey(
                name: "FK_ProduseComanda_Comenzi_ComandaId",
                table: "ProduseComanda");

            migrationBuilder.DropForeignKey(
                name: "FK_ProduseComanda_Produse_ProdusId",
                table: "ProduseComanda");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ProduseComanda",
                table: "ProduseComanda");

            migrationBuilder.RenameTable(
                name: "ProduseComanda",
                newName: "ComandaProdus");

            migrationBuilder.RenameIndex(
                name: "IX_ProduseComanda_ComandaId",
                table: "ComandaProdus",
                newName: "IX_ComandaProdus_ComandaId");

            migrationBuilder.AlterColumn<int>(
                name: "UtilizatorId",
                table: "Comenzi",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_ComandaProdus",
                table: "ComandaProdus",
                columns: new[] { "ProdusId", "ComandaId" });

            migrationBuilder.AddForeignKey(
                name: "FK_ComandaProdus_Comenzi_ComandaId",
                table: "ComandaProdus",
                column: "ComandaId",
                principalTable: "Comenzi",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ComandaProdus_Produse_ProdusId",
                table: "ComandaProdus",
                column: "ProdusId",
                principalTable: "Produse",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Comenzi_Users_UtilizatorId",
                table: "Comenzi",
                column: "UtilizatorId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
