import { Injectable } from '@nestjs/common';
import { CreateOrderitemDto } from './dto/create-orderitem.dto';
import { UpdateOrderitemDto } from './dto/update-orderitem.dto';
import { DatabaseService } from 'src/database/database.service';
@Injectable()
export class OrderitemService {
  constructor(private readonly dbService: DatabaseService) {}

  create(createOrderitemDto: CreateOrderitemDto) {
    return 'This action adds a new orderitem';
  }

  async findAll() {
    const connection = this.dbService.getConnection();
    const [rows] = await connection.query(`
                                  select
                                        tbl_pedido_movimento.ID_TBL_PEDIDO_MOVIMENTO as ID_MOVIMENTO,
                                        tbl_pedido_movimento.ID_TBL_PEDIDO,
                                        tbl_pedido_movimento.ID_TBL_PRODUTO,
                                        tbl_pedido_movimento.DESCRICAO,
                                        tbl_pedido_movimento.QT,
                                      tbl_pedido_movimento.VL_UNITARIO,
                                      (tbl_pedido_movimento.QT * tbl_pedido_movimento.VL_UNITARIO) AS VL_TOTAL,
                                        tbl_pedido_movimento.DATADOCADASTRO
                                    from
                                    tbl_pedido_movimento
                                    where
                                    tbl_pedido_movimento.ID_SYSTEM_CLIENTE = 14
                                    order by
                                    tbl_pedido_movimento.ID_TBL_PEDIDO_MOVIMENTO desc limit 10
                                            `);
    return rows;
  }

  findOne(id: number) {
    return `This action returns a #${id} orderitem`;
  }

  update(id: number, updateOrderitemDto: UpdateOrderitemDto) {
    return `This action updates a #${id} orderitem`;
  }

  remove(id: number) {
    return `This action removes a #${id} orderitem`;
  }
}
