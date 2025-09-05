// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { ValidationPipe } from '@nestjs/common';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   app.useGlobalPipes(new ValidationPipe())
//   // await app.listen(process.env.PORT ?? 3000);
//   const port = process.env.PORT || 3000; // use Fly's PORT
//   await app.listen(port, '0.0.0.0');  
// }
// bootstrap();







import { NestFactory } from '@nestjs/core';
import { Module, Controller, Get } from '@nestjs/common';

// Simple controller
@Controller()
class HelloController {
  @Get()
  hello() {
    return 'Hello from Fly.io!';
  }
}

@Module({
  controllers: [HelloController],
})
class AppModule {}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0');
}
bootstrap();
