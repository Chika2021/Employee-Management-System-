

import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

// Extend Express Request type to include user
interface AuthenticatedRequest extends Request {
  user?: any;
}

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('summary')
  async getSummary(@Req() req: AuthenticatedRequest) {
    // Assuming req.user contains the user object with id
    const userId = req.user && req.user.id;
    return this.dashboardService.getSummary(userId);
  }
}
