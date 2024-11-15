
import { Controller, Post, Body } from '@nestjs/common';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('create-payment-intent')
  async createPaymentIntent(@Body() { amount, currency }: { amount: number, currency: string }) {
    const clientSecret = await this.paymentsService.createPaymentIntent(amount, currency);
    return { clientSecret };
  }
}
