import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ParamId } from 'src/core/decorators/param-id.decorator';
import { Roles } from 'src/core/decorators/roles.decorator';
import { RoleEnum } from 'src/core/enums/role.enum';
import { RoleGuard } from 'src/core/guards/role.guard';

import { AuthGuard } from 'src/core/guards/auth.guard';
import { ThrottlerGuard } from '@nestjs/throttler';

@UseGuards(AuthGuard, RoleGuard)
@Controller('v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles(RoleEnum.Administrator)
  @Post()
  create(@Body() data: CreateUserDto) {
    // console.log({ email, password });
    return this.userService.create(data);
  }
  @UseGuards(ThrottlerGuard)
  @Roles(RoleEnum.Administrator)
  @Get()
  findAll() {
    // return this.usersService.findAll();
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@ParamId() id: number) {
    return this.userService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @Patch(':id')
  updatePartial(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }
}
