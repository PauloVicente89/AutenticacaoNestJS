import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
  Request,
  BadRequestException,
  Query,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { InternalServerErrorResponse } from 'src/shared/dto/internal-server-error.dto';
import { NotFoundErrorResponse } from 'src/shared/dto/not-found.dto';
import { OKResponse } from 'src/shared/dto/ok.dto';
import { UnauthorizedResponse } from 'src/shared/dto/unauthorized.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { ResponseSuccessUserDto } from './dto/response-success-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { Roles } from 'src/decorator/roles.decorator';
import { Role } from 'src/shared/enums/role';
import { UserEntity } from './entities/user.entity';

@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(
    private userService: UserService,
  ) {}
  @ApiResponse({ status: HttpStatus.OK, type: ResponseSuccessUserDto })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    type: UnauthorizedResponse,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    type: InternalServerErrorResponse,
  })
  @Get()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN)
  async findAll(@Query() filters: any): Promise<UserEntity[]> {
    const users = await this.userService.findAll({
      pagination: {
        page: filters?.page || 1,
        perPage: 20,
      },
      criteria: filters,
    });

    return users.map((user) => new UserEntity(user));
  }

  @ApiResponse({ status: HttpStatus.NOT_FOUND, type: NotFoundErrorResponse })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    type: UnauthorizedResponse,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    type: InternalServerErrorResponse,
  })
  @ApiResponse({ status: HttpStatus.OK, type: CreateUserDto })
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN, Role.COMPANY)
  async findOne(@Param('id') id: string): Promise<UserEntity | null> {
    const user = await this.userService.findBy({ id });
    if (!user) throw new BadRequestException(['Registro não encontrado']);
    return new UserEntity(user);
  }

  @ApiResponse({ status: HttpStatus.OK, type: CreateUserDto })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    type: UnauthorizedResponse,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    type: InternalServerErrorResponse,
  })
  @Post()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN)
  async create(
    @Body() body: CreateUserDto,
  ): Promise<UserEntity> {
    return new UserEntity(await this.userService.save(body));
  }

  @ApiResponse({ status: HttpStatus.OK, type: UpdateUserDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, type: NotFoundErrorResponse })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    type: UnauthorizedResponse,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    type: InternalServerErrorResponse,
  })
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN, Role.COMPANY)
  async update(@Param('id') id: string, @Body() body): Promise<UserEntity> {
    return new UserEntity(await this.userService.update(id, body));
  }

  @ApiResponse({ status: HttpStatus.OK, type: OKResponse })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, type: NotFoundErrorResponse })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    type: UnauthorizedResponse,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    type: InternalServerErrorResponse,
  })
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN, Role.COMPANY)
  async remove(@Param('id') id: string): Promise<void> {
    this.userService.delete(id);
  }
}
