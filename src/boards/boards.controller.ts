import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get()
  getAllBoard(@Req() req): Promise<Board[]> {
    return this.boardsService.getAllBoards(req.user);
  }

  // @Get()
  // getAlllBoard(): Board[] {
  //   return this.boardsService.getAllBoards();
  // }

  @Get('/:id')
  async getBoardById(@Param('id') id: number, @Req() req): Promise<Board> {
    return this.boardsService.getBoardById(id, req.user);
  }
  // @Get('/:id')
  // getBoardById(@Param('id') id: string): Board {
  //   return this.boardsService.getBoardById(id);
  // }

  @Post()
  @UsePipes(ValidationPipe)
  createBoard(
    @Req() req,
    @Body() createBoardDto: CreateBoardDto,
  ): Promise<Board> {
    return this.boardsService.createBoard(createBoardDto, req.user);
  }

  // @Post()
  // @UsePipes(ValidationPipe)
  // createBoard(@Body() createBoardDto: CreateBoardDto): Board {
  //   return this.boardsService.createBoard(createBoardDto);
  // }

  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
    @Req() req,
  ): Promise<Board> {
    return this.boardsService.updateBoardStatus(id, status, req.user);
  }

  // @Patch('/:id/status')
  // updateBoardStatus(
  //   @Param('id') id: string,
  //   @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  // ) {
  //   return this.boardsService.updateBoardStatus(id, status);
  // }

  @Delete('/:id')
  deleteBoard(
    @Param('id', ParseIntPipe) id: number,
    @Req() req,
  ): Promise<void> {
    return this.boardsService.deleteBoard(id, req.user);
  }

  // @Delete('/:id')
  // deleteBoard(@Param('id') id: string): void {
  //   this.boardsService.deleteBoard(id);
  // }
}
