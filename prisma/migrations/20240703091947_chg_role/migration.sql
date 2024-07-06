/*
  Warnings:

  - You are about to alter the column `ROLE` on the `tbl_system_usuario` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `SmallInt`.

*/
-- AlterTable
ALTER TABLE `tbl_system_usuario` MODIFY `ROLE` SMALLINT NULL DEFAULT 1;
