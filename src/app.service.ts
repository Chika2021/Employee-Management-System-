import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `
      <!doctype html>
      <html>
        <head>
          <meta charset="utf-8" />
          <title>Employment Management System</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <style>
            body { justify-content: center; font-family: system-ui, sans-serif; margin: 2rem; }
            .card {  justify-content: center; max-width: 640px; padding: 1.5rem; border-radius: 16px; box-shadow: 0 6px 24px rgba(0,0,0,.08); }
            h1 { margin: 0 0 .5rem; }
            p { color: #444; }
            .btn { display: inline-block; padding: .6rem 1rem; border-radius: 10px; text-decoration: none; border: 1px solid #ddd; }
          </style>
        </head>
        <body>
          <div class="card">
            <h1>Employment Management System</h1>
            <p>API is running. Welcome Robernix Industries🚀</p>
            <a class="btn" href="robernixindustries.com">Open API Docs</a>
          </div>
        </body>
      </html>
    `;
  }
}
